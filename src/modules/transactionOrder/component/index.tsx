import React from "react";
import styled from '@emotion/styled';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { control } from "../store";
import { control as controlAuth } from "../../authen/store";
import moment from "moment";
import { observer } from "mobx-react";
import { Button } from "antd";
import { customHistory } from "../../router/router";
@observer
export default class index extends React.Component {
    componentDidMount() {
        control.getListTransactionOrder();
    }
    render() {
        return (
            <Wrap>
                <Button style={{ backgroundColor: "#e60101" }} onClick={() => controlAuth.logout()}>Logout</Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className={"header-table"}>
                            <TableRow>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>STT</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>ID</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>File tờ trình</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Người tạo</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Thời gian tạo</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                control.store.listTransactionOrder && control.store.listTransactionOrder.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.id}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <a href={"http://localhost:4321/" + item.attachedFile}>Tải xuống để xem</a>
                                                {/* {item.attachedFile} */}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.createUser}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {/* {
                                                    item.createTime
                                                } */}
                                                {moment(Number(item.createTime)).format("DD/MM/YYYY HH:MM:SS")}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.state === "PENDING" ? "Đợi phòng cước duyệt" : item.state === "CONFIRMOFFEES" ? "Đợi phòng kế toán duyệt" : item.state === "CONFIRMOFACOUNTANT" ? "Đã xong" : item.state === "REJECT" ? "Từ chối" : "Đợi duyệt"}
                                            </TableCell>
                                        </TableRow>
                                    )

                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
                <Button onClick={() => customHistory.replace("/dashboard")}>Tạo đơn mới</Button>
            </Wrap>
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