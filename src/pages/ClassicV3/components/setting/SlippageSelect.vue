<template>
  <div class="slippage-selectv3 g-font-mid" :class="{ inline }">
    <ul v-if="options && options.length" class="slippage-selectv3__radio">
      <li v-for="(item, i) in options" :key="i" class="slippage-selectv3__radio__item" :class="{ active: value == item.value }" @click="select(item)">
        {{ item.label }}
      </li>
    </ul>
    <!-- :class="inputted ? 'inputted' : ''" -->
    <input class="slippage-selectv3__custom" :class="{ on: options && options.length > 0, inputted: inputted}" :value="customSlippage" type="text" :placeholder="$t('exchange_custom')" @input="inputHandler" />
  </div>
</template>

<script>
import { gwei2Gas, gas2Gwei } from "@/utils/number";

export default {
  name: "SlippageSelect",
  props: {
    value: {
      type: [Number, String],
      require: true,
    },
    options: {
      type: Array,
      require: false,
      default () {
        return [
          {
            label: "0.5%",
            value: "0.5",
          },
          {
            label: "1%",
            value: "1",
          },
          {
            label: "3%",
            value: "3",
          },
        ];
      },
    },
    inline: {
      type: Boolean,
      require: false,
      default: false,
    },
    gas: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data () {
    return {
      customSlippage: this.gas ? parseFloat(gas2Gwei(this.value)) : this.value,
      inputted: false,
      max: 50
    };
  },
  methods: {
    select (target) {
      if (target.value === this.value) {
        return;
      }
      this.customSlippage = "";
      this.inputted = false;
      this.emitValue(target.value);
    },
    inputHandler (e) {
      let val =
        e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1") || "";
      if (this.max && +val > this.max) {
        val = this.max;
      }
      e.target.value = val;
      this.customSlippage = val;
      this.inputted = true;

      if (this.gas) {
        this.emitValue(gwei2Gas(val));
      } else {
        this.emitValue(val);
      }
    },
    emitValue (val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
  mounted () {
    // if (!this.options.find(item => item.value === this.value)) {
    //   this.customSlippage = this.value;
    // }
  },
};
</script>

<style lang="scss" scoped>
.slippage-selectv3 {
  font-size: 12px;
  display: block;
  margin-top: 20px;
  &.inline {
    display: flex;
    background: var(--background_classic-btn);
    padding: 6px;
    border-radius: 8px;
    .slippage-selectv3__radio {
      background: none;
    }
    .slippage-selectv3__custom {
      margin-top: 0;
      width: 122px;
    }
    .slippage-selectv3__radio__item {
      margin-right: 5px;
      line-height: 44px;
      &.active {
        background: var(--background_interactive);
        color: var(--button_text_interactive);
        // color: var(--background_fold-active);
        cursor: default;
      }
    }
  }
}

.slippage-selectv3__radio {
  flex: 1;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  background: var(--background_classic-btn);
  border-radius: 6px;
  // overflow: hidden;
}

.slippage-selectv3__radio__item {
  flex: 1;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 6px;
  line-height: 36px;

  &.active {
    // background: var(--background_container);
    color: var(--button_text_interactive);
    cursor: default;
  }
}

.slippage-selectv3__custom {
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  background: var(--background_interactive);
  border-radius: 6px;
  outline: none;
  color: inherit;
  text-align: right;
  font-size: inherit;
  font-family: inherit;
  -webkit-appearance: none;
  border: 2px solid transparent;
  transition: var(--button_text_interactive) 0.3s;
  margin-top: 10px;

  // &.on {
    // background: #ffffff;
  // }

  &::placeholder {
    color: var(--color-des);
  }

  &:hover,
  &:focus {
    border-color: var(--button_text_interactive);
  }
}

.inputted {
  border-color: var(--button_text_interactive);
}
</style>
