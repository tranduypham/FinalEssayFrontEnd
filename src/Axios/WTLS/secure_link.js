import axios from "axios"
import { CLIENT_END_HANDSHAKE, CLIENT_REQUEST_SECURE_CONNECTION, CLIENT_SEND_ENC_MESS, CLIENT_SEND_GATE_CERT, CLIENT_SEND_GATE_CLIENT_CERT, CLIENT_VERIFY_GATE_CERT } from "../Link/link"

export const ClientRequestSecureLink = (client_rand_string) => {
    return axios({
        url: CLIENT_REQUEST_SECURE_CONNECTION,
        method: "GET",
        params: {
            clientRand: client_rand_string
        }
    })
}

export const ClientSendCertToGateway = (ClientCertificate) => {
    return axios({
        url: CLIENT_SEND_GATE_CLIENT_CERT,
        method: "POST",
        params: {
            RawCert: ClientCertificate
        }
    })
}

export const ClientVerifyGateCertificate = (GateCertificate) => {
    return axios({
        url: CLIENT_VERIFY_GATE_CERT,
        method: "POST",
        params: {
            RawCert: GateCertificate
        }
    })
}

export const ClientSendEndHandShakeMess = (cipherMess, plaintMess, SessionID) => {
    return axios({
        url: CLIENT_END_HANDSHAKE,
        method: "POST",
        params: {
            cipherMess: cipherMess,
            plainMess: plaintMess
        },
        headers: {
            SessionID: SessionID
        }
    })
}

export const ClientSendEncMess = (cipherMess, SessionID, process) => {
    return axios({
        url: CLIENT_SEND_ENC_MESS,
        method: "POST",
        params: {
            cipherMess: cipherMess,
        },
        headers: {
            SessionID: SessionID,
            Process: process
        }
    })
}