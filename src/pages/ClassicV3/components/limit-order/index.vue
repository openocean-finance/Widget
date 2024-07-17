<template>
  <div>
    <div class="swap">
      <Field
        :token="tokenLimitPrev"
        :usd-value="tokenLimitPrevUsdValue"
        @change="changeToken"
      />
      <div class="mid">
        <div class="g-clickable switch" @click="changeTokenLimit">
          <i class="iconfont iconswitch"></i>
        </div>
        <div class="content">
          <Expired @change="changeExpired" />
          <Price :quote-price="quotePrice" @change="changePrice" />
        </div>
      </div>
      <Field
        :token="tokenLimitNext"
        :usd-value="tokenLimitNextUsdValue"
        :from="false"
        @change="changeToken"
      />
      <Label
        :in-amount="inAmount"
        :out-amount="outAmount"
        :quote-status="quoteStatus"
        :rate="rate"
        :inverse-rate="inverseRate"
        :token-prev="tokenLimitPrev"
        :token-next="tokenLimitNext"
      />
      <Button
        :in-amount="inAmount"
        :out-amount="inAmount"
        :token="tokenLimitPrev"
        :loading="loading"
        :price-impact="0"
        :exchange="exchange"
        :chain="walletType"
        :skip-approve="true"
        type="limit"
        @confirm="confirm"
      />
      <Info :label="`1 ${tokenLimitPrev.symbol} cost`" :value="rate" />
      <Info :label="`1 ${tokenLimitNext.symbol} cost`" :value="inverseRate" />
    </div>
    <Confirm
      :is-show="isConfirmShow"
      :trade="tradeData"
      @close="isConfirmShow = false"
      @confirm="confirmSwap"
    />
  </div>
</template>

<script>
import Field from "../swap/components/field";
import Button from "../swap/components/button";
import Label from "../swap/components/label";
import Info from "../swap/components/info";
import Price from "./components/price";
import Expired from "./components/expired";
import Confirm from "./components/confirm";
import qs from "qs";
import * as BN from "bignumber.js";
import { contract as state } from "@/contract";
import { toFixed, toFixedV2 } from "@/utils/format";
import { amount2Decimals, getDiv } from "@/utils/number";
import { createLimitOrder, getBalance, getAllowance } from "@/init";

