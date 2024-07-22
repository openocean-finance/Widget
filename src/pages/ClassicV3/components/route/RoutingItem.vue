<template>
  <div class="routing__list" :class="percent > 0 && percent < 100 ? 'percent' : ''">
    <img src="@/assets/icon-right.svg" class="routing__item_right g-light-only" />
    <img src="@/assets/icon-right-dark.svg" class="routing__item_right g-dark-only" />
    <div class="routing__total" v-if="percent > 0 && percent < 100">{{ percent }}%</div>
    <div class="routing__item" v-for="(subitem, i) in subRoutes" :key="i">
      <div class="routing__item_inner">
          <div class="routing__item_top">
            <img :src="getTokenIconByAddress(subitem.to)" />
            <span>{{ getTokenByAddress(subitem.to) }}</span>
          </div>
          <div class="routing__item_desc" v-for="(dexItem, j) in subitem.dexes" :key="j">
          {{ dexItem.dex }} {{ getPercent(subitem.dexes, dexItem.parts) }}
          </div>
      </div>
      <img src="@/assets/icon-right.svg" class="routing__item_right g-light-only" />
      <img src="@/assets/icon-right-dark.svg" class="routing__item_right g-dark-only" />
    </div>
  </div>
</template>


<script>
import { contract as state, loadLimitDefaultToken } from "@/contract";

export default {
  name: "RoutingItem",
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    total: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    subRoutes() {
      return (this.item && this.item.subRoutes) || {};
    },
    percent() {
      if (this.item && this.item.parts) {
        return Math.floor((this.item.parts / this.total) * 10000) / 100;
      }
    },
  },
  methods: {
    getPercent(dexes, parts) {
      let sum = 0;
      dexes.forEach((item) => {
        sum += item.parts;
      });
      return Math.floor((parts / sum) * 10000) / 100 + "%";
    },
    getDexIconByCode(dex) {
      if (['WETH','WBNB','WMATIC','WHT','WOKT','WAVAX','WFTM','WXDAI','WEVE','WMOVR','WANNA','WONE','WCRO','WSOL', 'sWMOVR'].indexOf(dex) >= 0) {
        return this.getTokenIconBySymbol(dex);
      }
      return `https://ethapi.openocean.finance/asset/${dex.toLowerCase()}.png`;
    },
    getTokenIconBySymbol(symbol) {
      const item = state.tokenList.filter((item) => {
        return item.symbol === symbol;
      });
      const { icon, address } = (item && item[0]) || {};
      return icon || this.walletLogo + this.toLowerCase(address) + ".png";
    },
    getTokenIconByAddress(address) {
      const item = state.tokenList.filter((item) => {
        return this.toLowerCase(item.address) === this.toLowerCase(address);
      });
      return (
        (item && item[0] && item[0].icon) ||
        this.walletLogo + this.toLowerCase(address) + ".png"
      );
    },
    getTokenByAddress(address) {
      const item = state.tokenList.filter((item) => {
        return this.toLowerCase(item.address) === this.toLowerCase(address);
      });
      return (item && item[0] && item[0].symbol) || "";
    },
  },
};
</script>

<style lang="scss" scoped>
.routing__list {
  display: flex;
  align-items: center;
  flex-wrap:wrap;
  justify-content: space-between;
  flex-direction: row;
  position: relative;
  &.percent {
    padding-left: 20px;
  }
}
.routing__item {
  flex: 1;
  padding: 8px 8px 0;
  border-radius: 16px;
  margin: 6px 20px;
  font-size: 16px;
  position: relative;
  border: 1px solid var(--routing-border-color);
  .routing__item_right {
    left: initial;
    right: -34px;
  }
}
.routing__item_inner {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.routing__item_top {
    display: grid;
    margin-bottom: 8px;
    grid-template-columns: 24px 1fr;
    grid-column-gap: 4px;
    align-items: center;
    img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
    }
    span {
      margin-left: 3px;
    }
}
.routing__item_desc {
    font-size: 14px;
    color: var(--routing-color);
    padding: 4px 4px 4px 9px;
    margin-bottom: 8px;
    border-radius: 4px;
    white-space: nowrap;
    -webkit-user-select: none;
    user-select: none;
    background: var(--routing-bg-color)
}
.routing__item_right {
  color: var(--text_primary);
  position: absolute;
  left: -7px;
  top: calc(50% - 13px);
  width: 24px;
  height: 24px;
}
</style>
