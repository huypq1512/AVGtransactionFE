import { observable } from "mobx";
import { getRequest } from "../../api";
interface IResListTransactionOrder {
    id: string;
    createUser: string;
    attachedFile: string;
    createTime: string;
    state: "PENDING" | "CONFIRMOFFEES" | "CONFIRMOFACOUNTANT" | "REJECT";
    name: string;
}
class Store {
    @observable listTransactionOrder?: IResListTransactionOrder[];
    @observable page = 0;
}
class Control {
    store = new Store();
    async getListTransactionOrder() {
        const { status, body } = await getRequest("transaction_order?page=" + this.store.page, true);
        this.store.listTransactionOrder = status === 200 ? body : undefined;
        console.log(body);

    }
}
export const control = new Control();