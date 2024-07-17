import { contract as state } from "@/contract";
import { getChainId } from "@/utils/getChains";
import axios from "axios";

export const getStatus = async () => {
  const key = `${state.walletType}_last_transaction`;
  const res = window.localStorage.getItem(key);
  if (!res) return;
  const res2 = JSON.parse(res);
  const chainId = getChainId(state.walletType);
  const { data } = await axios.get(
    `https://open-api.openocean.finance/v1/cross/getTransactionReceipt?chainId=${chainId}&hash=${res2.hash}&exChange=openoceanv2`
  );
  return Object.assign(res2, data);
};

export const setLastTransaction = (hash, type, content) => {
  const key = `${state.walletType}_last_transaction`;
  window.localStorage.setItem(key, JSON.stringify({ hash, type, content}));
};

export const removeLastTransaction = () => {
  const key = `${state.walletType}_last_transaction`;
  window.localStorage.removeItem(key);
};
