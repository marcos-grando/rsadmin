import { updateWithPath } from "../utility/utility";
import { useMessage } from "../../../../utilities/contexts/ContextMessage";
import { imageError, MAX_GALLERY_IMAGES } from "../../../../utilities/util/simulatorModel";
import TheTitleLabel from "../TheTitleLabel";
import FileDropInput from "./file_wizard/FileDropInput";
import FilePreviewItem from "./file_wizard/FilePreviewItem";

export default function FileWizard({ formData, setFormData, the_label, the_path, isRequired, styles, alterProps }) {
    const { showMessage } = useMessage();
    const fileList = the_path.reduce((acc, key) => acc?.[key], formData) ?? [];
    const handleFiles = event => {
        const files = Array.from(event.target.files ?? []);
        const valid = files.filter(file => !imageError(file));
        if (valid.length !== files.length) showMessage("warning", <p>Arquivos inválidos ignorados. Use JPEG, PNG, WebP, GIF ou AVIF de até 10 MB.</p>);
        const available = MAX_GALLERY_IMAGES - fileList.length;
        if (valid.length > available) showMessage("warning", <p>Máximo de 20 imagens por galeria. Os arquivos excedentes foram ignorados.</p>);
        updateWithPath(setFormData, the_path, current => [...current,
            ...valid.slice(0, available).map(file => ({ id: crypto.randomUUID(), url: file, title: "", desc: "" }))]);
        if (event.target instanceof HTMLInputElement) event.target.value = "";
    };
    const handleChangeMeta = (index, field, value) => updateWithPath(setFormData, the_path,
        current => current.map((image, i) => i === index ? { ...image, [field]: value } : image));
    const handleRemove = index => updateWithPath(setFormData, the_path, current => current.filter((_, i) => i !== index));
    return (
        <div className={styles.fileSection}>
            <div className={styles.fileDiv}>
                <TheTitleLabel the_label={the_label} isRequired={isRequired} the_path={the_path} alterProps={alterProps} />
                <FileDropInput handleFiles={handleFiles} isRequired={isRequired} label={the_label}
                    blockMoreFile={fileList.length >= MAX_GALLERY_IMAGES} styles={styles} />
                <h3 className={styles.fileQntd}>Máximo de arquivos: {fileList.length} / 20 · até 10 MB por imagem</h3>
            </div>
            <FilePreviewItem fileList={fileList} handleChangeMeta={handleChangeMeta} handleRemove={handleRemove} styles={styles} />
        </div>
    );
}
