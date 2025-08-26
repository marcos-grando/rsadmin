import React from "react";
import { X as IconRemove } from "lucide-react";
import { updateWithPath } from "../utility/utility";
import TheTitleLabel from "../TheTitleLabel";

function TagsWizard({ formData, setFormData, currentInfos, setCurrentInfos, the_label, the_path, the_placeholder, isRequired, styles, alterProps }) {

    const handleAddInfo = () => {
        const tag = currentInfos.trim();
        if (!tag) return;
        // setFormData(f => ({ ...f, extradb: { ...f.extradb, [the_columnInfo]: [...f.extradb?.[the_columnInfo], tag] } }));
        updateWithPath(setFormData, the_path, arr => [...arr, tag]);
        setCurrentInfos('');
    };
    const handleRemoveInfo = idx => {
        // setFormData(f => ({ ...f, extradb: { ...f.extradb, [the_columnInfo]: f.extradb?.[the_columnInfo].filter((_, i) => i !== idx) } }));
        updateWithPath(setFormData, the_path, arr => arr.filter((_, i) => i !== idx));
    };
    const tagsList = the_path.reduce((acc, key) => acc?.[key], formData) ?? [];

    return (
        <div className={styles.tagsSection}>

            <div className={styles.tagsDiv}>
                <TheTitleLabel
                    the_label={the_label}
                    isRequired={isRequired}
                    the_path={the_path}
                    alterProps={alterProps}
                />
                <div className={styles.inputTags}>
                    <input
                        type="text"
                        value={currentInfos}
                        placeholder={the_placeholder}
                        onChange={e => setCurrentInfos(e.target.value)}
                        required={isRequired}
                    />
                    <button type="button" onClick={handleAddInfo}>Adicionar Característica</button>
                </div>
            </div>
            <div className={styles.tags}>
                {tagsList && tagsList.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                        <p>{tag}</p>
                        <button
                            type="button"
                            className={styles.removeTag}
                            onClick={() => handleRemoveInfo(i)}
                        >
                            <IconRemove />
                        </button>
                    </span>
                ))}
            </div>


        </div>
    );
}

export default TagsWizard;
