<template>
  <div class="transactions">
    <div class="g-container l-container">
      <div>
        <i
          class="iconfont iconFold transactions__fold-icon"
          @click="emitClose"
        />
      </div>
      <h2 class="transactions__title g-font-semi">
        {{ $t("menu_transaction") }}
      </h2>
      <div class="transactions__list">
        <table class="g-table g-table--no-padding g-table--left">
          <thead>
            <tr>
              <th>
                <span>{{ $t("table_transaction_account") }}</span>
              </th>
              <th>
                <span>{{ $t("table_transaction_height") }}</span>
              </th>
              <th>
                <span>{{ $t("table_transaction_hash") }}</span>
              </th>
              <th>
                <span>{{ $t("table_transaction_inToken") }}</span>
              </th>
              <th>
                <span>{{ $t("table_transaction_inAmount") }}</span>
              </th>
              <th>
                <span>{{ $t("table_transaction_outToken") }}</span>
              </th>
              <th>
                <span>{{ $t("table_transaction_outAmount") }}</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="list.length">
            <tr v-for="(item, i) in list" :key="i">
              <td>{{ formatAccount(item.account) }}</td>
              <td>{{ formatNum(item.block) }}</td>
              <td>
                <a
                  class="transactions__link"
                  :href="`${blockExplorerUrl}${item.txHash}`"
                  target="_blank"
                >
                  {{ formatAccount(item.txHash) }}
                </a>
              </td>
              <td>{{ item.inToken }}</td>
              <td>{{ formatNum(item.inAmount) }}</td>
              <td>{{ item.outToken }}</td>
              <td>{{ formatNum(item.outAmount) }}</td>
            </tr>
          </tbody>
          <tbody v-else class="table--empty">
            <tr>
              <td colspan="12" height="100px">
                <div class="table--empty__wrapper">
                  <div class="table--empty__wrapper__label">No Record</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate, formatNum} from "@/utils/format";
import { formatAccount } from "@/utils/format";
import getChains from "@/utils/getChains";

export default {
  name: 'TransactionList',
  data() {
    return {
      list: [],
      loading: false,
      formatDate,
      formatNum,
      formatAccount,
      timer: null,
    };
  },
  computed: {
    blockExplorerUrl() {
      const chain = getChains().filter((item) => {
        return item.walletValue === this.chainName;
      });
      return (
        (chain && chain[0] && chain[0].blockExplorerUrl) ||
        "https://etherscan.io/tx/"
      );
    },
  },
  watch: {
    default_account(val) {
      if (val) {
        this.load();
      }
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    async load() {
      if (
        !this.default_account ||
        this.default_account === "0x0000000000000000000000000000000000000000"
      )
        return;

      const url = `https://open-api.openocean.finance/v3/${this.chainName}/getTxs?account=${this.default_account}&pageSize=20&pageNumber=1`;
      const res = await this.$axios.get(url);
      const { data } = res;
      this.list = data || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.transactions {
  padding: 100px 0 0;
}

.l-container {
  display: flex;
  flex-direction: column;
}

.transactions__fold-icon {
  font-size: 30px;
  cursor: pointer;
}

.transactions__title {
  margin: 30px 0 0 0;
  padding: 0;
  font-size: 24px;
  line-height: 48px;
}

.transactions__tab {
  margin-top: 20px;
  flex: 1;
  min-height: 0;
}

.transactions__list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: hidden;
}

.transactions__link {
  color: inherit;
  text-decoration: underline;
}
</style>