<template>
  <div class="transaction">
    <table>
      <thead>
        <tr>
          <th>{{ $t("table_transaction_hash") }}</th>
          <th>{{ $t("table_transaction_transaction") }}</th>
          <th>{{ $t("table_transaction_rate") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td>
            <div class="transaction_hash">
              <a :href="blockExplorerUrl + item.txHash" target="_blank">{{ formatAccount(item.txHash) }}</a>
            </div>
            <div class="transaction_time">
              {{ formatDate(new Date(item.tradeTime).getTime() / 1000) }}
            </div>
          </td>
          <td>
            <div class="transaction_item">
              <img :src="item.inTokenIcon" alt="" v-if="item.inTokenIcon" />
              <i v-else></i>
              <div class="from">
                <div>{{ item.inToken || "---" }}</div>
                <div>{{ toFixed(item.inAmount, 4, 4) }}</div>
              </div>
              <svg width="31" height="16" viewBox="0 0 31 16">
                <path
                  d="M30.7071 8.70711C31.0976 8.31659 31.0976 7.68342 30.7071 7.2929L24.3431 0.928934C23.9526 0.53841 23.3195 0.53841 22.9289 0.928934C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM-8.74228e-08 9L30 9L30 7L8.74228e-08 7L-8.74228e-08 9Z"
                  fill="var(--classic-transaction-svg)"
                />
              </svg>
              <img :src="item.outTokenIcon" alt="" v-if="item.outTokenIcon" />
              <i v-else></i>
              <div class="to">
                <div>{{ item.outToken }}</div>
                <div>{{ toFixed(item.outAmount, 4, 4) }}</div>
              </div>
            </div>
          </td>
          <td>
            <span>{{ toFixed(item.inAmount / item.outAmount, 4, 4) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { formatDate, toFixed } from "@/utils/format";
import { formatAccount } from "@/utils/format";
import getChains from "@/utils/getChains";
export default {
  name: "transaction",
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
  computed: {
    blockExplorerUrl() {
      const chain = getChains().filter((item) => {
        return item.walletValue === this.walletType;
      });
      return (
        (chain && chain[0] && chain[0].blockExplorerUrl) ||
        "https://etherscan.io/tx/"
      );
    }
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
  destroyed() {
    if(this.timer) {
      clearInterval(this.timer)
    }
  }
};
</script>


<style lang="scss" scoped>
.transaction {
  max-height: 330px;
  overflow: auto;
  padding: 30px 24px 20px;
  margin: 0 24px;
  border-radius: 12px;
  border: 1px solid var(--classic-border);
  table {
    border-collapse: collapse;
    width: 100%;

    tbody tr, 
    thead {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
  }

  thead {
    tr {
      th {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: var(--classic-text-common);
        text-align: left;
        padding-bottom: 16px;
        &:last-child {
          text-align: right;
        }
      }
    }
  }
  tbody {
    display: block;
    max-height: 210px;
    overflow: auto;
    margin-right: -14px;
    padding-right: 7px;
    tr {
      td {
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 40px;
        color: var(--classic-text-common);
        text-align: left;
        height: 32px;
        padding-bottom: 16px;
        div {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .transaction_hash {
          a {
            font-size: 14px;
            line-height: 16px;
            color: var(--classic-item-hover);
            margin-bottom: 5px;
          }
        }
        .transaction_time {
          font-size: 12px;
          line-height: 14px;
          font-weight: 400;
        }
        .transaction_item {
          display: grid;
          grid-template-columns: 32px 1fr 2fr 32px 1fr;

          svg {
            margin-left: 10px;
            margin-right: 10px;
          }

          img {
            width: 32px;
            border-radius: 16px;
          }

          i {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            background-color: var(--classic-no-icon);
          }
        }

        .from,
        .to {
          display: block;
          margin-left: 8px;
          width: 50px;
          white-space: nowrap;
          div {
            height: 16px;
            &:last-child {
              color: var(--classic-text-title);
            }
          }
        }

        &:last-child {
          text-align: right;
          span {
            &:last-child {
              color: var(--classic-text-title);
              margin-left: 8px;
            }
          }
        }
        .i-red {
          background: var(--classic-red-bg);
          color: var(--classic-red);
        }
      }
    }
  }
}
</style>