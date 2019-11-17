import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const post_url = "http://localhost:5000/post";
const contents_url = "http://localhost:5000/contents";

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

  handle;
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

class Header extends React.Component {
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
        <div class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          <div class="navbar-brand nav-title box">
            {this.props.firstName} {this.props.lastName}
          </div>
          <button className="btn btn-success" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      header = (
        <form
          onSubmit={this.handleLogin}
          className="navbar-nav flex-row ml-md-auto d-none d-md-flex"
        >
          <input
            type="text"
            name="firstName"
            className="form-control mr-sm-2"
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="lastName"
            className="form-control mr-sm-2"
            placeholder="Last Name"
            onChange={this.handleChange}
          />
          <input
            type="submit"
            className="btn btn-success my-2 my-sm-0"
            value="Login"
          />
        </form>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary boxContainer">
        <a className="navbar-brand nav-title box" href="#">
          BBS
        </a>
        {header}
      </nav>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      contents: []
    };
  }
  handleSubmit = e => {
    var qs = require("qs");
    var text = this.state.text;
    this.setState({ text: "" });
    axios.post(
      post_url,
      qs.stringify({
        name: this.props.firstName + " " + this.props.lastName,
        text: text
      })
    );
    this.get_contents();
    e.preventDefault();
  };

  onChangeText = e => {
    const text = e.target.value;
    this.setState({ text: text });
    e.preventDefault();
  };

  get_contents() {
    axios.get(contents_url).then(response => {
      this.setState({ contents: JSON.parse(response.data) });
    });
  }

  componentDidMount() {
    this.get_contents();
    setInterval(() => this.get_contents(), 5000);
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="row mt-3">
            <Card contents={this.state.contents} />

            <div className="col-md-4 col-sm-6 col-6">
              <form>
                <div className="form-group">
                  <label>投稿</label>
                  <textarea
                    className="form-control"
                    name="text"
                    row="3"
                    max="300"
                    required
                    onChange={this.onChangeText}
                    readOnly={this.props.isLogin === false ? "readonly" : ""}
                    value={this.state.text}
                  ></textarea>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="投稿"
                  onClick={this.handleSubmit}
                  disabled={this.props.isLogin === false ? "disabled" : ""}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function Card(props) {
  const contents = props.contents.map(data => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <div className="card-text">{data.text}</div>
        <div className="blockquote-footer">{data.date}</div>
      </div>
    </div>
  ));
  return <div className="col-md-8 col-sm-6 box_scrollbar">{contents}</div>;
}

function Footer() {
  return (
    <footer className="footer bg-primary footer-expand-lg footer-light py-3 mt-5 mb-auto">
      <div className="container text-center">
        <div className=" pl-1 nav-title">BBS</div>
      </div>
    </footer>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
