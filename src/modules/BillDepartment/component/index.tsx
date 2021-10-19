import { Component } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { control } from "../store";
import { Button } from "antd";
@observer
export default class index extends Component<any> {
    componentDidMount() {
        control.getListTransaction(this.props.match.params.id)

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
                                control.store.listTransaction.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">chưa có</TableCell>
                                            <TableCell component="th" scope="row">{item.transType}</TableCell>
                                            <TableCell component="th" scope="row">{item.transNumber}</TableCell>
                                            <TableCell component="th" scope="row">{item.transAmount}</TableCell>
                                            <TableCell component="th" scope="row">{item.avgReveived}</TableCell>
                                            <TableCell component="th" scope="row">{item.receiverFullName}</TableCell>
                                        </TableRow>


                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
                <Button type="primary">Xác nhận</Button>
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