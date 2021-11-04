import { observable } from "mobx";
import { getRequest, putRequest } from "../../api";
import { notifiStore } from "../toastNotification/component";
interface IResListTransactionOrder {
    id: string;
    createUser: string;
    attachedFile: string;
    createTime: string;
    state: "PENDING" | "CONFIRMOFFEES" | "CONFIRMOFACOUNTANT" | "REJECT";
    name: string;
}
interface IUser {
    departmentCode: "kt" | "pc" | "nv"
}
class Store {
    @observable listTransactionOrder?: IResListTransactionOrder[];
    @observable page = 0;
    @observable userDetail?: IUser;
}
class Control {
    store = new Store();
    async getListTransactionOrder() {
        const { status, body } = await getRequest("transaction_order?page=" + this.store.page, true);
        this.store.listTransactionOrder = status === 200 ? body : undefined;
        // console.log(body);
    }
    async getUserDetail() {
        const { status, body } = await getRequest("user", true);
        this.store.userDetail = status === 200 ? body : undefined;
    }
    async reSendConfirm(state: "PENDING" | "CONFIRMOFFEES" | "CONFIRMOFACOUNTANT" | "REJECT" = "PENDING", id: string) {
        const { status, body } = await putRequest("re_send_confirm", false, { state: state, id: id });
        if (status == 200) {
            notifiStore.content = body.message;
            notifiStore.type = "Success"
        }
        else {
            notifiStore.content = body.message;
            notifiStore.type = "Error"
        }
        console.log(status, body);

    }
}
export const control = new Control();