<template>
  <div class="transaction-list">
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
    <Market v-if="tabCode == '01'" />
    <Transaction v-if="tabCode == '02'" ref="transaction"/>
  </div>
</template>

<script>
import Market from "./Market.vue";
import Transaction from "./Transaction.vue";

export default {
  name: "SwapTransaction",
  components: { Market, Transaction },
  data() {
    return {
      tabCode: "01",
      tabList: [
        {
          code: "01",
          name: $t("swap_market"),
        },
        {
          code: "02",
          name: $t("swap_transactions"),
        },
      ],
    };
  },
  methods: {
    tabChange(code) {
      this.tabCode = code;
      if(this.tabCode === "01") {
        this.$refs.transaction.clearTimer();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-list {
  margin: 0 -24px;
  .control {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .tab {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      li {
        cursor: pointer;
        padding-left: 24px;
        margin-right: 10px;

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 24px;
        color: var(--classic-text-common);

        &.on {
          font-weight: 600;
          color: var(--classic-text-active);
        }
      }
    }
  }
}
</style>
