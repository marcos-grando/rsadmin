import React from "react";

function Linkto({ type, slug, data }) {

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .trim();
    };

    switch (type) {

        case "home":
            return "/";
        case "config":
            return "/config";

        case "alltypes":
            return "/todos-imoveis"

        case "casas":
            return `/casas`; //"/casas"
        case "casas-slug":
            const casa = data;
            return `/casas/${generateSlug(casa.title + "-" + casa.local)}`;

        case "terrenos":
            return `/terrenos`; //"/terrenos"
        case "terrenos-slug":
            const terreno = data;
            return `/terrenos/${generateSlug(terreno.title + "-" + terreno.local)}`;

        case "fazendas":
            return `/fazendas`; //"/fazendas"
        case "fazendas-slug":
            const fazenda = data;
            return `/fazendas/${generateSlug(fazenda.title + "-" + fazenda.local)}`;

        case "residenciais":
            return `/residenciais`; //"/empreendimentos"
        case "empreend-slug":
            const resid = data;
            return `/empreendimentos/${generateSlug(resid.const + "-" + resid.title + "-" + resid.local)}`;

        default: /* utiliza-se "others" geralmente */
            return "/";
    }
}

export default Linkto;