import axios from "axios"
import { CLIENT_REQUEST_SECURE_CONNECTION } from "../Link/link"

export const ClientRequestSecureLink = () => {
    return axios({
        url: CLIENT_REQUEST_SECURE_CONNECTION,
        method: "GET"
    })
}