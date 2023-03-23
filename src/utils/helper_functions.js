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

export function changeObjectKeysNaming(obj, converter) {
    const snakeObj = {};
    for (let key in obj) {
        const snakeKey = converter(key);
        snakeObj[snakeKey] = obj[key];
    }
    return snakeObj;
}

export function formatDate(date, format) {
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

