import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TextField } from "@material-ui/core";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.firstName,
      lastName: props.lastName
    };
  }

  handleLogin = e => {
    this.props.onChangeFirstName(this.state.firstName);
    this.props.onChangeLastName(this.state.lastName);
    this.props.onChangeIsLogin(true);
    e.preventDefault();
  };

  handleLogout = e => {
    this.props.onChangeFirstName("");
    this.props.onChangeLastName("");
    this.props.onChangeIsLogin(false);
  };

  handleChange = event => {
    switch (event.target.name) {
      case "firstName":
        this.setState({
          firstName: event.target.value
        });
        break;
      case "lastName":
        this.setState({
          lastName: event.target.value
        });
        break;
      default:
        break;
    }
  };

  render() {
    const loginStatus = this.props.isLogin;
    let header;
    if (loginStatus) {
      header = (
        <div className={"header-login"}>
          {this.props.firstName} {this.props.lastName}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      header = (
        <div className={"header-login"}>
          <TextField
            name="firstName"
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <TextField
            name="lastName"
            placeholder="Last Name"
            onChange={this.handleChange}
          />
          <Button onClick={this.handleLogin}>Login</Button>
        </div>
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
