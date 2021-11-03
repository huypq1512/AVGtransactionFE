import { Input, Modal } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { control } from "../store";

@observer
export default class NameTransactionOrder extends React.Component {
    render() {
        return (
            <Modal title={"Xác nhận tạo đơn"} visible={control.store.isConfirmCreateTransaction} onCancel={() => control.store.isConfirmCreateTransaction = false} onOk={() => control.createTranstion()}>
            </Modal>
        );
    }
}