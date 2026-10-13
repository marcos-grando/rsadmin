import { IMAGE_ACCEPT } from "../../../../../utilities/util/simulatorModel";
import { Upload as IconUpload } from "lucide-react";

function FileDropInput({ handleFiles, isRequired, blockMoreFile, styles, label }) {
    const handleDrop = (e) => {
        e.preventDefault();
        
        const droppedFiles = e.dataTransfer.files;
        if (!blockMoreFile && droppedFiles && droppedFiles.length > 0) {
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
                accept={IMAGE_ACCEPT}
                aria-label={label}
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
