export const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return { ...acc, ...flattenObject(value, newKey) };
        }
        
        acc[newKey] = value;
        return acc;
    }, {});
};