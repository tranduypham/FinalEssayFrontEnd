import { Button, Card, Col, Layout, Row, Typography } from "antd";

const { Text } = Typography;

const ProductItem = ({ product }) => {
    const {
        id,
        name,
        price,
        images
    } = product;

    return (
        <Col >
            <Card
                hoverable
                cover={images !== null || images !== undefined || images.length > 0 ? <img src={images} alt="thumbnail" /> : null}
            >
                <Row justify="space-between" align="middle">
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
                            <Button type="primary" ghost> Add to cart </Button>
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