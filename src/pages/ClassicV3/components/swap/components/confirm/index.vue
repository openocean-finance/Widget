<template>
  <div class="dialog-wrapper">
    <h2 class="g-dialog-title" v-if="status === 'confirm'">
      <span>{{ $t("dialog_confirm") }}</span>
      <div class="g-circle-button" @click="close">
        <i class="iconfont iconClose"></i>
      </div>
    </h2>
    <h2 class="g-dialog-title" v-if="status === 'gasprice'">
      <div class="g-clickable g-back-button" @click="changeStatus('confirm')">
        <i class="iconfont icondrop_down"></i>
      </div>
      <span>{{ $t("dialog_confirm") }}</span>
      <div class="g-circle-button" @click="close">
        <i class="iconfont iconClose"></i>
      </div>
    </h2>
    <h2 class="g-dialog-title" v-if="status === 'slippage'">
      <div class="g-clickable g-back-button" @click="changeStatus('confirm')">
        <i class="iconfont icondrop_down"></i>
      </div>
      <span>{{ $t("dialog_confirm") }}</span>
      <div class="g-circle-button" @click="close">
        <i class="iconfont iconClose"></i>
      </div>
    </h2>
    <div
      ref="dialogInner"
      class="dialog-inner"
      :style="{ width: `200%`, transform: `translateX(${transformX ? '-50%' : '0'})` }"
    >
      <div class="dialog-content confirm">
        <div class="confirm__content">
          <ul class="token">
            <li>
              <div class="title">
                <span>{{ $t("dialog_pay") }}</span>
              </div>
              <div class="value">
                <img :src="fromToken.icon" class="icon" />
                <span>{{ fromToken.symbol }}</span>
              </div>
            </li>
            <li>
              <div class="title">
                <span>~$ {{ fromTokenUsdValue }}</span>
              </div>
              <div class="value">
                <span>{{ fromToken.value }}</span>
              </div>
            </li>
          </ul>
          <ul class="token">
            <li>
              <div class="title">
                <span>{{ $t("dialog_receive") }}</span>
              </div>
              <div class="value">
                <img :src="toToken.icon" class="icon" />
                <!-- <a href="#">{{ toToken.symbol }}</a> -->
                <span>{{ toToken.symbol }}</span>
                <!-- <img src="@/assets/v3/icon-link.svg" class="link" /> -->
              </div>
            </li>
            <li>
              <div class="title">
                <span>~$ {{ toTokenUsdValue }}</span>
              </div>
              <div class="value">
                <span>{{ toToken.value }}</span>
              </div>
            </li>
          </ul>
          <div class="info">
            <dl>
              <dt>
                <span>{{ trade.symbol }} price</span>
              </dt>
              <dd>
                <!-- <i>~$1,234,567</i> -->
                <span>{{ trade.price }}</span>
              </dd>
            </dl>
            <dl v-if="isCustomGas">
              <dt>
                <span>{{ $t("dialog_gasprice") }}</span>
              </dt>
              <dd class="link" @click="changeStatus('gasprice')">
                <span>{{ gas2Gwei(gas_price) }}</span>
                <i class="iconfont iconreturn"></i>
              </dd>
            </dl>
            <dl>
              <dt>
                <span>{{ $t("dialog_minimum_received") }}</span>
                <ToolTip :text="$t('help_minimum_received')" />
              </dt>
              <dd>
                <span>{{ trade.minOutAmount }} {{ toToken.symbol }}</span>
              </dd>
            </dl>
            <dl>
              <dt>
                <span>{{ $t("dialog_tolerance") }}</span>
              </dt>
              <dd class="link" @click="changeStatus('slippage')">
                <span>{{ displayTolerance }}%</span>
                <i class="iconfont iconreturn"></i>
              </dd>
            </dl>
            <dl>
              <dt>
                <span>{{ $t("dialog_transaction_cost") }}</span>
                <ToolTip :text="$t('help_transaction_cost')" />
              </dt>
              <dd>
                <i>{{ trade.estimatedGasValueUsd }}</i>
                <span>{{ trade.estimatedGasValue }}</span>
              </dd>
            </dl>
            <!-- <dl>
              <dt>
                <span>{{ $t("dialog_protocol_fee") }}</span>
                <ToolTip :text="$t('help_protocol_fee')" />
              </dt>
              <dd>
                <span>0</span>
              </dd>
            </dl> -->
          </div>
          <div class="button-group">
            <div class="g-clickable button cancel" @click="close">
              <span>{{ $t("dialog_cancel") }}</span>
            </div>
            <div
              class="g-clickable button primary"
              v-if="second"
              @click="confirm"
            >
              <span>{{ $t("dialog_swap_confirm_order", { second }) }}</span>
            </div>
            <div class="g-clickable button refresh" v-else @click="refresh">
              <i class="iconfont iconshuaxin1"></i>
              <span>{{ $t("dialog_swap_refresh_quote") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-content gas-price" v-if="status === 'gasprice'">
        <div class="gasprice-content">
          <div class="price" v-if="chainName === 'eth'">
            <div
              v-for="(item, i) in gasPriceOptionList"
              :key="i"
              :class="{ active: gas_price == item.value }"
              @click="selectGas(item)"
            >
              <!-- <div>{{ item.code }}</div> -->
              <div>{{ item.label }}</div>
            </div>
          </div>
          <div class="custom">
            <input
              placeholder="Custom"
              type="text"
              :class="{ inputted: inputted_gas }"
              :value="gas2Gwei(gas_price).slice(0, -5)"
              @input="inputGasHandler"
            />
          </div>
          <div class="tips">
            <div>{{ $t("dialog_gasprice_tip1") }}</div>
            <div>{{ $t("dialog_gasprice_tip2") }}</div>
          </div>
        </div>
      </div>
      <div class="dialog-content slippage" v-if="status === 'slippage'">
        <div class="slippage-content">
        <div class="tolerance">
          <ul>
            <li
              v-for="(item, i) in toleranceOptions"
              :key="i"
              :class="{ active: tolerance === item.value }"
              @click="select(item)"
            >
              {{ item.label }}
            </li>
          </ul>
          <div class="custom">
            <input
              :placeholder="$t('exchange_custom')"
              type="text"
              @input="inputHandler"
            />
          </div>
        </div>
        <div class="tips">
          <div>{{ $t("dialog_tolerance_tip1") }}</div>
          <div>{{ $t("dialog_tolerance_tip2") }}</div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolTip from "@/components/ToolTip";
import { gwei2Gas, gas2Gwei } from "@/utils/number";
import * as BN from "bignumber.js";
import { isCustomGas } from "@/utils/getChains";
import { contract as state } from "@/contract";

export default {
  name: "Confirm",
  components: { ToolTip },
  props: {
    trade: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: [Number, String],
      require: true,
    },
  },

  data() {
    let displayTolerance =  window.localStorage.getItem(`${state.chainName}_setting_tolerance`) || state.tolerance;
    return {
      status: "confirm",
      gas_price: state.gasPrice,
      id: null,
      loading: false,
      second: 60,
      transformX: 0,
      inputted_gas: false,
      timeout:null,
      displayTolerance
    };
  },
  watch: {
    gasPriceOptionList(e) {
      if (e.length && this.gas_price == "5000000000") {
        this.gas_price = e[0].value + "";
      }
    },
    gas_price(newVal) {
      state.gasPrice = newVal;
      window.localStorage.setItem(
        `${this.chainName}_setting_gasPrice`,
        newVal
      );
    },
    tolerance(newVal) {
      state.tolerance = newVal
      window.localStorage.setItem(
        `${this.chainName}_setting_tolerance`,
        newVal
      );
      this.displayTolerance = newVal
    },
  },
  computed: {
    fromToken: () => state.fromToken,
    toToken: () => state.toToken,
    gasPriceOptionList() {
      return state.gasPriceOptions;
    },
    formatGasPrice() {
      let gasPrice = "--";
      switch (this.chainName) {
        case "ont":
          gasPrice = "0.15 ONG";
          break;
        case "eth":
          const gasLabel = this.$t(
            "gas_" +
              (window.localStorage.getItem("gasoption") || "").toLowerCase()
          );
          gasPrice =
            gasLabel +
            "(" +
            ((this.gas_price &&
              BN(this.gas_price).div(BN(10).pow(9)).toFixed(2)) ||
              "-") +
            " GWEI)";
          break;
        case "bsc":
        case "polygon":
        case "xdai":
        case "heco":
        case "avax":
        case "okex":
        case "fantom":
          gasPrice =
            ((this.gas_price &&
              BN(this.gas_price).div(BN(10).pow(9)).toFixed(2)) ||
              "-") + " GWEI";
          break;
      }
      return gasPrice;
    },
    isCustomGas() {
      return isCustomGas(this.chainName);
    }
  },
  mounted() {
    this.countDown();
  },
  methods: {
    countDown() {
      this.second = 60;
      clearInterval(this.id);
      this.id = setInterval(() => {
        if (this.second === 0) {
          clearInterval(this.id);
          this.loading = true;
          return;
        }
        this.second = this.second - 1;
      }, 1000);
    },
    close() {
      this.$emit("close");
    },
    closeHandler() {
      this.$emit("close");
    },
    closeModal() {
      this.$emit("close");
    },
    refresh() {
      this.$emit("refresh");
      setTimeout(() => {
        this.countDown();
      }, 1000);
    },
    confirm() {
      console.log(this.toleranceV3);
      console.log(state.tolerance);
      this.$emit("confirm");
    },
    changeStatus(status) {
      if (status === "confirm") {
        this.transformX = 0;
      } else {
        this.transformX = 1;
      }
      this.status = status;
    },
    select(item) {
      const { value } = item;
      this.trade.tolerance = value;
      state.tolerance = value;
    },
    inputHandler(e) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
      let val = e.target.value  
        val = Math.abs(val || 0)
          .toString()
          .match(RegExp("^\\d*(\\.?\\d{0,8})"))[0];
      if(val){
      e.target.value = val;
      this.trade.tolerance = val;
      state.tolerance = val;
      } else {
        return
      }
      }, 1000);
    },
    selectGas(target) {
      if (target.value === this.gas_price) {
        return;
      }
      this.gas_price = target.value;
      this.inputted_gas = false;
    },
    inputGasHandler(e) {
      const val =
      e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1") || "";
      if (val === "") return;
      e.target.value = val;
      this.gas_price = gwei2Gas(val);
      this.inputted_gas = true;
    },
    gas2Gwei,
    gwei2Gas,
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>