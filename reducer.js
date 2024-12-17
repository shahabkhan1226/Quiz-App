import { SET_THEME } from './type';
import { CHANGE_LANGUAGE } from './Action';

const initialState = {
  theme: 'light', // Default theme
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
      case CHANGE_LANGUAGE:
        return {
          ...state,
          language: action.payload,
        };
    default:
      return state;
  }
};

export default themeReducer;