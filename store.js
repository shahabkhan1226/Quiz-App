// src/redux/store.js
import { createStore } from 'redux';
import rootReducer from './rootred';
const store = createStore(rootReducer);

export default store;

