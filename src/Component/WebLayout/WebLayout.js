import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd"
import "./Layout.css"


const { Header, Content, Footer } = Layout;

const WebLayout = ({ children }) => {
    return (
        <Layout className="layout-default">
            <Header className="header header-default">
                <div className="logo" />
                <Button type="link">
                    <ShoppingCartOutlined style={{ fontSize: 30, color: "#fff" }}/>
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