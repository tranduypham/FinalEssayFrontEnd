import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification } from "antd";
import { useContext, useState } from "react";
import { GetClientBankInformation, VerifyClientPinCode } from "../../../Axios";
import { CBI } from "../../../Context";
import BankAccountNumberModal from "./BankAccountNumberModal";

const PinRequiredModal = ({ visible, hidden, actionAfterSubmit }) => {
    const [form] = Form.useForm();
    // const [accountModalVisible, setaccountModalVisible] = useState(false);
    const [pin, setPin] = useState("");
    const [clientBankInfo, setClientBankInfo] = useContext(CBI);

    const submitPinCode = (value) => {
        console.log("Form sbumit", value);
        if(actionAfterSubmit === null)
        {
            VerifyClientPinCode(value)
                .then((res) => {
                    console.warn(res.data)
                    // notification.success({
                    //     message: "Welcome back",
                    //     description:
                    //         'Please enter your account number to process the payment',
                    //     duration: 2,
                    // });
                    setPin(`${res.data}`);
                    // setaccountModalVisible(true);
                    GetClientBankInformation({ pin: `${res.data}` })
                        .then((res) => {
                            console.warn(res.data)
                            notification.success({
                                message: "Congratulation",
                                description:
                                    'Your order is being procedd, please check your bank account for more information. If by any chance any fraud happen, please immediately contact our customer service hotline',
                                duration: 2,
                            });
                            setClientBankInfo(res.data.clientEncBankInfoBase64)
    
                            // hidden()
                        }).catch((err) => {
                            console.error(err.response.data)
                            notification.open({
                                message: err.response.data.mess,
                                description:
                                    'Something happended dunring your order procession, please try again later',
                                icon: <InfoCircleOutlined style={{ color: '#EB3941' }} />,
                                duration: 1.3,
                            });
                        })
    
                    hidden();
    
                }).catch((err) => {
                    console.error(err.response.data)
                    notification.open({
                        message: err.response.data.mess,
                        description:
                            'Please enter the correct PIN code',
                        icon: <InfoCircleOutlined style={{ color: '#EB3941' }} />,
                        duration: 1.3,
                    });
                })
        }else{
            actionAfterSubmit(value);
        }
    }
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
            {/* <BankAccountNumberModal 
                visible={accountModalVisible}
                hidden={() => setaccountModalVisible(false)}
                pinCode={pin}
            /> */}
        </>
    )
}

export default PinRequiredModal;