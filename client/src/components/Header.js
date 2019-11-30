import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TextField, FormControl } from "@material-ui/core";
import axios from "axios";

const login_url = "http://localhost:5000/login";
var qs = require("qs");

export default class Header extends React.Component {
  render() {
    const loginStatus = this.props.isLogin;
    let header;
    if (loginStatus) {
      header = (
        <div className={"header-login"}>
          {this.props.firstName} {this.props.lastName}
          <Button variant="contained" color="primary" onClick={props.logout}>
            Logout
          </Button>
        </div>
      );
    } else {
      header = (
        <FormControl fullWidth={true} margin={"normal"}>
          <div className={"header-login"}>
            <TextField
              name="firstName"
              placeholder="First Name"
              onChange={props.login}
            />
            <TextField
              name="lastName"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
            <Button onClick={this.handleLogin}>Login</Button>
          </div>
        </FormControl>
      );
    }

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">BBS</Typography>
          {header}
        </Toolbar>
      </AppBar>
    );
  }
}
