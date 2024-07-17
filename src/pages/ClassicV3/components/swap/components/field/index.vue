<template>
  <div class="field" :class="{ highlight: from }" :style="{ border: board ? '1px solid var(--button_background_interactive)' : `1px solid rgba(0,0,0,0)` }">
    <div class="field-item" v-if="from">
      <span>{{ $t("swap_pay") }}</span>
      <div class="max" v-if="+token.balance > 0">
        <i class="g-clickable" @click="chnageAmountMax(1)">{{
          $t("swap_max")
        }}</i>
        <i class="g-clickable" @click="chnageAmountMax(0)">{{
          $t("swap_half")
        }}</i>
      </div>
    </div>
    <div class="field-item" v-else>
      <span>{{ $t("swap_recieve") }}</span>
    </div>
    <div class="field-item mid">
      <Token :token="token" :from="from" @change="changeToken" />
      <input @change="chnageAmount" type="text" placeholder="" @focus="playBoard(true)" @blur="playBoard(false)" v-model="token.value" v-enter-number :readonly="!from" />
    </div>
    <div class="field-item">
      <span>{{ $t("swap_balance") }} : {{ token.balance || 0 }}</span>
      <span>~$ {{ usdValue || 0 }}</span>
    </div>
  </div>
</template>

<script>
import Token from "../token";
export default {
  components: {
    Token,
  },
  data () {
    return {
      board: false,
    };
  },
  props: {
    from: {
      type: Boolean,
      default: true,
    },
    token: {
      type: Object,
      default () {
        return {};
      },
    },
    usdValue: {
      type: [String, Number],
      default: 0,
    },
  },
  directives: {
    enterNumber: {
      bind: function (el) {
        var reg = /^\d*?(\.)?\d{0,20}?$/;
        var oldValue = "";
        el.inputHandler = function (e) {
          if (reg.test(e.target.value)) {
            oldValue = e.target.value;
          } else if (e.target.value) {
            e.target.value = oldValue;
          } else {
            e.target.value = "";
            oldValue = "";
          }
        };
        el.addEventListener("input", el.inputHandler);
        el.changeHandler = function (e) {
          if (e.target.value.endsWith(".")) {
            e.target.value = e.target.value.slice(0, -1);
          }
        };
        el.addEventListener("change", el.changeHandler);
      },
      unbind: function (el) {
        el.removeEventListener("input", el.inputHandler);
        el.removeEventListener("change", el.changeHandler);
      },
    },
  },
  methods: {
    changeToken (target) {
      if (this.from) {
        this.changeRoute({
          fromSymbol: target.symbol
        })
      } else {
        this.changeRoute({
          toSymbol: target.symbol
        })
      }
    },
    chnageAmount () {
      if (this.from) {
        this.changeRoute({
          amount: this.token.value
        })
      }
    },
    chnageAmountMax (key) {
      if (this.from) {
        if (key) {
          this.token.value = this.token.balance
        } else {
          this.token.value = this.token.balance / 2
        }
        this.changeRoute({
          amount: this.token.value
        })
      }
    },
    playBoard (val) {
      this.board = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  background: var(--background_uninteractive);
  border-radius: 8px;
  padding: 18px 20px;
  height: 124px;
  box-sizing: border-box;
  border-radius: 12px;
  // border: 1px solid var(--background_classic-form-border);
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.highlight {
  background: var(--background_interactive);
}

.field-item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  &.mid {
    margin: 8px 0 1px;
  }

  .max {
    display: flex;

    i {
      cursor: pointer;
      margin-left: 4px;
      transition: all 0.3s ease;

      &:hover {
        color: var(--fail);
        background-color: var(--classic-max-hover-bg);
      }
    }
  }

  span {

    font-style: normal;
    font-size: 13px;
    line-height: 21px;
    color: var(--text_secondary);
  }

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;

    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 16px;
    color: var(--fail);
    background: var(--classic-field-balance);
    border-radius: 4px;
  }

  input {
    flex: 1;
    height: 37px;
    padding: 5px;
    border: none;
    background: none;
    outline: none;
    text-align: right;


    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 27px;

    color: var(--text_primary);
    width: 100%;
  }
}
</style>