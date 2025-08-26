import React from "react";
import { updateWithPath } from "./utility/utility";
import CustomSelect from "./TypesInputs/CustomSelect";
import FileUnique from "./TypesInputs/FileUnique";

function TypesInputs({ formData, setFormData, ...each }) {

    const { the_type, the_path, the_opts, inputProps: getInputProps } = each;

    // Atualiza formData no key correta usando "the_path" definido em fieldTitleForms.js;
    const updateFunc = val => updateWithPath(setFormData, the_path, val);

    // Garante que o inputProps definido em fieldTitleForms.js seja uma função;
    const props = typeof getInputProps === 'function' ? getInputProps(formData, updateFunc) : {};

    switch (the_type) {

        case 'select':
            return <CustomSelect {...props} options={the_opts} />;

        case 'file_unique':
            const file = the_path.reduce((o, k) => o?.[k], formData);
            return <FileUnique file={file} pathname={the_path.at(-1)} {...props} />;

        default:
            return <input type={the_type} {...props} />;
    };
};

export default TypesInputs;
