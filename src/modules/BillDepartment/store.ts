import { observable } from "mobx";
import { getRequest } from "../../api";
interface IListTransaction {
    transNumber: string,
    transAmount: string,
    receiverFullName: string,
    avgReveived: string,
    transType: string
}
class BillDepartmentStore {
    @observable listTransaction: IListTransaction[] = [];
}
class Control {
    store = new BillDepartmentStore();
    async getListTransaction(id: string) {
        const { status, body } = await getRequest("transaction?id=" + id, true);
        console.log(status, body);
        this.store.listTransaction = body;

    }

}
export const control = new Control();