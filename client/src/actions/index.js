import axios from "axios";

export const LOGIN = "LGOIN";
export const LOGOUT = "LOGOUT";
export const POST = "POST";
export const CONTENTS = "CONTENTS";

const ROUT_URL = "http://localhost:5000/";
const POST = "post";
const CONTENTS = "contents";

export const login = () => ({
  type: LOGIN
});

export const logout = () => ({
  type: LOGOUT
});

export const post = () => ({
  type: POST
});

export const contents = () => async dispatch => {
  const response = await axios.get(`${ROUT_URL}${CONTENTS}`);
  dispatch({ type: CONTENTS, response });
};
