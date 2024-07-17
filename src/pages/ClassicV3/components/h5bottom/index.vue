<template>
  <div class="bottom">
    <div class="theme-wrapper" @click="changeTheme">
      <i class="iconfont iconLight header-view__theme g-dark-only" />
      <i class="iconfont iconDark header-view__theme g-light-only" />
    </div>
    <div class="connect">
      <div class="header-wallet" v-if="account" @click="showMenu">
        <span class="header-wallet__address g-font-mid">{{
          formatLongStr
        }}</span>
      </div>
      <div v-else class="c-user__content dex-user__connect g-font-mid" @click="connect">
        <span class="c-user__title">{{ $t("menu_connect_wallet") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { changeTheme, getTheme, THEMES } from "@/utils/theme";
import copy from "copy-to-clipboard";
import BlurMask from "@/components/common/BlurMask";
import { initTryConnect, disConnect } from "@/init";
import { isApp, isMobile } from "@/utils/helpers";
import { formatAccount } from "@/utils/format";
// import HeaderItem from "@/pages/Pro/HeaderItem";
import showHeaderMenu from "./showHeaderMenu";
import showToast from "@/components/toast";
import H5History from "./H5History";
import { isLimitOrder } from "../../../../utils/getChains";
export default {
  components: { BlurMask, H5History },
  data () {
    const default_theme = getTheme() === THEMES.dark;
    return {
      isShowConnect: false,
      themes: default_theme,
    };
  },
  computed: {
    formatLongStr () {
      return formatAccount(this.default_account);
    },
  },
  methods: {
    changeTheme () {
      this.themes = !this.themes;
      changeTheme();
    },
    totalDisconnect (val) {
      disConnect(val);
    },
    async connect () {
      initTryConnect(this.chainName, this.walletName)
    },
    copyAddress () {
      if (this.default_account) {
        copy(this.default_account);
        showToast({
          text: this.$t("toast_copy_success"),
          type: "success",
        });
      }
    },
    showMenu () {
      if (this.isMenuShowing) {
        return;
      }
      const menus = [
        {
          label: this.$t("menu_copy_address"),
          action: () => {
            this.copyAddress();
          },
        },
        {
          label: this.$t("menu_transaction"),
          action: () => {
            this.$emit("showH5Transaction");
          },
        },
      ];
      if (isLimitOrder(this.chainName)) {
        menus.push({
          label: "Limit Orders",
          action: () => {
            try {
              this.$emit("showLimitTransaction");
            } catch (e) {
              console.log(e);
            }
          },
        });
      }
      if (!isApp() && isMobile()) {
        menus.push({
          label: this.$t("menu_disconnect"),
          action: () => {
            this.totalDisconnect(this.chainName);
          },
        });
      }
      this.isMenuShowing = true;
      showHeaderMenu(menus, () => {
        this.isMenuShowing = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  background: var(--background_base);
  height: 50px;

  @media (min-width: 440px) {
    display: none;
  }

  .theme-wrapper {
    width: 40px;
    height: 40px;
    background: var(--background_header-chain);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 5px;
    margin-left: 16px;
  }
}

.connect {
  width: 150px;
  height: 40px;
  background: var(--background_header-chain);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 5px;
  margin-right: 16px;
}
</style>