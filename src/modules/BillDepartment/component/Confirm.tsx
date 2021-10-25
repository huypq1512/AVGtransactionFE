import { Modal } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { control } from "../store";
@observer
export default class Confirm extends React.Component {
    render() {
        return (
            <Modal zIndex={100} onCancel={() => control.store.isConfirm = false} onOk={() => control.confirmFees()} okText={"Xác nhận"} cancelText={"Huỷ"} visible={control.store.isConfirm}>
                <div style={{ fontWeight: "bold", fontSize: "17px" }}>Bạn có chắc chắn xác nhận</div>
            </Modal>
        )
    }
}