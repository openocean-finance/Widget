<template>
  <NouDialog
    close-on-click-modal
    :visible.sync="isShow"
    @click.native="closeHandler"
    @leave="closeModal"
    :checkDom="dom"
  >
    <div v-if="isAddToken" class="add-token" id="dialog-scroll-dom">
      <h2 class="g-dialog-title">
        <div class="g-back-button" @click="closeCustom">
          <i class="iconfont icondrop_down"></i>
        </div>
        <span>{{ $t("custom_token_title") }}</span>
        <div class="g-circle-button" @click="close">
          <i class="iconfont iconClose"></i>
        </div>
      </h2>

      <div class="input">
        <input v-model="address" :placeholder="$t('exchange_search')" @input="searchToken" />
      </div>
      <div class="invalid" v-if="address && isInvalidToken">
        <span>{{ $t("custom_token_toast_5") }}</span>
      </div>

      <div class="warning">
        <div class="warning-title">
          <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="var(--fail)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.98024 12H12.0202C13.0469 12 13.6869 10.8867 13.1736 10L8.15358 1.32667C7.64024 0.44 6.36024 0.44 5.84691 1.32667L0.82691 10C0.313577 10.8867 0.953577 12 1.98024 12ZM7.00024 7.33333C6.63358 7.33333 6.33358 7.03333 6.33358 6.66667V5.33333C6.33358 4.96667 6.63358 4.66667 7.00024 4.66667C7.36691 4.66667 7.66691 4.96667 7.66691 5.33333V6.66667C7.66691 7.03333 7.36691 7.33333 7.00024 7.33333ZM7.66691 10H6.33358V8.66667H7.66691V10Z"
              fill="var(--classic-warning)"
            />
          </svg>
          <span>{{ $t("custom_token_warning") }}</span>
        </div>
        <div class="warning-content">
          {{ $t("custom_token_tip1") }}
          <br />
          {{ $t("custom_token_tip2") }}
        </div>
      </div>

      <div class="token-detail" v-if="address && token">
        <div class="token-content">
          <ul>
            <li>
              <span class="token-property"
                >{{ $t("custom_token_symbol") }} :
              </span>
              <span class="token-value"> {{ token.symbol }}</span>
              <!-- <img :src="token.image.large" alt="" /> -->
            </li>
            <li>
              <span class="token-property"
                >{{ $t("custom_token_name") }} :
              </span>
              <span class="token-value">{{ token.name }}</span>
            </li>
            <li>
              <span class="token-property"
                >{{ $t("custom_token_decimals") }} :
              </span>
              <span class="token-value">{{ token.decimals }}</span>
            </li>
          </ul>
        </div>

        <div class="token-icon">
          <!-- <img src="https://ethapi.openocean.finance/logos/bsc/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3.png" alt=""> -->
          <img :src="token.image.large" alt="" />
        </div>
      </div>

      <div class="add-token__foot">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          v-if="!isUnderstand"
          @click="changeUnderstand"
        >
          <rect width="18" height="18" rx="3" fill="var(--button_background_uninteractive)" />
        </svg>

        <div class="correct" v-else @click="changeUnderstand" />

        <span>{{ $t("custom_token_understand") }}</span>
        <div
          :class="token && isUnderstand ? 'add_button' : ''"
          @click="addToken"
        >
          <span :class="token && isUnderstand ? 'understood' : ''">{{ $t("custom_token_add") }}</span>
        </div>
      </div>
    </div>
    <div v-else class="select-token">
      <h2 class="g-dialog-title">
        <span>{{ $t("select_token_title") }}</span>
        <div class="g-circle-button" @click="close">
          <i class="iconfont iconClose"></i>
        </div>
      </h2>
      <SearchInput
        class="select-token__input"
        v-model="query"
        :placeholder="$t('exchange_search')"
      />
      <div class="control">
        <ul class="tab">
          <li
            v-for="(item, i) in tabList"
            :key="i"
            :class="{ on: item.code == tabCode }"
            @click="tabChange(item.code)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="all-token" v-if="tabCode === '01'" :id="dom">
        <div
          class="item"
          v-for="(item, i) in filterToken"
          :key="i"
          @click="selectToken(item)"
        >
          <TokenIcon :src="item.icon || `https://ethapi.openocean.finance/logos/bsc/0x9029fdfae9a03135846381c7ce16595c3554e10a1.png`" size="small" />
          <!-- <img v-if="item.icon" class="item__icon" :src="item.icon " alt="" />
          <img v-else class="item__icon" :src="`https://ethapi.openocean.finance/logos/bsc/0x9029fdfae9a03135846381c7ce16595c3554e10a1.png`" alt="" /> -->
          <div class="item__text">
            <div class="item__symbol">{{ item.symbol }}</div>
            <div class="item__name">{{ item.name }}</div>
          </div>
          <div class="item__value">
            {{ item.balance }}
          </div>
        </div>
        <div class="not-find" v-if="filterToken.length === 0">
          <img class="g-light-only" src="@/assets/v3/no-order.png" />
          <img class="g-dark-only" src="@/assets/v3/no-order-dark.png" />
          <div>
            <span @click="openCustom">{{ $t("select_token_add") }}</span>
          </div>
        </div>
      </div>
      <div class="custom-token" v-if="tabCode === '03'" :id="dom">
        <div v-if="getCustomList.length > 0">
          <div
            class="item"
            v-for="(item, i) in getCustomList"
            :key="i"
            @click="selectToken(item)"
          >
            <img v-if="item.icon" class="item__icon" :src="item.icon" alt="" />
            <img v-else class="item__icon" :src="`https://ethapi.openocean.finance/logos/bsc/0x9029fdfae9a03135846381c7ce16595c3554e10a1.png`" alt="" />
            <div class="item__text">
              <div class="item__symbol">{{ item.symbol }}</div>
              <div class="item__name">{{ item.name }}</div>
            </div>
            <div class="item__value">
              {{ item.value }}
            </div>
            <div class="item__delete" @click.stop="removeToken(item)">
              <svg viewBox="0 0 14 18">
                <path
                  d="M11 6V16H3V6H11ZM9.5 0H4.5L3.5 1H0V3H14V1H10.5L9.5 0ZM13 4H1V16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4Z"
                  fill="var(--text_secondary)"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="not-find" v-if="getCustomList.length === 0">
          <img class="g-light-only" src="@/assets/v3/no-order.png" />
          <img class="g-dark-only" src="@/assets/v3/no-order-dark.png" />
          <div>
            <span @click="openCustom">{{ $t("select_token_add") }}</span>
          </div>
        </div>
      </div>
      <div class="foot"></div>
    </div>
  </NouDialog>
