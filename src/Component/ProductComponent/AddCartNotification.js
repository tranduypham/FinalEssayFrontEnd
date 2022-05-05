import { ShoppingOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShowCart } from "../../Actions";

const AddCartNotification = () => {
    const key = `noti-${Date.now()}`;
    // const navigator = useNavigate();
    const btn = (
        <Button
            type="primary"
            ghost
            onClick={() => {
                ShowCart()
                notification.close(key);
            }}
        >
            Go to cart
        </Button>
    );

    console.log("You just add an Item into Cart");

    notification.open({
        message: 'Item added to cart',
        description:
            'You have successfully added an item to your cart. To check out, click the button below.',
        icon: <ShoppingOutlined style={{ color: 'var(--headerBar)' }} />,
        duration: 1.2,
        key: key,
        btn: btn,
    });
}

export default AddCartNotification;