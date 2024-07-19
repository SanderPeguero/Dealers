

export const validateCarSaleDatos = (data) => {
    for (const section in data) {
        for (const key in data[section]) {
            if (typeof data[section][key] === 'object' && key !== 'Otros') {
                if (!validateCarSaleDatos({ [key]: data[section][key] })) {
                    return false;
                }
            } else if (data[section][key] === "") {
                return false;
            }
        }
    }
    return true;
}


