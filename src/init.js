import Web3 from "web3";
import axios from "axios";
import { contract as state, loadLimitDefaultToken, } from "./contract";
import { ERC20_abi } from "@/utils/config";
import Muliticall from "ethers-multicall";
import BigNumber from "bignumber.js";
window.BN = BigNumber;
import showToast from "@/components/toast";
import showNotification from "@/components/notification";
import { decimals2Amount } from "@/utils/number";
import { debounce, confirmLater } from "./utils/helpers";
import getChains, { getChainId, addEthereumChainParams, isNativeToken, getBalancesAddress} from "@/utils/getChains";
import { isApp, isMobile } from "./utils/helpers";
import { CACHE_KEY, setCache } from "./utils/cache";
import { OpenoceanSdk } from "@openocean.finance/openocean-sdk";
import { amount2Decimals } from "./utils/number";
import router from "./router";
import { ethers, providers } from "ethers";

export let blackList = [];
export let myWallet = null;

const maxAmount =
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

const ooSdk = new OpenoceanSdk();
const { swapSdk, api, web3, config } = ooSdk;
export const walletList = config.wallets.walletList;

function getLimitContractAddress () {
  return {
    eth: "0xcC8d695603ce0b43D352891892FcC716c6a7C9f4",
    bsc: "0xA8A0213bb2ce671E457Ec14D08EB9d40E6DA8e2d",
    avax: "0x99b3488Ee3432bB60256140b4BD2488E3b6A705f",
    fantom: "0x44A632dC8ee03ad2cF5d530280a044DaED3E1ec0",
    polygon: "0xFA9B584Bc9543B66BeFdc41fb1DA8636edD7a697",
  }[state.chainName];
}

function sleep (interval) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}

export function isWalletConnect (walletName) {
  return ["WalletConnect", "Trust Wallet"].indexOf(walletName) >= 0;
}

export async function initTryConnect (chainName, walletName) {

  console.log("isApp: ", isApp());
  console.log("isMobile: ", isMobile());
  console.log(Web3.givenProvider);
  console.log(window.ethereum);

  if (isApp()) {
    let appChain = chainName;
    let walletName = "MetaMask";
    if (
      window.coin98 &&
      window.coin98.sol &&
      window.coin98.sol.chainId === "undefined"
    ) {
      console.log("window.coin98");
      appChain = "solana";
      walletName = "Coin98Wallet";
    } else if (
      window.coin98 &&
      window.coin98.sol &&
      window.coin98.sol.chainId !== "undefined"
    ) {
      const chains = getChains();
      let chainId = await new Web3(Web3.givenProvider).eth.getChainId();
      appChain = chains.find((c) => c.chainId === chainId).walletValue;
      localStorage.setItem("walletChainId", chainId);
      walletName = "Coin98Wallet";
    } else if (window.solana && window.solana.isSafePalWallet) {
      appChain = "solana";
      walletName = "SlopeWallet";
      console.log(" safepal solana");
      showToast(
        "Sorry we currently haven't enable solane swap on safepal wallet."
      );
      return;
    } else {
      const chains = getChains();
      let chainId = await new Web3(
        Web3.givenProvider || window.safepal_wallet_app
      ).eth.getChainId();
      appChain = chains.find((c) => c.chainId === chainId).walletValue;
      localStorage.setItem("walletChainId", chainId);
    }

    if (appChain !== chainName) {
      setCache(CACHE_KEY.Chain, appChain);
      loadLimitDefaultToken(appChain);
    }
    state.chainName = appChain;
    const sdk = await tryConnect(appChain, walletName);
    console.log(sdk);
    await connect(sdk);
  } else if (isMobile() && walletName) {
    console.log("h5 init");
    const sdk = await tryConnect(chainName, "WalletConnect");
    console.log("h5 sdk:", sdk);
    await connect(sdk);
  } else if (walletName) {
    console.log("tryConnect", chainName);
    const sdk = await tryConnect(chainName, walletName);
    await connect(sdk);
  }
};


