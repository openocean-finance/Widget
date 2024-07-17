const DARK_CLASS = 'g-dark';
const CACHE_NAME = 'local-theme';

let changeListener = () => {
};

let resizeListener = () => {
};

export const THEMES = {
  dark: 'dark',
  light: 'light'
};

const DEFAULT_THEME = THEMES.dark;

export const changeTheme = () => {
  if (getTheme() === THEMES.dark) {
    document.body.classList.remove(DARK_CLASS);
    localStorage.setItem(CACHE_NAME, THEMES.light);
  } else {
    document.body.classList.add(DARK_CLASS);
    localStorage.setItem(CACHE_NAME, THEMES.dark);
  }
  changeListener();
};

export const initTheme = () => {
  if (getTheme() === THEMES.dark) {
    document.body.classList.add(DARK_CLASS);
  }
};

export const addThemeListener = (listener) => {
  changeListener = listener;
};

export const containerResize = () => {
  resizeListener();
};

export const addResizeListener = (listener) => {
  resizeListener = listener;
};

export const getTheme = () => localStorage.getItem(CACHE_NAME) || DEFAULT_THEME;

export const addDarkClass = () => {
  document.body.classList.add(DARK_CLASS);
};

export const removeDarkClass = () => {
  document.body.classList.remove(DARK_CLASS);
};
