import axios from "axios"
import {
    CLIENT_SEND_MERCHANT_INVOICE
} from "../Link/link"

export const ClientSendMerchantPaymentInfo = (pi) => {
    console.log("link ",CLIENT_SEND_MERCHANT_INVOICE);
    return axios({
        url: CLIENT_SEND_MERCHANT_INVOICE,
        method: "POST",
        data: pi
    })
}
