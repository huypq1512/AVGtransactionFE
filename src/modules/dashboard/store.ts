import axios from "axios";
import { observable } from "mobx";
import { baseURL, getRequest, getRequest1, postRequest } from "../../api";
import { customHistory } from "../router/router";
import { notifiStore } from "../toastNotification/component";
import { control as controlTransactionOrder } from "../transactionOrder/store";
export interface IInput {
    name?: string,
    typeBank: string,
    bankNumber?: string,
    price?: string,
    file?: string,
    createUser?: string,
    wallet_number?: string
}
interface IReqTransaction {
    transaction_detail: ITransactionnDetail[],
    transaction_order: {
        url?: string,
        name: string,
    }
}
interface ITransactionnDetail {
    trans_type: string,
    trans_number: string,
    trans_amount: string,
    avg_reveived: string,
    name_receiver: string,
    wallet_number: string
}
class Dashboard {
    @observable input: IInput[] = [{ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined, wallet_number: undefined }];
    @observable url?: string;
    @observable name?: string;
    reqTransaction: IReqTransaction = { transaction_detail: [], transaction_order: { url: "", name: "" } };
    @observable errorInput: boolean = false;
    @observable showCreate: boolean = false;
    @observable isInput: boolean = false;
    @observable isConfirmCreateTransaction: boolean = false;

}
class Control {
    store = new Dashboard();
    refresh() {
        this.store = new Dashboard();
    }
    showPopup() {
        if (!this.store.name) {
            this.store.errorInput = true;
            return false;
        }
        let isNull = false;
        this.store.input.map((item, index) => {
            if (!item.bankNumber || !item.bankNumber || !item.price || !item.file || !item.name) {
                isNull = true;
            }
        });
        if (isNull) {
            notifiStore.content = "Vui lòng nhập hết thông tin!";
            notifiStore.type = "Warning";
        }
        else {
            this.store.isConfirmCreateTransaction = true;
        }
    }
    async createTranstion() {
        if (!this.store.name) {
            this.store.errorInput = true;
            return false;
        }
        this.store.reqTransaction = { transaction_detail: [], transaction_order: { url: "", name: "" } };
        let isNull = false;
        this.store.input.map((item, index) => {
            if (!item.bankNumber || !item.price || !item.file || !item.name || !item.wallet_number) {
                isNull = true;
            }
            else {
                const data: ITransactionnDetail = {
                    avg_reveived: item.file,
                    trans_type: item.typeBank,
                    trans_amount: item.price,
                    trans_number: item.bankNumber,
                    name_receiver: item.name,
                    wallet_number: item.wallet_number
                };
                this.store.reqTransaction.transaction_detail.push(data);

            }
        });
        if (isNull) {
            notifiStore.content = "Vui lòng nhập hết thông tin!";
            notifiStore.type = "Warning";
        }
        else {
            this.store.reqTransaction.transaction_order.url = this.store.url;
            this.store.reqTransaction.transaction_order.name = this.store.name;
            const { status, body } = await postRequest("transaction", true, this.store.reqTransaction);
            if (status === 200) {
                notifiStore.content = body.message;
                notifiStore.type = "Success";
                this.store.isConfirmCreateTransaction = false;
                this.store.showCreate = false;
                this.store.input = [{ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined }];
                this.store.name = undefined;
                this.store.url = undefined;
                setTimeout(() => {
                    controlTransactionOrder.getListTransactionOrder();
                }, 1000);
            }
        }
    }
    async uploadFile(file: any) {
        const formData = new FormData();
        formData.append(
            "file",
            file
        );
        return new Promise<any>(resolve => {
            axios.post(`${baseURL}upload_file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "x-access-token": localStorage.getItem("token")
                }
            }).then((next) => {
                resolve({
                    status: 200,
                    body: next.data
                })
            })
        })
    }
    async checkPhoneNumberZizi(bankNumber: string, index: number) {
        const { status, body } = await getRequest1("http://hotro.avg.vn:3000/api/getwalletnumzizi/" + bankNumber);
        if (status === 200 && body.length > 0) {
            console.log(body);
            this.store.input[index].name = body[0].hOTEN;
            this.store.input[index].wallet_number = body[0].wALLETNUM;
        }
        else {
            notifiStore.content = "Số tài khoản không tồn tại!";
            notifiStore.type = "Error";
        }
    }
}
export const control = new Control();