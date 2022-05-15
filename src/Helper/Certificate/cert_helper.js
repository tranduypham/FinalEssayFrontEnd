import { GetCert, VerifyCert } from "../../Axios"

export const GetCertHelper = async ({ keyName, rawCert }) => {
    const result = await GetCert({ keyName, rawCert })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(err.response);
            return null;
        })
    return result;
}

export const VerifyCertHelper = async ({ keyName, rawCert }) => {
    const result = await VerifyCert({ keyName, rawCert })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(err.response);
            return null;
        })
    return result;
}