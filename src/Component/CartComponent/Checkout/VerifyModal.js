import { Card, Modal, Typography } from "antd";

import { useContext, useEffect, useState } from "react";
import { ClearCart, GetProductName, Signature, GetCertificate, RequestWTLSConnection, SendClientCertificate, VerifyGatewayCertificate } from "../../../Actions";
import { Client_Request_Rand_String_For_Pre_Master_Secret } from "../../../Actions/WIM/Wim_action";

import { CartContext, CartTotalPriceContext, CBIProvider } from "../../../Context";
import "./CheckoutModal.css"
import PinRequiredModal from "./PinRequiredModal";

const { Text } = Typography;

const VerifyModal = ({ visible, hideModal, list, reset, paymentInfo, merchantBankingInfo }) => {
    const processPostVerify = async () => {
        try {
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
    const [gateWayCert, setGateWayCert] = useState("");
    const [clientRand, setClientRand] = useState("");
    const [gatewayRand, setGatewayRand] = useState("");
    const [clientCertValid, setClientCertValid] = useState(false);
    const [gateCertValid, setGateCertValid] = useState(false);
    useEffect(async () => {
        var c_cert = await GetCertificate({ keyName: "client", rawCert: "" });
        console.log("Cert nay : ", c_cert);
        setClientCert(c_cert);
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
        }
        // Roi moi gui payment request
        // Neu den dc day thi 4 cai thong tin tren da ok roi
    }, [clientCertValid, gateCertValid])
    console.group("This is for payment request from client");
    console.warn("Signature", signature);
    console.warn("paymentInfo", paymentInfoPostVerify);
    console.warn("merchant banking Info", merchantBankInfo);
    console.warn("client banking Info", clientBankInfo);
    console.warn("client certificate Info", clientCert);
    console.groupEnd();

    if (signature && clientBankInfo && merchantBankInfo && paymentInfoPostVerify) {
        console.group("This is for Generating WTLS Connection to Gateway from client");
        console.warn("Gateway Cert", gateWayCert);
        console.warn("Client Random String", clientRand);
        console.warn("Gateway Random String", gatewayRand);
        console.warn("Client Certificate Validity", clientCertValid);
        console.warn("Gateway Certificate Validity ", gateCertValid);
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