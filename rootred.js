import { combineReducers } from 'redux';
import { English } from '../English';
import languageReducer from './langaugereducer';
import themeReducer from './reducer';

const rootReducer = combineReducers({
 language: languageReducer,
  theme: themeReducer,
});

export default rootReducer;
