import { ClientRequestSecureLink, ClientSendCertToGateway, ClientVerifyGateCertificate } from "../../Axios"

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