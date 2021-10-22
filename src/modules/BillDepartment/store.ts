import { observable } from "mobx";
import { getRequest, putRequest } from "../../api";
import { notifiStore } from "../toastNotification/component";
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
    @observable state: "PENDING" | "CONFIRMOFFEES" | "CONFIRMOFACOUNTANT" | "REJECT" = "PENDING";
    otp: string = "";
}
class Control {
    store = new BillDepartmentStore();
    async getListTransaction(id: string) {
        const { status, body } = await getRequest("transaction?id=" + id, true);
        console.log(status, body);
        if (status === 200) {
            this.store.listTransaction = body.transactionDetail;
            this.store.linkFile = body.file;
            this.store.state = body.state;
        }

    }
    async confirmFees(id: string) {
        const { status, body } = await putRequest("confirm_fees", true, { id: id });
        if (status === 200) {
            notifiStore.content = body.message;
            notifiStore.type = "Success";
            this.store.state = "CONFIRMOFFEES";
        }
        else {
            notifiStore.content = body.message;
            notifiStore.type = "Error";
        }
    }
    async confirmAccountant(id: string) {
        const { status, body } = await putRequest("confirm_accountant", true, { id: id, otp: this.store.otp });
        if (status === 200) {
            notifiStore.content = body.message;
            notifiStore.type = "Success";
            this.store.state = "CONFIRMOFACOUNTANT";
        }
        else {
            notifiStore.content = body.message;
            notifiStore.type = "Error";
        }
    }

}
export const control = new Control();