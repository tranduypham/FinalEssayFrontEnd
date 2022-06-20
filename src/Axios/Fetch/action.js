import axios from "axios"
import {
    CLIENT_SEND_MERCHANT_INVOICE, CLIENT_VERIFIED, DECRYPT_BANKING_INFO, DECRYPT_TOOLONG_INFO, GET_CLIENT_BANK_INFO, PIN_VERIFYING
} from "../Link/link"

export const ClientVerifiedItSelf = (pin) => {
    // console.log("link ",CLIENT_SEND_MERCHANT_INVOICE);
    return axios({
        url: CLIENT_VERIFIED,
        method: "POST",
        data: {
            pin: pin
        }
    })
}

export const ClientSendMerchantPaymentInfo = (pi) => {
    // console.log("link ",CLIENT_SEND_MERCHANT_INVOICE);
    return axios({
        url: CLIENT_SEND_MERCHANT_INVOICE,
        method: "POST",
        data: pi
    })
}

export const VerifyClientPinCode = ({ pin }) => {
    return axios({
        url: PIN_VERIFYING,
        method: "POST",
        data: {
            pin: pin
        }
    })
}

export const GetClientBankInformation = ({ pin }) => {
    console.log(pin);
    return axios({
        url: GET_CLIENT_BANK_INFO,
        method: "POST",
        data: {
            pin: pin
        }
    })
}

export const DecryptBankInformation = ({ bankInfo }) => {
    return axios({
        url: DECRYPT_BANKING_INFO,
        method: "POST",
        headers: {
            encBankInfo:  `${bankInfo}`
        }
    })
}

export const DecryptPaymentInfoSignatureInformation = ({ siagnature }) => {
    return axios({
        url: DECRYPT_TOOLONG_INFO,
        method: "POST",
        headers: {
            encTooLongInfo:  `${siagnature}`
        }
    })
}
