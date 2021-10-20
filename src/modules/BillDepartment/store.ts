import { observable } from "mobx";
import { getRequest } from "../../api";
interface IListTransaction {
    transNumber: string,
    transAmount: string,
    receiverFullName: string,
    avgReveived: string,
    transType: string,
    phoneNumber: string,
    createUser: string
}
class BillDepartmentStore {
    @observable listTransaction?: IListTransaction[];
    @observable linkFile: string = "";
}
class Control {
    store = new BillDepartmentStore();
    async getListTransaction(id: string) {
        const { status, body } = await getRequest("transaction?id=" + id, true);
        console.log(status, body);
        if (status === 200) {
            this.store.listTransaction = body.transactionDetail;
            this.store.linkFile = body.file;
        }

    }

}
export const control = new Control();