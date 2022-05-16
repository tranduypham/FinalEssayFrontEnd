import axios from "axios"
import { REQUEST_MASTER_SECRET, REQUEST_PRE_MASTER_SECRET, REQUEST_RAND_STRING, REQUEST_SESSION_KEYS } from "../Link/link"

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