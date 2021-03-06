import { observer } from 'mobx-react';
import React , { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from '@emotion/styled';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { control, IInput } from '../store';
import { Select, Button, Input, Modal } from 'antd';
import XLSX from 'xlsx';
import { notifiStore } from '../../toastNotification/component';
import { customHistory } from '../../router/router';
import CurrencyFormat from 'react-currency-format';
import NameTransactionOrder from '../popup/NameTransactionOrder';
import { getRequest1 } from '../../../api';
import moment from 'moment';
const { Option } = Select;

@observer
export default class index extends React.Component {
    state = {
        isRender: false
    }
    handleActionAdd() {
        control.store.input.push({ name: undefined, typeBank: "ZiZi", bankNumber: undefined, price: undefined, file: undefined, createUser: undefined });
    }
    handleActionDetele(index: number) {
        control.store.input.splice(index, 1);
    }
    convertToJson = (headers: any, data: any) => {
        const rows: any = []
        data.forEach((row: any) => {
            let rowData: any = {};
            row.map(async (item: any, index: any) => {
                rowData[headers[index]] = item;
            })
            rows.push(rowData);
            this.setState({ isRender: !this.state.isRender })
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
                    const headers1 = ["bankNumber", "name", "typeBank", "price", "file"]
                    fileData.splice(0, 1);
                    this.handleMapExcel(this.convertToJson(headers1, fileData));
                }
                reader.readAsBinaryString(file);
            }
            else {
                notifiStore.content = "Vui l??ng ch???n file excel c?? ?????nh d???ng xlxs";
                notifiStore.type = "Error";
            }
        } catch (error) {

        }
        finally {
            e.target.value = null;
        }

    }
    handleMapExcel(data: IInput[]) {
        control.store.input = data;
    }
    async handleUploadFile(e: any) {
        const { status, body } = await control.uploadFile(e.target.files[0]);
        control.store.url = status === 200 ? body.url : "";
        e.target.value = null;
    }
    render() {
        return (
            <Modal zIndex={100} width={1600} title={"T???o ????n h??ng m???i"} onCancel={() => control.store.showCreate = false} cancelText={"Hu???"} onOk={() => control.showPopup()} okText={"T???o ????n"} visible={control.store.showCreate}>
                <Wrap>
                    <input type="file" id="selectedFile" style={{ display: "none" }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.importExcel} />
                    <Button style={{ backgroundColor: "#059669", borderTopLeftRadius: "8px", marginBottom: "24px" }} onClick={() => document.getElementById("selectedFile")?.click()} type="primary">Import file excel</Button>
                    <div style={{ display: "flex", flexDirection: "row", width: "500px", alignItems: "center", margin: "12px" }}>
                        <span style={{ width: "150px" }}>T??n ????n h??ng</span>
                        <div>
                            <Input value={control.store.name} placeholder={"Vui l??ng nh???p t??n ????n h??ng"} height={20} width={100} onChange={(e) => { control.store.errorInput = false; control.store.name = e.target.value }} />
                            {control.store.errorInput && <div style={{ color: "red" }}>Vui l??ng nh???p t??n</div>}
                        </div>

                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className={"header-table"}>
                                <TableRow>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>STT</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>S??? t??i kho???n</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>T??n ?????i l??</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Lo???i t??i kho???n (L???a ch???n)</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>S??? ti???n c???p cho ?????i l??</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>S??? ti???n avg th???c nh???n</TableCell>
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
                                                    <Input value={item.bankNumber} onChange={(e) => { item.bankNumber = e.target.value; item.bankNumber.length >= 10 && control.checkPhoneNumberZizi(item.bankNumber, index) }} placeholder={"Nh???p s??? t??i kho???n"} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <div style={{ boxSizing: "border-box", border: "1px solid #d9d9d9", borderRadius: "2px", padding: "4px 11px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        {
                                                            item.name
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Select style={{ width: "200px" }} onChange={(e) => item.typeBank = e} value={item.typeBank}>
                                                        <Option value="Zizi">ZiZi</Option>
                                                        <Option value="BSMS-airtime">BSMS-airtime</Option>
                                                    </Select>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Input value={item.price} placeholder={"Nh???p s??? ti???n"} onChange={(e: any) => item.price = e.target.value} />
                                                    {/* <input value={item.price && this.currencyFormat(item.price)} onChange={(e) => item.price = e.target.value} placeholder={"Nh???p s??? ti???n"} /> */}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Input value={item.file} placeholder={"Nh???p s??? ti???n"} onChange={(e: any) => item.file = e.target.value} />
                                                    {/* <input value={item.file} onChange={(e) => item.file = e.target.value} placeholder={"Nh???p s??? ti???n"} /> */}
                                                </TableCell>
                                                < TableCell component="th" scope="row" > <Button onClick={() => this.handleActionDetele(index)} style={{ backgroundColor: "#DC2626" }} type="primary">Xo??</Button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <div style={{ marginTop: "36px", marginBottom: "12px" }}>
                        <Button onClick={() => this.handleActionAdd()} type="primary">Th??m</Button>
                    </div>
                    <input type="file" id="selectedFile1" style={{ display: "none" }} onChange={this.handleUploadFile} />
                    {
                        control.store.url ? <div>{control.store.url}
                            <Button onClick={() => document.getElementById("selectedFile1")?.click()} type="primary">T???i l???i t??? tr??nh
                            </Button></div>
                            :
                            <Button onClick={() => document.getElementById("selectedFile1")?.click()} type="primary">T???i l??n t??? tr??nh
                            </Button>
                    }
                    <NameTransactionOrder />
                </Wrap >
            </Modal >
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