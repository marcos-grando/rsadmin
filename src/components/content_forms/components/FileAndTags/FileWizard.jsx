import React from "react";
import { updateWithPath } from "../utility/utility";
import { useMessage } from "../../../../utilities/contexts/ContextMessage";
import TheTitleLabel from "../TheTitleLabel";
import FileDropInput from "./file_wizard/FileDropInput";
import FilePreviewItem from "./file_wizard/FilePreviewItem";

function FileWizard({ formData, setFormData, the_label, the_path, isRequired, styles, alterProps }) {

    const { showMessage } = useMessage();

    const fileList = the_path.reduce((acc, key) => acc?.[key], formData) ?? [];

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        if (!newFiles.length) return;

        const totalFiles = fileList.length + newFiles.length;
        const ignored = Math.max(0, totalFiles - 20);

        const updatedFiles = [...fileList, ...newFiles.map((file) => ({ url: file, public_id: null, title: "", desc: "" }))].slice(0, 20);

        if (ignored > 0) {
            showMessage(
                "warning",
                (<>
                    <h2>Cuidado! Ultrapassou 20 arquivos.</h2>
                    <p>Você selecionou mais imagens do que o permitido.</p>
                    <p>Arquivo(s) ignorado(s): {ignored}</p>
                </>)
            );
        }

        updateWithPath(setFormData, the_path, () => updatedFiles);
    };

    const blockMoreFile = fileList.length >= 20;

    const handleChangeMeta = (index, field, value) => {
        const updated = [...fileList];
        updated[index][field] = value;

        updateWithPath(setFormData, the_path, () => updated);
    };

    const handleRemove = (index) => {

        const updatedFiles = fileList.map((each, i) => {
            if (i === index) {
                return { ...each, url: undefined }
            };
            return { ...each };
        });

        updateWithPath(setFormData, the_path, () => updatedFiles);
    };

    return (
        <div className={styles.fileSection}>
            <div className={styles.fileDiv}>
                <TheTitleLabel
                    the_label={the_label}
                    isRequired={isRequired}
                    the_path={the_path}
                    alterProps={alterProps}
                />

                <FileDropInput
                    handleFiles={handleFiles}
                    isRequired={isRequired}
                    blockMoreFile={blockMoreFile}
                    styles={styles}
                />
                <h3 className={styles.fileQntd}>Máximo de arquivos: {fileList.length} / 20</h3>
            </div>

            <FilePreviewItem
                fileList={fileList}

                handleChangeMeta={handleChangeMeta}
                handleRemove={handleRemove}

                styles={styles}
            />
        </div>
    );
}

export default FileWizard;
