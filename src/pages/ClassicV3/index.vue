<template>
  <div class="classic-page" :class="{ normal: normal }">
    <Disclaimer v-if="isShowDisclaimer" />
    <div class="container">
      <div class="side">
        <div class="form">
          <div class="control">
            <ul class="tab">
              <li v-for="(item, i) in tabList" :key="i" :class="{ on: item.code == tabCode }" @click="tabChange(item.code)">
                {{ item.name }}
              </li>
            </ul>
            <div class="button">
              <div class="g-clickable icon" @click="quote">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" id="arrow_loading" class="arrow-loading">
                  <path stroke="none" fill="var(--classic-circle)"
                    d="M17.61907,6.64429064 L13.8617197,6.64429064 C13.3840439,6.64429064 12.9914138,6.25155686 12.9914138,5.77398471 C12.9914138,5.2963089 13.3840439,4.90357512 13.8617197,4.90357512 L15.3689095,4.90357512 C14.0103035,2.98248087 11.7707673,1.73006538 9.2340637,1.73006538 C5.0840575,1.73006538 1.7194412,5.09468172 1.7194412,9.24468791 C1.7194412,13.3946681 5.0840575,16.7592845 9.2340637,16.7592845 C13.3840439,16.7592845 16.74866,13.3946681 16.74866,9.24468791 C16.74866,8.76701211 17.141394,8.37438191 17.61907,8.37438191 C18.096616,8.37438191 18.48935,8.76701211 18.48935,9.24468791 C18.48935,14.3498902 14.3498902,18.4893498 9.2446879,18.4893498 C4.139356,18.4893498 0,14.3498902 0,9.24468791 C0,4.13935601 4.139356,0 9.2446879,0 C12.3438798,0 15.0823402,1.52833455 16.759284,3.86343695 L16.759284,2.31382802 C16.759284,1.83615222 17.152018,1.44352209 17.62959,1.44352209 C18.10724,1.44352209 18.5,1.83615222 18.5,2.31382802 L18.5,5.78450529 C18.478726,6.26218109 18.096616,6.64429064 17.61907,6.64429064 Z">
                  </path>
                  <defs>
                    <path id="arrow" stroke="none" fill="none"
                      d="M17.61907,6.64429064 L13.8617197,6.64429064 C13.3840439,6.64429064 12.9914138,6.25155686 12.9914138,5.77398471 C12.9914138,5.2963089 13.3840439,4.90357512 13.8617197,4.90357512 L15.3689095,4.90357512 C14.0103035,2.98248087 11.7707673,1.73006538 9.2340637,1.73006538 C5.0840575,1.73006538 1.7194412,5.09468172 1.7194412,9.24468791 C1.7194412,13.3946681 5.0840575,16.7592845 9.2340637,16.7592845 C13.3840439,16.7592845 16.74866,13.3946681 16.74866,9.24468791 C16.74866,8.76701211 17.141394,8.37438191 17.61907,8.37438191 C18.096616,8.37438191 18.48935,8.76701211 18.48935,9.24468791 C18.48935,14.3498902 14.3498902,18.4893498 9.2446879,18.4893498 C4.139356,18.4893498 0,14.3498902 0,9.24468791 C0,4.13935601 4.139356,0 9.2446879,0 C12.3438798,0 15.0823402,1.52833455 16.759284,3.86343695 L16.759284,2.31382802 C16.759284,1.83615222 17.152018,1.44352209 17.62959,1.44352209 C18.10724,1.44352209 18.5,1.83615222 18.5,2.31382802 L18.5,5.78450529 C18.478726,6.26218109 18.096616,6.64429064 17.61907,6.64429064 Z">
                    </path>
                    <clipPath id="arrow-clip">
                      <use xlink:href="#arrow"></use>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#arrow-clip)">
                    <circle cx="7.02" cy="7.02" r="4.69" transform="rotate(365,12,12)" fill="none" stroke="currentColor" stroke-width="16" stroke-dasharray="30" stroke-dashoffset="0">
                      <animate attributeName="stroke-dashoffset" values="0;-30" begin="arrow_loading.click; 0.7s" repeatCount="indefinite" dur="9.3s"></animate>
                    </circle>
                  </g>
                  <use xlink:href="#arrow"></use>
                  <animateTransform id="transform_0" attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="-10 0 0" dur="0.07s" begin="arrow_loading.click;" repeatCount="1"></animateTransform>
                  <animateTransform id="transform_1" attributeName="transform" attributeType="XML" type="rotate" from="-45 0 0" to="390 0 0" dur="0.6s" begin="transform_0.end" repeatCount="1"></animateTransform>
                  <animateTransform id="transform_2" attributeName="transform" attributeType="XML" type="rotate" from="390 0 0" to="360 0 0" dur="0.15s" begin="transform_1.end" repeatCount="1"></animateTransform>
                </svg>
              </div>
              <div @click="isShowSetting = true" class="g-clickable icon">
                <i class="iconfont iconshezhi g-clickable" />
              </div>
              <div v-if="!hideChain" class="g-clickable icon" @click="isChainSetting = true">
                <img class="g-dark-only chain-icon" :src="chain.iconDark" alt="" />
                <img class="g-light-only chain-icon" :src="chain.icon" alt="" />
              </div>
            </div>
          </div>
          <div class="content">
            <Swap :tab-code="tabCode" ref="swap" />
          </div>
        </div>
        <Connect v-if="isShowConnect" @close="isShowConnect = false" />
        <NouDialog close-on-click-modal :visible.sync="isShowSetting" :dialog-class="advanceContentClasses" :noLock="true">
          <Setting @change="quote" @back="isShowSetting = false" v-if="isShowSetting" />
        </NouDialog>
        <NouDialog close-on-click-modal :visible.sync="isChainSetting" :dialog-class="advanceContentClasses" :scrollDomID="'dialog-scroll-dom'">
          <ChainView @close="isChainSetting = false"></ChainView>
        </NouDialog>
        <SelectToken :is-show="isShow" :show-native-token="tabCode === '01'" :dom="dom" @select="changeToken" @close="hideSelectToken" @changeDom="changeDom" />
      </div>
    </div>
    <BlurMask :visible.sync="isTransactionShowing">
      <Transaction @close="isTransactionShowing = false" />
    </BlurMask>
    <BlurMask :visible.sync="isH5TransactionShowing" :scrollDomId="'action-sheet-scroll'">
      <H5TransactionList @close="isH5TransactionShowing = false" />
    </BlurMask>
  </div>
