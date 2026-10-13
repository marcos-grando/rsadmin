// Copia apenas os ancestrais alterados, preservando a identidade dos arquivos de prévia.
export function updateWithPath(setFormData, path, fnOrValue) {
    setFormData(previous => {
        const update = (object, depth) => {
            const key = path[depth];
            const value = depth === path.length - 1
                ? (typeof fnOrValue === "function" ? fnOrValue(object?.[key] ?? []) : fnOrValue)
                : update(object?.[key] ?? {}, depth + 1);
            return { ...object, [key]: value };
        };
        return update(previous, 0);
    });
}