export default {
  components: {
    Field,
    Button,
    Label,
    Info,
    Price,
    Expired,
    Confirm,
  },
  props: {
    tabCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      exchange: {},
      timeout: null,
      quoteStatus: 0,
      loading: false,
      isConfirmShow: false,
      price: "",
      timer: null,
      quotePrice: "",
      expire: "7D",
      tradeData: {},
    };
  },
  watch: {
    "tokenLimitPrev.symbol"(newVal, oldVal) {
      this.quotePrice = "";
      this.price = "";
      this.getBalanceOf();
      this.quote();
    },
    "tokenLimitNext.symbol"(newVal, oldVal) {
      this.quotePrice = "";
      this.price = "";
      this.getBalanceOf();
      this.quote();
    },
    "tokenLimitPrev.value"(newVal, oldVal) {
      this.tokenLimitNext.value = toFixedV2(
        BN(this.price ? this.price : this.quotePrice).multipliedBy(newVal),
        6
      );
      this.getBalanceOf();
      this.quote();
    },
    price(newVal, oldVal) {
      this.tokenLimitNext.value = toFixedV2(
        BN(newVal).multipliedBy(this.tokenLimitPrev.value),
        6
      );
    },
    quotePrice(newVal, oldVal) {
      if (!this.price) {
        this.tokenLimitNext.value = toFixedV2(
          BN(newVal).multipliedBy(this.tokenLimitPrev.value),
          6
        );
      }
    },
    tabCode(newVal, oldVal) {
      if (newVal === "02") {
        this.quote();
      }
    },
  },
  computed: {
    inAmount() {
      return this.tokenLimitPrev.value;
    },
    outAmount() {
      return this.tokenLimitNext.value;
    },
    rate() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      return `${toFixedV2(getDiv(this.outAmount, this.inAmount), 6)} ${
        this.tokenLimitNext.symbol
      }`;
    },
    inverseRate() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      return `${toFixedV2(getDiv(this.inAmount, this.outAmount), 6)} ${
        this.tokenLimitPrev.symbol
      }`;
    },
  },
  mounted() {
    this.getExchange();
    this.quote();
  },
  methods: {
    getAmount() {
      const { value, decimals, balance, balanceDecimals } = this.tokenLimitPrev;
      const amountDecimals =
        value === balance
          ? balanceDecimals
          : BN(value).times(BN(10).pow(decimals)).toFixed(0);
      return {
        amount: value,
        amountDecimals,
      };
    },
    changeTokenLimit() {
      state.tokenLimit = 1 - state.tokenLimit;
    },
    changePrice(val) {
      this.price = val;
    },
    changeExpired(code, value) {
      this.expire = value;
    },
    async getBalanceOf() {
      if (
        !this.default_account ||
        this.default_account === "0x0000000000000000000000000000000000000000"
      )
        return;
      await this.getTokenBalanceOf(this.tokenLimitPrev);
      await this.getTokenBalanceOf(this.tokenLimitNext);
    },
    async getTokenBalanceOf(token) {
      const { symbol, address, decimals } = token;
      const { abi, approveContract } = this.exchange || {};
      if (!address || !approveContract) {
        token.balance = "";
        return;
      }
      console.log("getTokenBalanceOf", token);
      
      const { short, long } = await getBalance(
        this.walletType, this.default_account, token
      );
      if (this.walletType !== 'solana') {
        const approve = await getAllowance(this.walletType, this.default_account, token, approveContract)
        token.approve = approve;
      }
      token.balance = short ? short + "" : "";
      token.balanceDecimals = long;
    },
    changeToken(target, from) {
      const { id, code, name, symbol, address, icon, decimals } = target;
      const token = {
        id: id,
        code,
        name,
        symbol,
        icon,
        address,
        decimals,
        price: 0,
        usd: 0,
        balance: 0,
        usdtValue: 0,
        value: 0,
        balanceDecimals: 0,
      };
      if (from) {
        token.value = 1;
        Object.assign(state.tokenLimitList[this.tokenLimit], token);
      } else {
        Object.assign(state.tokenLimitList[1 - this.tokenLimit], token);
      }
    },
    updateToken() {
      this.saveToken("tokenLimitPrev", this.tokenLimitPrev);
      this.saveToken("tokenLimitNext", this.tokenLimitNext);
    },
    quote(flag) {
      this.retry = 3;
      this.quoteStatus = 0;
      if (flag) {
        this.quoteCore(flag);
      } else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.quoteCore();
        }, 500);
      }
    },
    quoteCore(auto) {
      if (this.loading) return;
      if (!this.gasPrice) return;
      if (this.tabCode === "01") return;
      this.updateToken();

      if (+this.inAmount <= 0 && this.outAmount <= 0) {
        this.tokenLimitPrev.usd = 0;
        this.tokenLimitNext.usd = 0;
        this.minOutAmount = "";
        this.getBalanceOf();
        return;
      }
      const { symbol, address } = this.tokenLimitPrev;
      const outToken = this.tokenLimitNext;
      const { amount: _inAmount, amountDecimals } = this.getAmount();
      if (+_inAmount === 0) {
        this.tokenLimitNext.value = "";
        return;
      }
      if (isNaN(amountDecimals)) {
        this.loading = false;
        return;
      }
      if (!auto) {
        this.loading = true;
      }
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
              disabledDexIds: [],
            })
        )
        .then(async (res) => {
          const { inAmount, outAmount } = res;
          const amount = this.getAmount();
          if (+inAmount !== +amount.amountDecimals) {
            this.loading = false;
            this.quote();
            return;
          }
          const outDecimals = outToken.decimals;
          let _outAmout =
            (outAmount &&
              BN(outAmount)
                .div(BN(10).pow(outDecimals))
                .decimalPlaces(4)
                .toString()) ||
            "";
          this.quotePrice = _outAmout > 0 ? _outAmout / _inAmount : 0;
          this.loading = false;
          this.quoteStatus = 1;
          await this.getTokenPrice(this.tokenLimitPrev, this.tokenLimitNext);
          await this.getNativeTokenPrice();
          await this.getBalanceOf();
          clearTimeout(this.timer);
          this.timer = setTimeout(async () => {
            this.quoteCore(true);
          }, 3000);
        })
        .catch((e) => {
          this.loading = false;
          setTimeout(() => {
            this.quote();
          }, 1000);
        });
    },
    confirm() {
      this.tradeData = {
        rate: this.rate,
        inverseRate: this.inverseRate,
      };
      this.isConfirmShow = true;
    },
    async confirmSwap() {
      if (!this.account) {
        window.showWalletEvent && window.showWalletEvent(this.walletType);
        return;
      }
      if (+this.inAmount <= 0 || +this.outAmount <= 0) return;
      if (this.loading) return;
      try {
        const inToken = this.tokenLimitPrev;
        const outToken = this.tokenLimitNext;
        const amountDecimals = amount2Decimals(inToken.value, inToken.decimals);
        const outAmountDecimals = amount2Decimals(
          outToken.value,
          outToken.decimals
        );
        const chainId = +localStorage.getItem("walletChainId");
        const limitOrder = await createLimitOrder(
          inToken,
          outToken,
          this.default_account,
          amountDecimals,
          outAmountDecimals,
          chainId,
          this.gasPrice,
          this.expire,
          inToken.decimals
        );
        this.isConfirmShow = false;
        const result = await this.$axios.post(
          `https://open-api.openocean.finance/v1/${chainId}/limit-order`,
          limitOrder
        );
        console.log("submit limitorder", result);
      } catch (e) {
        console.log("confirmSwap", e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>