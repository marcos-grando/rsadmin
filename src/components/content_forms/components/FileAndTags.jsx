import React from "react";
import FileWizard from "./FileAndTags/FileWizard";
import TagsWizard from "./FileAndTags/TagsWizard";

function FileAndTags({ formData, setFormData, currentInfos, setCurrentInfos, THE_STAP, styles, alterProps }) {

    // currentInfos => ...
    // => useState que armazena a tag enquanto escrita;
    // => Ao ser enviado, o State é limpo para escrever uma nova tag;

    return (
        <div className={`step ${styles?.fileAndTags}`}>
            <TagsWizard
                formData={formData}
                setFormData={setFormData}

                currentInfos={currentInfos}
                setCurrentInfos={setCurrentInfos}

                the_label={THE_STAP.tags.the_label}
                the_path={THE_STAP.tags.the_path}
                the_placeholder={THE_STAP.tags.the_placeholder}
                isRequired={THE_STAP.tags.isRequired}

                styles={styles}
                alterProps={alterProps}
            />

            <FileWizard
                formData={formData}
                setFormData={setFormData}

                the_label={THE_STAP.file.the_label}
                the_path={THE_STAP.file.the_path}
                isRequired={THE_STAP.file.isRequired}

                styles={styles}
                alterProps={alterProps}
            />
        </div>
    );
}

export default FileAndTags;
