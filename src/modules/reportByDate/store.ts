import { observable } from "mobx";
import { getRequest } from "../../api";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
interface IResReportByDate {
    transNumber: string,
    transAmount: number,
    receiverFullName: string,
    avgReveived: number,
    transType: string,
    phoneNumber: string,
    refCode: string,
    createUser: string,
    createDate: Date,
    chiefOfFinancial: string,
    saleLeader: string,
    orderName: string,
    stateOfTrans: string,
    currentDate: Date,
}
interface IExportExcelByDate {
    "Mã giao dịch": string,
    "Số tiền giao dịch": string,
    "Tên người nhận": string,
    "Số tiền AVG thực nhận": string,
    "Loại giao dịch": string,
    "Số điện thoại người nhận": string,
    "Mã đối tác": string,
    "Người tạo đơn": string,
    "Ngày tạo đơn": Date,
    "Trưởng bộ phận cước": string,
    "Trưởng phòng kế toán": string,
    "Tên đơn hàng": string,
    "Trạng thái đơn hàng": string,
    "Ngày lập hóa đơn": Date
}
class Store {
    fromDate: string = "2021-01-01";
    toDate: string = "2021-02-01";
    
    @observable listReportByDate?: IResReportByDate[];
}
class Control {
    store = new Store();
    async getListReport() {
        const { status, body } = await getRequest("transactionbetween?fromdate=" + this.store.fromDate + "&todate=" + this.store.toDate);
        this.store.listReportByDate = status === 200 ? body.transactionDetail : undefined;

    }
    exportExcel() {
        this.getListReport().then(() => {
            if (this.store.listReportByDate) {
                let reListReport: IExportExcelByDate[] = [];
                this.store.listReportByDate.map((item, index) => {
                    const temp: IExportExcelByDate = {
                        "Mã giao dịch": item.transNumber,
                        "Số tiền giao dịch": item.transAmount.toLocaleString(),
                        "Tên người nhận": item.receiverFullName,
                        "Số tiền AVG thực nhận": item.avgReveived.toLocaleString(),
                        "Loại giao dịch": item.transType,
                        "Số điện thoại người nhận": item.phoneNumber,
                        "Mã đối tác": item.refCode,
                        "Người tạo đơn": item.createUser,
                        "Ngày tạo đơn": item.createDate,
                        "Trưởng bộ phận cước": item.saleLeader,
                        "Trưởng phòng kế toán": item.chiefOfFinancial,
                        "Tên đơn hàng": item.orderName,
                        "Trạng thái đơn hàng": item.stateOfTrans,
                        "Ngày lập hóa đơn": item.currentDate
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
                FileSaver.saveAs(data, moment().format("DD-MM-yyyy") + fileExtension);
            }
        })
    }
}
export const control = new Control();