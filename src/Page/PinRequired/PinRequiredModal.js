
import { Form, Input, Modal, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { ClientVerifiedItSelf } from "../../Axios";
import { useNavigate, Navigate } from "react-router-dom";



const PinRequiredModal = ({ visible, hidden, actionAfterSubmit }) => {
    const [form] = Form.useForm();
    const [result, setResult] = useState(false);
    let navigator = useNavigate();
    useEffect(() => {
        ClientVerifiedItSelf("")
        .then(res => {
            setResult(res.data);
        })
    }, []);
    const [pin, setPin] = useState("");
    const submitPinCode = (value) => {
        console.log("Form sbumit", value);
        ClientVerifiedItSelf(value.pin)
        .then(res => {
            if(res.data == true){
                setResult(true);
                hidden();
                navigator("/")
            }
        })
    }

    console.log(result);
    if(result == false){
        return (
            <>
                <Modal
                    className="verify"
                    title={<b>PIN</b>}
                    maskClosable={false}
                    visible={visible}
                    onOk={async () => {
                        // Nhap thanh cong ma pin moi lay dc Client Banking Info
                        // await processPostVerify();
                        // hidden()
                        form.submit();
                    }}
                    okText="OK"
                    danger={true}
                    onCancel={() => {
                        form.setFieldsValue({
                            pin: ""
                        });
                    }}
                    cancelText="Clear"
                    closable={false}
                    width={350}
                    centered
                >
                    <Form
                        name="pin_verify"
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        style={{ padding: "24px 24px 0 24px" }}
                        onFinish={submitPinCode}
                    >
                        <Form.Item
                            label="Pin"
                            name="pin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your pin!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal >
            </>
        )
    }

    return(
        <Navigate to="/"  replace={true}/>
    )
    // navigator(-1);

    


}

export default PinRequiredModal;