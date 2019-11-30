import React from "react";
import ReactDOM from "react-dom";
import createStore from "redux";
// 全ての階層のコンポーネントからStoreを閲覧できるようにする
import { Provider, connect } from "react-redux";
import reducer from "./reducers";
import { Header, Main } from "./components";
import { login, logout } from "./actions";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import maincss from "./main.css";

const store = createStore(reducer);

class App extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        <Header id={props.id} login={props.login} logout={props.logout} />
        <Main id={props.id} />
        <Footer />
      </div>
    );
  }
}

// StateとReducerを紐付ける
const mapStateToProps = state => ({ id: state.user.is });
// StateとActionを紐づける
const mapDispatchToProps = { login, logout };
export default connect(mapStateToProps, mapDispatchToProps)(App);

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
