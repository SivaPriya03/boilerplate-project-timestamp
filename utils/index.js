const isUTCFormat = (str) => {
    return str.indexOf('-') !== -1;
}

const convertUTCToUnix = (str) => {
    return Math.floor((new Date(str)).getTime());
}

const convertUnixToUTC = (str) => {
    return new Date(Number(str)).toGMTString();
}

module.exports = {
    isUTCFormat,
    convertUTCToUnix,
    convertUnixToUTC
}