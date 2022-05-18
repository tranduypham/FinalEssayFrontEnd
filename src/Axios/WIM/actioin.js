import axios from "axios"
import { REQUEST_MASTER_SECRET, REQUEST_PRE_MASTER_SECRET, REQUEST_RAND_STRING, REQUEST_SESSION_KEYS, SYM_CREATE_ENCRYPT_MESS, SYM_DECRYPT_CIPHER_MESS } from "../Link/link"

export const GenRandomString = (length) => {
    return axios({
        url: REQUEST_RAND_STRING,
        method: "GET",
        params: {
            length: length
        }
    })
}

export const Request_Pre_Master_Secret = () => {
    return axios({
        url: REQUEST_PRE_MASTER_SECRET,
        method: "GET"
    })
}

export const Request_Master_Secret = (pre_master, rand1, rand2) => {
    let rand = `${rand1}` + `${rand2}`;
    return axios({
        url: REQUEST_MASTER_SECRET,
        method: "GET",
        params: {
            Pre_Master_Secret: pre_master,
            RandString: rand
        }
    })
}

export const Request_Session_Keys = (master, rand1, rand2) => {
    let rand = `${rand1}` + `${rand2}`;
    return axios({
        url: REQUEST_SESSION_KEYS,
        method: "GET",
        params: {
            Master_Secret: master,
            RandString: rand
        }
    })
}

export const Sym_Enc_Mess = (plaintText, clientWriteKey, clientWriteMacKey) => {
    return axios({
        url: SYM_CREATE_ENCRYPT_MESS,
        method: "POST",
        params: {
            plaintext: plaintText
        },
        data: {
            passwordBase64: `${clientWriteKey}`,
            authPasswordBase64: `${clientWriteMacKey}`
        }
    })
}

export const Sym_Dec_Mess = (cipherText, clientWriteKey, clientWriteMacKey) => {
    return axios({
        url: SYM_DECRYPT_CIPHER_MESS,
        method: "POST",
        data: {
            passwordBase64: `${clientWriteKey}`,
            authPasswordBase64: `${clientWriteMacKey}`
        },
        params: {
            cipher: cipherText
        },
    })
}