import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Main from "./Main";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import maincss from "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      firstName: "",
      lastName: ""
    };
  }

  handleChangeFirstName = firstName => {
    this.setState({ firstName: firstName });
  };

  handleChangeLastName = lastName => {
    this.setState({ lastName: lastName });
  };

  handleChangeIsLogin = status => {
    this.setState({ isLogin: status });
  };
  render() {
    return (
      <div>
        <Header
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          isLogin={this.state.isLogin}
          onChangeFirstName={this.handleChangeFirstName}
          onChangeLastName={this.handleChangeLastName}
          onChangeIsLogin={this.handleChangeIsLogin}
        />
        <Main
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          isLogin={this.state.isLogin}
        />
        <Footer />
      </div>
    );
  }
}

function Footer() {
  return (
    <footer>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ margin: "auto" }}>BBS</Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
