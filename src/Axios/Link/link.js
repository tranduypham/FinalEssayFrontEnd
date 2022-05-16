export const DEFAULT_LINK = process.env.REACT_APP_DEFAULT_LINK;
export const CLIENT_SEND_MERCHANT_INVOICE = `${DEFAULT_LINK}/Merchant/SendInvoice`;

// Encryption
export const ENCRYPT_DATA = `${DEFAULT_LINK}/Encryption/Encrypt`
export const DECRYPT_DATA = `${DEFAULT_LINK}/Encryption/Decrypt`
export const SIGN_DATA = `${DEFAULT_LINK}/Encryption/SignData`
export const PIN_VERIFYING = `${DEFAULT_LINK}/Wim/Pin_Verify`
export const GET_CLIENT_BANK_INFO = `${DEFAULT_LINK}/Wim/GetClientBankInfo`
// Certificate
export const GET_CERT = `${DEFAULT_LINK}/Certificate`
export const VERIFY_CERT = `${DEFAULT_LINK}/Certificate/Verify`

// WIM
export const REQUEST_RAND_STRING = `${DEFAULT_LINK}/Wim/Gen_Random_Num`
export const REQUEST_PRE_MASTER_SECRET = `${DEFAULT_LINK}/Wim/Pre_Master_secret`
export const REQUEST_MASTER_SECRET = `${DEFAULT_LINK}/Wim/Master_secret`
export const REQUEST_SESSION_KEYS = `${DEFAULT_LINK}/Wim/Session_Key`


// WTLS
export const CLIENT_REQUEST_SECURE_CONNECTION = `${DEFAULT_LINK}/Gateway/RequestWTLS`
export const CLIENT_SEND_GATE_CLIENT_CERT = `${DEFAULT_LINK}/Gateway/RecieveClientCert`
export const CLIENT_VERIFY_GATE_CERT = `${DEFAULT_LINK}/Gateway/VerifyGateCert`