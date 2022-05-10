import { DecryptData, EncryptData, SignData } from "../../Axios";

export const Encryption = (keyName, data, usePrivate) => {

    if (usePrivate === null || usePrivate === "" || usePrivate === undefined) usePrivate = false;
    EncryptData(keyName, data, usePrivate)
    .then((response) => {
        console.log(response.data)
        return response.data.dataBase64;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

export const Decryption = async (keyName, data, usePublic) => {
    if (usePublic === null || usePublic === "" || usePublic === undefined) usePublic = false;
    return await DecryptData(keyName, data, usePublic)
    .then((response) => {
        console.log(response.data)
        return response.data.dataBase64;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

export const SignatureCreation = async (keyName, data) => {
    return await SignData(keyName, data)
    .then((response) => {
        console.log(response.data);
        return response.data.digitalSignatureBase64;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}