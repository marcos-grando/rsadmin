import React from "react";
import { updateWithPath } from "../utility/utility";
import { useMessage } from "../../../../utilities/contexts/ContextMessage";
import TheTitleLabel from "../TheTitleLabel";
import FileDropInput from "./file_wizard/FileDropInput";
import FilePreviewItem from "./file_wizard/FilePreviewItem";

function FileWizard({ formData, setFormData, the_label, the_pathFiles, the_pathInfos, isRequired, styles, alterProps }) {

    const { showMessage } = useMessage();

    const fileList = the_pathFiles.reduce((acc, key) => acc?.[key], formData) ?? [];
    const metaList = the_pathInfos.reduce((acc, key) => acc?.[key], formData) ?? [];

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        if (!newFiles.length) return;

        const totalFiles = fileList.length + newFiles.length;
        const ignored = Math.max(0, totalFiles - 10);

        // const updatedFiles = [...fileList, ...newFiles].slice(0, 10);
        const updatedFiles = [...fileList, ...newFiles.map((file) => ({ url: file, public_id: null }))].slice(0, 10);
        const updatedMeta = [...metaList, ...newFiles.map(() => ({ title: '', desc: '' }))].slice(0, 10);

        if (ignored > 0) {
            showMessage(
                "warning",
                (<>
                    <h2>Cuidado! Ultrapassou 10 arquivos.</h2>
                    <p>Você selecionou mais imagens do que o permitido.</p>
                    <p>Arquivo(s) ignorado(s): {ignored}</p>
                </>)
            );
        }

        updateWithPath(setFormData, the_pathFiles, () => updatedFiles);
        updateWithPath(setFormData, the_pathInfos, () => updatedMeta);
    };

    const blockMoreFile = fileList.length >= 10;

    const handleChangeMeta = (index, field, value) => {
        const updated = [...metaList];
        updated[index][field] = value;

        updateWithPath(setFormData, the_pathInfos, () => updated);
    };

    const handleRemove = (index) => {
        const updatedFiles = fileList.filter((_, i) => i !== index);
        const updatedMeta = metaList.filter((_, i) => i !== index);

        updateWithPath(setFormData, the_pathFiles, () => updatedFiles);
        updateWithPath(setFormData, the_pathInfos, () => updatedMeta);
    };

    return (
        <div className={styles.fileSection}>
            <div className={styles.fileDiv}>
                <TheTitleLabel
                    the_label={the_label}
                    isRequired={isRequired}
                    the_path={the_pathFiles}
                    alterProps={alterProps}
                />

                <FileDropInput
                    handleFiles={handleFiles}
                    isRequired={isRequired}
                    blockMoreFile={blockMoreFile}
                    styles={styles}
                />
                <h3 className={styles.fileQntd}>Máximo de arquivos: {fileList.length} / 10</h3>
            </div>

            <FilePreviewItem
                fileList={fileList}
                metaList={metaList}

                handleChangeMeta={handleChangeMeta}
                handleRemove={handleRemove}

                styles={styles}
            />
        </div>
    );
}

export default FileWizard;
