<template>
  <div class="price">
    <div class="title">
      <span>{{ $t("limit_order_price") }}</span>
      <div>
        <span v-if="inverse" @click="change(false)">{{
          tokenLimitPrev.symbol
        }}</span>
        <span v-else @click="change(true)">{{ tokenLimitNext.symbol }}</span>
        <img class="g-dark-only icon" src="@/assets/icon-switch-dark.svg" />
        <img class="g-light-only icon" src="@/assets/icon-switch-light.svg" />
      </div>
    </div>
    <div class="value">
      <input
        type="number"
        v-model="price"
        @input="changeInput"
        @change="changeInput"
      />
    </div>
  </div>
</template>

<script>
import { toFixed } from "@/utils/format";
import ToolTip from "@/components/ToolTip";

export default {
  components: {
    ToolTip,
  },
  props: {
    quotePrice: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      toFixed,
      price: this.quotePrice,
      inverse: false,
      edit: false,
    };
  },
  watch: {
    "tokenLimitPrev.symbol"(newVal, oldVal) {
      this.price = "";
      this.inverse = false;
      this.edit = false;
    },
    "tokenLimitNext.symbol"(newVal, oldVal) {
      this.price = "";
      this.inverse = false;
    },
    quotePrice(val) {
      if (!this.edit) {
        this.inverse = false;
        this.price = val;
        this.edit = false;
      }
    },
  },
  methods: {
    change(_inverse) {
      if (_inverse) {
        this.inverse = true;
      } else {
        this.inverse = false;
      }
      this.price = 1 / this.price;
      this.emitInput(this.price);
    },
    changeInput(e) {
      this.edit = true;
      this.emitInput(e.target.value);
    },
    emitInput(val) {
      if (this.inverse) {
        val = 1 / val;
      }
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.price {
  width: 190px;
  height: 64px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px 16px;
  background: var(--background-input-highlight);
  border: 1px solid var(--background-classic-form-border);

  @media (max-width: 440px) {
    width: 60%;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: var(--classic-text-common);

      @media (max-width: 440px) {
        font-size: 10px;
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      span {
        color: var(--classic-text-title);
        cursor: pointer;
      }
    }
  }

  .icon{
    width: 14px;
    margin-left: 4px;
  }

  .value {
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 100%;
      border: none;
      outline: none;
      background: none;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      color: var(--classic-text-active);

       @media (max-width: 440px) {
        font-size: 10px;
      }
    }

    i {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      color: var(--classic-text-common);
    }
  }
}
</style>