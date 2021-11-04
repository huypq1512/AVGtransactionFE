import { observable } from "mobx";
import { getRequest } from "../../api";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
interface IResReport {
    avgReveived: string
    confirmAccountant: string
    confirmFees: string
    date: string
    nameAgency: string
    transAmount: string
    transNumber: string
    typeTrans: string,
    codeWallet: string,
}
interface IExportExcel {
    "Tên đại lý": string,
    "Số tài khoản": string,
    "Loại tài khoản": string,
    "Số tiền giao dịch": string,
    "Mã giao dịch": string,
    "Xác nhận của trưởng bộ phận yêu cầu": string,
    "Xác nhận của trưởng phòng kế toán": string,
    "Ngày thực hiện": string
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
        this.getListReport().then(() => {
            if (this.store.listReport) {
                let reListReport: IExportExcel[] = [];
                this.store.listReport.map((item, index) => {
                    const temp: IExportExcel = {
                        "Tên đại lý": item.nameAgency,
                        "Số tài khoản": item.transNumber,
                        "Loại tài khoản": item.typeTrans,
                        "Số tiền giao dịch": item.transAmount,
                        "Mã giao dịch": "chua co",
                        "Xác nhận của trưởng bộ phận yêu cầu": item.confirmFees,
                        "Xác nhận của trưởng phòng kế toán": item.confirmAccountant,
                        "Ngày thực hiện": moment(item.date).format("DD/MM/yyyy")
                    }
                    reListReport.push(temp);
                })
                const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const fileExtension = '.xlsx';
                const ws = XLSX.utils.json_to_sheet(reListReport);
                console.log(ws);
                const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const data = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(data, "test" + fileExtension);
            }
        })
    }
}
export const control = new Control();