const isUNIXFormat = (str) => {
    return Boolean(Number(str));
}

const convertUTCToUnix = (str) => {
    return Math.floor((new Date(str)).getTime());
}


const convertToUTC = (str) => {
    return new Date(str).toGMTString();
}

const convertUnixToUTC = (str) => {
  return convertToUTC(Number(str));
}

const isInvalidTime = (date) => {
  return new Date(date).toString() === "Invalid Date";
}

const getCurrentTime = () => {
  const date = new Date();
  const utc = date.toGMTString();
  const unix = date.getTime();
  return { unix, utc  }
}

module.exports = {
    isUNIXFormat,
    convertUTCToUnix,
    convertToUTC,
    isInvalidTime,
    getCurrentTime,
    convertUnixToUTC
}