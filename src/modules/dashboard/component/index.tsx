import { observer } from 'mobx-react';
import React from "react";
import styled from '@emotion/styled';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { control } from '../store';
import { Select, Button } from 'antd';
import XLSX from 'xlsx';
import { notifiStore } from '../../toastNotification/component';
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

    render() {
        return (
            <Wrap>

                <input type="file" id="selectedFile" style={{ display: "none" }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.importExcel} />
                <Button style={{ backgroundColor: "#e60101" }} onClick={() => document.getElementById("selectedFile")?.click()} type="primary">Import file excel

                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className={"header-table"}>
                            <TableRow>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>STT</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Tên đại lý</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Loại tài khoản (Lựa chọn)</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tài khoản</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tiền</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tiền avg thực nhận (File đính kèm) </TableCell>
                                {/* <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Người tạo</TableCell> */}
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
                                                {/* {
                                                    item.name ? item.name : 
                                                } */}
                                                <input onChange={(e) => item.name = e.target.value} placeholder={"Nhập tên đại lý"} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Select style={{ width: "200px" }} onChange={(e) => item.typeBank = e} value={item.typeBank}>
                                                    <Option value="Zizi">ZiZi</Option>
                                                    <Option value="BSMS-airtime">BSMS-airtime</Option>
                                                </Select>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {/* {
                                                    item.bankNumber ? item.bankNumber : 
                                                } */}
                                                <input onChange={(e) => item.bankNumber = e.target.value} placeholder={"Nhập số tài khoản"} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {/* {
                                                    item.price ? item.price : 
                                                } */}
                                                <input onChange={(e) => item.price = e.target.value} placeholder={"Nhập số tiền"} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {/* {
                                                    item.file ? item.file : 
                                                } */}
                                                <input onChange={(e) => item.file = e.target.value} placeholder={"Nhập số tiền"} />
                                            </TableCell>
                                            {/* <TableCell component="th" scope="row">
                                                <input onChange={(e) => item.createUser = e.target.value} placeholder={"Nhập tên người tạo"} />
                                            </TableCell> */}
                                            < TableCell component="th" scope="row" > <Button onClick={() => this.handleActionDetele(index)} style={{ backgroundColor: "#DC2626" }} type="primary">Xoá</Button></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
                <input type="file" id="selectedFile1" style={{ display: "none" }} onChange={this.handleUploadFile} />
                {
                    control.store.url ? <div>{control.store.url}
                        <Button onClick={() => document.getElementById("selectedFile1")?.click()} type="primary">Tải lại tờ trình
                        </Button></div>
                        :
                        <Button onClick={() => document.getElementById("selectedFile1")?.click()} type="primary">Tải lên tờ trình
                        </Button>
                }


                <div>

                    {/* <Button type="primary">Tải lên file</Button> */}
                    <Button onClick={() => this.handleActionAdd()} type="primary">Thêm</Button>
                    <Button type="primary" onClick={() => control.createTranstion()}>Tạo đơn</Button>
                </div>
            </Wrap >
        )
    }
}
const Wrap = styled.div`
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    .header-table {
        background-color: #4B5563;
    }
`