import React from "react";
import { X as IconRemove } from "lucide-react";

function FilePreviewItem({ fileList, handleChangeMeta, handleRemove, styles }) {

    const getSrc = (item) => {
        if (!item?.url) return '';
        return item.url instanceof File ? URL.createObjectURL(item.url) : item.url;
    };

    return (
        <>
            {fileList.length > 0 && (
                <div className={styles.previewList}>
                    {fileList.map((objFile, i) => (
                        <div key={i} className={styles.previewItem}>
                            <div className={styles.previewImg}>
                                <img
                                    src={getSrc(objFile)}
                                    alt={`Preview imagem de: "${objFile?.title || 'Sem título definido'}"`}
                                    className={styles.imagePreview}
                                />
                            </div>
                            <div className={styles.previewInfos}>
                                <input
                                    type="text"
                                    placeholder="Título"
                                    value={objFile?.title || ''}
                                    onChange={e => handleChangeMeta(i, 'title', e.target.value)}
                                />
                                <textarea
                                    placeholder="Descrição"
                                    value={objFile?.desc || ''}
                                    onChange={e => handleChangeMeta(i, 'desc', e.target.value)}
                                />
                            </div>
                            <button type="button" onClick={() => handleRemove(i)} aria-label="Remover imagem">
                                <IconRemove size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default FilePreviewItem;
