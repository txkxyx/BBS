import React from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";

const post_url = "http://localhost:5000/post";
const contents_url = "http://localhost:5000/contents";

var qs = require("qs");

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      contents: []
    };
  }
  handleSubmit = e => {
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
      this.setState({ contents: response.data });
    });
  }

  componentDidMount() {
    this.get_contents();
    setInterval(() => this.get_contents(), 5000);
  }

  render() {
    return (
      <main>
        <Container fixed>
          <Grid container spacing={3}>
            <Content contents={this.state.contents} />
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth={true} margin={"normal"}>
                <TextField
                  rows={3}
                  max={300}
                  label={"投稿"}
                  margin="normal"
                  required={true}
                  variant="outlined"
                  multiline={true}
                  onChange={this.onChangeText}
                  disabled={this.props.isLogin === false ? true : false}
                  value={this.state.text}
                ></TextField>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  disabled={this.props.isLogin === false ? true : false}
                >
                  投稿
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

function Content(props) {
  const contents = props.contents.map(data => (
    <div className={"content-body"}>
      <div className={"content-name inline-content"}>{data.name}</div>
      <div className={"content-date inline-content"}>{data.insert_date}</div>
      <div className={"content-text"}>{data.text}</div>
    </div>
  ));

  return (
    <Grid item xs={12} sm={8}>
      <div className={"contents"}>{contents}</div>
    </Grid>
  );
}
