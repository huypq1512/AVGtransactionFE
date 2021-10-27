import { Input, Modal } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { control } from "../store";
import { Button } from 'antd';
@observer
export default class Confirm extends React.Component {
    render() {
        return (
            <Modal zIndex={100} onCancel={() => control.store.isConfirm = false} onOk={() => control.confirmFees()} okText={"Xác nhận"} cancelText={"Huỷ"} visible={control.store.isConfirm}>
                <Input onChange={(e) => control.store.otp = e.target.value} />
                <Button onClick={() => control.sendOtp("pc")}>Gửi lại mã xác nhận</Button>
            </Modal>
        )
    }
}