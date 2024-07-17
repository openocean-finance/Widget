<template>
  <div
    class="label"
    :style="{
      visibility:
        this.outAmount && this.inAmount && this.quoteStatus
          ? 'visible'
          : 'hidden',
    }"
  >
    <span v-if="inverse">1 {{ tokenNext.symbol }} = {{ inverseRate }}</span>
    <span v-else>1 {{ tokenPrev.symbol }} = {{ rate }}</span>
    <!-- <img
      :class="{ inverse: inverse }"
      src="@/assets/v3/icon-switch2.svg"
      @click="inverse = !inverse"
    /> -->
  </div>
</template>

<script>
import { toFixed } from "@/utils/format";
export default {
  props: {
    inAmount: {
      type: [String, Number],
      default: "",
    },
    outAmount: {
      type: [String, Number],
      default: "",
    },
    quoteStatus: {
      type: [String, Number],
      default: 0,
    },
    tokenPrev: {
      type: Object,
      default() {
        return {
          approve: 0,
          balance: 0,
          symbol: "",
          priceImpact: 0,
        };
      },
    },
    tokenNext: {
      type: Object,
      default() {
        return {
          approve: 0,
          balance: 0,
          symbol: "",
          priceImpact: 0,
        };
      },
    },
    rate: {
      type: String,
      default: "",
    },
    inverseRate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inverse: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  margin: 15px 0;
  @media (max-width:440px) {
    margin: 12px 0 20px 0;
  }
  span {
    
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: var(--text_secondary);
  }
  img {
    width: 10px;
    margin-left: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &.inverse {
      transform: rotate(180deg);
    }
  }
}
</style>