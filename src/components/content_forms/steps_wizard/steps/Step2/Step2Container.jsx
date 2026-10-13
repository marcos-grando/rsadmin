import { useState, useEffect, useRef } from "react";
import MapInput from "./MapInput";
import { reverseGeocode, fetchAddressByCep } from "./mapboxUtils";
import style from "./OptionalMap.module.scss";

const DEFAULT_COORDS = [-48.5651624333276, -27.59593609532341];

export default function Step2Container({ formData, setFormData }) {
    const mapRef = useRef(null);
    const requestRef = useRef(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [coords] = useState(() => {
        const lng = Number(formData.longitude), lat = Number(formData.latitude);
        return formData.longitude !== "" && formData.latitude !== "" && Number.isFinite(lng) && Math.abs(lng) <= 180 &&
            Number.isFinite(lat) && Math.abs(lat) <= 90 ? [lng, lat] : DEFAULT_COORDS;
    });
    useEffect(() => () => requestRef.current?.abort(), []);
    const request = () => {
        requestRef.current?.abort();
        requestRef.current = new AbortController();
        setError("");
        setBusy(false);
        return requestRef.current.signal;
    };
    const change = async ([lng, lat]) => {
        const signal = request();
        setFormData(previous => ({ ...previous, longitude: String(lng), latitude: String(lat) }));
        try {
            const address = await reverseGeocode(lng, lat, signal);
            if (!address.cep) return;
            const resolved = await fetchAddressByCep(address.cep.replace(/\D/g, ""), signal);
            if (!signal.aborted) setFormData(previous => ({ ...previous, ...address, ...resolved }));
        } catch {
            if (!signal.aborted) setError("Não foi possível consultar o endereço. Preencha os campos manualmente.");
        }
    };
    const find = async () => {
        if (search.trim().length < 3) { setError("Digite pelo menos três caracteres."); return; }
        const signal = request();
        setBusy(true);
        try {
            const response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                encodeURIComponent(search.trim()) + ".json?access_token=" + import.meta.env.VITE_MAPBOX_TOKEN + "&limit=1&country=br", { signal });
            if (!response.ok) throw new Error("geocoding");
            const json = await response.json();
            const center = json.features?.[0]?.center;
            if (!center) { setError("Endereço não encontrado. Use os campos manuais."); return; }
            if (!signal.aborted) mapRef.current?.jumpTo({ center });
        } catch {
            if (!signal.aborted) setError("Consulta indisponível. Use os campos manuais.");
        } finally { if (!signal.aborted) setBusy(false); }
    };
    return (
        <section className={style.optionalMap}>
            <div className={style.search}>
                <input aria-label="Buscar no mapa" value={search} onChange={event => setSearch(event.target.value)}
                    placeholder="Rua, bairro ou cidade" onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); find(); } }} />
                <button type="button" onClick={find} disabled={busy}>{busy ? "Buscando…" : "Buscar"}</button>
            </div>
            <p>Recurso opcional: consulta Mapbox e ViaCEP. Mover o mapa pode preencher o endereço.</p>
            <div className={style.map}><MapInput ref={mapRef} coords={coords} onChange={change}
                onError={() => setError("Mapa indisponível. Você pode continuar preenchendo manualmente.")} /></div>
            {error && <p role="status">{error}</p>}
        </section>
    );
}
