import { observer } from 'mobx-react';
import React from "react";
import styled from '@emotion/styled';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { control } from '../store';
import { Select, Button, Input } from 'antd';
import XLSX from 'xlsx';
import { notifiStore } from '../../toastNotification/component';
import { customHistory } from '../../router/router';
import CurrencyFormat from 'react-currency-format';
import NameTransactionOrder from '../popup/NameTransactionOrder';
const { Option } = Select;

@observer
export default class index extends React.Component {
    handleActionAdd() {
        control.store.input.push({ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined });
    }
    handleActionDetele(index: number) {
        control.store.input.splice(index, 1);
    }
    convertToJson = (headers: any, data: any) => {
        const rows: any = []
        data.forEach((row: any) => {
            let rowData: any = {}
            row.forEach((element: any, index: any) => {
                rowData[headers[index]] = element
            })
            rows.push(rowData)
        });
        return rows;
    }
    importExcel = (e: any) => {
        try {
            const file = e.target.files[0];
            if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                const reader = new FileReader()
                reader.onload = (event: any) => {
                    const bstr = event.target.result
                    const workBook = XLSX.read(bstr, { type: "binary" })
                    const workSheetName = workBook.SheetNames[0]
                    const workSheet = workBook.Sheets[workSheetName]
                    const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
                    const headers1 = ["name", "typeBank", "bankNumber", "price", "file", "createUser"]
                    fileData.splice(0, 1);
                    this.handleMapExcel(this.convertToJson(headers1, fileData));
                }
                reader.readAsBinaryString(file);
            }
            else {
                notifiStore.content = "Vui lòng chọn file excel có định dạng xlxs";
                notifiStore.type = "Error";
            }
        } catch (error) {

        }

    }
    handleMapExcel(data: any) {
        control.store.input = data;
    }
    async handleUploadFile(e: any) {
        const { status, body } = await control.uploadFile(e.target.files[0]);
        control.store.url = status === 200 ? body.url : "";
        console.log(body.url);

    }
    currencyFormat(num: string) {
        return num.split('').reverse().reduce((prev: any, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    render() {
        return (
            <div style={{ minHeight: "100vh", paddingTop: "60px", }} className={"bg-gray-300"}>
                <Wrap>
                    <input type="file" id="selectedFile" style={{ display: "none" }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.importExcel} />
                    <Button style={{ backgroundColor: "#059669", borderTopLeftRadius: "8px", marginBottom: "24px" }} onClick={() => document.getElementById("selectedFile")?.click()} type="primary">Import file excel

                    </Button>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className={"header-table"}>
                                <TableRow>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>STT</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số điện thoại</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Tên đại lý</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Loại tài khoản (Lựa chọn)</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tài khoản</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tiền</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tiền avg thực nhận (File đính kèm) </TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    control.store.input.map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Input value={item.phoneNumber} onChange={(e) => item.phoneNumber = e.target.value} placeholder={"Nhập số điện thoại"} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Input value={item.name} onChange={(e) => item.name = e.target.value} placeholder={"Nhập tên đại lý"} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Select style={{ width: "200px" }} onChange={(e) => item.typeBank = e} value={item.typeBank}>
                                                        <Option value="Zizi">ZiZi</Option>
                                                        <Option value="BSMS-airtime">BSMS-airtime</Option>
                                                    </Select>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Input value={item.bankNumber} onChange={(e) => item.bankNumber = e.target.value} placeholder={"Nhập số tài khoản"} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <CurrencyFormat style={{ boxSizing: "border-box", border: "1px solid #d9d9d9", borderRadius: "2px", padding: "4px 11px" }} value={item.price} placeholder={"Nhập số tiền"} onChange={(e: any) => item.price = e.target.value} thousandSeparator={true} />
                                                    {/* <input value={item.price && this.currencyFormat(item.price)} onChange={(e) => item.price = e.target.value} placeholder={"Nhập số tiền"} /> */}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <CurrencyFormat style={{ boxSizing: "border-box", border: "1px solid #d9d9d9", borderRadius: "2px", padding: "4px 11px" }} value={item.file} placeholder={"Nhập số tiền"} onChange={(e: any) => item.file = e.target.value} thousandSeparator={true} />
                                                    {/* <input value={item.file} onChange={(e) => item.file = e.target.value} placeholder={"Nhập số tiền"} /> */}
                                                </TableCell>
                                                < TableCell component="th" scope="row" > <Button onClick={() => this.handleActionDetele(index)} style={{ backgroundColor: "#DC2626" }} type="primary">Xoá</Button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <div style={{ marginTop: "36px", marginBottom: "12px" }}>
                        <Button onClick={() => this.handleActionAdd()} type="primary">Thêm</Button>
                    </div>
                    <input type="file" id="selectedFile1" style={{ display: "none" }} onChange={this.handleUploadFile} />
                    {
                        control.store.url ? <div>{control.store.url}
                            <Button onClick={() => document.getElementById("selectedFile1")?.click()} type="primary">Tải lại tờ trình
                            </Button></div>
                            :
                            <Button onClick={() => document.getElementById("selectedFile1")?.click()} type="primary">Tải lên tờ trình
                            </Button>
                    }

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "60px", paddingBottom: "24px" }}>
                        <Button style={{ backgroundColor: "#DC2626", marginRight: "24px", borderRadius: "4px" }} type="primary" onClick={() => customHistory.replace("/transactionorder")}>Huỷ</Button>
                        <Button style={{ borderRadius: "4px" }} type="primary" onClick={() => control.showPopup()}>Tạo đơn</Button>
                    </div>

                    <NameTransactionOrder />
                </Wrap >
            </div>
        )
    }
}
const Wrap = styled.div`
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border-radius: 8px;
    .header-table {
        background-color: #4B5563;
    }
`