export const getProviderByRPC = (chainKey) => {
  let chain = chainKey || state.chainName;
  let params = addEthereumChainParams[chain];
  if (chain === "eth") {
    params = [
      {
        chainId: `0x1`, // 1
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/eth"],
        blockExplorerUrls: ["https://etherscan.io"],
      },
    ];
  }
  if (!params) return {};

  const { rpcUrls } = params[0];
  const provider = new ethers.providers.JsonRpcProvider(rpcUrls[0]);
  return {
    provider,
    ...params[0],
  };
};

export const getBalances = async (tokenList, params) => {
  const chain = params && params.chain || state.chainName
  if (chain === "starknet") {
    return await getBalancesFromStarknet(tokenList, params);
  }
  const { provider, chainId } = getProviderByRPC(chain);
  if (!provider || !chainId) return;
  const account = params && params.account || state.default_account;
  if (!account) return

  let approveContract = params && params.approveContract || ''

  let balancesAddress = getBalancesAddress(chain)
  if (balancesAddress) {
    Muliticall.setMulticallAddress(
      balancesAddress.id,
      balancesAddress.address
    );
  }

  const ethcallProvider = new Muliticall.Provider(provider, chainId);
  await ethcallProvider.init();
  const multicall = [];
  const multicallAllowance = [];
  console.log('getBalances_' + chain, account);
  for (let i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    if (isNativeToken(chain, token.address)) {
      multicall.push(ethcallProvider.getEthBalance(account));
      if (approveContract) {
        token.approve = -1;
      }
    } else {
      const contract = new Muliticall.Contract(token.address, ERC20_abi);
      multicall.push(contract.balanceOf(account));
      if (approveContract) {
        multicallAllowance.push(contract.allowance(account, approveContract));
      }
    }
  }
  const result = await ethcallProvider.all(multicall);
  result.map((item, i) => {
    const { decimals } = tokenList[i];
    const amount = web3.utils.hexToNumberString(item);
    const balance = +amount === 0 ? 0 : decimals2Amount(amount, decimals);
    tokenList[i].balance = Math.floor(balance * 10000) / 10000;
    tokenList[i].balanceAll = tokenList[i].balance;
    tokenList[i].balanceDecimals = amount;
  });
  if (approveContract) {
    const resultAllowance = await ethcallProvider.all(multicallAllowance);
    console.log("resultAllowance", resultAllowance);
    resultAllowance.map((item, i) => {
      const { approve, decimals } = tokenList[i];
      if (approve === -1) return item;

      const amount = web3.utils.hexToNumberString(item);
      const _approve = +amount === 0 ? 0 : decimals2Amount(amount, decimals);
      tokenList[i].approve = _approve;
      console.log("resultAllowance", tokenList[i], _approve);
    });
  }


  console.log('result_' + chainId, tokenList);
  return tokenList
};
export function getSolanaTokenBalance (balance) {
  let sum = 0;
  const { value = [] } = balance || {};
  value.forEach((item) => {
    const { account } = item || {};
    const { data } = account || {};
    const { parsed } = data || {};
    const { info } = parsed || {};
    const { tokenAmount } = info || {};
    const { amount = 0 } = tokenAmount || {};
    sum += +amount;
  });
  return sum;
}

export async function tryConnect (chainName, walletName) {
  try {
    const params = {
      chainName,
      walletName: walletName.replace(/\s+/gi, ""),
    };
    console.log("tryConnect params", params);
    
    // alert(JSON.stringify(params))
    const result = await swapSdk.connectWallet(params);
    console.log("tryConnect result", result);
    // alert(JSON.stringify(result))
    return result;
  } catch (e) {
    if (e.code === -32602) {
      showToast(`Please add ${chain} to your wallet!`);
    }
    if (e.code === 4001) {
      showToast("User rejected the request");
    }

    console.log("tryConnect error", e);
    return null;
  }
};

