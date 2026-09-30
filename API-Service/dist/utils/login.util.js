"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptDES = encryptDES;
const CryptoJS = require("crypto-js");
function encryptDES(plain, keyStr = 'jMVCBsFGDQr1USHo') {
    const t = CryptoJS.enc.Utf8.parse(keyStr);
    const encrypted = CryptoJS.DES.encrypt(plain, t, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
//# sourceMappingURL=login.util.js.map