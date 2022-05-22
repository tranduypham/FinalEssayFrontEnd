import axios from "axios"
import {
    CLIENT_SEND_MERCHANT_INVOICE, DECRYPT_DATA, ENCRYPT_DATA, SIGN_DATA, VERIFY_DATA_SIGNATURE
} from "../Link/link"

export const EncryptData = (keyName, data, usePrivate) => {
    return axios({
        url: ENCRYPT_DATA,
        params:{
            KeyName: keyName,
            data: data,
            usePrivate: usePrivate
        },
        method: "POST"
    })
}

export const DecryptData = (keyName, data, usePrivate) => {
    return axios({
        url: DECRYPT_DATA,
        params:{
            KeyName: keyName,
            data: data,
            usePrivate: usePrivate
        },
        method: "POST"
    })
}

export const SignData = (keyName, data) => {
    return axios({
        url: SIGN_DATA,
        params:{
            KeyName: keyName,
            data: data
        },
        method: "POST"
    })
}

export const VerifyDataSignature = (keyName, data, signature) => {
    return axios({
        url: VERIFY_DATA_SIGNATURE,
        data:{
            keyName: keyName,
            dataRaw: data,
            signatureBase64: signature
        },
        method: "POST"
    })
}
