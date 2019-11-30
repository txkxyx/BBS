import { POST } from "../actions";

const initialState = { text: "" };

export default (state = initialState, action) => {
  if (action.type == POST) {
    return { value: state.value };
  }
};
