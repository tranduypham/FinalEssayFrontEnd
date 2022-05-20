import axios from "axios"
import {
    CLIENT_SEND_MERCHANT_INVOICE, DECRYPT_BANKING_INFO, GET_CLIENT_BANK_INFO, PIN_VERIFYING
} from "../Link/link"

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

export const GetClientBankInformation = ({ pin, bankAccount }) => {
    console.log(pin, bankAccount);
    return axios({
        url: GET_CLIENT_BANK_INFO,
        method: "POST",
        params: {
            bankAccount: bankAccount
        },
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
