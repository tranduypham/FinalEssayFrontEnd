import axios from "axios"
import { REQUEST_RAND_STRING } from "../Link/link"

export const GenRandomString = (length) => {
    return axios({
        url: REQUEST_RAND_STRING,
        method: "GET",
        params: {
            length: length
        }
    })
}