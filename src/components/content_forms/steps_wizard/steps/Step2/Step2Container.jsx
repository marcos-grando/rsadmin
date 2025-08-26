import React, { useState, useEffect, useRef } from "react";
import { fetchAddressByCep, reverseGeocode } from "./mapboxUtils";
import MapInput from "./MapInput";

const DEFAULT_COORDS = [-48.5651624333276, -27.59593609532341];

function Step2Container({ formData, setFormData, style }) {
    const attMapRef = useRef(null);
    const debounce = useRef(null);
    const searchDebounce = useRef(null);

    const [searchText, setSearchText] = useState("");

    const [coords, setCoords] = useState(() => {
        const lng = parseFloat(formData.longitude);
        const lat = parseFloat(formData.latitude);
        return isNaN(lng) || isNaN(lat) ? DEFAULT_COORDS : [lng, lat];
    });
    const [isDefaultCoords, setIsDefaultCoords] = useState(true);

    // Influencia no estilo do mapa ao iniciar, antes do usuário definir uma busca;
    useEffect(() => {
        const isDefault =
            Math.abs(coords[0] - DEFAULT_COORDS[0]) < 0.000001 &&
            Math.abs(coords[1] - DEFAULT_COORDS[1]) < 0.000001;

        setIsDefaultCoords(isDefault);
    }, [coords]);

    // Atualiza formData com os dados que serão encontrados;
    const updateForm = (updates) => {
        setFormData(prev => {
            const changed = Object.entries(updates).some(
                ([key, val]) => String(prev[key]) !== String(val)
            );
            if (!changed) return prev;

            const normalized = {};
            for (const key in updates) {
                normalized[key] = String(updates[key]);
            }
            return { ...prev, ...normalized };
        });
    };

    // ---> Campo de busca textual para movimentar o mapa;
    useEffect(() => {
        if (!searchText || searchText.trim().length < 3) return;
        if (searchDebounce.current) clearTimeout(searchDebounce.current);

        searchDebounce.current = setTimeout(async () => {
            try {
                const query = encodeURIComponent(searchText);
                const res = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&limit=1`
                );
                const json = await res.json();
                const [lng, lat] = json.features?.[0]?.center || [];

                if (lng && lat) {
                    attMapRef.current?.jumpTo({ center: [lng, lat], zoom: 16 });
                }
            } catch (err) {
                console.error("Erro ao buscar endereço via texto:", err);
            }
        }, 1500);
    }, [searchText]);

    // 1 ---> Movimento do mapa retorna long/lati;
    // 2 ---> long/lati atualiza setCoords -> retorna novo CEP;
    const handleMapChange = async ([lng, lat]) => {
        setCoords([lng, lat]);
        updateForm({ longitude: lng, latitude: lat });

        try {
            const address = await reverseGeocode(lng, lat);
            updateForm(address);
        } catch (err) {
            console.error("Erro no reverse geocode:", err);
        }
    };

    // ---> Atualização após long/lati retornar CEP
    useEffect(() => {
        const cep = formData.cep?.replace(/\D/g, '');
        if (!cep || cep.length !== 8) return;

        if (debounce.current) clearTimeout(debounce.current);
        debounce.current = setTimeout(async () => {
            try {
                const viaCep = await fetchAddressByCep(cep);
                updateForm(viaCep);
            } catch (err) {
                console.error("Erro ao buscar endereço via CEP:", err);
            }
        }, 500);
    }, [formData.cep]);

    return (
        <div className={style}>
            <input
                type="text"
                placeholder="Buscar local e centralizar no mapa (rua, bairro, cidade...)"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ zIndex: 11 }}
            />
            <MapInput
                ref={attMapRef}
                coords={coords}
                onChange={handleMapChange}
                isDefaultCoords={isDefaultCoords}
                style={{ zIndex: 10 }}
            />
        </div>
    );
}

export default Step2Container;
