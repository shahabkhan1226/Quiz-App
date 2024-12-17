import { CHANGE_LANGUAGE } from "./Action";
const initialState = {
  language: 'en', // default language
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;


