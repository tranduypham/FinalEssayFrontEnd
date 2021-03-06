import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification } from "antd";
import { useContext, useEffect } from "react";
import { ClientAuthentication } from "../../../Actions";
import { GetClientBankInformation, VerifyClientPinCode } from "../../../Axios";
import { CBI } from "../../../Context";

const BankAccountNumberModal = ({ visible, hidden, setClientAuthentResult }) => {
    const [form] = Form.useForm();
    // const [clientBankInfo, setClientBankInfo] = useContext(CBI);

    
    const submitPinCode = async (value) => {
        console.log("Form sbumit", { ...value });
        let verify_client_result = await ClientAuthentication({ ...value });
        console.log(verify_client_result);
        setClientAuthentResult(true);
        hidden();
        // GetClientBankInformation({ ...value, pin: pinCode })
        //     .then((res) => {
        //         console.warn(res.data)
        //         notification.success({
        //             message: "Congratulation",
        //             description:
        //                 'Your order is being procedd, please check your bank account for more information. If by any chance any fraud happen, please immediately contact our customer service hotline',
        //             duration: 2,
        //         });
        //         setClientBankInfo(res.data.clientEncBankInfoBase64)

                // hidden()
        //     }).catch((err) => {
        //         console.error(err.response.data)
        //         notification.open({
        //             message: err.response.data.mess,
        //             description:
        //                 'Please re-enter your bank account',
        //             icon: <InfoCircleOutlined style={{ color: '#EB3941' }} />,
        //             duration: 1.3,
        //         });
        //     })
    }
    return (
        <Modal
            className="verify account"
            title={<b>Account</b>}
            maskClosable={false}
            visible={visible}
            onOk={async () => {
                form.submit();
            }}
            okText="OK"
            danger={true}
            onCancel={() => {
                form.setFieldsValue({
                    bankAccount: "",
                    password: ""
                });
            }}
            cancelText="Clear"
            closable={false}
            width={350}
            centered
        >
            <Form
                initialValues={{ 
                    bankAccount: "1255070770448",
                    password: "123456"
                }}
                layout="vertical"
                name="account_authorize"
                form={form}
                // labelCol={{ span: 10 }}
                // wrapperCol={{ span: 18 }}
                style={{ padding: "24px 24px 0 24px" }}
                onFinish={submitPinCode}
            >
                <Form.Item
                    label="Bank Account"
                    name="bankAccount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your account !',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your account password !',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default BankAccountNumberModal;