</template>
<script>
import BlurMask from "@/components/common/BlurMask";
import NouDialog from "@/components/common/NouDialog";
import Transaction from "./components/swap-transaction/TransactionList";
import Swap from "./components/swap";
import Route from "./components/route";
import Connect from "./components/connect";
import Setting from "./components/setting";
import { addFavorite, removeFavorite } from "@/utils/favorite";
import { disConnect } from "../../init";
import { contract as state } from "@/contract";
import SelectToken from "./components/select-token";
import getChains, { isV2, getDefaultToken } from "@/utils/getChains";
import ChainView from "./components/select-chain";
import H5Bottom from "./components/h5bottom";
import H5TransactionList from "./components/swap-transaction/H5TransactionList";
import Disclaimer from "./components/disclaimer";
import { CACHE_KEY, getCache } from "@/utils/cache";
import { getAppWalletType, isCoin98, isMobile, getHashParams } from "@/utils/helpers";
import { getters } from "../../contract";
import ConfirmInvite from "./components/confirmInvite";
import { changeTheme, THEMES, getTheme } from '../../utils/theme';
import { getWalletType } from "@/utils/config";

export default {
  components: {
    Swap,
    Route,
    Connect,
    Setting,
    NouDialog,
    BlurMask,
    Transaction,
    SelectToken,
    ChainView,
    H5Bottom,
    H5TransactionList,
    Disclaimer,
    ConfirmInvite,
  },
  data () {
    const chainName = getWalletType();
    return {
      isV2: isV2(chainName),
      advanceContentClasses: {
        setting_box: true,
      },
      isShowSetting: false,
      isChainSetting: false,
      isShowConnect: false,
      isTransactionShowing: false,
      isH5TransactionShowing: false,
      isClaimShowing: false,
      swap: 0,
      bestPrice: "1.2",
      tabCode: "01",
      tabList: [{ code: "01", name: "Swap" }],
      bannerList: [],
      gridList: [],
      gridHistoryList: [],
      gridDetailList: [],
      isListLoading: false,
      loading: false,
      showGridDetail: false,
      silentTimer: null,
      dom: "js-dialog-scroll-dom",
      normal: window.self === window.top,
      hideChain: false,
    };
  },
  computed: {
    ...getters,
    isShow () {
      return state.isShowSelectToken;
    },
    isShowDisclaimer () {
      return state.isShowDisclaimer;
    },
    isSupportChart () {
      return !isMobile();
    },
    pairCode () {
      if (this.tabCode === "01") {
        return state.fromToken.symbol + "/" + state.toToken.symbol;
      }
      if (this.tabCode === "03") {
        return state.fromToken.symbol + "/" + state.toToken.symbol;
      }
      return this.tokenLimitPrev.symbol + "/" + this.tokenLimitNext.symbol;
    },
    tokenPrev () {
      if (this.tabCode === "03") {
        return state.fromToken;
      }
      return this.tabCode === "01" ? state.fromToken : this.tokenLimitPrev;
    },
    tokenNext () {
      if (this.tabCode === "03") {
        return state.toToken;
      }
      return this.tabCode === "01" ? state.toToken : this.tokenLimitNext;
    },
    tokenChian () {
      return state.chainName;
    },
    chain () {
      const list = getChains();
      const temp = list.filter((item) => {
        return item.value === this.chainName;
      });
      return (temp && temp[0]) || list[0];
    },
    list () {
      const list = getChains();
      return list.filter((item) => {
        return !!!item.disabled;
      });
    },
  },
  watch: {
    isShowSetting () {
      // this.quote();
    },
    $route: {
      handler: function (val, oldVal) {
        let query = val.query
        let queryOld = oldVal ? oldVal.query : {}
        console.log('swap--------', query)
        console.log('swap--------old', oldVal)
        this.changeByPair(query, queryOld);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted () {
    window.connectWallet = (isConnected) => {
      this.connect(isConnected);
    };

    let href = window.location.href
    this.hideChain = href.indexOf('key=staking') != -1||href.indexOf('8082') != -1
    if(this.hideChain){
      window.document.body.style.background='none'
      document.querySelector('body').setAttribute('style', 'margin:0;')
    }
  },
  methods: {
    hideSelectToken () {
      state.isShowSelectToken = false;
      document.body.style.overflow = "auto";
    },
    changeToken (item) {
      state.isShowSelectToken = false;
      window.changeToken(item);
    },
    tabChange (code) {
      this.tabCode = code;
      window.localStorage.setItem("ClassicTab", code);
    },
    quote () {
      this.$refs.swap.quote(true);
    },
    connect (isConnected) {
      if (isConnected) {
        this.isShowConnect = true;
      } else {
        disConnect(this.chainName);
      }
    },
    changeLoading () {
      this.isListLoading = !this.isListLoading;
    },
    changePageLoading () {
      this.loading = !this.loading;
    },
    async changeByPair (query, oldQuery) {
      if (!query.fromSymbol || !query.toSymbol) {
        if (query.chain) {
          let tokens = getDefaultToken(query.chain)
          this.changeRoute({
            fromSymbol: tokens[0].symbol,
            toSymbol: tokens[1].symbol
          })
        }
        return
      }

      await this.getToken(query.chain);

      const fromToken = this.findTokenBySymbol(query.fromSymbol);
      const toToken = this.findTokenBySymbol(query.toSymbol);
      if (fromToken && toToken) {
        state.fromToken = {
          ...fromToken, 
          ...{
            approve: 0,
            price: 0,
            usd: 0,
            balance: 0,
            usdtValue: 0,
            value: query.amount || 1,
            balanceDecimals: 0,
          }
        }
        state.toToken = {
          ...toToken, 
          ...{
            approve: 0,
            price: 0,
            usd: 0,
            balance: 0,
            usdtValue: 0,
            value: 0,
            balanceDecimals: 0,
          }
        }

        this.quote()
      } else {
        let tokens = getDefaultToken(query.chain)
        this.changeRoute({
          fromSymbol: tokens[0].symbol,
          toSymbol: tokens[1].symbol
        })
      }
    },
    findTokenBySymbol (symbol) {
      symbol = symbol.toUpperCase();
      const result = this.tokenList.find(item => {
        return item.symbol.toUpperCase() == symbol;
      });
      return result;
    },
    changeConfig (val) {
      const { query } = val || {};
      const { config } = query || {};
      if (!config) return;

      const { theme } = JSON.parse(config);
      if (theme !== getTheme()) {
        changeTheme();
      }
    },
    changeDom (val) {
      if (val === "01") {
        this.dom = "js-dialog-scroll-dom";
      } else if (val === "02") {
        this.dom = "js-dialog-scroll-dom-1";
      } else {
        this.dom = "js-dialog-scroll-dom-2";
      }
    },
  },
};
</script>

<style lang="scss">
body {
  .normal {
    background-color: var(--background_base);
  }
}
</style>
<style lang="scss" scoped>
@import "./common.scss";

.chain-icon {
  width: 24px !important;
  height: 24px !important;
}
</style>