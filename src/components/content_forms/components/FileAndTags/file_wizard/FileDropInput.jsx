import React from "react";
import { Upload as IconUpload } from "lucide-react";

function FileDropInput({ handleFiles, isRequired, blockMoreFile, styles }) {
    const handleDrop = (e) => {
        e.preventDefault();
        
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            handleFiles({ target: { files: droppedFiles } });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className={`${styles.fileInput} ${blockMoreFile ? styles.disabled : ""}`} onDrop={handleDrop} onDragOver={handleDragOver}>
            <input
                type="file"
                accept="image/*"
                multiple
                disabled={blockMoreFile}
                required={isRequired}
                onChange={handleFiles}
            />
            <IconUpload />
            <span></span>
        </div>
    );
}

export default FileDropInput;
