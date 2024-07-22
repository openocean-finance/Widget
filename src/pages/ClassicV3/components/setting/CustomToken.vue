<template>
  <FoldLabel :label="$t('custom_token_title')" :content="`${myTokenList.length} ${$t('Tokens')}`">
    <div class="slippage-select g-font-mid">
      <div class="slippage-select__text">
        <i class="iconfont iconjinggao" />{{ $t('custom_token_tip') }}
      </div>
      <input
        class="slippage-select__custom"
        v-model="address"
        type="text"
        :placeholder="$t('custom_token_address')"
        @input="searchToken"
      >
      <div v-if="token" class="select-token__info">
        <ul>
          <li>{{ $t('custom_token_symbol') }}: <span>{{ token.symbol }}</span></li>
          <li>{{ $t('custom_token_name') }}: <span>{{ token.name }}</span></li>
          <li>{{ $t('custom_token_decimals') }}: <span>{{ token.decimals }}</span></li>
        </ul>
        <img :src="token.image.large" />
      </div>
      <div v-if="address && !token" class="select-token__info">
        <div class="loading">
          <div class="loader">{{ $t('exchange_loading') }}</div>
        </div>
      </div>
      <div class="slippage-select__button">
        <div @click="showTokens=!showTokens"><span>{{ $t('custom_token_button_tokens') }}</span></div>
        <div @click="addToken"><span>{{ $t('custom_token_button_add') }}</span></div>
      </div>
    </div>
    <div v-if="showTokens && myTokenList.length">
      <ul class="select-token__list">
        <li class="select-token__list__item" v-for="(item, i) in myTokenList" :key="i">
          <img :src="item.icon" alt="" class="select-token__list__item__icon">
          <div class="select-token__list__item__name g-font-mid">{{ item.symbol }}</div>
          <div class="select-token__list__item__chain">{{ item.name }}
            <i class="iconfont iconyichu" @click="removeToken(item)" />
          </div>
        </li>
      </ul>
    </div>
  </FoldLabel>
</template>

<script>
import showToast from "@/components/toast";
import FoldLabel from "@/pages/ClassicV3/components/setting/FoldLabel";
import { getContractDecimals } from "@/init";
import { getters } from "@/contract";
import { getTokenInfo } from '@/api/cms';

