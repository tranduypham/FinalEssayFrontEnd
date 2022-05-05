import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Layout, Menu } from "antd"
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShowCart } from "../../Actions";
import { CartContext } from "../../Context";
import "./Layout.css"


const { Header, Content, Footer } = Layout;

const WebLayout = ({ children }) => {
    const navigator = useNavigate();
    const showCart = () => {
        ShowCart();
        navigator("/cart");
    }

    const [cartTotal, setCartTotal] = useContext(CartContext);
    console.log(cartTotal);

    return (
        <Layout className="layout-default">
            <Header className="header header-default">
                <Link className="logo" to={"/"} />
                <Button
                    type="link"
                    onClick={showCart}
                >
                    <div>
                        <Badge
                            // count={totalItems}
                            count={isNaN(parseInt(cartTotal)) ? 0 : parseInt(cartTotal)}
                            style={{
                                backgroundColor: '#fff',
                                color: "var(--headerBar)",
                                fontWeight: "bold",
                                boxShadow: '0 0 0 1px #d9d9d9 inset',
                            }}
                        >
                            <ShoppingCartOutlined
                                style={{ fontSize: 25, cursor: 'pointer', color: "#fff" }}
                            />
                        </Badge>
                    </div>
                </Button>
            </Header>
            <Content className="content-default">
                {children}
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                    className="footer-default"
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Content>
        </Layout>
    )
}

export default WebLayout