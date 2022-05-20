import { BankOutlined } from "@ant-design/icons";
import { Card, Modal, notification, Typography } from "antd";

import { useContext, useEffect, useState } from "react";
import { ClearCart, GetProductName, Signature, GetCertificate, RequestWTLSConnection, SendClientCertificate, VerifyGatewayCertificate, Client_Request_Pre_Master_Secret_From_WIM, Client_Request_Master_Secret_using_Pre_Master_And_Rand_string, Client_Request_Session_Keys_using_Master_And_Rand_string, Client_Make_WIM_Do_Sym_Encryption, SendEndHandShake, Client_Make_WIM_Do_Sym_Decryption, Client_Request_Rand_String_For_Pre_Master_Secret, Communicate_through_enc_connection_mess, VerifyCertificate } from "../../../Actions";
import { DecryptBankInformation } from "../../../Axios";
// import {  } from "../../../Actions/WIM/Wim_action";

import { CartContext, CartTotalPriceContext, CBIProvider } from "../../../Context";
import "./CheckoutModal.css"
import PinRequiredModal from "./PinRequiredModal";

const { Text } = Typography;

const VerifyModal = ({ visible, hideModal, list, reset, paymentInfo, merchantBankingInfo }) => {
    const processPostVerify = async () => {
        try {
            let verify_merchant = await VerifyCertificate({rawCert: merchantCert.rawCertDataBase64})
            setMerchantCertValid(verify_merchant);
            let S = await Signature("client", JSON.stringify(list));
            setSignature(S)
            cleanCart()
            setPinVisible(true);
        } catch {
            hideModal()
        }
    }


    const cleanCart = () => {
        ClearCart()
        reset()
        hideModal()
    }
    const [signature, setSignature] = useState("");
    const [clientBankInfo, setClientBankInfo] = useState("");
    const [merchantBankInfo, setMerchantBankInfo] = useState(merchantBankingInfo);
    const [paymentInfoPostVerify, setPaymentInfo] = useState(paymentInfo);
    const [clientCert, setClientCert] = useState("");
    const [merchantCert, setMerchantCert] = useState("");
    const [gateWayCert, setGateWayCert] = useState("");
    const [clientRand, setClientRand] = useState("");
    const [gatewayRand, setGatewayRand] = useState("");
    const [clientCertValid, setClientCertValid] = useState(false);
    const [merchantCertValid, setMerchantCertValid] = useState(false);
    const [gateCertValid, setGateCertValid] = useState(false);
    useEffect(async () => {
        var c_cert = await GetCertificate({ keyName: "client", rawCert: "" });
        var m_cert = await GetCertificate({ keyName: "merchant", rawCert: "" });
        // console.log("Cert nay : ", c_cert);
        setClientCert(c_cert);
        setMerchantCert(m_cert);
    }, []);
    useEffect(async () => {
        setMerchantBankInfo(merchantBankingInfo)
        setPaymentInfo(paymentInfo)
        if (signature && clientBankInfo && merchantBankInfo && paymentInfoPostVerify) {
            console.error("Bh t sex gui payment request day");

            // Tao duong ket noi an toan WTLS

            // Client tao mot chuoi ngau nhien
            let client_rand_string = await Client_Request_Rand_String_For_Pre_Master_Secret();
            if (client_rand_string != null) {
                setClientRand(client_rand_string);

                // Gui yeu cau WTLS den server
                let gateway_WTLS_response = await RequestWTLSConnection(client_rand_string);
                console.error("WTLS", gateway_WTLS_response);
                setGatewayRand(gateway_WTLS_response.gatewayRand);
                setGateWayCert(gateway_WTLS_response.cert);
                // Client gui chung thu cua no cho Gateway
                let clientCertTemp = clientCert.rawCertDataBase64;
                if (clientCertTemp != null && clientCertTemp.length > 0) {
                    let client_send_cert_to_gate_response = await SendClientCertificate(clientCertTemp)
                    setClientCertValid(client_send_cert_to_gate_response);

                    // Buoc xac thuc gate certificate se nam o useEffect duoi
                }
            }
        }
    }, [visible, hideModal, list, signature, clientBankInfo])

    const [preMaster, setPreMaster] = useState("");
    const [master, setMaster] = useState("");
    const [sessionKeys, setSessionKeys] = useState(null);
    useEffect(async () => {
        if (clientCertValid == true) {
            let gateCertTemp = gateWayCert.rawCertDataBase64;
            if (gateCertTemp != null && gateCertTemp.length > 0) {
                let client_verify_gate_cert = await VerifyGatewayCertificate(gateCertTemp)
                setGateCertValid(client_verify_gate_cert);
            }
        }
        if (clientCertValid && gateCertValid) {
            console.error("Bh se den buoc tao Pre master secret");
            if (preMaster.length === 0) {
                let Pre_Master_Sc = await Client_Request_Pre_Master_Secret_From_WIM();
                setPreMaster(Pre_Master_Sc);
            }

        }
        // Roi moi gui payment request
        // Neu den dc day thi 4 cai thong tin tren da ok roi
    }, [clientCertValid, gateCertValid])

    const [secureWTLSConnection, setSecureWTLSConnection] = useState(false);
    useEffect(async () => {
        if (clientCertValid && gateCertValid) {
            if (preMaster.length > 0 && master.length === 0) {
                console.error("Tien hanh tao master secret")
                let Master_Sc = await Client_Request_Master_Secret_using_Pre_Master_And_Rand_string(preMaster, clientRand, gatewayRand);
                setMaster(Master_Sc);
            }
            if (preMaster.length > 0 && master.length > 0 && sessionKeys === null) {
                console.error("Tien hanh tao session key")
                console.error(master)
                let Session_Keys = await Client_Request_Session_Keys_using_Master_And_Rand_string(master, clientRand, gatewayRand);
                setSessionKeys(Session_Keys);
            }
            if (preMaster.length > 0 && master.length > 0 && sessionKeys !== null) {
                try {
                    console.error("Tao Khoa thanh cong");
                    let endMess = "CLIENT_HANDSHAKE_END";
                    let endHandShake = "CREATE_KEYS_SUCCESSFULY_SECURE_LINK_HAS_BEEN_ESTABLISHED";
                    let Enc_endHandShake = await Client_Make_WIM_Do_Sym_Encryption(endHandShake, sessionKeys.clientWriteKey64, sessionKeys.clientWriteMacKey64);
                    // console.log("Tin nhan ket thuc : ", Enc_endHandShake);
                    let result = await SendEndHandShake(Enc_endHandShake, endMess, sessionKeys.sessionID);
                    let encSerMess = result.enc_Mess;
                    let serMess = await Client_Make_WIM_Do_Sym_Decryption(encSerMess, sessionKeys.serverWriteKey64, sessionKeys.serverWriteMacKey64);
                    // console.log(serMess);
                    if (serMess === "CREATE_KEYS_SUCCESSFULY_SECURE_LINK_HAS_BEEN_ESTABLISHED") {
                        setSecureWTLSConnection(true);
                    }
                    else {
                        throw Error("Loi tao link WTLS");

                    }
                } catch {
                    notification.error({
                        message: "Bank connection state",
                        description: `Secure connection can not be established, Try again later`,
                    })
                }
            }

            if (secureWTLSConnection) {
                notification.success({
                    message: "Welcome back",
                    description: `Secure connection to your bank has be established successfully. Have a good shopping day`,
                    icon: <BankOutlined />,
                    duration: 5
                })
                console.error("Se gui payment request tai day");
                setTimeout(async () => {
                    // let clientMess = prompt("To Gateway: ");
                    let serverReply = "";
                    let paymentRequest = {
                        PaymentInfo: paymentInfo,
                        ClientVerify: signature,
                        CBankInfo: clientBankInfo,
                        MBankInfo: merchantBankInfo,
                        MCert: merchantCert
                    }
                    console.log(paymentRequest);
                    // Gửi từng phần một của payment request cho backend
                    // Gửi payment info
                    serverReply = await Communicate_through_enc_connection_mess(paymentInfo, sessionKeys, "PaymentInfo");
                    console.log(serverReply);
                    // xác nhận lại chữ ký của client xác nhận lúc trước (client ký bằng khóa Private, sang bên kia gateway sẽ kiêm tra lại bằng khóa Public của client) - có thể gửi kèm trong client Cert
                    serverReply = await Communicate_through_enc_connection_mess(signature, sessionKeys, "ClientVerify");
                    console.log(serverReply);
                    // gửi thông tin ngân hàng của khách hàng
                    serverReply = await Communicate_through_enc_connection_mess(JSON.stringify( clientBankInfo ), sessionKeys, "CBankInfo");
                    console.log(serverReply);
                    // giải mã thông tin ngân hàng của merchant hiện tại và gửi cho gateway
                    let de_merchantBankInfo = await DecryptBankInformation({KeyName: "client_bank", bankInfo: merchantBankInfo}).then(res => {
                        return res.data;
                    }).catch(err => {
                        return null;
                    });
                    serverReply = await Communicate_through_enc_connection_mess(JSON.stringify( de_merchantBankInfo ), sessionKeys, "MBankInfo");
                    console.log(serverReply);
                    // while (true) {
                    //     // serverReply = await Communicate_through_enc_connection_mess(clientMess, sessionKeys);
                    //     serverReply = await Communicate_through_enc_connection_mess(JSON.stringify(paymentRequest), sessionKeys);
                    //     if (serverReply !== null) { alert(serverReply); } else { alert("Error while transmiting message, pls try again"); }
                    //     break;
                    //     // if (!/bye/.test(clientMess) && !/bye/.test(serverReply) && clientMess !== null){
                    //     //     // clientMess = prompt("To Gateway: ");
                    //     // }else{
                    //     //     break;
                    //     // }
                    // }
                    
                }, 1000);
            }
        }
    }, [preMaster, master, sessionKeys, secureWTLSConnection])
    console.group("This is for payment request from client");
    console.warn("Signature", signature);
    console.warn("paymentInfo", paymentInfoPostVerify);
    console.warn("merchant banking Info", merchantBankInfo);
    console.warn("client banking Info", clientBankInfo);
    console.warn("client certificate Info", clientCert);
    console.warn("merchant certificate Info", merchantCert);
    console.groupEnd();

    if (signature && clientBankInfo && merchantBankInfo && paymentInfoPostVerify) {
        console.group("This is for Generating WTLS Connection to Gateway from client");
        console.warn("Gateway Cert", gateWayCert);
        console.warn("Client Random String", clientRand);
        console.warn("Gateway Random String", gatewayRand);
        console.warn("Client Certificate Validity", clientCertValid);
        console.warn("Gateway Certificate Validity ", gateCertValid);
        console.warn("Merchant Certificate Validity ", merchantCertValid);
        console.groupEnd();

        console.group("Gennerate key for secure session");
        console.warn("Premaster secret", preMaster);
        console.warn("Master secret", master);
        console.warn("Session Key", sessionKeys);
        console.groupEnd();
    }

    const [pinVisible, setPinVisible] = useState(false);

    return (
        <CBIProvider value={[clientBankInfo, setClientBankInfo]}>
            <Modal
                className="verify"
                title="Verify Your Order"
                maskClosable={false}
                visible={visible}
                onOk={async () => {
                    // gui bill về de ky so
                    // Luu cai bill nay ve bien trong React 
                    await processPostVerify();



                    // console.log("Thong tin thanh tooan", list);

                }}
                okText="VERIFY"
                danger={true}
                onCancel={hideModal}
                closable={false}
                width={450}
            >
                <CheckoutList list={list} />
            </Modal>
            <PinRequiredModal
                visible={pinVisible}
                hidden={() => setPinVisible(false)}
            />

        </CBIProvider>
    )
}

export default VerifyModal;

const CheckoutList = ({ list }) => {
    const [cartTotal, setCartTotal] = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useContext(CartTotalPriceContext);

    return (
        <Card bordered={false}>
            <table style={{ fontSize: 16 }}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => {
                            return (
                                <tr key={`Product__${index}`}>
                                    <td>{GetProductName(item.id)}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.price}</td>
                                    <td>{Number(item.price) * Number(item.amount)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </Card>
    )
}