</template>

<script>
import NouDialog from "@/components/common/NouDialog";
import SearchInput from "@/components/SearchInput";
import copy from "copy-to-clipboard";
import showToast from "@/components/toast";
import getChains, { isNativeToken, isCustomToken } from "@/utils/getChains";
import { getBalances, getContractDecimals, isTokenAddress } from "@/init";
import { getTokenInfo } from "@/api/cms";
import ToolTip from "@/components/ToolTip";
import { contract as state, loadLimitDefaultToken } from "@/contract";
import TokenIcon from "@/components/TokenIcon"

export default {
  name: "SelectToken",
  components: { NouDialog, SearchInput, ToolTip, TokenIcon },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    showNativeToken: {
      type: Boolean,
      default: false,
    },
    dom:{
      type: String,
      default: 'js-dialog-scroll-dom',
    }
  },
  data() {
    return {
      isAddToken: false,
      showPopularToken: true,
      query: "",
      address: "",
      tabCode: "01",
      myTokenList: [],
      token: null,
      isInvalidToken: false,
      isUnderstand: false,
      tabList: [
        {
          code: "01",
          name: $t("select_all_token"),
        },
        {
          code: "03",
          name: $t("select_custom_tokens"),
        },
      ],
    };
  },
  mounted() {
    this.myTokenList = this.getCustomTokenList();
    this.getAllTokenBalance();
    //document.getElementById('active-scroller').addEventListener('scroll', this.handerScroll)
  },
  watch: {
    isShow(newVal) {
      if (newVal) {
        this.myTokenList = this.getCustomTokenList();
        this.getAllTokenBalance();
      }
    },
  },
  computed: {
    isCustomToken() {
      return isCustomToken(this.chainName);
    },
    popularToken() {
      if(this.showNativeToken) {
        return state.tokenList.filter((item) => {
          return item.hot === "01";
        });
      }
      return state.tokenList.filter((item) => {
        return item.hot === "01" && !isNativeToken(this.chainName, item.address);
      });
    },
    allToken() {
      if (!this.query) {
        let tokenList = JSON.parse(JSON.stringify(state.tokenList));
        return tokenList.sort((a, b) => {
          return a.balance > b.balance ? -1 : 1;
        });
      }
      const _query = this.query.toLowerCase();
      let tokenList = state.tokenList.filter((item) => {
        return (
          item.symbol.toLowerCase().indexOf(_query) >= 0 ||
          item.address.toLowerCase() === _query
        );
      });
      if (!tokenList.length && this.showPopularToken) {
        tokenList = this.myTokenList.filter((item) => {
          return (
            item.symbol.toLowerCase().indexOf(_query) >= 0 ||
            item.address.toLowerCase() === _query
          );
        });
        if (this.isCustomToken && !tokenList.length) {
          this.allTokenByAddress();
        }
      }
      tokenList.sort((a, b) => {
        return a.balance > b.balance ? -1 : 1;
      });

      return tokenList;
    },
    filterToken(){
      if(this.showNativeToken) {
        return this.allToken;
      }
      return this.allToken.filter(item=>{
        return !isNativeToken(this.chainName, item.address);
      })
    },
    getCustomList() {
      if (!this.query) return this.myTokenList;
      const _query = this.query.toLowerCase();

      let list = this.myTokenList.filter((item) => {
        return (
          item.symbol.toLowerCase().indexOf(_query) >= 0 ||
          item.address.toLowerCase() === _query
        );
      });

      return list;
    },
  },
  methods: {
    async getAllTokenBalance() {
      await getBalances(state.tokenList);
      this.query = " ";
      this.$nextTick(() => {
        this.query = "";
      });
    },
    tabChange(code) {
      this.tabCode = code;
      this.$emit('changeDom', code)
    },
    close() {
      this.isAddToken = false;
      this.address = "";
      this.query = "";
      this.$emit("close");
    },
    closeHandler() {
      this.isAddToken = false;
      this.address = "";
      this.query = "";
      this.$emit("close");
    },
    closeModal() {
      this.isAddToken = false;
      this.address = "";
      this.query = "";
      this.$emit("close");
    },
    selectToken(target) {
      this.query = "";
      this.$emit("select", target);
    },
    closeCustom() {
      this.address = "";
      this.query = "";
      this.isAddToken = false;
      this.tabChange("03")
    },
    openCustom() {
      this.query = "";
      this.isAddToken = true;
    },
    async allTokenByAddress() {
      this.token = null;
      let decimals = 0;
      if (!this.query || this.query.length < 40) return;
      if (!isTokenAddress(this.query)) return;
      // if (!this.account) {
      //   showToast(this.$t("toast_connect_wallet"));
      //   return;
      // }
      try {
        decimals = await getContractDecimals(this.query);
        console.log('decimals', decimals);
        if (+decimals > 0) {
          this.isAddToken = true;
          this.searchToken(null, this.query);
          this.query=''
        }
      } catch (e) {
        // showToast(this.$t('custom_token_toast_5'));
        // this.isInvalidToken = true;
        return;
      }
    },
    changeUnderstand() {
      this.isUnderstand = !this.isUnderstand;
    },
    getCustomTokenList() {
      const temp = window.localStorage.getItem(
        this.chainName + "_customtoken"
      );
      return (temp && JSON.parse(temp)) || [];
    },
    addToken() {
      if (!this.address) {
        // showToast(this.$t('custom_token_toast_1'));
        return;
      }
      if (!this.token || !this.isUnderstand) {
        // showToast(this.$t('custom_token_toast_2'));
        return;
      }
      const { id, decimals, name, symbol, contract_address, image } = this.token;
      const { large } = image;
      if(!name || !symbol) {
        showToast(this.$t('custom_token_toast_2'));
        return
      }
      console.log("tokenList", state.tokenList);
      let token = state.tokenList.filter((item) => {
        return item.address.toLowerCase() === contract_address.toLowerCase();
      });
      if (token && token.length) {
        showToast(this.$t("custom_token_toast_3"));
        return;
      }
      for (var i = 0; i < this.myTokenList.length; i++) {
        if (this.myTokenList[i].address.toLowerCase() === contract_address.toLowerCase()) {
          showToast(this.$t("custom_token_toast_3"));
          return;
        }
      }
      token = {
        id,
        decimals,
        name,
        symbol: symbol.toUpperCase(),
        address: contract_address,
        icon: large,
        custom: 1,
      };
      this.myTokenList.push(token);
      state.tokenList.unshift(token);
      // this.tokenMap[token.address.toLowerCase()] = token
      window.localStorage.setItem(
        this.chainName + "_customtoken",
        JSON.stringify(this.myTokenList)
      );
      showToast(this.$t("custom_token_toast_4"));
      this.$emit("addtoken", token);
      this.address = "";
      this.token = null;
      this.showTokens = true;
      this.isAddToken = false;
      this.tabChange("03")
    },
    removeToken(item) {
      const { address } = item;
      const list = this.myTokenList.filter((item) => {
        return item.address !== address;
      });
      this.myTokenList = list;
      window.localStorage.setItem(
        this.chainName + "_customtoken",
        JSON.stringify(list)
      );
      
      let index = state.tokenList.findIndex(t => t.address === address)
      if(index >= 0) {
        state.tokenList.splice(index, 1)
      }

      if (state.fromToken.address === address || state.toToken.address === address) {
        loadLimitDefaultToken(this.chainName)
      }

      this.$emit("removetoken", item);
    },
    async searchToken(e, address) {
      this.token = null;
      this.isInvalidToken = false;
      this.address = address || e.target.value;
      if (!this.address || this.address.length < 16) {
        this.isInvalidToken = true;
        return;
      }
      // if (!this.account) {
      //   showToast("Please connect wallet");
      //   return;
      // }
      let decimals = 0;
      try {
        decimals = await getContractDecimals(this.address);
        console.log('decimals', decimals);
        if (+decimals <= 0) {
          this.isInvalidToken = true;
          // showToast(this.$t('custom_token_toast_5'));
          return;
        }
      } catch (e) {
        // showToast(this.$t('custom_token_toast_5'));
        this.isInvalidToken = true;
        return;
      }
      const res = await getTokenInfo(this.chainName, this.address);
      if (res && res.name) {
        this.isInvalidToken = false;
        res.decimals = decimals;
        this.token = res;
        const { image } = res;
        const { large } = image;
        this.token.icon = large;
      }
      // } else {
      //   this.token = null;
      //   this.address = "";
      //   this.isInvalidToken = true;
      //   // showToast(this.$t('custom_token_toast_5'));
      // }
    },
    handleScroll() {
      const scrollHeight =  document.getElementById('active-scroller').scrollHeight;
      if (scrollHeight <= 0 || scrollHeight > document.getElementById('active-scroller').scrollTop +document.getElementById('active-scroller').offsetHeight ) {
        console.log(scrollHeight, document.getElementById('active-scroller').scrollTop, document.getElementById('active-scroller').offsetHeight )
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
        console.log('1')
      }
    },
    // resLisScroll () {
    //   const ios = navigator.userAgent.indexOf('iPhone'); 
    //   if (ios !== -1) {
    //   const divEl = this.$refs.resListRef
    //   this.iosTrouchFn(divEl);
    //   }
    // },
    // iosTrouchFn(el) {
    //   el.addEventListener('touchmove', function (e) {
    //     if (el.offsetHeight < el.scrollHeight) {
    //       e.isSCROLL = true;
    //     }
    //   });
    //   document.body.addEventListener('touchmove', function (e) {
    //     if (!e.isSCROLL) {
    //       e.preventDefault(); 
    //     }
    //     else {
    //       const top = el.scrollTop; 
    //       const scrollH = el.scrollHeight; 
    //       const offsetH = el.offsetHeight;
    //       const cScroll = top + offsetH;
    //       if (top === 0) {
    //         top = 1; 
    //       }
    //       else if (cScroll === scrollH) {
    //          el.scrollTop = top - 1;
    //       }
    //     }
    //   }, {
    //     passive: false
    //   });
    // }
  },
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>