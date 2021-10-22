import axios from "axios";
import { observable } from "mobx";
import { getRequest, postRequest } from "../../api";
import { customHistory } from "../router/router";
import { notifiStore } from "../toastNotification/component";
export interface IInput {
    name?: string,
    typeBank: string,
    bankNumber?: string,
    price?: string,
    file?: string,
    createUser?: string,
    phoneNumber?: string
}
interface IReqTransaction {
    transaction_detail: ITransactionnDetail[],
    transaction_order: {
        url: string,
        name: string,
    }

}
interface ITransactionnDetail {
    trans_type: string,
    trans_number: string,
    trans_amount: string,
    avg_reveived: string,
    name_receiver: string,
    phone_receiver: string
}
class Dashboard {
    @observable input: IInput[] = [{ name: undefined, phoneNumber: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined }];
    @observable url?: string;
    @observable name?: string;
    reqTransaction: IReqTransaction = { transaction_detail: [], transaction_order: { url: "", name: "" } };
    @observable isNameTransactionOrder: boolean = false;
    @observable errorInput: boolean = false;
    @observable showCreate: boolean = false;

}
class Control {
    store = new Dashboard();
    refresh() {
        this.store = new Dashboard();
    }
    showPopup() {
        let isNull = false;
        this.store.input.map((item, index) => {
            if (!item.bankNumber || !item.bankNumber || !item.price || !item.file || !item.name || !item.phoneNumber) {
                isNull = true;
            }
        });
        if (isNull || !this.store.url) {
            notifiStore.content = "Vui lòng nhập hết thông tin!";
            notifiStore.type = "Warning";
        }
        else {
            this.store.isNameTransactionOrder = true;
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
            if (!item.bankNumber || !item.bankNumber || !item.price || !item.file || !item.name || !item.phoneNumber) {
                isNull = true;
            }
            else {
                const data: ITransactionnDetail = {
                    avg_reveived: item.file,
                    trans_type: item.typeBank,
                    trans_amount: item.price,
                    trans_number: item.bankNumber,
                    name_receiver: item.name,
                    phone_receiver: item.phoneNumber
                };
                this.store.reqTransaction.transaction_detail.push(data);

            }
        });
        if (isNull || !this.store.url) {
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
                customHistory.replace("/transactionorder");
                this.refresh();
                // this.store.input = [{ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined }];
                // this.store.url = undefined;
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
            axios.post('http://localhost:4321/upload_file', formData, {
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
    async checkPhoneNumberZizi() {

    }

}
export const control = new Control();