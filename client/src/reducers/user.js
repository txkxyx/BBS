import { LOGIN, LOGOUT } from "../actions";

const initialState = { id: "", password: "" };

export default (state = initialState, action) => {
  const type = action.type;
  switch (type) {
    case LOGIN:
      return { id: state.id, password: state.password };
    case LOGOUT:
      return { id: "", password: "" };
    default:
      break;
  }
};
