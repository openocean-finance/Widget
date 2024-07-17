import Vue from "vue";
import BigNumber from "bignumber.js";
import { formatAccount, toFixed } from "@/utils/format";
import { baseURL, getWalletType } from "@/utils/config";
import { getDefaultToken, getDefaultLimitToken } from "@/utils/getChains";


function loadToken (key, defaultToken) {
  const chainName = getWalletType();
  const token = window.localStorage.getItem(`${chainName}_${key}`);
  if (!defaultToken) {
    const tokenList = getDefaultToken(chainName);
    defaultToken = tokenList[key === "fromToken" ? 0 : 1];
  }
  return Object.assign(
    {
      price: 0,
      usd: 0,
      balance: 0,
      approve: 0,
      usdtValue: 0,
      value: 1,
      balanceDecimals: 0,
    },
    token ? JSON.parse(token) : defaultToken
  );
}

function loadLimitToken (key) {
  const chainName = getWalletType();
  const tokenList = getDefaultLimitToken(chainName);
  const defaultToken = tokenList[key === "tokenLimitPrev" ? 0 : 1];
  return loadToken(key, defaultToken);
}

const formatToken = (token) => {
  return Object.assign(
    {
      price: 0,
      usd: 0,
      balance: 0,
      approve: 0,
      usdtValue: 0,
      value: 1,
      balanceDecimals: 0,
    },
    token
  );
}

export function loadLimitDefaultToken (chainName) {
  const tokenList = getDefaultLimitToken(chainName);
  state.tokenLimitList = [formatToken(tokenList[0]), formatToken(tokenList[1])]
}


export const state = Vue.observable({
  default_account: "",
  walletName: "",
  chainName: getWalletType(),
  walletPath: "",
  walletLogo: () =>
    baseURL +
    "/logos/" +
    (state.chainName === "eth" ? "" : state.chainName + "/"),
  layer2Account: null,
  layer2Info: null,
  layer2Markets: null,
  layer2Tokens: null,
  layer2AccountId: 0,
  strategyId: "",
  priceScale: "",
  volumeScale: "",
  stage: 0,
  reloadReward: false,
  tolerance: "1",
  gasPrice: "5000000000",
  partialFill: false,
  tokenLimit: 0,
  tokenLimitList: [
    loadLimitToken("tokenLimitPrev"),
    loadLimitToken("tokenLimitNext"),
  ],
  tokenMap: {},
  routePath: {
    from: "",
    to: "",
    parts: 0,
    routes: [],
  },
  unexchangeList: {},
  exchangeList: [],
  gasPriceOptions: [],
  walletRsaPath: "",
  isShowSelectToken: false,
  isShowDisclaimer: false,
  investor: "",

  tokenList: [],
  fromToken: {
    approve: 0,
    price: 0,
    usd: 0,
    balance: 0,
    usdtValue: 0,
    value: 0,
    balanceDecimals: 0,
  },
  toToken: {
    approve: 0,
    price: 0,
    usd: 0,
    balance: 0,
    usdtValue: 0,
    value: 0,
    balanceDecimals: 0,
  },
  approveContract: ''
});

export const getters = {
  approveContract: () => state.approveContract || '90x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
  default_account: () => state.default_account || "0x0000000000000000000000000000000000000000",
  account: () => formatAccount(state.default_account || ""),
  chainName: () => state.chainName,
  walletPath: () => state.chainName === "eth" ? "" : state.chainName + "/",
  walletLogo: () =>
    baseURL +
    "/logos/" +
    (state.chainName === "eth" ? "" : state.chainName + "/"),
  walletName: () => state.walletName,
  layer2AccountId: () =>
    (state.layer2Account && state.layer2Account.accountId) || 0,
  layer2Markets: () => state.layer2Markets || [],
  strategyId: () => state.strategyId,
  priceScale: () => state.priceScale,
  volumeScale: () => state.volumeScale,
  stage: () => state.stage || 0,
  reloadReward: () => state.reloadReward || false,
  tokenList: () => state.tokenList || [],
  fromTokenUsdValue () {
    const token = state.fromToken;
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  toTokenUsdValue () {
    const token = state.toToken;
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenSwapPair: () => {
    return `${state.fromToken.symbol}/${state.toToken.symbol}`;
  },
  tokenLimit: () => state.tokenLimit || 0,
  tokenLimitList: () => state.tokenLimitList || [],
  tokenLimitPrev: () => state.tokenLimitList[state.tokenLimit] || { symbol: "" },
  tokenLimitNext: () => state.tokenLimitList[1 - state.tokenLimit] || { symbol: "" },
  tokenLimitPrevUsdValue () {
    const token = state.tokenLimitList[state.tokenLimit];
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenLimitNextUsdValue () {
    const token = state.tokenLimitList[1 - state.tokenLimit];
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenLimitPair: () => {
    const tokenPrev = state.tokenLimitList[state.tokenLimit];
    const tokenNext = state.tokenLimitList[1 - state.tokenLimit];
    return `${tokenPrev.symbol}/${tokenNext.symbol}`;
  },
  tokenMap: () => state.tokenMap || {},
  routePath: () => state.routePath || {},
  exchangeList: () => state.exchangeList || [],
  gasPrice: () => state.gasPrice || "",
  gasPriceFormat () {
    let gasPrice = "--";
    switch (state.chainName) {
      case "eth":
        const gasLabel = state.$t(
          "gas_" +
          (window.localStorage.getItem("gasoption") || "").toLowerCase()
        );
        gasPrice =
          gasLabel +
          "(" +
          ((state.gasPrice &&
            BigNumber(state.gasPrice).div(BigNumber(10).pow(9)).toFixed(2)) ||
            "-") +
          " GWEI)";
        break;
      case "ont":
        gasPrice = "0.15 ONG";
        break;
      default:
        gasPrice =
          ((state.gasPrice &&
            BigNumber(state.gasPrice).div(BigNumber(10).pow(9)).toFixed(2)) ||
            "-") + " GWEI";
        break;
    }
    return gasPrice;
  },
  tolerance: () => state.tolerance || "",
  toleranceOptions: () => [
    {
      label: "0.5%",
      value: "0.5",
    },
    {
      label: "1%",
      value: "1",
    },
    {
      label: "3%",
      value: "3",
    },
  ],
  walletRsaPath: () => state.walletRsaPath || "",
  investor: () => state.investor,
};

export const contract = state;
