import { observable } from "mobx";
import { getRequest } from "../../api";
interface IResListTransactionOrder {
    id: string;
    createUser: string;
    attachedFile: string;
    createTime: string;
    state: "PENDING" | "SUCCESS" | "REJECT";
}
class Store {
    @observable listTransactionOrder?: IResListTransactionOrder[];
}
class Control {
    store = new Store();
    async getListTransactionOrder() {
        const { status, body } = await getRequest("transaction_order", true);
        this.store.listTransactionOrder = status === 200 ? body : undefined;
        console.log(body);

    }
}
export const control = new Control();