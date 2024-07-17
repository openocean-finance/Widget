<template>
  <div class="common-switchv3" :class="{active:value,minSwitch:min}" @click="emitSwitch">
    <div class="common-switchv3__slider">
      <div class="common-switchv3__slider__dot" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommonSwitch',
  props: {
    value: {
      type: Boolean,
      require: true
    },
    min: {
      type: Boolean,
      require: false
    },
  },
  methods: {
    emitSwitch () {
      this.$emit('input', !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.common-switchv3 {
  display: inline-block;
  position: relative;
  height: 32px;
  width: 56px;
  cursor: pointer;
  vertical-align: middle;

  &.active {
    .common-switchv3__slider {
      background: var(--background_base);
    }
    .common-switchv3__slider__dot {
      left: calc(100% - 26px);
    }
  }

  .common-switchv3__slider {
    width: 100%;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
    background: var(--background_interactive);
    border-radius: 100px;
    transition: background-color 0.3s;
  }

  .common-switchv3__slider__dot {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 21px;
    height: 21px;
    background: var(--text_primary);
    border-radius: 50%;
    transition: all 0.3s;
  }
}
.minSwitch {
  height: 20px;
  width: 36px;
  &.active {
    .common-switchv3__slider__dot {
      top: 2.5px;
      left: calc(100% - 18px);
    }
  }

  .common-switchv3__slider {
    width: 100%;
    height: 20px;
  }

  .common-switchv3__slider__dot {
    top: 3px;
    left: 2px;
    width: 16px;
    height: 16px;
  }
}
</style>
