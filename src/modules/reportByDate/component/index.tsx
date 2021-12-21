import styled from "@emotion/styled";
import { Component } from "react";
import { control } from "../store";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import moment from "moment";
import { observer } from "mobx-react";
@observer
export default class index extends Component<any> {
    componentDidMount() {
        control.store.fromDate = this.props.match.params.fromDate;
        control.store.toDate = this.props.match.params.toDate;
        control.getListReport();
        console.log(this.props.match.params.fromDate)
    }
    render() {
        return (
            <div style={{ maxWidth: "1500", marginRight: "auto", marginLeft: "auto" }}>
                <div style={{ marginTop: "36px", marginLeft: "24px", marginBottom: "24px" }}>
                    <div style={{ fontWeight: "bold" }}>CÔNG TY CỔ PHẦN NGHE NHÌN TOÀN CẦU</div>
                    <div style={{ fontWeight: "bold" }}>Phòng: <span style={{ fontWeight: "unset" }}>Công nghệ</span></div>
                    <div style={{ fontWeight: "bold", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>Phiếu xác nhận nạp tiền</div>
                </div>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className={"header-table"}>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Mã giao dịch</TableCell>
                                <TableCell>Số tiền giao dịch</TableCell>
                                <TableCell>Tên người nhận</TableCell>
                                <TableCell>Số tiền AVG thực nhận</TableCell>
                                <TableCell>Loại giao dịch</TableCell>
                                <TableCell>Số điện thoại người nhận</TableCell>
                                <TableCell>Mã đối tác</TableCell>
                                <TableCell>Người tạo đơn</TableCell>
                                <TableCell>Ngày tạo đơn</TableCell>
                                <TableCell>Trưởng bộ phận yêu cầu</TableCell>
                                <TableCell>Trưởng phòng kế toán</TableCell>
                                <TableCell>Tên đơn hàng</TableCell>
                                <TableCell>Trạng thái đơn hàng</TableCell>
                                <TableCell>Ngày lập hóa đơn</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                control.store.listReportByDate && control.store.listReportByDate.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">{item.transNumber}</TableCell>
                                            <TableCell component="th" scope="row">{item.transAmount.toLocaleString()}</TableCell>
                                            <TableCell component="th" scope="row">{item.receiverFullName}</TableCell>
                                            <TableCell component="th" scope="row">{item.avgReveived.toLocaleString()}</TableCell>
                                            <TableCell component="th" scope="row">{item.transType}</TableCell>
                                            <TableCell component="th" scope="row">{item.phoneNumber}</TableCell>
                                            <TableCell component="th" scope="row">{item.refCode}</TableCell>
                                            <TableCell component="th" scope="row">{item.createUser}</TableCell>
                                            <TableCell component="th" scope="row">{item.createDate}</TableCell>
                                            <TableCell component="th" scope="row">{item.saleLeader}</TableCell>
                                            <TableCell component="th" scope="row">{item.chiefOfFinancial}</TableCell>
                                            <TableCell component="th" scope="row">{item.orderName}</TableCell>
                                            <TableCell component="th" scope="row">{item.stateOfTrans}</TableCell>
                                            <TableCell component="th" scope="row">{item.currentDate}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
                <div style={{ display: "flex", justifyContent: "space-between", margin: "48px" }}>
                    <div>
                        <div>
                            Người lập phiếu
                        </div>
                        <div>
                            (Ký ghi rõ họ tên)
                        </div>
                    </div>
                    <div>
                        <div>
                            Nhân viên đề xuất
                        </div>
                        <div>
                            (Ký ghi rõ họ tên)
                        </div>
                    </div>
                    <div>
                        <div>
                            Phụ trách phòng công nghệ
                        </div>
                        <div>
                            (Ký ghi rõ họ tên)
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}