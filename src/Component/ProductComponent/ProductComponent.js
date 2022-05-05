import { Button, Card, Col, Layout, Row, Typography } from "antd";
import { useContext } from "react";
import { AddItems, totalCart } from "../../Actions";

import { CartContext } from "../../Context";
import AddCartNotification from "./AddCartNotification";

const { Text } = Typography;

const ProductItem = ({ product }) => {
    const {
        id,
        name,
        price,
        images
    } = product;

    const [cartTotal, setCartTotal] = useContext(CartContext);

    const addItemIntoCard = ({ id, price }) => {
        AddItems({ id, price });
        AddCartNotification();
        setCartTotal(totalCart());
    }
    return (
        <Col >
            <Card
                hoverable
                cover={images !== null || images !== undefined || images.length > 0 ? <img src={images} alt="thumbnail" /> : null}
            >
                <Row justify="space-between" align="middle" gutter={[24, 0]}>
                    <Col>
                        <Row>
                            <Text strong >
                                {name}
                            </Text>
                        </Row>
                        <Row>
                            <Text type="secondary">
                                {`$${price}`}
                            </Text>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Button
                                type="primary"
                                ghost
                                onClick={() => {
                                    addItemIntoCard({ id, price });
                                }}
                            > Add to cart </Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

const ProductList = ({ products }) => {
    return (
        <Layout style={{ padding: 24, backgroundColor: "transparent " }}>
            <Row gutter={[24, 24]} justify="center" className="product__list">
                {
                    products.map((item, index) => {
                        return <ProductItem product={item} key={`sp-${index}`} />
                    })
                }
            </Row>
        </Layout>
    )
}

export default ProductList