import { CONTENTS } from "../actions";

export default (state = {}, action) => {
  if (action.type === CONTENTS) {
    return { contents: state.contents };
  }
};
