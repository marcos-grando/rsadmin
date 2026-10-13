import { useEffect, useState } from "react";

// O endereço blob é apenas uma prévia local e nunca integra o JSON exportado.
export default function useObjectURL(file) {
    const [preview, setPreview] = useState({ file: null, url: "" });
    useEffect(() => {
        if (!(file instanceof Blob)) return;
        const url = URL.createObjectURL(file);
        setPreview({ file, url });
        return () => URL.revokeObjectURL(url);
    }, [file]);
    return preview.file === file ? preview.url : "";
}
