import {  SET_THEME } from './type';



export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const changeLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  payload: language,
});

