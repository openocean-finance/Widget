<template>
  <div>
    <div class="swap">
      <Field :token="fromToken" :usd-value="fromTokenUsdValue" @change="changeToken" />
      <div class="g-clickable switch" @click="changeTokenSwap">
        <i class="iconfont iconjiaohuan1"></i>
      </div>
      <Field :token="toToken" :usd-value="toTokenUsdValue" :from="false" @change="changeToken" />

      <Button :in-amount="inAmount" :out-amount="inAmount" :loading="loading" :price-impact="priceImpact" :exchange="exchange" :chain="chainName" type="swap" @confirm="swapQuote" />
      <div class="info-group">
        <Info label="Minimum Receive" :usd="minReceiveUsd" :value="minReceive" />
        <!-- <Info
          label="Est. Gas Fee"
          :usd="estimatedGasValueUsd"
          :value="estimatedGasValue"
        /> -->
        <div class="magic-edit">
          <Info label="Price Impact" :value="priceImpact + '%'" :color="impact" help="Price Impact" explaination="The difference between market price and est. price due to trade size" />
          <div class="t-label right" :class="{ warning: +priceImpact < -10 }">
            <i class="iconfont iconjinggao warning__icon" :class="{ red: +priceImpact < 0, green: +priceImpact > 0 }" />
            <!-- <div class="warning-info">
              The difference between market price and est. price due to trade
              size
            </div> -->
          </div>
        </div>
        <Info label="You Save" :value="youSaveUsd" help="You Save" color="green" v-if="youSave != '--'" />
      </div>
      <Banner v-if="!isEmbed" />
      <div class="copyright">
        <span style="color:var(--text_secondary);opacity: 0.6;">Powered by</span>
        <a href="https://app.openocean.finance" target="_blank">
          <!-- <svg viewBox="0 0 121 24" version="1.1"> -->
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_52_581)">
              <g opacity="0.9">
                <path fill="var(--text_secondary)" fill-rule="evenodd" clip-rule="evenodd"
                  d="M25.3232 16.6366C25.3238 16.6195 25.3243 16.6024 25.3252 16.5853C25.3275 16.5396 25.33 16.4939 25.3325 16.4482C25.3408 16.2996 25.3491 16.1509 25.3491 16C25.3491 15.9271 25.3469 15.8547 25.3448 15.7823C25.344 15.7558 25.3433 15.7295 25.3425 15.703C25.3423 15.6941 25.3421 15.6852 25.3419 15.6763C25.3415 15.6586 25.3411 15.6409 25.3403 15.6231C25.3252 15.5282 25.2685 15.448 25.1857 15.4105C25.1802 15.408 25.1742 15.407 25.1682 15.4058C25.1641 15.405 25.16 15.4042 25.1559 15.403C24.8374 15.3261 24.5163 15.2365 24.1928 15.1258L24.0534 15.0771C21.0276 13.9937 18.1285 14.4947 16.7878 14.8423C16.709 14.8622 16.6357 14.8821 16.5681 14.9012C16.5644 14.9015 16.561 14.902 16.5574 14.9025C16.5533 14.9032 16.5491 14.9038 16.5448 14.9038C16.2815 14.9038 16.0615 14.7103 16.0114 14.4535V14.2288V11.8915V11.6669C16.044 11.4977 16.1519 11.3586 16.2965 11.2814C16.332 11.2664 16.3687 11.2517 16.4119 11.2352C17.3111 10.8962 19.7489 10.282 23.8587 11.3631C23.8664 11.3669 23.8747 11.3684 23.8829 11.37C23.8878 11.3709 23.8928 11.3718 23.8976 11.3732C23.9024 11.3746 23.9072 11.376 23.912 11.3774C23.9302 11.3828 23.9486 11.3882 23.9684 11.3882C24.1191 11.3882 24.2408 11.2622 24.2408 11.107C24.2408 11.088 24.2362 11.0708 24.2316 11.0537C24.2301 11.0483 24.2286 11.0428 24.2273 11.0372C24.2183 11.0012 24.2033 10.9694 24.1827 10.9405C22.3883 7.26961 18.7081 4.74999 14.4545 4.74999C8.43781 4.74999 3.55995 9.78661 3.55995 16C3.55995 22.2133 8.43781 27.25 14.4545 27.25C18.7978 27.25 22.5412 24.6223 24.2909 20.8255L24.3002 20.8056C24.3192 20.7651 24.3382 20.7247 24.3566 20.6837C24.3576 20.6777 24.3592 20.6719 24.3607 20.666C24.3634 20.6556 24.366 20.6451 24.366 20.6335C24.366 20.5217 24.3018 20.4268 24.2102 20.3815C24.2064 20.3802 24.2025 20.379 24.1986 20.3777L24.1928 20.3758L24.1721 20.3687L24.0534 20.3271C20.9368 19.2111 17.9532 19.7762 16.6701 20.1231C16.6654 20.1241 16.6612 20.1253 16.6567 20.1266C16.6567 20.1266 16.6527 20.1278 16.6505 20.1283C16.6167 20.1355 16.5811 20.1396 16.5448 20.1396C16.2815 20.1396 16.0615 19.9461 16.0114 19.6892V19.4646V17.1463V16.9213C16.0466 16.7406 16.1664 16.5921 16.3262 16.5193C16.3299 16.5174 16.3341 16.516 16.3383 16.5145C16.3413 16.5134 16.3444 16.5124 16.3473 16.5111C17.1996 16.174 19.7123 15.4783 24.0534 16.6626C24.3606 16.7466 24.6551 16.8178 24.9441 16.8835C24.9866 16.8932 25.0292 16.903 25.0713 16.912C25.1926 16.9078 25.2895 16.8216 25.3204 16.705C25.3216 16.6825 25.3225 16.6596 25.3232 16.6366ZM31.4188 11.6789C31.4538 11.6717 31.4896 11.668 31.5259 11.668C31.8238 11.668 32.0649 11.9136 32.0714 12.2188V12.2455V14.6215V14.7231C32.0537 14.9245 31.9352 15.0947 31.7668 15.1791C31.7159 15.1948 31.66 15.2117 31.5972 15.2301C31.1178 15.3696 30.3003 15.5672 29.2762 15.6692L29.175 15.6782C29.0678 15.7097 28.9894 15.8038 28.98 15.9216C28.98 15.9297 28.98 15.9375 28.9801 15.9455C28.9802 15.9533 28.9803 15.9612 28.9803 15.9692C28.9803 15.9745 28.9804 15.9797 28.9805 15.9849C28.9806 15.9899 28.9806 15.995 28.9806 16C28.9806 16.3416 28.9661 16.6791 28.9447 17.0147C28.9446 17.0177 28.9444 17.0209 28.9442 17.0239C28.9439 17.0291 28.9434 17.0342 28.9432 17.0395C28.9476 17.1831 29.0551 17.2963 29.1923 17.308L29.1961 17.3078C29.2131 17.3071 29.2306 17.3064 29.2476 17.3053C30.1696 17.2525 30.8596 17.1013 31.3262 16.9581C31.3593 16.948 31.3941 16.9375 31.4247 16.9277C31.4588 16.9213 31.4936 16.9168 31.5299 16.9168C31.8019 16.9168 32.0264 17.1208 32.0714 17.3882V17.5843V19.8853V19.954C32.0591 20.1681 31.9323 20.3496 31.7526 20.4336L31.737 20.4384C31.6984 20.4501 31.6579 20.4624 31.6128 20.4756C31.003 20.6541 29.8257 20.9323 28.3626 20.9766C28.3561 20.9768 28.3497 20.9771 28.3433 20.9774C28.3373 20.9776 28.3312 20.978 28.3251 20.9781C28.2296 20.9863 28.1501 21.0437 28.108 21.1266C28.1003 21.1421 28.0953 21.1583 28.0901 21.1751L28.0894 21.1772C26.0475 26.9098 20.7149 31 14.4546 31C6.08024 31 -0.639171 23.6822 -0.0334326 14.9012C0.476796 7.50249 6.28397 1.53211 13.4512 1.03486C20.5159 0.544739 26.5889 5.27574 28.4174 11.8592C28.4214 11.8791 28.425 11.8986 28.4334 11.9166C28.4744 12.0043 28.5572 12.0643 28.6564 12.073C28.6712 12.0726 28.6858 12.0726 28.7003 12.0722C29.8885 12.0591 30.7564 11.8813 31.3121 11.713C31.3499 11.7014 31.3844 11.6901 31.4188 11.6789Z" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_52_581">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
        <span style="color:var(--text_secondary);opacity: 0.6;">OpenOcean</span>
      </div>
      <!-- <div v-else class="copyright">
        <img class="logo" :src="logoUrl" alt="">
      </div> -->
    </div>
    <NouDialog close-on-click-modal :visible.sync="isConfirmShow">
      <Confirm :trade="tradeData" @close="isConfirmShow = false" @confirm="confirmSwap" @refresh="swapQuote" v-if="isConfirmShow" />
    </NouDialog>
  </div>
