<template>
  <div class="transaction">
    <div class="classic-transaction__header">
      <i class="iconfont iconFold classic-transaction__header__close" @click="$emit('close')"/>
      <h2 class="classic-transaction__header__title">{{ this.$t('menu_limit') }}</h2>
    </div>
    <div class="control">
      <ul class="tab">
        <li
          v-for="(item, i) in tabList"
          :key="i"
          :class="{ on: item.code === tabCode }"
          @click="tabChange(item.code)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="classic-transaction__list" id="action-sheet-scroll">
        <Active v-if="tabCode === '01'" />
        <History v-if="tabCode === '02'" />
    </div>
  </div>
</template>

<script>
import { formatDate, toFixed } from "@/utils/format";
import { formatAccount } from "@/utils/format";
import getChains from "@/utils/getChains";
import H5History from "../h5bottom/H5History";
import Active from "../limit-order-transaction/Active"
import History from "../limit-order-transaction/History"
export default {
  name: "LimitTransactionList",
  components:{H5History, Active, History},
  data() {
    return {
      list: [],
      loading: false,
      formatDate,
      toFixed,
      formatAccount,
      timer: null,
      tabCode: "01",
      tabList: [
        {
          code: "01",
          // name: "Active",
          name: $t("limit_order_active"),
        },
        {
          code: "02",
          name: $t("limit_order_history"),
        },
      ],
    };
  },
  watch: {
    "tokenSwapPrev.symbol"(newVal, oldVal) {
      this.load();
    },
    "tokenSwapNext.symbol"(newVal, oldVal) {
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
    tabChange(code) {
      this.tabCode = code;
    },
    async load() {
      console.log('load transactions')
      if (
        !this.default_account ||
        this.default_account === "0x0000000000000000000000000000000000000000"
      )
      return;
      const url = `https://open-api.openocean.finance/v3/${this.walletType}/getTxs?account=${this.default_account}&pageSize=20&pageNumber=1`;
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

  .control {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 15px;

    .tab {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      li {
        cursor: pointer;
        padding:0 24px;
        margin-right: 10px;

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: var(--classic-text-common);

        &.on {
          font-weight: 600;
          color: var(--classic-text-active);
        }
      }
    }
  }

  .transaction__list__item{
    background: var(--background-root);
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