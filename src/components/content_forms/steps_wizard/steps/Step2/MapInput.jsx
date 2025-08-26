import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Pin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function MapInput({ coords, onChange, isDefaultCoords }, ref) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const idleTimer = useRef(null);
    const lastCoordsRef = useRef(coords); // Armazena última coordenada usada

    // Instancia o mapa inicialmente;
    // Registra inicio/fim do movimento no mapa (com debounce);
    // E então envia as cordenadas para "handleMapChange" (o 'onChange' aqui);
    useEffect(() => {
        if (!mapRef.current) return;

        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coords,
            zoom: 16
        });

        mapInstanceRef.current = map;

        // Cancela o timer durante a movimentação. Evita retorno enquanto ocorrer o movimento.
        map.on("move", () => {
            if (idleTimer.current) {
                clearTimeout(idleTimer.current);
                idleTimer.current = null;
            }
        });

        // Espera 2s após parar para retornar as coordenadas;
        map.on("moveend", () => {
            idleTimer.current = setTimeout(() => {
                const center = map.getCenter();
                const lngLat = [center.lng, center.lat];

                // Só chama se mudou
                if (
                    Math.abs(lngLat[0] - lastCoordsRef.current[0]) > 0.000001 ||
                    Math.abs(lngLat[1] - lastCoordsRef.current[1]) > 0.000001
                ) {
                    lastCoordsRef.current = lngLat;
                    onChange(lngLat);
                }
            }, 1000);
        });

        return () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            map.remove();
        };
    }, []);

    // Centraliza o mapa após ser feito "busca textual";
    useImperativeHandle(ref, () => ({
        jumpTo: ({ center, zoom = 16 }) => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.jumpTo({ center, zoom });
            }
        }
    }))

    return (
        <>
            {isDefaultCoords && <span
                style={{
                    backgroundColor: 'rgba(55, 96, 112, 0.52)',
                    backdropFilter: 'blur(6px)',
                    height: '100%', width: '100%',
                    pointerEvents: 'none',
                    position: 'absolute',
                    zIndex: 9
                }}
            >

            </span>}
            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 7
                }}
            />
            {/* Ponteiro fixo visual */}

            <Pin
                size={22}
                fill='#007cbf'
                style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -102%)',
                    color: '#007cbf',
                    zIndex: 8,
                }}
            />
            <div
                style={{
                    backgroundColor: '#007cbf',
                    boxShadow: '0 0 6px rgba(0, 0, 0, 0.84)',
                    borderRadius: '50%',
                    height: '3px', width: '3px',
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9,
                }}
            />
        </>
    );
}

export default forwardRef(MapInput);
