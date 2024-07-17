<template>
  <div class="transaction">
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

    <Active v-if="tabCode === '01'" />
    <History v-if="tabCode === '02'"/>
  </div>
</template>


<script>
import Active from "./Active.vue";
import History from "./History.vue";

export default {
  name: "Transaction",
  components: { Active, History },
  data() {
    return {
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
  methods: {
    tabChange(code) {
      this.tabCode = code;
    },
  },
};
</script>


<style lang="scss" scoped>
.transaction {
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
}
</style>
