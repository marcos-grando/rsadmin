import { updateWithPath } from "./utility/utility";
import CustomSelect from "./TypesInputs/CustomSelect";
import FileUnique from "./TypesInputs/FileUnique";

export default function TypesInputs({ formData, setFormData, ...each }) {
    const { the_type, the_path, the_opts, inputProps: getInputProps, the_label } = each;
    const updateFunc = value => updateWithPath(setFormData, the_path, value);
    const props = typeof getInputProps === "function" ? getInputProps(formData, updateFunc) : {};
    const name = the_path.join(".");
    if (the_type === "select") return <CustomSelect {...props} pathname={name} label={the_label} options={the_opts} />;
    if (the_type === "file_unique") return <FileUnique file={the_path.reduce((o, k) => o?.[k], formData)}
        pathname={name} label={the_label} {...props} />;
    return <input type={the_type} id={name} name={name} aria-label={the_label} {...props} />;
}