export async function changeRoute (query) {
  let route = router.currentRoute
  router.push({
    path: route.path,
    query: { ...route.query, ...query }
  }, () => { })
}

export async function connect (data) {
  if (!data || !data.wallet) {
    state.default_account = ''
    return;
  }
  const { address, name: walletName } = data.wallet;
  const { key: chainName } = data.chain;
  try {
    if (address) {
      state.default_account = address;
      const { sdk } = data.wallet;
      myWallet = sdk || {};
      const { currentProvider } = sdk || {};
      if (currentProvider && currentProvider.on) {
        currentProvider.on(
          "disconnect",
          debounce((args, payload) => {
            if (isWalletConnect(walletName)) {
              showToast(
                window.$t("wallet_message_50001", { wallet: walletName })
              );
              disConnect(chainName);
            }
          }, 2000)
        );

        currentProvider.on(
          "accountsChanged",
          debounce(async (args, payload) => {
            showToast(
              window.$t("wallet_message_50002", { wallet: walletName })
            );
            console.log('99----', chainName)
            initTryConnect(chainName, walletName)
            // reload(true);
          }, 2000)
        );
        currentProvider.on(
          "chainChanged",
          debounce(async (args, payload) => {
            const currentChainId = await sdk.eth.getChainId();
            const _currrentChainId = getChainId(state.chainName);
            if (currentChainId === _currrentChainId) return;
            showToast(
              window.$t("wallet_message_50003", { wallet: walletName })
            );
            const chainList = getChains();
            const chain = chainList.filter((item) => {
              return item.chainId === currentChainId && item.disabled !== true;
            });
            console.log("currentChainId", currentChainId, chain);
            if (chain && chain[0]) {
              changeRoute({
                chain: chain[0].walletValue
              })
            } else {
              disConnect(state.chainName);
            }
          }, 2000)
        );
      }
      state.walletName = walletName;
    } else {
      localStorage.removeItem("chainName");
      localStorage.removeItem("walletName");
      localStorage.removeItem("walletChainId");
    }
  } catch (e) {
    console.log("connect catch", e);
    alert("connect catch");
    const { message } = e;
    const target = data.wallet;
    if (!target || !target.sdk || !target.sdk.currentProvider) {
      return;
    }
    const { currentProvider } = target.sdk;
    let websiteChainId, currentChainId;
    if (message === "40006" && currentProvider) {
      const params = addEthereumChainParams[chainName];
      if (params) {
        await currentProvider.request({
          method: "wallet_addEthereumChain",
          params,
        });
        currentChainId = await target.sdk.eth.getChainId();
        websiteChainId = getChainId(state.chainName);
        console.log(
          "wallet_switchEthereumChain",
          currentChainId,
          websiteChainId
        );
        if (websiteChainId === currentChainId) {
          await initTryConnect(state.chainName, walletName);
        }
      } else if (chainName === "eth") {
        await currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
        currentChainId = await target.sdk.eth.getChainId();
        websiteChainId = getChainId(state.chainName);
        console.log(
          "wallet_switchEthereumChain",
          currentChainId,
          websiteChainId
        );
        if (websiteChainId === currentChainId) {
          await initTryConnect(state.chainName, walletName);
        }
      } else {
        showToast(
          /^\d+$/.test(message) ? this.$t("wallet_message_" + message) : message
        );
        localStorage.removeItem("chainName");
        localStorage.removeItem("walletName");
        localStorage.removeItem("walletChainId");
        // reload(true);
      }
    } else if (
      message === "Cannot read properties of undefined (reading 'fullPath')"
    ) {
      console.log(message);
    } else if (code === -32002) {
      showToast(window.$t("wallet_matemask_lock"));
    } else {
      showToast(
        /^\d+$/.test(message) ? window.$t("wallet_message_" + message) : message
      );
      localStorage.removeItem("chainName");
      localStorage.removeItem("walletName");
      localStorage.removeItem("walletChainId");
      // reload(true);
    }
  }
};

