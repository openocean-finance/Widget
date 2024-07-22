<template>
  <div>
    <div class="g-clickable button loading" v-if="loading">
      <span>{{ $t("exchange_finding_best_prices") }}</span>
      <div class="loader"></div>
    </div>
    <div class="g-clickable button connect" v-else-if="!account" @click="connect">
      <span>{{ $t("menu_connect_wallet") }}</span>
    </div>
    <div class="button disabled" v-else-if="+inAmount > +fromToken.balance">
      <span>{{ $t("exchange_insufficient_balance") }}</span>
    </div>
    <div class="approve" v-else-if="checkApprove">
      <div class="button-group">
        <div class="g-clickable button unlock" :class="{ loading: unlockLimitLoading }" v-if="approveType === '' || approveType === '0'" @click="approveTo('0')">
          <span>{{ $t("exchange_unlock") }} {{ inAmount }} {{ fromToken.symbol }}</span>
          <div class="loader" v-if="unlockLimitLoading"></div>
        </div>
        <div class="g-clickable button infinite-unlock" :class="{ loading: infiniteLimitLoading }" v-if="approveType === '' || approveType === '1'" @click="approveTo('1')">
          <span>{{ $t("exchange_infinite_unlock") }} </span>
          <div class="loader" v-if="infiniteLimitLoading"></div>
        </div>
      </div>
      <div class="warning">
        <img class="g-dark-only icon" src="@/assets/icon-hint-dark.svg" />
        <img class="g-light-only icon" src="@/assets/icon-hint-light.svg" />
        <span>{{ $t("exchange_swap_warning", { symbol: fromToken.symbol }) }}</span>
      </div>
    </div>
    <div class="g-clickable button disabled" v-else-if="!unlockLimitLoading &&
      inAmount > 0 &&
      (outAmount <= 0 || priceImpact < -50)
      ">
      <span>{{ $t("exchange_insufficient_liquidity") }}</span>
    </div>
    <div class="g-clickable button swap" v-else-if="inAmount > 0 && outAmount > 0 && priceImpact > -50" @click="$emit('confirm')">
      <span v-if="type === 'swap'">{{ $t("exchange_swap_now") }}</span>
      <span v-if="type === 'limit'">{{ $t("exchange_limit_order") }}</span>
    </div>
    <div class="g-clickable button" v-else>
      <span>{{ $t("exchange_enter_amount") }}</span>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import { getBalance, sendApproveTo, initTryConnect, getAllowance } from "@/init";
import { isMobile, isApp } from "@/utils/helpers"
import { contract as state } from "@/contract";
import showToast from "@/components/toast";

