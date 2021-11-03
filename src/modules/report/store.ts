import { observable } from "mobx";
import { getRequest } from "../../api";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
interface IResReport {
    avgReveived: string
    confirmAccountant: string
    confirmFees: string
    date: string
    nameAgency: string
    transAmount: string
    transNumber: string
    typeTrans: string
}
class Store {
    id: string = "349ab5ca-f4d8-405f-a429-e3de618ad549";
    @observable listReport?: IResReport[];
}
class Control {
    store = new Store();
    async getListReport() {
        const { status, body } = await getRequest("report?id=" + this.store.id);
        this.store.listReport = status === 200 ? body : undefined;
        // window.open("https://www.w3schools.com");

    }
    exportExcel() {
        if (this.store.listReport) {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const ws = XLSX.utils.json_to_sheet(this.store.listReport);
            console.log(ws);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "test" + fileExtension);
        }

    }
}
export const control = new Control();