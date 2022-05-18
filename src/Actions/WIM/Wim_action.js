import { GenRandomString, Request_Master_Secret, Request_Pre_Master_Secret, Request_Session_Keys, Sym_Dec_Mess, Sym_Enc_Mess } from "../../Axios"

export const Client_Request_Rand_String_For_Pre_Master_Secret = async () => {
    return await GenRandomString(20)
        .then(res => {
            return res.data
        }).catch(err => {
            throw Error("Can not return a Random String");
            return null;
        })
}

export const Client_Request_Pre_Master_Secret_From_WIM = async () => {
    return await Request_Pre_Master_Secret()
        .then(res => {
            return res.data
        }).catch(err => {
            throw Error("Can not return pre master secret");
            return null;
        })
}

export const Client_Request_Master_Secret_using_Pre_Master_And_Rand_string = async (pre_master, randClient, randGateway) => {
    return await Request_Master_Secret(pre_master, randClient, randGateway)
        .then(res => {
            return res.data
        }).catch(err => {
            throw Error("Can not return master secret");
            return null;
        })
}

export const Client_Request_Session_Keys_using_Master_And_Rand_string = async (master, randClient, randGateway) => {
    return await Request_Session_Keys(master, randClient, randGateway)
        .then(res => {
            return res.data
        }).catch(err => {
            throw Error("Can not return session keys");
            return null;
        })
}

export const Client_Make_WIM_Do_Sym_Encryption = async (plaintText, clientWriteKey, clientWriteMacKey) => {
    return await Sym_Enc_Mess(plaintText, clientWriteKey, clientWriteMacKey)
        .then(res => {
            return res.data
        }).catch(err => {
            throw Error("Can not symetric encrypt the mess ");
            return null;
        })
}

export const Client_Make_WIM_Do_Sym_Decryption = async (cipherText, serverWriteKey, serverWriteMacKey) => {
    return await Sym_Dec_Mess(cipherText, serverWriteKey, serverWriteMacKey)
        .then(res => {
            return res.data
        }).catch(err => {
            throw Error("Can not symetric encrypt the mess ");
            return null;
        })
}