import React, { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

// xHover => Estilo Hover inline; E desativar o input (o click tava limpando file e tbm clicando para novo file junto);
// inputRef => file preview carregado é o próprio "value", para limpar "value" é necessário acessar o DOM com 'useRef';
function FileUnique({ file, pathname, onChange, ...props }) {
    const [isDragging, setIsDragging] = useState(false);
    const [xHover, setXHover] = useState(false);
    const inputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const event = { target: { files: droppedFiles } };
            onChange && onChange(event);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleRemoveFile = () => {
        if (inputRef.current) inputRef.current.value = "";

        const event = { target: { files: [] } };
        onChange && onChange(event);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{ border: isDragging ? "1px solid var(--secondary-4)" : "" }}
        >
            {!xHover &&
                <input
                    type="file" accept="image/*"
                    onChange={onChange}
                    name={pathname} {...props}
                    required={false}
                    style={{ opacity: '0' }}
                    id="file-input"
                />
            }

            <Camera />
            <span></span>
            {file && (
                <img
                    src={file instanceof File ? URL.createObjectURL(file) : file}
                    alt="preview"
                    width={120}
                />
            )}

            <X onClick={handleRemoveFile}
                onMouseLeave={() => setXHover(false)}
                onMouseEnter={() => setXHover(true)}
                style={{
                    backgroundColor: xHover ? "var(--primary-2)" : "var(--terciary-2)",
                    borderRadius: "50px",
                    padding: "3px",
                    position: "absolute",
                    right: "1rem", top: "2.5rem",
                    transform: "none",
                    cursor: "pointer",
                    zIndex: "999"
                }}
            />
        </div>
    );
}

export default FileUnique;
