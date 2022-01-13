import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from '@emotion/styled';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { control } from "../store";
import { control as controlAuth } from "../../authen/store";
import { control as controlCreate } from "../../dashboard/store";
import moment from "moment";
import { observer } from "mobx-react";
import { Button } from "antd";
import { customHistory } from "../../router/router";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CreateTransaction from "../../dashboard/component"
import { baseURL, baseURLFE } from "../../../api";
import { control as controlReport } from "../../report/store";
// const [_startDate, setStartDate] = useState(new Date())
// const [_endDate, setEndDate] = useState(new Date())

@observer
export default class index extends React.Component {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        control.getListTransactionOrder();
        control.getUserDetail();
    }
    handlNextPage() {
        control.store.page += 1;
        control.getListTransactionOrder();
    }
    handleBackPage() {
        control.store.page -= 1;
        control.getListTransactionOrder();
    }
    handleSearch() {
        window.open(baseURLFE + `reportByDate/${moment(this.state.startDate).format("YYYY-MM-DD")}/${moment(this.state.endDate).format("YYYY-MM-DD")}`)
    }
    state = {
        startDate: new Date,
        endDate: new Date,
        // currentDate: new Date
    }
    render() {
        return (
            <div style={{ backgroundColor: "#f5f0f1" }} >
                <Wrap >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "36px" }}>
                        {
                            control.store.userDetail && control.store.userDetail.departmentCode === "nv" &&
                            <Button style={{ borderRadius: "4px" }} onClick={() => controlCreate.store.showCreate = true}>Tạo đơn mới</Button>
                        }

                        <button style={{ borderRadius: "4px" }} className="bg-red-500 hover:bg-red-700 text-logout " onClick={() => controlAuth.logout()}>Logout</button>
                    </div>

                    <div style={{alignItems: "left", paddingTop: "36px" }}>
                        <div style={{borderRadius: "4px",alignItems: "left", background : "white", width: "70px"}}>Từ ngày</div>
                        <DatePicker style={{ alignItems: "center", borderRadius: "4px",paddingTop: "12px", width: "70px"}} selected={(this.state.startDate)} onChange={(e) =>  this.setState({ startDate: e})} ></DatePicker>
                        <div style={{borderRadius: "4px",alignItems: "left", background : "white", width: "70px"}}>Đến ngày</div>
                        <DatePicker style={{ alignItems: "center", borderRadius: "4px" ,paddingTop: "12px" }} selected={(this.state.endDate)} onChange={(e) =>  this.setState({ endDate: e})} ></DatePicker>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "left"/*, paddingTop: "36px" */ }}>
                        {
                            <Button style={{ borderRadius: "4px",background : "#2eb82e" }} onClick={() => this.handleSearch()}>Xuất báo cáo</Button>
                        }
                        <div />
                    </div>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className={"header-table"}>
                                <TableRow>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>STT</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Tên đơn hàng</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Ngày tạo</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Người tạo</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Trạng thái</TableCell>
                                    <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (control.store.listTransactionOrder && control.store.listTransactionOrder.length > 0) ? control.store.listTransactionOrder.map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {moment(item.createTime).format("DD/MM/yyyy")}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {item.createUser}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {item.state === "PENDING" ? "Đợi phòng cước duyệt" : item.state === "CONFIRMOFFEES" ? "Đợi phòng kế toán duyệt" : item.state === "CONFIRMOFACOUNTANT" ? "Đã xong" : item.state === "REJECT" ? "Từ chối" : "Đợi duyệt"}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Button onClick={() => window.open(baseURLFE + "report/" + item.id)}>Chi tiết</Button>
                                                    {/* Sửa chức năng chi tiết sau */}
                                                    <Button onClick={() => { controlReport.store.id = item.id; controlReport.exportExcel() }}>Xuất excel</Button>
                                                    {
                                                        item.state !== "CONFIRMOFACOUNTANT" && <Button onClick={() => control.reSendConfirm(item.state, item.id)}>Duyệt đơn hàng</Button>
                                                    }

                                                </TableCell>
                                            </TableRow>
                                        )

                                    })
                                        : <div style={{ height: "400px" }}>Chưa có dữ liệu</div>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        {
                            control.store.page > 0 &&
                            <Button style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => this.handleBackPage()}>
                                <LeftOutlined />
                            </Button>
                        }

                        <span style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>{control.store.page + 1}</span>
                        <Button style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => this.handlNextPage()}>
                            <RightOutlined />
                        </Button>
                    </div>
                    <CreateTransaction />
                </Wrap>
            </div>

        )
    }
}
const Wrap = styled.div`
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    min-height: 100vh;
    .header-table {
        background-color: #4B5563;
    }
    .text-logout {
        color:  #ffffff;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-right: 8px;
        padding-left: 8px;
    }
`