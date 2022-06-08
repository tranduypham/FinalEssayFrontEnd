import { BankOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Modal, notification, Divider, Typography } from "antd"
import { useEffect, useState } from "react";
import { BankCheckClientSignature, BankStatementAction, Signature } from "../../../Actions";
import { VerifyClientPinCode } from "../../../Axios";
import PinRequiredModal from "./PinRequiredModal";

const { Text, Title } = Typography;

const BankrequireClientVerifyOrder = ({ visible, hidden, verifyInfo }) => {
    const [pinVisible, setPinVisible] = useState(false);
    // const [actionAfterVerifyPin, setActionAfterVerifyPin] = useState(null)
    const [pinVerifyResult, setPinVerifyResult] = useState(false);

    const action = (value) => {
        console.log(value);
        VerifyClientPinCode(value)
            .then(res => {
                setPinVerifyResult(true);
                // setPinVisible(false);
                signOrder();
            }).catch(err => {
                setPinVerifyResult(false);
                notification.error({
                    message: "Wrong pin code",
                    description:
                        'You have type in the wrong pin code. Unless you enter the correct pin code, this order can not be confirmed, the bank will not pay up for you.',
                    icon: <InfoCircleOutlined style={{ color: '#EB3941' }} />,
                    duration: 1.2,
                })
            })
    }

    const signOrder = async () => {
        console.log("Ky ne");
        let S = await Signature("client", JSON.stringify(verifyInfo));
        // console.log(S);
        let result = await BankCheckClientSignature(S);
        console.log("Ket qua kiem tra chu ky: ", result);
        if (result === true) {
            console.error("Thuc hien rut tien trong tai khoan");
            notification.success({
                message: "Verification successfully",
                description:
                    'Your order is being process, thank you for using our bank services. Remmember to check the balance in your bank account.',
                duration: 2,
            })
        } else {
            notification.error({
                message: "Verification error",
                description:
                    'There are some problem during your verification, due to invalid signature from you or maybe dirupted while being process in server. Please try again later.',
                icon: <InfoCircleOutlined style={{ color: '#EB3941' }} />,
                duration: 1.2,
            })
        }
        hidden()
        setPinVisible(false);


        setTimeout(async () => {
            let bankStatement = await BankStatementAction();
            if (bankStatement !== null) {
                console.log("bank", bankStatement);
                notification.info({
                    message: "Client Bank - New Transaction",
                    description: <>
                        <p></p>
                        <p level={5}>Date:  <Text strong>{bankStatement.date}</Text></p>
                        <p level={5}>Account:  <Text strong>{bankStatement.payee.profileNumber}</Text></p>
                        <p level={5}>Ammount:  <Text type="danger" strong>-{bankStatement.amount}$</Text></p>
                        <p level={5}>Current Balance:  <Text strong>{bankStatement.client.balances}$</Text></p>
                    </>,
                    duration: null
                })
            } else {
                notification.error({
                    message: "Transaction can not be complete",
                    description: "Error while making transaction, we cannot complete your order."
                })
            }
        }, 3000)
    }
    const actionAfterVerifyAccount = () => {
        console.error("Bh se thuc hien xac nhan ma pin 1 lan nua truoc khi ky");
        setPinVisible(true);
    }
    useEffect(async () => {
        // if (pinVisible === false && pinVerifyResult === true) {
        //     await signOrder();
        // } else {
        //     console.log("Khong ky ne");
        // }
    }, [pinVisible, pinVerifyResult])
    return (
        <>
            <Modal
                className="verify account"
                title="Client Bank - Please confirm this order"
                maskClosable={false}
                visible={visible}
                onOk={async () => {
                    actionAfterVerifyAccount();
                }}
                okText="CONFIRM"
                onCancel={() => {
                    Modal.confirm({
                        title: "Are you sure you want to cancle this order?",
                        icon: <ExclamationCircleOutlined />,
                        content: 'If you click yes, this order will be cancle immediatly.',

                        onOk() {
                            notification.info({
                                message: "Confirmation is cancle",
                                describe: "You have been cancled your order, this might due to wrong infomation in the order or some error happend, please contact your merchant for more detail. Thanks you for using our services.",
                                icon: <BankOutlined />
                            })
                            hidden()
                        },

                        onCancel() {
                            console.log('Cancel');
                        },
                    });
                }}
                closable={false}
                width={550}
            >
                <Card bordered={false}>
                    <Divider orientation="left" orientationMargin={0}>Invoice ID</Divider>
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default" style={{ width: 122 }}>Invoice Number</Text>
                        <Text strong type="default">{verifyInfo.InvoiceNumber}</Text>
                    </div>
                    <Divider orientation="left" orientationMargin={0}>Payer</Divider>
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default" style={{ width: 122 }}>Name</Text>
                        <Text strong type="default">{verifyInfo.Payer.Name}</Text>
                    </div>
                    <br />
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default" >Account Number</Text>
                        <Text strong type="default">{verifyInfo.Payer.AccountNumber}</Text>
                    </div>
                    <Divider orientation="left" orientationMargin={0}>Payee</Divider>
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default" style={{ width: 122 }}>Name</Text>
                        <Text strong type="default">{verifyInfo.Payee.Name}</Text>
                    </div>
                    <br />
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default">Account Number</Text>
                        <Text strong type="default">{verifyInfo.Payee.AccountNumber}</Text>
                    </div>
                    <Divider orientation="left" orientationMargin={0}>Amount</Divider>
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default">Total</Text>
                        <Text strong type="default">{verifyInfo.Amount}$</Text>
                    </div>
                    <Divider orientation="left" orientationMargin={0}>Request date</Divider>
                    <div style={{ display: "flex", gap: 50, padding: "0 0 0 24px", fontSize: 16 }}>
                        <Text type="default">Date</Text>
                        <Text strong type="default">{verifyInfo.RequestDate}</Text>
                    </div>
                </Card>
            </Modal>
            <PinRequiredModal
                visible={pinVisible}
                hidden={() => setPinVisible(false)}
                actionAfterSubmit={(value) => action(value)}
            />
        </>
    )
}

export default BankrequireClientVerifyOrder