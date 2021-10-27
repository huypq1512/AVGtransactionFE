import { Modal, Input } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { control } from "../../BillDepartment/store";
import { Button } from 'antd';
@observer
export default class Confirm extends React.Component {
    render() {
        return (
            <Modal zIndex={100} title={"Vui lòng nhập otp"} onCancel={() => control.store.isConfirm = false} onOk={() => control.confirmAccountant()} okText={"Xác nhận"} cancelText={"Huỷ"} visible={control.store.isConfirm}>
                <Input onChange={(e) => control.store.otp = e.target.value} />
                <Button type="link" onClick={() => control.sendOtp("kt")}>Gửi lại mã xác nhận</Button>
            </Modal>
        )
    }
}