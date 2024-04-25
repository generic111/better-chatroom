import CryptoJS from 'crypto-js';

export function encrypt(data, key) {
    const encJson = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    const encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
    return encData;
}

export function decrypt(data, key) {
    const decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    const bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
}