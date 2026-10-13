import test from "node:test";
import assert from "node:assert/strict";
import { File } from "node:buffer";
import { FORM_RESID_FORMDATA } from "../src/utilities/util/fieldTitleForms.js";
import { buildSimulatorObject, serializeSimulatorObject, stepErrors, imageError, MAX_IMAGE_BYTES } from "../src/utilities/util/simulatorModel.js";
import { updateWithPath } from "../src/components/content_forms/components/utility/utility.js";

function fixture() {
    const data = structuredClone(FORM_RESID_FORMDATA);
    Object.assign(data, { name: "  Imóvel de teste  ", type_id: 1, construtora_id: 1, status_id: 1,
        cep: "88000-000", rua: "Rua Exemplo", bairro: "Centro", cidade: "Florianópolis", estado: "sc" });
    data.thumb.url = new File([new Uint8Array([1, 2, 3])], "foto.png", { type: "image/png", lastModified: 1 });
    return data;
}

test("objeto independente é normalizado sem IDs remotos ou datas fictícias", () => {
    const result = buildSimulatorObject(fixture());
    assert.equal(result.name, "Imóvel de teste");
    assert.equal(result.address.cep, "88000000");
    assert.equal(result.address.estado, "SC");
    assert.equal(result.address.longitude, null);
    assert.equal(result.valor, null);
    assert.equal(result.details.garagens.min, 0);
    assert.equal(result.id, undefined);
    assert.equal(result.created_at, undefined);
    assert.equal(result.type.name, "Residencial");
});

test("campos obrigatórios e IDs fora dos catálogos locais impedem a geração", () => {
    assert.throws(() => buildSimulatorObject(FORM_RESID_FORMDATA));
    const data = fixture(); data.name = "  "; data.type_id = 999;
    assert.equal(stepErrors(data, 1).length, 2);
    assert.throws(() => buildSimulatorObject(data));
});

test("validação de coordenadas, pares e quantidades não negativas", () => {
    const data = fixture(); data.longitude = "-48.5";
    assert.ok(stepErrors(data, 2).length);
    data.latitude = "-27.5"; assert.equal(stepErrors(data, 2).length, 0);
    data.latitude = "91"; assert.ok(stepErrors(data, 2).length);
    data.extradb.details.dorms = { min: "3", max: "2" }; assert.ok(stepErrors(data, 3).length);
    data.extradb.details.dorms = { min: "-1", max: "2" }; assert.ok(stepErrors(data, 3).length);
    data.extradb.details.dorms = { min: "1.5", max: "2" }; assert.ok(stepErrors(data, 3).length);
});

test("conteúdo e metadados das galerias permanecem alinhados", () => {
    const data = fixture();
    data.aptoimg = [{ url: data.thumb.url, title: "  Sala  ", desc: "  Vista da sala  " }];
    data.extradb.aptoinfo = ["Sacada"];
    const result = buildSimulatorObject(data);
    assert.equal(result.images.apartment[0].title, "Sala");
    assert.equal(result.images.apartment[0].description, "Vista da sala");
    assert.equal(result.images.apartment[0].file, data.thumb.url);
    assert.deepEqual(result.features.apartment, ["Sacada"]);
});

test("JSON descreve arquivos sem fingir upload ou incluir URLs blob", () => {
    const json = serializeSimulatorObject(buildSimulatorObject(fixture()));
    const image = JSON.parse(json).images.thumbnail.file;
    assert.deepEqual(image, { name: "foto.png", type: "image/png", size: 3, lastModified: 1 });
    assert.ok(!json.includes("blob:"));
    assert.ok(!json.includes("public_id"));
});

test("tipo, tamanho, arquivo vazio e limite de galeria são verificados", () => {
    assert.ok(imageError(new File(["hello"], "nota.txt", { type: "text/plain" })));
    assert.ok(imageError(new File([], "vazio.png", { type: "image/png" })));
    assert.ok(imageError(new File([new Uint8Array(MAX_IMAGE_BYTES + 1)], "grande.png", { type: "image/png" })));
    assert.equal(imageError(fixture().thumb.url), "");
    const data = fixture(); data.aptoimg = Array.from({ length: 21 }, () => ({ url: data.thumb.url }));
    assert.ok(stepErrors(data, 4).length);
});

test("edição de campo não muta o objeto anterior nem recria o File", () => {
    const previous = fixture(); let next;
    updateWithPath(callback => { next = callback(previous); }, ["extradb", "details", "dorms", "min"], "2");
    assert.equal(previous.extradb.details.dorms.min, "1");
    assert.equal(next.extradb.details.dorms.min, "2");
    assert.notEqual(next.extradb, previous.extradb);
    assert.equal(next.thumb.url, previous.thumb.url);
});
