import { notification } from "antd";
import { BankStatement, BankVerifyClientSignature, ClientRequestSecureLink, ClientSendCertToGateway, ClientSendEncMess, ClientSendEndHandShakeMess, ClientVerify, ClientVerifyGateCertificate } from "../../Axios"
import { Client_Make_WIM_Do_Sym_Decryption, Client_Make_WIM_Do_Sym_Encryption } from "../WIM/Wim_action";

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

export const ClientAuthentication = async ({bankAccount, password}) => {
    return await ClientVerify({bankAccount: bankAccount, password: password})
        .then((response) => {
            return response.data
        }).catch((err) => {
            console.error(err.response.data);
            notification.error({
                message: "Bank connection state",
                description: `Failing while authentication client identity`,
            })
            return false;
        });
}

export const BankCheckClientSignature = async (signature) => {
    return await BankVerifyClientSignature(signature)
        .then((response) => {
            return response.data
        }).catch((err) => {
            console.error(err.response.data);
            return false;
        });
}

export const BankStatementAction = async () => {
    return await BankStatement()
        .then((response) => {
            if (response.data === null || response.data === "null") throw Error("Error while recieve bank statement"); 
            return response.data
        }).catch((err) => {
            console.error(err.response.data);
            return null;
        });
}

export const Communicate_through_enc_connection_mess = async (clientMess, sessionKeys, process) => {
    let clientWriteKey = sessionKeys.clientWriteKey64;
    let clientWriteMacKey = sessionKeys.clientWriteMacKey64;
    let serverWriteKey = sessionKeys.serverWriteKey64;
    let serverWriteMacKey = sessionKeys.serverWriteMacKey64;
    let SessionID = sessionKeys.sessionID;
    try {
        var clientMess_Enc = await Client_Make_WIM_Do_Sym_Encryption(clientMess, clientWriteKey, clientWriteMacKey);

        let Enc_server_mess = await ClientSendEncMess(clientMess_Enc, SessionID, process)
            .then((response) => {
                if (response.data == null || response.data == "null" || response.data == undefined) throw Error("Error while server replying, Try again later");
                return response.data
            }).catch((err) => {
                console.error(err.response.data);
                return null;
            });
        
        if(Enc_server_mess !== null) {
            let serverReply = await Client_Make_WIM_Do_Sym_Decryption(Enc_server_mess, serverWriteKey, serverWriteMacKey);
            return serverReply;
        }
        throw Error("Error while server replying, Try again later");
    } catch {
        // return "Error while transmiting message, pls try again";
        return null;
    }
}