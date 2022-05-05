import { Card, Divider, Modal, Typography } from "antd";

import { useContext } from "react";
import { ClearCart, GetProductName } from "../../../Actions";
import { CartContext, CartTotalPriceContext } from "../../../Context";
import "./CheckoutModal.css"

const { Text } = Typography;

const CheckoutModal = ({ visible, hideModal, list, reset }) => {
    const processCheckout = () => {

    }
    return (
        <Modal
            className="checkout"
            title="Your Order"
            visible={visible}
            onOk={() => {
                ClearCart()
                reset()
                hideModal()
                // window.location.reload()
                processCheckout();
                console.log("Thong tin thanh tooan", list);
            }}
            okText="PURCHASE"
            onCancel={hideModal}
            closable={false}
            width={550}
        >
            <CheckoutList list={list} />
        </Modal>
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