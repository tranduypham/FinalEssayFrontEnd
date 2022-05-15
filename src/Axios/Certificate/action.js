import axios from "axios"
import { GET_CERT, VERIFY_CERT } from "../Link/link"

export const GetCert = ({ keyName, rawCert }) => {
    return axios({
        url: GET_CERT,
        method: "POST",
        data: {
            keyName: `${keyName}`,
            rawDataBase64: `${rawCert}`
        }
    })
}

export const VerifyCert = ({ keyName, rawCert }) => {
    return axios({
        url: VERIFY_CERT,
        method: "POST",
        data: {
            keyName: `${keyName}`,
            rawDataBase64: `${rawCert}`
        }
    })
}