import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Pin } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function MapInput({ coords, onChange, onError }, ref) {
    const container = useRef(null);
    const instance = useRef(null);
    const initialCoords = useRef(coords);
    const changeRef = useRef(onChange);
    const errorRef = useRef(onError);
    useEffect(() => { changeRef.current = onChange; errorRef.current = onError; }, [onChange, onError]);
    useEffect(() => {
        let timer;
        let map;
        let last = initialCoords.current;
        try {
            map = new mapboxgl.Map({ container: container.current, style: "mapbox://styles/mapbox/streets-v11", center: last, zoom: 16 });
            instance.current = map;
            map.on("error", () => errorRef.current?.());
            map.on("move", () => clearTimeout(timer));
            map.on("moveend", () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const { lng, lat } = map.getCenter();
                    if (Math.abs(last[0] - lng) + Math.abs(last[1] - lat) > 0.000001) {
                        last = [lng, lat];
                        changeRef.current(last);
                    }
                }, 700);
            });
        } catch { errorRef.current?.(); }
        return () => { clearTimeout(timer); map?.remove(); instance.current = null; };
    }, []);
    useImperativeHandle(ref, () => ({ jumpTo: ({ center, zoom = 16 }) => instance.current?.jumpTo({ center, zoom }) }), []);
    return <>
        <div ref={container} style={{ height: "100%", width: "100%" }} />
        <Pin size={25} fill="#007cbf" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)", pointerEvents: "none", color: "#007cbf" }} />
    </>;
}

export default forwardRef(MapInput);
