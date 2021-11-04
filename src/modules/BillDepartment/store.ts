import { observable } from "mobx";
import { getRequest, postRequest, putRequest } from "../../api";
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
    @observable linkFile: string[] = [];
    @observable state: "PENDING" | "CONFIRMOFFEES" | "CONFIRMOFACOUNTANT" | "REJECT" = "PENDING";
    otp: string = "";
    @observable isConfirm: boolean = false;
    id: string = "";
    @observable isSpam: boolean = false;
    @observable timeSpam: number = 30;
}
class Control {
    store = new BillDepartmentStore();
    async getListTransaction() {
        const { status, body } = await getRequest("transaction?id=" + this.store.id, true);
        // console.log(status, body);
        if (status === 200) {
            this.store.listTransaction = body.transactionDetail;
            this.store.linkFile = body.file;
            this.store.state = body.state;
        }

    }
    async confirmFees() {
        const { status, body } = await putRequest("confirm_fees", true, { id: this.store.id, otp: this.store.otp });
        if (status === 200) {
            notifiStore.content = body.message;
            notifiStore.type = "Success";
            this.store.state = "CONFIRMOFFEES";
            this.store.isConfirm = false;
        }
        else {
            notifiStore.content = body.message;
            notifiStore.type = "Error";
        }
    }
    async confirmAccountant() {
        const { status, body } = await putRequest("confirm_accountant", true, { id: this.store.id, otp: this.store.otp });
        if (status === 200) {
            notifiStore.content = body.message;
            notifiStore.type = "Success";
            this.store.state = "CONFIRMOFACOUNTANT";
            this.store.isConfirm = false;
        }
        else {
            notifiStore.content = body.message;
            notifiStore.type = "Error";
        }
    }
    async sendOtp(type: "kt" | "pc" = "pc") {
        const { status, body } = await postRequest("re_send", false, { id: this.store.id, type: type });
        if (status === 200) {
            notifiStore.content = body.message;
            notifiStore.type = "Success";
            this.spamOtp();
        }
        else {
            notifiStore.content = body.message;
            notifiStore.type = "Error";
        }
    }
    spamOtp() {
        this.store.isSpam = true;
        this.store.timeSpam = 30;
        const x = setInterval(() => {
            this.store.timeSpam -= 1;
            if (this.store.timeSpam == 0) {
                this.store.isSpam = false;
                clearInterval(x);
            }
        }, 1000)
    }

}
export const control = new Control();