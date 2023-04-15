export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelCaseTextToNormalText(camelCaseString) {
    return camelCaseString
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase()).join(' ');
}

export function camelCaseTextToSnakeCase(camelCaseString) {
    return camelCaseString
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase()).join('_');
}

export function snakeCaseToCamelCase(snakeCaseString) {
    return snakeCaseString
        .split('_')
        .map((word, i) => i === 0 ? word : capitalize(word)).join('');
}


export function changeObjectKeysNaming(obj, converter) {
    const convertedObj = {};
    for (let key in obj) {
        const convertedKey = converter(key);
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            convertedObj[convertedKey] = changeObjectKeysNaming(obj[key], converter);
        } else {
            convertedObj[convertedKey] = obj[key];
        }
    }
    return Object.entries(convertedObj).length === 0 ? obj : convertedObj;
}


export function dateToString(date, format) {
    if (!date) {
        return
    }
    let day = String(date.getDate());
    day = day.length > 1 ? day : '0' + day;

    let month = String(date.getMonth() + 1);
    month = month.length > 1 ? month : '0' + month;

    let year = String(date.getFullYear());

    let result = format.toLowerCase()
        .replaceAll("dd", day)
        .replaceAll("mm", month)
        .replaceAll("yyyy", year)
    return result
}

export function stringToDate(string, format) {
    format = format.toLowerCase();
    let day = string.substring(format.indexOf('dd'), format.indexOf('dd') + 2);
    let month = string.substring(format.indexOf('mm'), format.indexOf('mm') + 2);
    let year = string.substring(format.indexOf('yyyy'), format.indexOf('yyyy') + 4);
    return new Date(year, month - 1, day);
}

export function createAsideLink(name, link) {
    return {name: name, link: link}
}

export function createErrorOptions(name) {
    return {errorMessage: `${name} is required`}
}
