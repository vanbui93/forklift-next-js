export const truncateText = (str) => {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
}
