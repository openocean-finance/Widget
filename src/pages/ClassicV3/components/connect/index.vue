<template>
  <NouDialog class="connect-view" :visible.sync="visible" @click.native="closeHandler" @leave="closeModal">
    <div class="connect-view__content" v-if="!isCustomization">
      <h2 class="g-dialog-title">
        <span>{{ $t("wallet_title") }}</span>
        <div class="g-circle-button" @click="close">
          <i class="iconfont iconClose icon_close"></i>
        </div>
      </h2>
      <div class="split">
        <ul class="split__chains">
          <svg viewBox="0 0 40 40" @click="isCustomization = !isCustomization">
            <rect rx="20" fill="var(--button_chain_add_bg)" />
            <path d="M27 21H21V27H19V21H13V19H19V13H21V19H27V21Z" fill="var(--button_chain_add)" />
          </svg>
          <ChainItem v-for="(item, i) in chains" :key="i" :chain-item="item" :active="item.walletValue === selectedChain" @select="selectChain" />
        </ul>
        <div class="split__wallets">
          <h3 class="sub-title">{{ $t("wallet_network_" + selectedChain) }}</h3>
          <div class="sub-content">
            <template v-for="chain in chains">
              <div v-if="chain.walletValue === selectedChain" :key="chain.walletValue">
                <div v-for="item in getTargetWallet(chain.walletValue)" :key="item.name" class="item" :class="{ pending: selectedWallet === item.name && pending }" @click="selectWallet(item)">
                  <img class="item__icon" :src="item.icon" alt="" />
                  <div class="item__label">{{ item.name }}</div>
                  <span v-if="selectedWallet === item.name && pending">{{
                    $t("connect_pending")
                  }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="customization" v-if="isCustomization">
      <h2 class="g-dialog-title">
        <div class="g-back-button" @click="back">
          <svg viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="var(--button_back)" />
          </svg>
        </div>
        <span>{{ $t("dialog_connect_customization") }}</span>
        <div class="g-circle-button" @click="close">
          <i class="iconfont iconClose icon_close"></i>
        </div>
      </h2>
      <div class="customization-content">
        <div class="row" v-for="i in chains.map((_, i) => i).filter((i) => i % 2 === 0)" :key="i">
          <div :class="!chains[i].disabled ? 'odd active' : 'odd'" @click="chains[i].disabled = !chains[i].disabled">
            <img class="item__icon" :src="chains[i].icon" alt="" />
            <div class="item__label">{{ chains[i].label }}</div>
          </div>
          <div v-if="i + 1 < chains.length" :class="!chains[i + 1].disabled ? 'even active' : 'even'" @click="chains[i + 1].disabled = !chains[i + 1].disabled">
            <img class="item__icon" :src="chains[i + 1].icon" alt="" />
            <div class="item__label">{{ chains[i + 1].label }}</div>
          </div>
        </div>
      </div>
      <div class="confirm" @click="confirm">
        <span>{{ $t("dialog_confirm") }}</span>
      </div>
    </div>
  </NouDialog>
</template>

<script>
import NouDialog from "@/components/common/NouDialog";
import ChainItem from "./ChainItem";
import { initTryConnect } from "../../../../init";
import getChains from "@/utils/getChains";
import { getWalletType } from "@/utils/config";
import { OpenoceanSdk } from "@openocean.finance/openocean-sdk";

const ooSdk = new OpenoceanSdk();
const { config } = ooSdk;

export default {
  name: "ConnectView",
  components: { ChainItem, NouDialog },
  data () {
    let chains = getChains();
    if (window.localStorage.getItem("chains")) {
      chains = JSON.parse(window.localStorage.getItem("chains"));
    }
    return {
      selectedChain: getWalletType(),
      chains,
      walletList: config.wallets.walletList,
      visible: true,
      selectedWallet: "",
      isCustomization: false,
      pending: false,
    };
  },
  mounted () {
    const chainName = getWalletType();
    this.selectedChain = chainName;
  },
  methods: {
    selectChain (target) {
      this.selectedChain = target.walletValue;
      this.selectedChainId = target.chainId;
    },
    async selectWallet (target) {
      if (!target.supportChains.includes(this.selectedChain)) {
        return;
      }
      this.pending = true;
      await initTryConnect(this.selectedChain, target.key);
      this.pending = false;
      this.$emit("close");
    },

    confirm () {
      window.localStorage.setItem("chains", JSON.stringify(this.chains));
      this.$emit("close");
    },
    closeHandler () {
      this.$emit("close");
    },
    closeModal () {
      this.$emit("close");
    },
    getTargetWallet (chain) {
      return this.walletList.filter((item) =>
        item.supportChains.includes(chain)
      );
    },
    close () {
      this.$emit("close");
    },
    back () {
      (this.chains =
        JSON.parse(window.localStorage.getItem("chains")) || getChains()),
        (this.isCustomization = !this.isCustomization);
    },
  },
};
</script>

<style lang="scss" scoped>
.connect-view__content {
  color: var(--text_primary);

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
  max-height: 550px;
  box-sizing: border-box;
  overflow: auto;
  text-align: center;

  &::-webkit-scrollbar {
    width: 0;
  }

  svg {
    margin-bottom: 12px;
    width: 40px;
    height: 40px;
    margin-top: 20px;
    cursor: pointer;

    rect {
      width: 40px;
      height: 40px;
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
  max-height: 470px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
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
  background-color: var(--background_classic-token-hover);
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
    // display: flex;
    height: 450px;
    overflow: auto;
    margin-top: 8px;

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
        background-color: var(--background_classic-token);
        border-radius: 8px;
        align-items: center;

        .item__icon {
          margin-left: 16px;
        }
      }

      .odd {
        margin-right: 8px;
      }

      .even {
        margin-left: 8px;
      }

      .active {
        border: 1px solid transparent;

        &:hover {
          border-color: var(--button_text_interactive);
        }
      }
    }
  }

  .confirm {
    background: var(--background_customization-token-confirm);
    border-radius: 16px;
    height: 48px;
    margin: 15px 26px;
    // margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    span {
      color: var(--classic-customization-token-confirm-text);
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

