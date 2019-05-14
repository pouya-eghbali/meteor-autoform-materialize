
export const flattenSchema = function (schema) {
    let flatSchema = Object.assign({}, schema);
    Object.keys(schema).forEach(function (key) {
        let value = schema[key];
        let type = value.type;
        if (type.singleType._schema) {
            let _schema = flattenSchema(type.singleType._schema);
            Object.keys(_schema).forEach(function (key2) {
                flatSchema[`${key}.${key2}`] = _schema[key2];
            })
        }
    })
    return flatSchema;
}