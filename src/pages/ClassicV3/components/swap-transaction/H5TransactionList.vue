<template>
  <div class="transaction">
    <div class="classic-transaction__header">
      <i class="iconfont iconFold classic-transaction__header__close" @click="$emit('close')"/>
      <h2 class="classic-transaction__header__title">{{ this.$t('menu_transaction') }}</h2>
    </div>
    <div v-show="list.length" class="classic-transaction__list" id="action-sheet-scroll">
      <H5History
        class="classic-transaction__list__item"
        v-for="item in list"
        :key="item.txHash"
        :hash="item.txHash"
        :from-token="item.inToken"
        :from-amount="item.inAmount"
        :to-token="item.outToken"
        :to-amount="item.outAmount"
        :block="item.block"
      />
    </div>
  </div>
</template>

<script>
import { formatDate, toFixed } from "@/utils/format";
import { formatAccount } from "@/utils/format";
import { contract as state } from "@/contract";
import H5History from "../h5bottom/H5History";
export default {
  name: "H5TransactionList",
  components:{H5History},
  data() {
    return {
      list: [],
      loading: false,
      formatDate,
      toFixed,
      formatAccount,
      timer: null,
    };
  },
  watch: {
    "state.fromToken.symbol"(newVal, oldVal) {
      this.load();
    },
    "state.toToken.symbol"(newVal, oldVal) {
      this.load();
    },
    default_account(val) {
      if (val) {
        this.load();
      }
    },
  },
  mounted() {
    this.load();
    if (!this.timer) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.load(), 10000)
    }
  },
  methods: {
    async load() {
      console.log('load transactions')
      if (
        !this.default_account ||
        this.default_account === "0x0000000000000000000000000000000000000000"
      )
        return;

      const url = `https://open-api.openocean.finance/v3/${this.chainName}/getTxs?account=${this.default_account}&pageSize=20&pageNumber=1`;
      const res = await this.$axios.get(url);
      const { data } = res;
      this.list = (data || []).map((item) => {
        const { inTokenAddress, outTokenAddress } = item;
        const _inTokenAddress = inTokenAddress.toLowerCase();
        const _ioutTokenAddress = outTokenAddress.toLowerCase();
        item.inTokenIcon =
          this.tokenMap[_inTokenAddress] &&
          this.tokenMap[_inTokenAddress].icon;
        item.outTokenIcon =
          this.tokenMap[_ioutTokenAddress] &&
          this.tokenMap[_ioutTokenAddress].icon;
        return item;
      });
      this.list.sort((a, b) => a.tradeTime > b.tradeTime ? -1 : 1)
    },
    clearTimer() {
      if(this.timer) {
        clearInterval(this.timer)
      }
    }
  },
  beforeDestroy() {
    if(this.timer) {
      clearInterval(this.timer)
    }
  }
};
</script>


<style lang="scss" scoped>
.transaction {
  max-height: 100%;
  overflow: auto;
  padding: 30px 24px 20px;
  border-radius: 12px;
  border: 1px solid var(--classic-border);
  margin-bottom: 10px;
  -webkit-overflow-scrolling: touch;

  .transaction__list__item{
    background: var(--background_base);
  }

  .classic-transaction__header {
  line-height: .5rem;
  }
  
  .classic-transaction__header__close {
  float: right;
  font-size: .5rem;
  }

.classic-transaction__header__title {
  margin-bottom: 10px;
  padding: 0;
  font-size: .3rem;
  line-height: .46rem;
}

.classic-transaction__list{
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    max-height: 85vh;
    min-height: 0;
}
 
}
</style>