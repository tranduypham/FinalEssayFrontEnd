import { LoadingOutlined } from "@ant-design/icons";
import { Card, Divider, Modal, Typography } from "antd";

import { useContext, useEffect, useState } from "react";
import { ClearCart, DecryptData, GetProductName, totalMoney } from "../../../Actions";
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
    const [paymentInfo, setPaymentInfo] = useState("");
    const [merchantBankingInfo, setMerchantBankingInfo] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);

    const VerifyInvoice = (verifyList, PI, MBI) => {
        console.log(verifyList);
        setPaymentInfo(PI);
        console.log("PI", PI);
        setMerchantBankingInfo(MBI);
        console.log("MBI", MBI);
        setVerifyVisibility(true)
        setVerifyList(verifyList);
    }

    const cleanCart = () => {
        ClearCart()
        reset()
        hideModal()
    }



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
                    let paymentInfo = {
                        invoice: JSON.stringify(list),
                        orderInfo: totalMoney()
                    }

                    // processCheckout(paymentInfo);
                    


                    ClientSendMerchantPaymentInfo(paymentInfo)
                        .then((response) => {


                            console.warn("Invoice : ", response.data.invoice, "Payment Info : ", response.data.pi, "Merchant banking info : ", response.data.merchantBankingInfo);
                            DecryptData("client", response.data.invoice, true)
                                .then((p) => {
                                    VerifyInvoice(JSON.parse(JSON.parse(p)), response.data.pi, response.data.merchantBankingInfo);
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
                reset={reset}
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