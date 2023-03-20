export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function camelCaseTextToNormalText(camelCaseString) {
    return camelCaseString
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase()).join(" ");
}