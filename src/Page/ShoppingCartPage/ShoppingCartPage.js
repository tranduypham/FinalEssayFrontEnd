import React, { useEffect } from "react";
import { CartListComponent } from "../../Component";
import { useNavigate } from "react-router-dom";
import { ClientVerifiedItSelf } from "../../Axios";

const ShoppingCartPage = () => {
    const navigator = useNavigate()
    useEffect(() => {
        ClientVerifiedItSelf("")
        .then(res => {
            if(res.data == false) {
                navigator("/pin")
            }
        })
    }, []);
    return <CartListComponent />
}

export default ShoppingCartPage;