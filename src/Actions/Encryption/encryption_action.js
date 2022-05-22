import { VerifyDataSignature } from "../../Axios";
import { Decryption, Encryption, SignatureCreation } from "../../Helper";

export const EncryptData = (keyName, data, usePrivate) => {
    return Encryption(keyName, data, usePrivate);
}

export const DecryptData = async (keyName, data, usePublic) => {
    return await Decryption(keyName, data, usePublic);
}

export const Signature = async (keyName, data) => {
    return await SignatureCreation(keyName, data);
}

export const VerifySignature = async (keyName, data, signature) => {
    return await VerifyDataSignature(keyName, data, signature);
}