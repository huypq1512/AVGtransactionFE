import React from 'react';
import './App.css';
import Redirect, { customHistory } from "./modules/router/router";
import { observer } from 'mobx-react';
import styled from "@emotion/styled";
import Loading from "./modules/loading";
import ToastNotification from "./modules/toastNotification/component";
import 'antd/dist/antd.css';
@observer
class App extends React.Component {
  render() {
    return (
      <WrapApp >
        <Redirect />
        <Loading />
        <ToastNotification />
      </WrapApp>
    );
  }
}
const WrapApp = styled.div`

`
export default App;
