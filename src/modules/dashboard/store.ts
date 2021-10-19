import axios from "axios";
import { observable } from "mobx";
import { getRequest, postRequest } from "../../api";
import { notifiStore } from "../toastNotification/component";
export interface IInput {
    name?: string,
    typeBank: string,
    bankNumber?: string,
    price?: string,
    file?: string,
    createUser?: string
}
interface IReqTransaction {
    transaction_detail: ITransactionnDetail[],
    transaction_order: {
        url: string,
    }

}
interface ITransactionnDetail {
    trans_type: string,
    trans_number: string,
    trans_amount: string,
    avg_reveived: string
}
class Dashboard {
    @observable input: IInput[] = [{ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined }];
    @observable url?: string;
    reqTransaction: IReqTransaction = { transaction_detail: [], transaction_order: { url: "" } };

}
class Control {
    store = new Dashboard();
    async createTranstion() {
        this.store.reqTransaction = { transaction_detail: [], transaction_order: { url: "" } };
        let isNull = false;
        this.store.input.map((item, index) => {
            if (!item.bankNumber || !item.bankNumber || !item.price || !item.file) {
                isNull = true;
            }
            else {
                const data: ITransactionnDetail = {
                    avg_reveived: item.file,
                    trans_type: item.typeBank,
                    trans_amount: item.price,
                    trans_number: item.bankNumber
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
            const { status, body } = await postRequest("transaction", true, this.store.reqTransaction);
            if (status === 200) {
                notifiStore.content = body.message;
                this.store.input = [{ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined }];
                this.store.url = undefined;
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
                    'Content-Type': 'multipart/form-data'
                }
            }).then((next) => {
                resolve({
                    status: 200,
                    body: next.data
                })
            })


        })

    }
}
export const control = new Control();