</template>

<script>
import NouDialog from "@/components/common/NouDialog";
import Field from "./components/field";
import Button from "./components/button";
import Label from "./components/label";
import Info from "./components/info";
import Confirm from "./components/confirm";
import qs from "qs";
import BigNumber from "bignumber.js";
import showToast from "@/components/toast";
import { contract as state } from "@/contract";
import { toFixed, formatPrice } from "@/utils/format";
import { isNativeToken, getNativeToken } from "@/utils/getChains";
import { decimals2Amount } from "@/utils/number";
import { getBalance, getAllowance } from "@/init";
import { sendTransaction } from "@/init";
import { utils } from "ontology-ts-sdk";
import { client } from "@ont-dev/ontology-dapi";
import showOntoScan from "../connect/showOntoScan";
import showNotification from "@/components/notification";
import Banner from "../banner";

export default {
  components: {
    NouDialog,
    Field,
    Button,
    Label,
    Info,
    Confirm,
    Banner
  },
  props: {
    tabCode: {
      type: String,
      default: "",
    },
  },
  data () {
    return {
      logoUrl: '',
      minOutAmount: "",
      isConfirmShow: false,
      quoteStatus: 0,
      approveType: "",
      loading: false,
      dexesList: [],
      exchange: {},
      estimatedGas: null,
      tradeData: {},
      swapRes: {},
    };
  },
  watch: {
    default_account (newVal, oldVal) {
      this.getBalanceOf();
    }
  },
  computed: {
    fromToken: () => state.fromToken,
    toToken: () => state.toToken,
    impact () {
      if (this.priceImpact > 0) {
        return 'green'
      } else {
        return 'red'
      }
    },
    isEmbed () {
      return window.parent !== window.self;
    },
    inAmount () {
      return state.fromToken.value;
    },
    outAmount () {
      return state.toToken.value;
    },
    rate () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      return `${toFixed(this.outAmount / this.inAmount)} ${state.toToken.symbol
        }`;
    },
    inverseRate () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      return `${toFixed(this.inAmount / this.outAmount)} ${state.fromToken.symbol
        }`;
    },
    estimatedGasValue () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      if (this.estimatedGas && this.gasPrice) {
        const { symbol, decimals } = getNativeToken(this.chainName);
        if (symbol && decimals) {
          const amount = decimals2Amount(
            this.estimatedGas * this.gasPrice,
            decimals
          );
          return `${toFixed(amount, 4)} ${symbol}`;
        }
      }
    },
    estimatedGasValueUsd () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "";
      if (this.estimatedGas && this.gasPrice) {
        const { symbol, decimals } = getNativeToken(this.chainName);
        if (symbol && decimals && this.nativeTokenUsd > 0) {
          const amount = decimals2Amount(
            this.estimatedGas * this.gasPrice,
            decimals
          );
          return `~ $${toFixed(this.nativeTokenUsd * amount, 2)}`;
        }
      }
    },
    minReceive () {
      if (!this.outAmount || !this.quoteStatus || !state.toToken.usd)
        return "--";
      return `${toFixed(this.outAmount * (1 - this.tolerance / 100), 4)} ${state.toToken.symbol
        }`;
    },
    minReceiveUsd () {
      if (!this.outAmount || !this.quoteStatus || !state.toToken.usd)
        return "--";
      const amount = this.outAmount * (1 - this.tolerance / 100);
      return `~ $${toFixed(amount * state.toToken.usd, 4)}`;
    },
    youSave () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      if (
        this.exchangeList &&
        this.exchangeList.length > 2 &&
        +this.exchangeList[1].amount > 0
      ) {
        const amount = toFixed(
          this.exchangeList[0].amount - this.exchangeList[1].amount,
          4
        );
        return !amount ? "--" : `${amount} ${state.toToken.symbol}`;
      }
      return "--";
    },
    youSaveUsd () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "";
      if (
        this.exchangeList &&
        this.exchangeList.length > 1 &&
        +this.exchangeList[1].amount > 0 &&
        state.toToken.usd > 0
      ) {
        const amount =
          this.exchangeList[0].amount - this.exchangeList[1].amount;
        return +amount === 0
          ? ""
          : `~ $${toFixed(state.toToken.usd * amount, 4)}`;
      }
      return "";
    },
    priceImpact () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return 0;
      if (
        state.fromToken.usd &&
        state.toToken.usd &&
        this.inAmount &&
        this.outAmount
      ) {
        const inUsdtValue = this.inAmount * state.fromToken.usd;
        const outUsdtValue = this.outAmount * state.toToken.usd;
        let d = (Math.floor(((outUsdtValue - inUsdtValue) / inUsdtValue) * 10000) / 100)
        if (inUsdtValue < 10 && d < -50) {
          d = -50
        }
        return d
      }
      return 0;
    },
    comparedTo () {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "";
      if (
        this.exchangeList &&
        this.exchangeList.length > 2 &&
        +this.exchangeList[1].amount > 0
      ) {
        const amount = toFixed(
          this.exchangeList[0].amount - this.exchangeList[1].amount
        );
        return !amount ? "" : `Compared to ${this.exchangeList[1].dexCode}`;
      }
      return "";
    },
  },
  mounted () {
    this.getDexesList();
    this.logoUrl = localStorage.getItem('logoUrl')
  },
  methods: {
    changeTokenSwap () {
      this.changeRoute({
        fromSymbol: this.$route.query.toSymbol,
        toSymbol: this.$route.query.fromSymbol,
      })
    },
    getAmount () {
      const { value, decimals, balance, balanceDecimals } = state.fromToken;
      const amountDecimals =
        value == balance
          ? balanceDecimals
          :BigNumber(value).times(BigNumber(10).pow(decimals)).toFixed(0);
      return {
        amount: value,
        amountDecimals,
      };
    },
    async getDexesList () {
      if (this.chainName === "ont") {
        this.dexesList = [
          {
            code: "innoswap",
            index: 2,
            checked: true,
            name: "InnoSwap",
          },
        ];
        return;
      }
      const res = await this.$axios.get(this.walletPath + "dex", {
        cache: true,
      });
      if (res && res.length) {
        this.dexesList = res.map((item) => {
          return Object.assign(item, {
            checked: true,
          });
        });
      }
    },
    getDisabledDexIds () {
      const list = [];
      const temp = window.localStorage.getItem(this.chainName + "_dexes");
      const dexes = (temp && JSON.parse(temp)) || {};
      this.dexesList.forEach((item) => {
        if (+dexes[item.code] === 0) {
          list.push(item.index);
        }
      });
      return list;
    },
    changeToken (target, from) {
      const { symbol } = target;
      let query = {}
      if (from) {
        query.fromSymbol = symbol
      } else {
        query.toSymbol = symbol
      }
      this.$router.push({
        name: 'Classic',
        query: { ...this.$route.query, ...query }
      }, () => { })
    },
    async getBalanceOf () {
      if (
        !this.default_account ||
        this.default_account === "0x0000000000000000000000000000000000000000"
      )
        return;
      await this.getFromTokenBalance();
      await this.getToTokenBalance();
    },
    async getFromTokenBalance () {
      if (!state.fromToken.address) {
        state.fromToken.balance = "";
        return;
      }
      const { short, long } = await getBalance(
        this.chainName, this.default_account, state.fromToken
      );
      if (this.chainName !== 'solana') {
        const approve = await getAllowance(this.chainName, this.default_account, state.fromToken, this.approveContract)
        state.fromToken.approve = approve;
      }
      state.fromToken.balance = short ? short + "" : "";
      state.fromToken.balanceDecimals = long;
    },
    async getToTokenBalance () {
      if (!state.toToken.address) {
        state.toToken.balance = "";
        return;
      }
      const { short, long } = await getBalance(
        this.chainName, this.default_account, state.toToken
      );
      state.toToken.balance = short ? short + "" : "";
      state.toToken.balanceDecimals = long;
    },
    setExchange (dexes, unSelected, inAmount, outAmout, outDecimals) {
      let temp = dexes.map((item) => {
        item.amount =
          (+item.swapAmount &&
            BigNumber(+item.swapAmount)
              .div(BigNumber(10).pow(outDecimals))
              .decimalPlaces(4)
              .toString()) ||
          "0";
        item.price = toFixed(item.amount / inAmount, 4);
        if (unSelected.indexOf(item.dexIndex) >= 0) {
          item.disabled = 1;
          item.sortId = -1;
        } else {
          item.disabled = 0;
          item.sortId = +item.amount;
        }
        return Object.assign(item, {
          code: 1,
        });
      });
      temp.sort((a, b) => {
        return a.sortId > b.sortId ? -1 : 1;
      });
      outAmout =
        temp && temp[0] && +temp[0].amount > +outAmout
          ? temp[0].amount
          : outAmout;
      temp.map((item) => {
        if (item.amount && +item.amount !== 0) {
          if (item.amount == outAmout) {
            item.diff = this.$t("table_match");
          } else {
            item.diff =
              (((item.amount - outAmout) / outAmout) * 100).toFixed(2) + "%";
          }
        } else {
          item.diff = "";
        }
      });
      if (this.chainName === "ont") {
        temp = [
          {
            code: 2,
            dexCode: "innoswap",
            amount: outAmout,
            price: toFixed(outAmout / inAmount, 4),
            disabled: 0,
            diff: this.$t("table_match"),
          },
        ];
      }
      temp.unshift({
        code: 1,
        dexCode: "OpenOcean",
        amount: outAmout,
        price: toFixed(outAmout / inAmount, 4),
        disabled: 0,
        diff: this.$t("table_best"),
      });
      state.exchangeList = temp;
    },
    quote (auto) {
      console.log('quote--------------')
      if (this.loading) return;
      if (!this.gasPrice) return;
      if (this.tabCode === "02") return;

      this.quoteStatus = 0;
      if (+this.inAmount <= 0) {
        state.fromToken.usd = 0;
        state.toToken.usd = 0;
        this.minOutAmount = "";
        this.getBalanceOf();
        return;
      }
      const { symbol, address } = state.fromToken;
      const outToken = state.toToken;
      const { amount: _inAmount, amountDecimals } = this.getAmount();
      if (+_inAmount === 0) {
        state.toToken.value = "";
        return;
      }
      if (isNaN(amountDecimals)) {
        this.loading = false;
        return;
      }
      if (!auto) {
        this.loading = true;
      }
      const unSelected = this.getDisabledDexIds();
      const slippage = +this.tolerance;
      this.$axios
        .get(
          this.walletPath +
          "quote?" +
          qs.stringify({
            inTokenSymbol: symbol,
            inTokenAddress: address,
            outTokenSymbol: outToken.symbol,
            outTokenAddress: outToken.address,
            amount: amountDecimals,
            gasPrice: this.gasPrice,
            slippage: slippage * 100,
            disabledDexIds: unSelected.join(","),
            connectors: localStorage.getItem("connectors")||''
          })
        )
        .then(async (res) => {
          const {
            dexes = [],
            inAmount,
            outAmount,
            estimatedGas = "",
            path = [],
          } = res;
          const amount = this.getAmount();
          if (+inAmount !== +amount.amountDecimals) {
            this.loading = false;
            this.quote();
            return;
          }
          window.localStorage.setItem(
            this.chainName + "_in",
            symbol.toLowerCase()
          );
          window.localStorage.setItem(
            this.chainName + "_out",
            outToken.symbol.toLowerCase()
          );
          const outDecimals = outToken.decimals;
          let _outAmout =
            (outAmount &&
              BigNumber(outAmount)
                .div(BigNumber(10).pow(outDecimals))
                .decimalPlaces(4)
                .toString()) ||
            "";
          this.estimatedGas = estimatedGas;
          state.routePath = path;
          this.setExchange(
            dexes,
            unSelected,
            _inAmount,
            _outAmout,
            outDecimals
          );
          state.toToken.value = _outAmout;
          this.loading = false;
          this.quoteStatus = 1;
          await this.getTokenPrice(state.fromToken, state.toToken);
          await this.getNativeTokenPrice();
          await this.getBalanceOf();
          clearTimeout(this.timer);
          this.timer = setTimeout(async () => {
            this.quote();
          }, 10000);
        })
        .catch((e) => {
          this.loading = false;
          setTimeout(() => {
            this.quote();
          }, 10000);
        });
    },
    async swapQuote () {
      if (!this.account) {
        window.showWalletEvent && window.showWalletEvent(this.chainName);
        return;
      }
      if (+this.inAmount <= 0 || +this.outAmount <= 0) return;
      if (this.loading) return;
      const { symbol, address, balance, id: ids } = state.fromToken;
      const outToken = state.toToken;
      const unSelected = this.getDisabledDexIds();
      if (this.chainName !== "solana") {
        if (symbol !== "OOE") {
          if (unSelected.length === this.dexesList.length) return;
        }
      }
      const native = isNativeToken(this.chainName, address);
      const { amount, amountDecimals } = this.getAmount();
      console.log(amount, amountDecimals)
      if (native) {
        const { symbol, decimals } = getNativeToken(this.chainName);
        if (symbol && decimals) {
          const gasFee = decimals2Amount(
            this.estimatedGas * this.gasPrice,
            decimals
          );
          if (+gasFee && +balance - +amount < gasFee * 2) {
            showToast(
              `You need to keep a small amount of ${symbol} to pay for the gas fees.`
            );
            return;
          }
        }
      }
      this.loading = true;
      const params = {
        inTokenSymbol: symbol,
        inTokenAddress: address,
        outTokenSymbol: outToken.symbol,
        outTokenAddress: outToken.address,
        amount: amountDecimals,
        gasPrice: this.gasPrice,
        disabledDexIds: unSelected.join(","),
        slippage: this.tolerance * 100,
        account: this.default_account,
        referralName: 'openOcean',
        referrer: this.$route.query.referrer || "0x3487ef9f9b36547e43268b8f0e2349a226c70b53",
        referrerFee: this.$route.query.referrer ? 100 : 0,
        referrerFeeShare: this.$route.query.referrer ? 1500 : 0,
        connectors: localStorage.getItem("connectors")||''
      }
      let referralName = localStorage.getItem('referralName')
      let referralAddress = localStorage.getItem('referralAddress')
      let referralFee = localStorage.getItem('referralFee')
      if (referralName && referralAddress && referralFee) {
        referralFee = Number(referralFee)
        if (referralFee >= 0 && referralFee <= 3) {
          params.referralName = referralName
          params.referrer = referralAddress
          params.referrerFee = parseInt(referralFee * 100)
          params.referrerFeeShare = 1500
        }
      }
      if (this.$route.query.referrer) {
        params.referrer = this.$route.query.referrer
      }

      this.$axios
        .get(
          this.walletPath +
          "swap-quote?" +
          qs.stringify(params)
        )
        .then((res) => {
          res.gasPrice = this.gasPrice;
          if (this.chainName === "eth") {
            const option = window.localStorage.getItem("gasoption");
            this.gasPriceOptions.forEach((item) => {
              if (item.code === option && item.ethgas) {
                res.ethGasPrice = item.ethgas;
              }
            });
          }
          console.log("this.chainName === 'eth'", this.chainName);

          res._amount = amountDecimals;
          res.symbol = symbol;
          res.outTokenSymbol = outToken.symbol;
          res.fromIds = ids;
          res.params = params;
          res.timestamp = new Date().getTime();
          this.swapRes = res;
          // this.swapRes.gasPrice = this.gasPrice;
          const outDecimals = outToken.decimals;
          const { outAmount, minOutAmount } = res;
          this.minOutAmount =
            (minOutAmount &&
              BigNumber(minOutAmount).div(BigNumber(10).pow(outDecimals)).toFixed(4)) ||
            "";
          this.swapOutAmount =
            (outAmount &&
              BigNumber(outAmount).div(BigNumber(10).pow(outDecimals)).toFixed(4)) ||
            "";
          this.loading = false;
          this.tradeData = {
            price: this.rate,
            symbol: state.fromToken.symbol,
            priceImpact: this.priceImpact,
            tolerance: this.tolerance,
            estimatedGasValue: this.estimatedGasValue,
            estimatedGasValueUsd: this.estimatedGasValueUsd,
            minOutAmount: formatPrice(this.minOutAmount),
            swapOutAmount: this.swapOutAmount,
            approve: !!res.approve,
          };
          this.isConfirmShow = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async confirmSwap () {
      // this.swapRes.gasPrice = window.localStorage.getItem(`${this.chainName}_setting_gasPrice`);
      const { approve, swap, transaction, _amount, symbol, params, timestamp, rfqDeadline = 0 } = this.swapRes;
      if (new Date().getTime() - timestamp > 5 * 1000 || rfqDeadline > 0) {
        const res = await this.$axios
          .get(
            this.walletPath +
            `${this.gasOOE ? 'meta-swap' : 'swap-quote'}?` +
            qs.stringify(params)
          );
        if (this.chainName === "eth") {
          const option = window.localStorage.getItem("gasoption");
          this.gasPriceOptions.forEach((item) => {
            if (item.code === option && item.ethgas) {
              res.ethGasPrice = item.ethgas;
            }
          });
        }
        const _outAmout1 = decimals2Amount(res.outAmount, res.outToken.decimals);
        const _outAmout2 = decimals2Amount(this.swapRes.outAmount, this.swapRes.outToken.decimals);
        if (BigNumber(_outAmout1).comparedTo(_outAmout2) < 0 || rfqDeadline > 0) {
          res._amount = this.swapRes.amountDecimals;
          res.symbol = this.swapRes.symbol;
          res.outTokenSymbol = this.swapRes.outToken.symbol;
          res.fromIds = this.swapRes.ids;
          this.swapRes = res;
        }
      }
      this.swapRes.gasPrice = this.gasPrice;
      if (this.chainName === "ont") {
        console.log("walletName", this.walletName);
        if (this.walletName === "ONTO Mobile") {
          const instance = showOntoScan(approve ? approve : swap);
          instance.$on("close", this.hideQrcode);
        } else {
          if (approve) {
            this.approveOnt(transaction, _amount, symbol);
          } else {
            this.sendOntTransaction(transaction);
          }
        }
      } else {
        sendTransaction(this.swapRes)
      }
      this.isConfirmShow = false;
    },

    async approveOnt (transaction, _amount, symbol) {
      const instance = showNotification({
        status: "loading",
        title: this.$t("notification_pending_title"),
        notice: this.$t("notification_pending_notice"),
        text: this.$t("notification_pending_content", { symbol }),
      });
      try {
        const { scriptHash, operation, gasLimit, args } = transaction;
        const params = {
          contract: state.fromToken.address,
          operation: "approve",
          args: [
            {
              type: "Address",
              value: this.default_account,
            },
            {
              type: "ByteArray",
              value: utils.reverseHex(scriptHash),
            },
            {
              type: "ByteArray",
              value: utils.bigIntToBytes(_amount + ""),
            },
          ],
          gasPrice: 2500,
          gasLimit: 40000,
        };
        const result = await client.api.smartContract.invoke(params);
        console.log("approveOnt params, result", params, result);
        this.sendOntTransaction(transaction, instance);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log("onScCall error:", e);
        instance.change({ status: "failed", text: (e && e.message) || e });
        this.isConfirmShowing = false;
      }
    },
    async sendOntTransaction (transaction, instance) {
      const { symbol, outTokenSymbol } = this.swapRes;
      if (!instance) {
        instance = showNotification({
          status: "loading",
          title: this.$t("notification_pending_title"),
          notice: this.$t("notification_pending_notice"),
          text: this.$t("notification_pending_content", { symbol }),
        });
      }
      try {
        const { scriptHash, operation, gasLimit, args } = transaction;
        const params = {
          scriptHash,
          operation,
          args: this.formatArgs(args),
          gasPrice: 2500,
          gasLimit: 60000,
          requireIdentity: false,
        };
        console.log("sendOntTransaction params", params);
        const result = await client.api.smartContract.invoke(params);
        // tslint:disable-next-line:no-console
        console.log("onScCall finished, result:" + JSON.stringify(result));
        console.log("submitted", this.swapRes);
        if (result && result.transaction) {
          instance.change({
            status: "submitted",
            chain: this.chainName,
            address: result.transaction,
            title: this.$t("notification_submited_title"),
            text: this.$t("notification_submited_content"),
            subcontent: `Successfully swap from ${symbol} to ${outTokenSymbol}`,
          });
          setTimeout(() => {
            window.reloadPage();
          }, 3000);
        } else {
          instance.change({ status: "failed", text: result.message });
          window.reloadPage();
        }
        this.isConfirmShowing = false;
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log("onScCall error:", e);
        instance.change({ status: "failed", text: (e && e.message) || e });
        this.isConfirmShowing = false;
      }
    },
    formatArgs (args) {
      return args.map((item) => {
        const { type } = item;
        if (["Long", "Integer"].indexOf(type) >= 0) {
          item.value = Number(item.value);
        }
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.magic-edit {
  display: flex;
}

.content {
  flex: 1;
  margin-left: 10px;
  text-align: right;
}

.t-label {
  color: var(--color-content);
  font-size: 12px;
  line-height: 16px;
  transform: scale(0.833);
  transform-origin: left;
  display: flex;
  align-items: flex-end;

  &.left {
    max-width: 80px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &.max {
    max-width: 90px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &.right {
    transform-origin: right;
  }

  .red {
    color: var(--fail);
  }

  .green {
    color: var(--success);
  }
}

.warning__icon {
  display: none;
}

.warning-info {
  display: none;
}

.warning {
  position: relative;
  cursor: pointer;

  .warning__icon {
    margin-left: 2px;
    display: inline-block;
    font-size: 12px;
    transform: scale(0.9);
    transform-origin: left;
  }

  &:hover,
  &.on {
    .warning-info {
      display: block;
      top: -64px;
    }
  }

  // .warning-info {
  //   position: absolute;
  //   right: -20px;
  //   top: -18px;
  //   padding: 8px 10px;
  //   line-height: 1.5;
  //   background-color: var(--tooltip-bg);
  //   border-radius: 5px;
  //   color: var(dialog-content);
  //   font-size: 14px;
  //   text-align: left;
  //   width: 260px;
  //   display: none;
  //   &::after {
  //     position: absolute;
  //     right: 20px;
  //     bottom: -4px;
  //     content: "";
  //     display: block;
  //     width: 0;
  //     height: 0;
  //     border-top: 5px solid var(--tooltip-bg);
  //     border-right: 5px solid transparent;
  //     border-left: 5px solid transparent;
  //   }
  // }
}

.copyright {
  margin-top: 8px;
  height: 16px;
  line-height: 16px;
  transform: translateY(6px);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 13px;
    color: var(--text_secondary);
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  svg {
    height: 20px;
  }
}

.logo {
  height: 30px;
}
</style>