export const CACHE_KEY = {
  Account: "selectedWallet",
  Wallet: "walletName",
  Chain: "chainName",
};

export const getCache = (key, def) => {
  return window.localStorage.getItem(key) || def || "";
};

export const setCache = (key, account) => {
  window.localStorage.setItem(key, account);
};
