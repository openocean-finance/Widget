import { getters, contract as state } from "./contract";
import { isSideChain, getNativeToken, getExchange } from "./utils/getChains";
import { changeRoute } from '@/init'
export default {
  computed: {
    ...getters,
  },
  data () {
    return {
      gasPriceOptions: [],
      nativeTokenUsd: "",

    };
  },
  watch: {
    gasPrice (val) {
      if (this.chainName === "eth") {
        window.localStorage.setItem("gasprice", val);
        window.localStorage.setItem("gasoption", "Fast");
        this.gasPriceOptions.forEach((item) => {
          const { code, value } = item;
          if (+value === +val) {
            window.localStorage.setItem("gasoption", code);
          }
        });
      }
    },
  },
  mounted () {

  },
  methods: {
    changeRoute,
    async getToken (chain) {
      if (state.tokenList && state.tokenList[0] && state.tokenList[0].chain == chain) return
      let res = await this.$axios
        .get(`v2/${chain}/token`, { cache: true, expire: 300000 })
      const { data } = res || {};
      const tokenMap = {};
      let tokenList = data.map((item) => {
        item.id = item.code || "";
        item.icon = item.icon;
        item.balance = 0
        item.balanceDecimals = 0

        tokenMap[item.address.toLowerCase()] = item;
        return item;
      });
      state.tokenMap = tokenMap;
      const temp = window.localStorage.getItem(chain + "_customtoken");
      if (temp) {
        tokenList = JSON.parse(temp).concat(tokenList);
      }
      state.tokenList = tokenList
      return tokenList
    },
    saveToken (key, token) {
      const { id, name, symbol, icon, address, decimals } = token;
      window.localStorage.setItem(
        `${this.chainName}_${key}`,
        JSON.stringify({
          id,
          name,
          symbol,
          icon,
          address,
          decimals,
        })
      );
    },
    async getTokenPrice (tokenPrev, tokenNext) {
      try {
        const res = await this.$axios.get(
          "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" +
          tokenPrev.id +
          "," +
          tokenNext.id,
          { cache: true }
        );
        tokenPrev.usd = res[tokenPrev.id] ? res[tokenPrev.id].usd : 0;
        tokenNext.usd = res[tokenNext.id] ? res[tokenNext.id].usd : 0;
      } catch (e) {
        console.log("getTokenPrice", e);
      }
    },
    async getNativeTokenPrice () {
      const token = getNativeToken(this.chainName);
      const id = token && token.id;
      if (!id) return;
      const res = await this.$axios.get(
        "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" +
        id,
        { cache: true }
      );
      this.nativeTokenUsd = res[id] ? res[id].usd : 0;
    },
    toLowerCase (val, flag) {
      if (flag) {
        return val && val.toLowerCase();
      }
      return isSideChain(this.chainName) ? val && val.toLowerCase() : val;
    },
    formatGas (base, gas) {
      if (!base) return gas;
      const { maxFeePerGas } = gas;
      return +maxFeePerGas;
    },
    formatGasLabel (base, gas) {
      const _gas = (gas && BN(gas).div(BN(10).pow(9)).toFixed(2)) || "-";
      if (!base) return _gas;
      const _base = (base && BN(base).div(BN(10).pow(9)).toFixed(2)) || "-";
      return _base + "~" + _gas;
    },
    getGasPrice () {
      this.$axios
        .get(this.walletPath + "gas-price", { cache: true })
        .then((res) => {
          const { base, fast, instant, standard } = res;
          const _fast = this.formatGas(base, fast);
          const _instant = this.formatGas(base, instant);
          const _standard = this.formatGas(base, standard);
          state.gasPriceOptions = this.gasPriceOptions = [
            {
              label:
                this.formatGasLabel(base, _fast) + " " + this.$t("gas_fast"),
              code: "Fast",
              value: _fast,
              ethgas: base ? { base, ...fast } : "",
            },
            {
              label:
                this.formatGasLabel(base, _instant) +
                " " +
                this.$t("gas_instant"),
              code: "Instant",
              value: _instant,
              ethgas: base ? { base, ...instant } : "",
            },
          ];

          if (this.chainName === "eth") {
            const option = window.localStorage.getItem("gasoption");
            switch (option) {
              case "Standard":
              case "Fast":
                state.gasPrice = _fast;
                break;
              case "Instant":
                state.gasPrice = _instant;
                break;
              default:
                state.gasPrice =
                  window.localStorage.getItem("gasprice") || _standard;
                break;
            }
          } else {
            state.gasPrice = _standard;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getExchange () {
      if (["onto", "solana", "starknet", "aptos", "near", "ont"].indexOf(this.chainName) >= 0) {
        this.getBalanceOf();
        return;
      }
      state.approveContract = getExchange(this.chainName).approveContract;
    },
  },
};
