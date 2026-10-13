import { X } from "lucide-react";
import useObjectURL from "../../../../../utilities/hooks/useObjectURL";

function Preview({ image, index, handleChangeMeta, handleRemove, styles }) {
    const preview = useObjectURL(image.url);
    return (
        <div className={styles.previewItem}>
            <div className={styles.previewImg}><img src={preview || undefined} alt={image.title || image.url.name} className={styles.imagePreview} /></div>
            <div className={styles.previewInfos}>
                <input type="text" aria-label={"Título da imagem " + (index + 1)} placeholder="Título" value={image.title || ""}
                    onChange={event => handleChangeMeta(index, "title", event.target.value)} />
                <textarea aria-label={"Descrição da imagem " + (index + 1)} placeholder="Descrição" value={image.desc || ""}
                    onChange={event => handleChangeMeta(index, "desc", event.target.value)} />
            </div>
            <button type="button" onClick={() => handleRemove(index)} aria-label={"Remover imagem " + (index + 1)}><X size={16} /></button>
        </div>
    );
}

export default function FilePreviewItem({ fileList, ...props }) {
    return fileList.length > 0 && <div className={props.styles.previewList}>
        {fileList.map((image, index) => <Preview key={image.id} image={image} index={index} {...props} />)}
    </div>;
}