export default {
  props: {
    inAmount: {
      type: [String, Number],
      default: "",
    },
    outAmount: {
      type: [String, Number],
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    priceImpact: {
      type: [String, Number],
      default: 0,
    },
    exchange: {
      type: Object,
      default () {
        return {};
      },
    },
    type: {
      type: String,
      default: "swap"
    },
    type: {
      type: String,
      default: "swap"
    },
    skipApprove: {
      type: Boolean,
      default: false
    },
    chain: {
      type: String,
    }
  },
  computed: {
    fromToken: () => state.fromToken,
    checkApprove () {

      if (this.skipApprove) return false;
      this.infiniteLimitLoading = false;
      this.unlockLimitLoading = false;
      this.approveType = "";
      if (this.chainName === 'solana') {
        return false
      }
      const { amountAll } = this.getAmount();
      console.log('checkApprove', state.fromToken.approve, amountAll, new BigNumber(this.fromToken.approve).comparedTo(amountAll) < 0)

      return (
        this.inAmount > 0 &&
        this.outAmount > 0 &&
        this.fromToken.approve >= 0 &&
        new BigNumber(this.fromToken.approve).comparedTo(amountAll) < 0
      );
    },
  },
  data () {
    return {
      approveType: "",
      unlockLimitLoading: false,
      infiniteLimitLoading: false,
    };
  },
  methods: {
    async connect () {
      if (isApp()) {
        console.log("isApp:-------", !!isApp());
        showToast("Connect Error, Please Refresh");
      }
      console.log("isMobile:-------", isMobile());
      if (!isApp() && isMobile()) {
        initTryConnect(this._props.chain, "WalletConnect")
      } else {
        window.connectWallet(true);
      }
    },
    getAmount () {
      const { value, decimals, balance, balanceDecimals } = state.fromToken;
      const amountDecimals =
        value == balance
          ? balanceDecimals
          :  BigNumber(value).times(BigNumber(10).pow(decimals)).toFixed(0);
      return {
        amount: value,
        amountDecimals,
        amountAll: BigNumber(amountDecimals).div(BigNumber(10).pow(decimals)).toString()
      };
    },
    async approveTo (type) {
      if (this.infiniteLimitLoading || this.unlockLimitLoading) return;
      const { symbol, address, decimals } = state.fromToken;
      const approveContract = this.approveContract;
      const { amount, amountDecimals } = this.getAmount();
      if (type === "1") {
        this.infiniteLimitLoading = true;
      } else {
        this.unlockLimitLoading = true;
      }
      this.approveType = type;
      if (isMobile()) {
        setTimeout(() => {
          this.infiniteLimitLoading = false;
          this.unlockLimitLoading = false;
          this.approveType = "";
        }, 5000)
      }

      const result = await sendApproveTo(
        this._props.chain,
        address,
        approveContract,
        type,
        amount,
        decimals,
        this.gasPrice,
        amountDecimals
      )
      if (!result.code) {
        console.log('approve result', result)
        result.on('error', (error) => {
          console.log('approve error', error)
          this.approveToEnd();
        })
          .on('success', (success) => {
            console.log('approve success', success)
            this.approveToEnd(true);
          })
      }
    },
    async approveToEnd (flag) {
      await this.$parent.getFromTokenBalance();
      if (flag && +state.fromToken.approve <= 0) {
        setTimeout(async () => {
          await this.approveToEnd(true);
        }, 2000);
      } else {
        this.infiniteLimitLoading = false;
        this.unlockLimitLoading = false;
        this.approveType = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button-group {
  width: 100%;
  display: flex;
  align-items: center;

  .button {
    flex: 1;
    width: auto;

    &:first-child {
      margin-right: 25px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.button {
  cursor: pointer;
  height: 54px;
  background-color: var(--button_background_uninteractive);
  border-radius: 12px;
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.connect {
    background-color: var(--button_background_interactive);
    transition: all .3s ease;

    &:hover {
      opacity: 0.8;
    }

    span {
      color: var(--button_text_interactive);
      transition: all .3s ease;
    }
  }

  &.disabled {
    cursor: default;
    background-color: var(--button_background_uninteractive);

    span {
      color: var(--button_text_uninteractive);
    }
  }

  &.unlock {
    background-color: var(--button_background_uninteractive);
    transition: all .3s ease;

    // height: 40px;
    span {
      color: var(--button_text_interactive);
      transition: all .3s ease;

      @media (max-width:440px) {
        font-size: 12px;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &.infinite-unlock {
    background-color: var(--button_background_interactive);
    transition: all .3s ease;
    // height: 40px;

    span {
      color: var(--button_text_interactive);
      transition: all .3s ease;

      @media (max-width:440px) {
        font-size: 12px;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &.swap {
    background-color: var(--button_background_interactive);

    span {
      color: var(--button_text_interactive);
    }
  }

  span {

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: var(--button_text_uninteractive);
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    line-height: 1;
    word-break: keep-all;
    display: block;
  }

  overflow: hidden;

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 18px;
    height: 18px;
  }

  .loader {
    width: 16px;
    height: 16px;
    font-size: 14px;
    position: relative;
    text-indent: -9999px;
    border-top: 3px solid #171126;
    border-right: 3px solid #171126;
    border-bottom: 3px solid #171126;
    border-left: 3px solid #FF6B18;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
    margin-left: 10px;
  }

  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

.warning {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;
  margin-bottom: 16px;

  i {
    font-size: 16px;
    color: var(--classic-warning);
    margin-right: 4px;
  }

  span {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--classic-warning);
    margin-left: 6px;
  }
}

.icon {
  width: 14px;
}
</style>