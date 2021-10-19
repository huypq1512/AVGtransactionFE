import {
  Switch,
  Route
} from "react-router-dom";
import { Redirect, Router } from "react-router";
import Login from "../authen/login";
import Dashboard from "../dashboard/component";
import BillDepartment from "../BillDepartment/component";
import { createBrowserHistory } from "history";
export const customHistory = createBrowserHistory();
export interface IRouterParam {
  history: any,
  match: {
    params: {
      id: string
    }
  }
}
export default function App() {
  return (
    <Router history={customHistory}>
      <Switch >
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/billdepartment/:id" component={BillDepartment} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/login" />
            )
          }}
        />
      </Switch>
    </Router>

  )
}