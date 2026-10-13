import { simulatorOptions } from "../../data/simulatorOptions.js";

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif";
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_GALLERY_IMAGES = 20;
const imageTypes = new Set(IMAGE_ACCEPT.split(","));

export function imageError(file) {
    if (!(file instanceof Blob) || !imageTypes.has(file.type))
        return "Selecione uma imagem JPEG, PNG, WebP, GIF ou AVIF.";
    if (!file.size) return "A imagem está vazia.";
    if (file.size > MAX_IMAGE_BYTES) return "Cada imagem pode ter até 10 MB.";
    return "";
}

const text = value => String(value ?? "").trim();
const number = value => text(value) === "" ? null : Number(value);
const catalog = (list, id) => list.find(option => option.id === id);
const hasValue = value => text(value) !== "";

export function stepErrors(data, step) {
    const errors = [];
    if (step === 1) {
        if (!text(data.name)) errors.push("Preencha o nome do imóvel.");
        if (!catalog(simulatorOptions.opts_types, data.type_id)) errors.push("Selecione um tipo.");
        if (!catalog(simulatorOptions.opts_construtoras, data.construtora_id)) errors.push("Selecione uma construtora.");
        if (hasValue(data.valor) && (!Number.isFinite(number(data.valor)) || number(data.valor) < 0))
            errors.push("O valor precisa ser um número não negativo.");
        if (data.logo?.url && imageError(data.logo.url)) errors.push(imageError(data.logo.url));
    }
    if (step === 2) {
        if (!/^\d{8}$/.test(text(data.cep).replace(/\D/g, ""))) errors.push("Informe um CEP com oito dígitos.");
        for (const key of ["rua", "bairro", "cidade"])
            if (!text(data[key])) errors.push("Preencha rua, bairro e cidade.");
        if (!/^[A-Za-z]{2}$/.test(text(data.estado))) errors.push("Informe a UF com duas letras.");
        const lng = number(data.longitude), lat = number(data.latitude);
        if ((lng === null) !== (lat === null)) errors.push("Informe ambas as coordenadas ou deixe ambas em branco.");
        if (lng !== null && (!Number.isFinite(lng) || lng < -180 || lng > 180)) errors.push("Longitude inválida: use -180 a 180.");
        if (lat !== null && (!Number.isFinite(lat) || lat < -90 || lat > 90)) errors.push("Latitude inválida: use -90 a 90.");
    }
    if (step === 3) {
        if (!catalog(simulatorOptions.opts_status, data.status_id)) errors.push("Selecione a situação.");
        for (const key of ["dorms", "banheiros", "garagens"]) {
            const { min = "", max = "" } = data.extradb?.details?.[key] ?? {};
            const a = number(min), b = number(max);
            if ([a, b].some(value => value !== null && (!Number.isSafeInteger(value) || value < 0)))
                errors.push("As quantidades precisam ser inteiros não negativos.");
            if (a !== null && b !== null && a > b) errors.push("O mínimo não pode superar o máximo.");
        }
    }
    const group = { 4: "aptoimg", 5: "condimg", 6: "plantimg" }[step];
    if (group) {
        const images = data[group] ?? [];
        if (images.length > MAX_GALLERY_IMAGES) errors.push("Cada galeria aceita até 20 imagens.");
        for (const image of images) if (imageError(image.url)) errors.push(imageError(image.url));
    }
    if (step === 7) errors.push(...(imageError(data.thumb?.url) ? ["Selecione uma imagem principal válida (até 10 MB)."] : []));
    return [...new Set(errors)];
}

export function buildSimulatorObject(data) {
    const errors = Array.from({ length: 7 }, (_, index) => stepErrors(data, index + 1)).flat();
    if (errors.length) throw new Error([...new Set(errors)].join(" "));
    const media = image => image ? { file: image.url, title: text(image.title), description: text(image.desc) } : null;
    const gallery = key => (data[key] ?? []).map(media);
    return {
        name: text(data.name),
        type: { ...catalog(simulatorOptions.opts_types, data.type_id) },
        construtora: { ...catalog(simulatorOptions.opts_construtoras, data.construtora_id) },
        valor: number(data.valor),
        status: { ...catalog(simulatorOptions.opts_status, data.status_id) },
        address: {
            cep: text(data.cep).replace(/\D/g, ""),
            rua: text(data.rua), bairro: text(data.bairro), cidade: text(data.cidade),
            estado: text(data.estado).toUpperCase(),
            longitude: number(data.longitude), latitude: number(data.latitude),
        },
        details: Object.fromEntries(Object.entries(data.extradb.details).map(([key, range]) => [
            key, { min: number(range.min), max: number(range.max) },
        ])),
        features: {
            apartment: [...data.extradb.aptoinfo],
            condominium: [...data.extradb.condinfo],
            floorPlan: [...data.extradb.plantinfo],
        },
        images: { logo: data.logo?.url ? media(data.logo) : null, thumbnail: media(data.thumb),
            apartment: gallery("aptoimg"), condominium: gallery("condimg"), floorPlan: gallery("plantimg") },
    };
}

export function serializeSimulatorObject(object) {
    return JSON.stringify(object, (_, value) => value instanceof Blob ? {
        name: value.name ?? "", type: value.type, size: value.size,
        lastModified: value.lastModified ?? null,
    } : value, 2);
}
