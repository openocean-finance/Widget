
import { state } from '../contract';

export const loadFavorite = () => {
  const list = window.localStorage.getItem(state.chainName + "_favoriteList");
  state.favoriteList = list && JSON.parse(list) || [];
};

export const addFavorite = (pairCode) => {
  state.favoriteList.push(pairCode);
  window.localStorage.setItem(
    state.chainName + "_favoriteList",
    JSON.stringify(state.favoriteList)
  );
};

export const removeFavorite = (pairCode) => {
  state.favoriteList = state.favoriteList.filter((item) => {
    return item != pairCode;
  });
  window.localStorage.setItem(
    state.chainName + "_favoriteList",
    JSON.stringify(state.favoriteList)
  );
};
