import dayjs from "dayjs";

function isExpired(expirationDate) {
  return dayjs().isAfter(dayjs(expirationDate));
}

function isValid(couponCode) {
    return couponCode.length === 36;
}

export {
    isExpired,
    isValid,
}

