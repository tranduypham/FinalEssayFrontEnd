import { Card, Modal, Typography } from "antd";

import { useContext, useEffect, useState } from "react";
import { ClearCart, GetProductName, Signature } from "../../../Actions";

import { CartContext, CartTotalPriceContext } from "../../../Context";
import "./CheckoutModal.css"

const { Text } = Typography;

const VerifyModal = ({ visible, hideModal, list, reset, paymentInfo, merchantBankingInfo }) => {
    const processPostVerify = async () => {
        let S = await Signature("client", JSON.stringify(list));
        setSignature(S)
        cleanCart()
    }


    const cleanCart = () => {
        // ClearCart()
        // reset()
        hideModal()
    }
    const [signature, setSignature] = useState("");
    const [clientBankInfo, setClientBankInfo] = useState("");
    const [merchantBankInfo, setMerchantBankInfo] = useState(merchantBankingInfo);
    const [paymentInfoPostVerify, setPaymentInfo] = useState(paymentInfo);
    useEffect(() => {
        setMerchantBankInfo(merchantBankingInfo)
        setPaymentInfo(paymentInfo)
    }, [visible, hideModal, list, signature])
    console.warn("Signature", signature);
    console.warn("paymentInfo", paymentInfoPostVerify);
    console.warn("merchant banking Info", merchantBankInfo);
    return (
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