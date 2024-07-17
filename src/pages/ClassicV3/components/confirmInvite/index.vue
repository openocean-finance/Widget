<template>
  <div class="advance_settings">
    <!-- <h2 class="g-dialog-title">
      <div class="g-clickable g-back-button" @click="back">
        <i class="iconfont icondrop_down"></i>
      </div>
      <span>{{ $t("exchange_advanced_settings") }}</span>
    </h2> -->
    <div class="confirm-body">
      <div class="body">{{`Would you like to accept the invest from ${invester}?`}}</div>
      <div class="button-group">
        <div @click="confirm">Yes</div>
        <div @click="back">No</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    invester: {
      type: String,
      default: "",
    },
  },
  methods: {
    back() {
      this.$emit("back");
    },
    confirm() {
      this.$emit("accept");
    },
  },
};
</script>

<style scoped lang="scss">
.advance_settings {
  display: flex;
}

.confirm-body {
  position: absolute;
  top: 0px;
  background: var(--background_interactive);
  left: 0;
  right: 0;
  border-radius: 10px;

  .body {
    margin-top: 16px;
    
    font-weight: 900;
    font-size: 14px;
    text-align: center;
  }

  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 32px;
    margin-bottom: 16px;
  }
}
.setting_back {
  box-sizing: border-box;
  position: absolute;
  left: 25px;
  top: 30px;
  width: 30px;
  height: 30px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  background: var(--background_mask);

  img {
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
  }
  &:hover {
    background: var(--background_classic);
  }
}
.setting_reset {
  position: absolute;
  right: 30px;
  font-weight: bold;
  top: 33px;
  color: var(--color-content);
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: var(--text_primary);
  }
}
.custom-tokens_box {
  padding-top: 20px;
  .custom-tokens_warning {
    color: var(--red);
  }
}
.advance-settings__dex__label {
  margin-left: 10px;
}

.advance-settings__dex {
  @media (max-width: 440px) {
    height: 35vh;
    overflow: scroll;
  }
}

.slippage-selectv3__custom {
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  background: var(--background_interactive);
  border-radius: 6px;
  outline: none;
  color: inherit;
  // text-align: right;
  font-size: inherit;
  font-family: inherit;
  -webkit-appearance: none;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &::placeholder {
    color: var(--color-des);
  }

  &:hover,
  &:focus {
    border-color: var(--background_classic-input-hover);
  }
}
.g-back-button {
  &:hover {
    i {
      color: var(--text_primary);
    }
  }
  i {
    transform: scale(0.45) rotate(90deg);
    color: var(--button_back);
  }
}
</style>