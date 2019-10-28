import React from "react";
import ReactDOM from "react-dom";
import Login from './layouts/login'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";

import { isAuthenticated } from "./service/auth";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <AdminLayout {...props} />
      ) : (
        <Redirect to={{ pathname: "/denied", state: { from: props.location } }} />
      )
    }
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
