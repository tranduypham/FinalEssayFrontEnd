export const DEFAULT_LINK = process.env.REACT_APP_DEFAULT_LINK;
export const CLIENT_SEND_MERCHANT_INVOICE = `${DEFAULT_LINK}/Merchant/SendInvoice`;
export const DECRYPT_BANKING_INFO = `${DEFAULT_LINK}/Merchant/Try_Decrypt_Banking_Info`;
export const DECRYPT_TOOLONG_INFO = `${DEFAULT_LINK}/Merchant/Try_Decrypt_Too_Long_Info`;

// Encryption
export const ENCRYPT_DATA = `${DEFAULT_LINK}/Encryption/Encrypt`
export const DECRYPT_DATA = `${DEFAULT_LINK}/Encryption/Decrypt`
export const SIGN_DATA = `${DEFAULT_LINK}/Encryption/SignData`
export const VERIFY_DATA_SIGNATURE = `${DEFAULT_LINK}/Encryption/Verify`
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
export const SYM_CREATE_ENCRYPT_MESS = `${DEFAULT_LINK}/Wim/SymEncrypt`
export const SYM_DECRYPT_CIPHER_MESS = `${DEFAULT_LINK}/Wim/SymDecrypt`


// WTLS
export const CLIENT_REQUEST_SECURE_CONNECTION = `${DEFAULT_LINK}/Gateway/RequestWTLS`
export const CLIENT_SEND_GATE_CLIENT_CERT = `${DEFAULT_LINK}/Gateway/RecieveClientCert`
export const CLIENT_VERIFY_GATE_CERT = `${DEFAULT_LINK}/Gateway/VerifyGateCert`
export const CLIENT_END_HANDSHAKE = `${DEFAULT_LINK}/Gateway/End_Handshake_message`
export const CLIENT_SEND_ENC_MESS = `${DEFAULT_LINK}/Gateway/Secure_Link_Communicatioin`
export const CLIENT_VERIFY = `${DEFAULT_LINK}/Gateway/Verify_client`
export const BANK_VERIFY_CLIENT_SIGNATURE = `${DEFAULT_LINK}/Gateway/Verify_client_signature`
export const BANK_STATEMENT = `${DEFAULT_LINK}/ClientBank/account_state`