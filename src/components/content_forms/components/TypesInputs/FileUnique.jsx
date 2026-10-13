import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import useObjectURL from "../../../../utilities/hooks/useObjectURL";
import { imageError, IMAGE_ACCEPT } from "../../../../utilities/util/simulatorModel";
import { useMessage } from "../../../../utilities/contexts/ContextMessage";

export default function FileUnique({ file, pathname, label, onChange, disabled }) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);
    const preview = useObjectURL(file);
    const { showMessage } = useMessage();
    const select = files => {
        const chosen = files?.[0];
        if (!chosen) return;
        const error = imageError(chosen);
        if (error) { showMessage("warning", <p>{error}</p>); return; }
        onChange({ target: { files: [chosen] } });
    };
    const remove = event => {
        event.preventDefault();
        event.stopPropagation();
        inputRef.current.value = "";
        onChange({ target: { files: [] } });
    };
    return (
        <div onDrop={event => { event.preventDefault(); setIsDragging(false); if (!disabled) select(event.dataTransfer.files); }}
            onDragOver={event => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)}
            style={{ borderColor: isDragging ? "var(--secondary-2)" : undefined }}>
            <input ref={inputRef} type="file" accept={IMAGE_ACCEPT} name={pathname} aria-label={label} disabled={disabled}
                onChange={event => { select(event.target.files); event.target.value = ""; }}
                style={{ opacity: 0, pointerEvents: "auto", zIndex: 20, height: "100%", top: 0, margin: 0 }} />
            <Camera style={{ pointerEvents: "none" }} /><span style={{ pointerEvents: "none" }} />
            {preview && <img src={preview} alt={file.name} width={120} />}
            {file && <button type="button" onClick={remove} aria-label={"Remover " + label}
                style={{ position: "absolute", right: 10, top: 10, zIndex: 25, background: "var(--primary-2)",
                    border: "1px solid var(--secondary-5)", borderRadius: 6, color: "var(--secondary-2)", padding: 6, cursor: "pointer" }}>
                <X size={18} style={{ position: "static", width: 18, height: 18, transform: "none" }} />
            </button>}
        </div>
    );
}
