import { Component } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { control } from "../store";
import { Button, Input } from "antd";
import { baseURL } from "../../../api";
@observer
export default class index extends Component<any> {
    componentDidMount() {
        control.store.id = this.props.match.params.id;
        control.getListTransaction();
    }
    render() {
        return (
            <Wrap>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className={"header-table"}>
                            <TableRow>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>STT</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Tên đại lý</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Loại tài khoản (Lựa chọn)</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tài khoản</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tiền</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Số tiền avg thực nhận</TableCell>
                                <TableCell style={{ color: "#D1D5DB" }} className={"headerTable"}>Người tạo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                control.store.listTransaction && control.store.listTransaction.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">{item.receiverFullName}</TableCell>
                                            <TableCell component="th" scope="row">{item.transType}</TableCell>
                                            <TableCell component="th" scope="row">{item.transNumber}</TableCell>
                                            <TableCell component="th" scope="row">{item.transAmount}</TableCell>
                                            <TableCell component="th" scope="row">{item.avgReveived}</TableCell>
                                            <TableCell component="th" scope="row">{item.createUser}</TableCell>
                                        </TableRow>


                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
                <div>File tờ trình <a href={baseURL + control.store.linkFile}>Tải xuống để xem</a></div>
                {
                    control.store.state === "PENDING" &&
                    <div style={{ marginTop: "12px" }}>
                        {
                            control.store.isSpam ?
                                <Button style={{ width: "200px" }} type="link"  >{control.store.timeSpam}</Button> :
                                <Button style={{ width: "200px" }} type="link" onClick={() => control.sendOtp("pc")}>Gửi lại mã xác nhận</Button>
                        }

                        <Input placeholder={"Vui lòng nhập mã xác nhận"} style={{ width: "200px" }} onChange={(e) => control.store.otp = e.target.value} />
                        <Button type="primary" onClick={() => control.confirmFees()}>Duyệt đơn hàng</Button>
                    </div>
                }
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