import { DeleteOutlined } from "@ant-design/icons";
import { Layout, Typography, Button, Row, Col, Card, Space, InputNumber } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProductAva, GetProductName, RemoveItem, ShowCartProduct, ShowCartProductNoPromise, totalCart, totalMoney, UpdateCartItemCount } from "../../Actions";
import { CartContext, CartTotalPriceContext } from "../../Context";
import "./CartComponent.css"
import CheckoutModal from "./Checkout/CheckoutModal";

const { Title, Text } = Typography;
const { Meta } = Card;

const OrderSummary = () => {
    const [cartTotal, setCartTotal] = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useContext(CartTotalPriceContext);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [list, setList] = useContext(ListProductCart);
    const resetData = () => {
        setCartTotal(totalCart())
        setTotalPrice(totalMoney())
        setList(ShowCartProductNoPromise())
    }
    useEffect(() => {
        setList(ShowCartProductNoPromise());
    },[modalVisibility])
    return (
        <Card className="order-summary">
            <Title level={3}>Order Summary</Title>
            <Space style={{ display: "flex", justifyContent: "space-between", padding: "24px 0", fontSize: 18 }}>
                <Text type="secondary">Total</Text>
                <Text strong type="danger" className="priceTotal">${Number(totalPrice)}</Text>
            </Space>
            <Button
                type="primary"
                size="large"
                disabled={cartTotal === 0}
                onClick={() => {
                    setModalVisibility(true)
                }}
            >
                CHECKOUT
            </Button>
            <CheckoutModal
                reset={resetData}
                list={list}
                visible={modalVisibility}
                hideModal={() => setModalVisibility(false)}
            />
        </Card>
    )
}

const CartProductItem = ({ product }) => {
    const {
        id,
        price,
        amount
    } = product
    const [totalPrice, setTotalPrice] = useContext(CartTotalPriceContext);
    const [cartTotal, setCartTotal] = useContext(CartContext);
    const [list, setList] = useContext(ListProductCart);
    const [numOfProduct, setAmount] = useState(amount)
    return (
        <Card
            className="cart__product"
            cover={<img src={GetProductAva(id)} alt="Product"></img>}

        >
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexGrow: 1 }}>
                <div style={{ width: 150, wordBreak: "break-word", textAlign: "left" }}>
                    <Title level={4}>
                        <Text strong>{GetProductName(id)}</Text>
                    </Title>
                    <Text className="price" type="secondary">${price}</Text>
                </div>
                <InputNumber
                    style={{
                        width: 70
                    }}
                    min={1}
                    value={Number(numOfProduct)}
                    onChange={(count) => {
                        console.log(count);
                        UpdateCartItemCount(id, count);
                        setAmount(count);
                        setTotalPrice(totalMoney());
                        setList(ShowCartProductNoPromise());
                    }}
                />
                <div
                    className="delete"
                    onClick={() => {
                        console.log(id);
                        RemoveItem(id);
                        setTotalPrice(totalMoney());
                        setCartTotal(totalCart());
                        setList(ShowCartProductNoPromise());
                    }}
                >
                    <DeleteOutlined />
                </div>
            </div>
        </Card>
    )
}
const CartProductList = ({ list }) => {
    console.log("Day la list se duoc hien thi : ", list);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {
                list.length > 0 ?
                    list.map((item, index) => {
                        return <CartProductItem product={item} key={`cart_product_#${index}`} />
                    })
                    :
                    <Card
                        className="cart__product"
                        title="Empty"
                    >

                    </Card>
            }
        </div>
    )
}
export const ListProductCart = createContext();
const CartListComponent = () => {
    const [list, setList] = useState([]);
    const [reset, setReset] = useState(true);
    useEffect(() => {
        ShowCartProduct().then((result) => {
            console.log(result);
            setList(result)
        }).catch(() => {
            console.log("Error Happend")
            setList([]);
        })
    }, [reset])
    console.log("Cart List is : ", list);
    
    return (
        <ListProductCart.Provider value={[list, setList]}>
            <Layout style={{ padding: 24 }} className="cart__list__show">
                <Row justify="center">
                    <Col flex={"2 1 400px"}>
                        <CartProductList list={list} />
                    </Col>

                    <Col flex={"1 1 400px"}>
                        <OrderSummary></OrderSummary>
                    </Col>
                </Row>
            </Layout>
        </ListProductCart.Provider>
    )
}

export default CartListComponent;