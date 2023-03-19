export const convertTime = (time) => {
    const date = new Date(time * 1000);
    return date.getDate() + "." + date.getMonth() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};
export const convertText = (text) => {
    return {__html: text};
};