export default {
  name: 'CustomToken',
  components: {
    FoldLabel
  },
  props: {
    list: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  computed: {
    ...getters,
  },
  data() {
    return {
      address: '',
      showTokens: false,
      token: null,
      myTokenList: []
    }
  },
  mounted() {
    this.myTokenList = this.getTokenList();
  },
  methods: {
    addToken() {
      if(!this.address) {
        showToast(this.$t('custom_token_toast_1'));
        return;
      }
      if(!this.token) {
        showToast(this.$t('custom_token_toast_2'));
        return;
      }
      console.log(this.token)
      const { id, decimals, name, symbol, contract_address, image } = this.token;
      if(!name || !symbol) {
        showToast(this.$t('custom_token_toast_2'));
        return
      }
      const { large } = image;
      console.log('tokenList', this.list);
      let token = this.list.filter(item=>{
        return item.address.toLowerCase() == contract_address.toLowerCase();
      })
      if (token && token.length) {
        showToast(this.$t('custom_token_toast_3'));
        return;
      }
      for(var i=0;i<this.myTokenList.length;i++) {
        if(this.myTokenList[i].address.toLowerCase() === contract_address.toLowerCase()) {
          showToast(this.$t('custom_token_toast_3'));
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
        custom: 1
      }
      this.myTokenList.push(token);
      window.localStorage.setItem(this.chainName + '_customtoken', JSON.stringify(this.myTokenList));
      showToast(this.$t('custom_token_toast_4'));
      this.$emit('addtoken', token);
      this.address = '';
      this.token = null;
      this.showTokens = true;
    },
    removeToken(item) {
      const { address } = item;
      const list = this.myTokenList.filter(item => {
        return item.address !== address;
      });
      this.myTokenList = list;
      window.localStorage.setItem(this.chainName + '_customtoken', JSON.stringify(list));
      this.$emit('removetoken', item);
    },
    getTokenList() {
      const temp = window.localStorage.getItem(this.chainName + '_customtoken');
      return temp && JSON.parse(temp) || [];
    },
    async searchToken(e) {
      this.token = null;
      this.address = e.target.value;
      if(!this.address || this.address.length < 16) return;
      // if(!this.account) {
      //   showToast('Please connect wallet');
      //   return;
      // }
      let decimals = 0;
      try {
        decimals = await getContractDecimals(this.address);
        if(+decimals <= 0) {
          showToast(this.$t('custom_token_toast_5'));
          return;
        }
      } catch(e) {
        showToast(this.$t('custom_token_toast_5'));
        return;
      }
      const res = await getTokenInfo(this.chainName, this.address);
      if (res && res.name) {
        res.decimals = decimals;
        this.token = res;
      } 
      // else {
      //   this.token = null;
      //   this.address = '';
      //   showToast(this.$t('custom_token_toast_5'));
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.slippage-select {
  line-height: 30px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .iconfont {
    margin-right: 5px;
    opacity: 0.8;
  }
}

.slippage-select__radio {
  flex: 1;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  background: var(--background_classic-btn);
  border-radius: 6px;
  overflow: hidden;
}

.slippage-select__radio__item {
  flex: 1;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: pointer;
  transition: background-color .3s, color .3s;

  &.active {
    background: var(--text_primary);
    color: var(--background);
    cursor: default;
  }
}

.slippage-select__custom {
  margin: 10px 0;
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  background: var(--background_interactive);
  border-radius: 6px;
  outline: none;
  color: inherit;
  text-align: left;
  font-size: inherit;
  
  -webkit-appearance: none;
  border: 2px solid transparent;
  transition: border-color .3s;

  &::placeholder {
    font-weight: 300;
    color: var(--color-des);
  }

  &:hover,
  &:focus {
    border-color: var(--background_classic-input-hover);
  }
}

.slippage-select__text {
  line-height: 1.5;
  margin-top: 10px;
  color: var(--classic-warning);
  .iconfont {
    transform: scale(.6333);
    transform-origin: left;
  }
}

.slippage-select__button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: var(--background_classic-btn);
    color: var(--text_primary);
    border-radius: 6px;
    color: var(--text_primary);
    
    font-weight: 600;
    font-size: 12px;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
    &:nth-child(1) {
      .iconfont {
        transform: scale(.8333);
        transform-origin: left;
      }
    }
    &:nth-child(2) {
      .iconfont {
        transform: scale(.9333);
        transform-origin: left;
      }
    }
  }
}

.select-token__list {
  margin-top: 10px;
  margin-bottom: 0;
  max-height: 200px;
}

.select-token__list__item {
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  margin: 4px 0;
  &:hover {
    background: var(--background_classic-token);
  }
}

.select-token__list__item__icon {
  width: 26px;
  height: 26px;
}

.select-token__list__item__name {
  width: 100%;
  margin-left: 20px;
}

.select-token__info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: var(--background_select-token-info);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;

  li {
    color: var(--color-content);

    span {
      color: var(--text_primary);
    }
  }

  img {
    width: 60px;
    border-radius: 50%;
  }
}

.select-token__list__item__chain {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;
  font-size: 12px;
  line-height: 16px;
  .iconfont {
    display:inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-left: 5px;
    text-align: center;
    border-radius: 3px;
    transition: all .3s ease;
    cursor: pointer;
    // &:hover {
    //   background: var(--background_interactive)
    // }
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  span {
    margin-right: 10px;
  }
}

.loader {
  border-radius: 50%;
  width: 18px;
  height: 18px;
}

.loader {
  font-size: 18px;
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
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
