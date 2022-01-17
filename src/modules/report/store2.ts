import { observable } from "mobx";
import { getRequest } from "../../api";
interface IResOrderInfo {
    createdBy: string
    oderName: string
}
class Store {
    id: string = "";
    @observable orderInfo?: IResOrderInfo[];
}
class Control {
    store = new Store();
    async getOrderdetail() {
        const { status, body } = await getRequest("orderdetail?id=" + this.store.id);
        this.store.orderInfo = status === 200 ? body : undefined;
        console.log(this.store.orderInfo);
        // window.open("https://www.w3schools.com");

    }
}
export const control2 = new Control();