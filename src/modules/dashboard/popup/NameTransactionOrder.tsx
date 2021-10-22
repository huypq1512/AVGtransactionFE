import { Input, Modal } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { control } from "../store";

@observer
export default class NameTransactionOrder extends React.Component {
    render() {
        return (
            <Modal title={"Tên của đơn hàng"} visible={control.store.isNameTransactionOrder} onCancel={() => control.store.isNameTransactionOrder = false} onOk={() => control.createTranstion()}>
                <Input onChange={(e) => { control.store.errorInput = false; control.store.name = e.target.value }} />
                {control.store.errorInput && <div style={{ color: "red" }}>Vui lòng nhập tên</div>}
            </Modal>
        );
    }
}