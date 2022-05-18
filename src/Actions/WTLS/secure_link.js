import { notification } from "antd";
import { ClientRequestSecureLink, ClientSendCertToGateway, ClientSendEndHandShakeMess, ClientVerifyGateCertificate } from "../../Axios"

export const RequestWTLSConnection = async (client_rand_string) => {
    return await ClientRequestSecureLink(client_rand_string)
                .then((response) => {
                    return response.data
                }).catch((err) => {
                    console.error(err);
                    return null;
                });
}

export const SendClientCertificate = async (client_cert) => {
    return await ClientSendCertToGateway(client_cert)
                .then((response) => {
                    return response.data
                }).catch((err) => {
                    console.error(err);
                    return null;
                });
}

export const VerifyGatewayCertificate = async (gate_cert) => {
    return await ClientVerifyGateCertificate(gate_cert)
                .then((response) => {
                    return response.data
                }).catch((err) => {
                    console.error(err);
                    return null;
                });
}

export const SendEndHandShake = async (cipherMess, plaintMess, SessionID) => {
    return await ClientSendEndHandShakeMess(cipherMess, plaintMess, SessionID)
                .then((response) => {
                    return response.data
                }).catch((err) => {
                    console.error(err.response.data);
                    notification.error({
                        message: "Bank connection state",
                        description: `${err.response.data.mess}`,
                    })
                    return null;
                });
}