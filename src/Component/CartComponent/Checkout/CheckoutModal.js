import { Card, Divider, Modal, notification, Typography } from "antd";

import { useContext, useState } from "react";
import { ClearCart, DecryptData, GetProductName, Signature, totalMoney, VerifySignature } from "../../../Actions";
import { ClientSendMerchantPaymentInfo } from "../../../Axios/Fetch/action";
import { CartContext, CartTotalPriceContext } from "../../../Context";
import LoadingOverLay from "../../LoadingComponent/loading";
import "./CheckoutModal.css"
import VerifyModal from "./VerifyModal";

const { Text } = Typography;

const CheckoutModal = ({ visible, hideModal, list, reset }) => {
    console.log("reset");
    // const [invoiceFromMerchant, setInvoiceFromMerchant] = useState(null);
    const [verifyVisibility, setVerifyVisibility] = useState(false);
    const [verifyList, setVerifyList] = useState([]);
    const [verifyListSignature, setVerifyListSignature] = useState("");
    const [paymentInfoSignatture, setPaymentInfoSignatture] = useState("");
    const [paymentInfo, setPaymentInfo] = useState("");
    const [invoiceeFromMerchant, setInvoice] = useState("");
    const [merchantBankingInfo, setMerchantBankingInfo] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);

    const VerifyInvoice = async (verifyList, Invoice, PI, MBI, I_sign, PI_sign) => {
        console.log(verifyList);
        setPaymentInfo(PI);
        setInvoice(Invoice);
        console.log("PI", PI);
        setMerchantBankingInfo(MBI);
        console.log("MBI", MBI);
        setVerifyList(verifyList);
        setVerifyListSignature(I_sign);
        setPaymentInfoSignatture(PI_sign);
        setVerifyVisibility(true);
    }

    // const cleanCart = () => {
    //     ClearCart()
    //     reset()
    //     hideModal()
    // }



    return (
        <>
            <Modal
                className="checkout"
                title="Your Order"
                maskClosable={false}
                visible={visible}
                onOk={() => {
                    setVerifyLoading(true);
                    console.log("Link api ", process.env.REACT_APP_DEFAULT_LINK)
                    let invoice = {
                        invoice: `${JSON.stringify(list)}`,
                        orderInfo: totalMoney()
                    }

                    // processCheckout(paymentInfo);

                    

                    ClientSendMerchantPaymentInfo(invoice)
                        .then((response) => {


                            console.warn("Invoice : ", response.data.invoice, "Invoice signature by merchant : ", response.data.merchant_Sign_Invoice, "Payment Info : ", response.data.pi, "Merchant banking info : ", response.data.merchantBankingInfo);
                            DecryptData("client", response.data.invoice, true)
                            .then(async (p) => {
                                console.log("Danh sach dang JSON", JSON.parse(p));
                                let verify_merchant_signature = await VerifySignature("merchant", JSON.parse(p), response.data.merchant_Sign_Invoice).then(res => {
                                    console.log("Ket qua : ", res.data);
                                    return res.data;
                                }).catch(err => {
                                    return false;
                                })
                                if(verify_merchant_signature === true){
                                    VerifyInvoice(JSON.parse(JSON.parse(p)), response.data.invoice, response.data.pi, response.data.merchantBankingInfo, response.data.merchant_Sign_Invoice, response.data.merchant_Sign_PaymentInfo);
                                }else {
                                    notification.error({
                                        message: "Merchant authentication failure",
                                        description: "There are some problem in your connection to server, it might secure enough. Please check and try again later."
                                    })
                                }
                                setVerifyLoading(false);
                            })
                        })
                        .catch((err) => {
                            console.error(err.response.data)
                        })

                    hideModal();
                    console.log("Thong tin thanh tooan", list);
                }}
                okText="PURCHASE"
                onCancel={hideModal}
                closable={false}
                width={550}
            >
                <CheckoutList list={list} />
            </Modal>

            <LoadingOverLay visibility={verifyLoading}/>

            <VerifyModal
                visible={verifyVisibility}
                hideModal={() => setVerifyVisibility(false)}
                list={verifyList}
                listSignatureFromMerchant={verifyListSignature}
                paymentInfoSignatureFromMerchant={paymentInfoSignatture}
                reset={reset}
                invoice = {invoiceeFromMerchant}
                paymentInfo = {paymentInfo}
                merchantBankingInfo = {merchantBankingInfo}
            />
        </>
    )
}

export default CheckoutModal;

const CheckoutList = ({ list }) => {
    const [cartTotal, setCartTotal] = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useContext(CartTotalPriceContext);

    return (
        <Card bordered={false}>

            <Divider orientation="left" orientationMargin={0}>Order Bill</Divider>
            <div style={{ display: "flex", gap: 50, padding: "0", fontSize: 16 }}>
                <Text type="default">Total Product</Text>
                <Text strong type="default">{cartTotal}</Text>
            </div>

            <Divider orientation="left" orientationMargin={0}>Detail</Divider>
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
            <Divider orientation="left" orientationMargin={0}>Total</Divider>
            <div style={{ display: "flex", gap: 100, padding: "0", fontSize: 16 }}>
                <Text type="default">Total Bill</Text>
                <Text strong type="default">{totalPrice}</Text>
            </div>
        </Card>
    )
}