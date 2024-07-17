<template>
  <div class="customization" :style="{ 'height': tellApp() ? '100vh' : '85vh' }">
    <h2 class="g-dialog-title">
      <!-- <div class="g-back-button">
          <svg viewBox="0 0 24 24">
            <path
              d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
              fill="var(--button_back)"
            />
          </svg>
        </div> -->
      <span>{{ $t("dialog_connect_chain") }}</span>
      <div class="g-circle-button" @click="close">
        <i class="iconfont iconClose icon_close"></i>
      </div>
    </h2>
    <div class="customization-content" id="dialog-scroll-dom">
      <div class="row" v-for="i in chains.map((_, i) => i).filter((i) => i % 2 === 0)" :key="i">
        <div :class="chainName === chains[i].value ? 'odd active' : 'odd'" @click="selectChain(chains[i])">
          <img class="item__icon" :src="chains[i].icon" alt="" />
          <div class="item__label">{{ chains[i].label }}</div>
        </div>
        <div v-if="i + 1 < chains.length" :class="chainName === chains[i + 1].value ? 'even active' : 'even'" @click="selectChain(chains[i + 1])">
          <img class="item__icon" :src="chains[i + 1].icon" alt="" />
          <div class="item__label">{{ chains[i + 1].label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getChains from "@/utils/getChains";
import { getWalletType } from "@/utils/config";
import { OpenoceanSdk } from "@openocean.finance/openocean-sdk";
import { isApp, isMobile, isSupportSolana } from '@/utils/helpers';
import { contract as state } from "@/contract";

const ooSdk = new OpenoceanSdk();
const { config } = ooSdk;

export default {
  name: "ChainView",
  data () {
    let list = JSON.parse(window.localStorage.getItem("chains")) || getChains()
    if (isApp() && !isSupportSolana()) {
      list = list.filter(item => item.value !== 'solana')
    }
    return {
      selectedChain: "eth",
      chains: list.filter(item => item.disabled !== true),
      walletList: config.wallets.walletList,
      visible: true,
      isCustomization: false,
      pending: false,
    };
  },
  mounted () {
    const chainName = getWalletType();
    this.selectedChain =
      !chainName || chainName === "undefined" ? "eth" : chainName;
  },
  methods: {
    tellApp () {
      return isApp()
    },
    selectChain (target) {
      if (target.walletValue == this.chainName) {
        this.close()
        return
      }
      if (!isApp() && isMobile()) {
        const cacheWalletName = localStorage.getItem("WALLETCONNECT_DEEPLINK_CHOICE") || '{}'
        const { name } = JSON.parse(cacheWalletName);
        if (name && name !== "MetaMask" && this.walletName) {
          state.isShowDisclaimer = true
          this.close()
          return
        }
      }

      this.changeRoute({
        chain: target.walletValue,
        fromSymbol: target.defaultSymbol.in,
        toSymbol: target.defaultSymbol.out,
        amount: 1
      })
      this.close()
    },
    close () {
      this.$emit("close");
    },
  }
};
</script>

<style lang="scss" scoped>
.connect-view__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 456px;
  background: var(--background_container);
  border-radius: 10px;
  color: var(--text_primary);
  height: 630px;

  .g-dialog-title {
    margin-bottom: 0;
  }
}

.title {
  margin: 0;
  padding: 22px 23px 21px 23px;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  font-weight: 600;
  border-radius: 10px 10px 0 0;
  background: var(--fail);
}

.split {
  display: flex;
}

.split__chains {
  padding: 0 0 20px 0;
  list-style: none;
  border-right: 1px solid var(--background_uninteractive);
  max-height: 488px;
  box-sizing: border-box;
  overflow: auto;
  text-align: center;

  svg {
    margin-bottom: 12px;
    width: 40px;
    height: 40px;
    margin-top: 20px;
    cursor: pointer;

    rect {
      width: 40px;
      height: 40px;
      fill: var(--classic-chain-add-bg);
    }
  }

  &::-webkit-scrollbar-thumb:vertical {
    background-color: transparent;
  }
}

.split__wallets {
  flex: 1;
}

.sub-title {
  margin: 0;
  padding: 0;
  color: var(--classic-text-title);
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 24px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
}

.sub-content {
  padding-left: 20px;
  padding-right: 20px;
  max-height: 400px;
  overflow: auto;
}

.item {
  cursor: pointer;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 8px;
  font-size: 16px;
  height: 48px;
  padding: 0px 24px;
  margin-bottom: 16px;
  border: 1px solid transparent;

  &:hover {
    border-color: var(--button_text_interactive);
  }
}

.item__icon {
  height: 32px;
  // background-color: #000000;
  border-radius: 16px;
}

.item__label {
  flex: 1;
  font-size: 16px;
  line-height: 19px;
  color: var(--classic-text-title);
  margin-left: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
}

.pending {
  border-color: var(--button_text_interactive);

  span {
    color: var(--text_secondary);
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
  }
}

.customization {
  color: var(--text_primary);

  .customization-content {
    height: 450px;
    overflow: auto;

    .row {
      display: grid;
      grid-gap: 12px;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      height: 48px;
      padding: 8px 24px;

      @media (max-width: 440px) {
        grid-gap: 12px;
        padding: 6px 12px;
      }

      .odd,
      .even {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 1px solid transparent;
        box-sizing: border-box;

        .item__icon {
          margin-left: 16px;
        }

        &:hover {
          border-color: var(--button_text_interactive);
        }
      }

      .active {
        &:hover {
          border-color: var(--button_text_interactive);
        }
      }
    }
  }
}
</style>