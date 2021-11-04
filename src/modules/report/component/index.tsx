import styled from "@emotion/styled";
import { Component } from "react";
import { control } from "../store";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import moment from "moment";
import { observer } from "mobx-react";
@observer
export default class index extends Component<any> {
    componentDidMount() {
        control.store.id = this.props.match.params.id;
        control.getListReport();
    }
    render() {
        return (
            <div style={{ maxWidth: "1400px", marginRight: "auto", marginLeft: "auto" }}>
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
                                <TableCell>Tên đại lý</TableCell>
                                <TableCell>Số tài khoản người nhận</TableCell>
                                <TableCell>Loại tài khoản</TableCell>
                                <TableCell>Số tiền giao dịch</TableCell>
                                <TableCell>Tiền avg thực nhận</TableCell>
                                <TableCell>Mã giao dịch</TableCell>
                                <TableCell>Xác nhận của trưởng bộ phận yêu cầu</TableCell>
                                <TableCell>Xác nhận của trưởng phòng kế toán</TableCell>
                                <TableCell>Ngày thực hiện</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                control.store.listReport && control.store.listReport.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">{item.nameAgency}</TableCell>
                                            <TableCell component="th" scope="row">{item.transNumber}</TableCell>
                                            <TableCell component="th" scope="row">{item.typeTrans}</TableCell>
                                            <TableCell component="th" scope="row">{item.transAmount}</TableCell>
                                            <TableCell component="th" scope="row">{item.avgReveived}</TableCell>
                                            <TableCell component="th" scope="row">{item.codeWallet}</TableCell>
                                            <TableCell component="th" scope="row">{item.confirmFees}</TableCell>
                                            <TableCell component="th" scope="row">{item.confirmAccountant}</TableCell>
                                            <TableCell component="th" scope="row">{moment(item.date).format("DD/MM/yyyy")}</TableCell>
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