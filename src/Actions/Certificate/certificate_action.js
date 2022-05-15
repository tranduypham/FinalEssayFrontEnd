import { GetCertHelper, VerifyCertHelper } from "../../Helper"

export const GetCertificate = async ({keyName, rawCert}) => {
    return await GetCertHelper({keyName, rawCert});
}

export const VerifyCertificate = async ({keyName, rawCert}) => {
    return await VerifyCertHelper({keyName, rawCert});
}