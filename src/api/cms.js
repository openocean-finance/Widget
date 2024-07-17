import axios from 'axios';
import { getChainId } from "@/utils/getChains";

const network = {
  eth: 'ethereum',
  avax: 'avalanche',
  bsc: 'binance-smart-chain',
  okex: 'okex-chain',
  polygon: 'polygon-pos',
  heco: 'huobi-token',
  ont: 'ontology',
  harmony: 'harmony',
  dot: 'polkadot',
  arbitrum: 'arbitrum-one'
}

export const getTokenByCoingecko = async (chain, contract_address) => {
  try{
    const chainCode = network[chain] || chain;
    const url =  `https://api.coingecko.com/api/v3/coins/${chainCode}/contract/${contract_address}`;
    const res = await axios({
      method: 'get',
      url
    });
    if(res) {
      res.code = res.id;
      res.contract_address = res.platforms && res.platforms[chainCode] || res.contract_address;
      return res;
    }
  } catch(e) {
    console.log('getCustomToken', e);
  }
}

export const getTokenByExplorer = async (chain, contract_address) => {
  try{
    const chainId = getChainId(chain);
    const {data} = await axios.get(`/v1/data/getTokenAndUrl?address=${contract_address}&chainId=${chainId}`);
    return data
  } catch(e) {
    console.log('getCustomToken', e);
  }
}

export const getTokenInfo = async (chain, contract_address) => {
  let res = await getTokenByCoingecko(chain, contract_address);
  if (!res) {
    res = await getTokenByExplorer(chain, contract_address);
    if (!res) return;
    res.contract_address = contract_address;
    res.image = {
      large: res.herf
    }
    return res;
  }
  return res;
}