export async function getBalance (chain, account, token) {
  try {
    const { address, decimals } = token;
    const params = {
      account,
      chain,
      tokenAddressOrSymbol: address,
      decimals,
    };
    const result = await swapSdk.getBalance(params);
    return result;
  } catch (e) {
    console.log("getBalance error", e);
    return null;
  }
}

export async function getAllowance (chain, account, token, approveContract) {
  try {
    const { address, decimals } = token;
    const params = {
      account,
      chain,
      tokenAddress: address,
      approveContract,
      decimals,
    };
    const result = await swapSdk.getAllowance(params);
    return result;
  } catch (e) {
    console.log("getAllowance error", e);
    return null;
  }
};

export async function sendApproveTo (
  chain,
  tokenAddress,
  approveContract,
  type,
  amount,
  decimals,
  gasPrice,
  amountWithDecimals
) {
  try {
    amount =
      type === "1"
        ? maxAmount
        : amountWithDecimals || amount2Decimals(amount, +decimals);
    const params = {
      chain,
      tokenAddress,
      approveContract:approveContract,
      amount,
      gasPrice,
      tokenAbi: ERC20_abi,
    };
    console.log("sendApproveTo params", params);
    const result = await swapSdk.approve(params);
    console.log("sendApproveTo result", result);
    return result;
  } catch (e) {
    console.log("sendApproveTo error", e);
    return null;
  }
};

export async function getTokenByAddress (chain, address) {
  try {
    const params = {
      chain,
      address,
      wallet: swapSdk && swapSdk.wallet && swapSdk.wallet.sdk,
    };
    console.log("getTokenByAddress params", params);
    const result = await api.getTokenByAddress(params);
    console.log("getTokenByAddress result", result);
    return result;
  } catch (e) {
    console.log("getTokenByAddress error", e);
    return null;
  }
};

export function isTokenAddress (address) {
  try {
    console.log("isTokenAddress params", address);
    const result = web3.utils.isAddress(address);
    console.log("isTokenAddress result", result);
    return result;
  } catch (e) {
    console.log("isTokenAddress error", e);
    return false;
  }
};

export async function getGas (swapData) {
  try {
    const { params = {} } = swapData || {};
    const { chain } = params || {};
    let result = "";
    result = await swapSdk.getGas(swapData);
    return result;
  } catch (e) {
    console.log("getGas error", e);
    return 0;
  }
};

export async function sendTransaction (swapData) {
  let explorer = "";
  const instance = showNotification({
    status: "loading",
    text: "Please, sign transaction in your wallet",
  });
  try {
    const { params = {} } = swapData || {};
    const { chain } = params || {};
    let hash = "";
    hash = await swapSdk.fastSwap(swapData);
    getChains().forEach((item) => {
      if (item.value === state.chainName) {
        explorer = item.blockExplorerUrl;
      }
    });
    if (hash) {
      instance.change({
        status: "submitted",
        chain: state.chainName,
        address: hash,
        title: window.$t("notification_submited_title"),
        text: window.$t("notification_submited_content"),
        subcontent: `Successfully swap from ${swapData.inToken.symbol} to ${swapData.outToken.symbol}`,
      });
    }
    return {
      status: "success",
      hash,
    };
  } catch (e) {
    const message = typeof e === "string" ? e : e.message;
    instance.change({ status: "failed", text: message });
    return {
      status: "rejected",
      message,
    };
  }
};

export async function disConnect (network) {
  localStorage.removeItem("walletChainId");
  localStorage.removeItem("walletName");
  localStorage.removeItem("walletconnect");
  localStorage.removeItem("connectorId");
  localStorage.setItem("chainName", network || "eth");
  if (isWalletConnect(state.walletName)) {
    const { currentProvider } = myWallet;
    await currentProvider.disconnect();
    await sleep(1000);
  }
  // reload(true);
}

export async function sendEthApprove (
  inToken,
  type,
  amount,
  gasPrice,
  toContract
) {
  const contract = new myWallet.eth.Contract(ERC20_abi, inToken);
  const approveAmount =
    type === "1"
      ? BigNumber(
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      ).toFixed(0, 1)
      : amount;
  const account = state.default_account;
  const gasAmount = await contract.methods
    .approve(toContract, approveAmount)
    .estimateGas({
      from: account,
    });
  return await confirmLater(
    contract.methods.approve(toContract, approveAmount).send({
      from: account,
      gasPrice,
      gas: gasAmount,
    })
  );
}

export async function getContractDecimals (address) {
  let tokenContract;
  if (state.chainName === "solana") {
    const res = await myWallet.connection.getTokenSupply(
      address
    );
    if (res && res.value && res.value.decimals) {
      return res.value.decimals;
    }
  } else if (state.chainName === "tron") {
    tokenContract = await myWallet.contract().at(address);
    return await tokenContract.methods.decimals().call();
  } else {
    let result = await axios.get(
      `https://open-api.openocean.finance/v3/${state.chainName}/getTokenInfo`,
      {
        params: { tokenAddress: address },
      }
    );
    if (result.symbol && result.decimals) {
      return result.decimals;
    }
    return -1;
  }
}

export async function getSolanaTransactions () {
  const result = await myWallet.connection.getConfirmedSignaturesForAddress2(
    myWallet.customPublicKey,
    {
      limit: 25,
    }
  );
  return result;
}





export async function ecRecover (account, msg, sig) {
  return new Promise((resolve) => {
    myWallet.eth.personal.ecRecover(msg, sig, function (err, address) {
      if (!err)
        resolve({
          result: address.toLowerCase() === account.toLowerCase(),
        });
      else {
        console.log("web3.eth.personal.ecRecover", err, address);
        resolve({ error: err });
      }
    });
  });
}

export async function getLimitOrderAllowance (inToken) {
  try {
    const address = state.default_account;
    if (!state.account) return 0;
    const contract = new myWallet.eth.Contract(ERC20_abi, inToken);
    const approveAmount = await contract.methods
      .allowance(address, getLimitContractAddress())
      .call();
    const _approveAmount =
      Math.floor(+decimals2Amount(approveAmount, 18) * 10000) / 10000;
    return _approveAmount;
  } catch (e) {
    console.log("getLimitOrderAllowance", e);
  }
}

export async function sendLimitOrderApprove (inToken, gasPrice) {
  await sendEthApprove(inToken, "1", "", gasPrice, getLimitContractAddress());
}

export async function sendLimitOrderSign () {
  const account = state.default_account;
  const chain = state.chainName;
  const timestamp = new Date().getTime();
  // const msg = `action:\nOpenOcean Authentication\nonlySignOn:\nhttps://openocean.finanace\ntimestamp:\n${timestamp}`;
  const msg =
    "0xc4fa769adf9cf288396c7e22be81ab22b32b05e35b7fc36968cad99cdf4429f1";
  return new Promise((resolve) => {
    if (myWallet !== null) {
      myWallet.eth.personal.sign(
        msg,
        account,
        "",
        async function (err, result) {
          if (!err) {
            const valid = await ecRecover(account, msg, result);
            if (valid.result) {
              resolve({
                "OPENOCEAN-SIGNATURE": result,
                "OPENOCEAN-MESSAGE": msg,
                "OPENOCEAN-ADDRESS": account,
                // "OPENOCEAN-TIMESTAMP": timestamp,
                // "OPENOCEAN-TIMESTAMP": null,
                "OPENOCEAN-TYPE": chain,
              });
            }
          } else {
            resolve({ error: err });
            return;
            // disConnect(state.chainName);
          }
        }
      );
    }
  });
}

