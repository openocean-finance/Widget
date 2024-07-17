<template>
  <div class="radio-box">
    <div v-for="(item) in options" :key="String(item.value)" class="radio-box__item g-font-mid" :class="{'radio-box__item--active':item.value===value,'radio-box__item--danger':danger}" @click="select(item)">
      <span class="cr"></span>
      {{ item.label }}
    </div>
    <div class="radio-box__line" :class="{ on: danger}"></div>
  </div>
</template>

<script>

export default {
  name: 'RadioBox',
  props: {
    value: {
      type: [String, Number],
      require: true
    },
    options: {
      type: Array,
      require: true
    },
    danger: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  methods: {
    select (target) {
      if (this.value === target.value) {
        return;
      }
      this.$emit('input', target.value);
      this.$emit('change', target);
    }
  }
};
</script>

<style lang="scss">
.radio-box {
  display: inline-block;
  line-height: 20px;
  position: relative;
}

.radio-box__item {
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  margin-right: 15px;
  color: var(--color02);
  .cr {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid var(--color02);
    border-radius: 14px;
    box-sizing: border-box;
  }
}
.radio-box__item--active {
  color: var(--btn-color);
  cursor: default;
  .cr {
    border: 4px solid var(--btn-color);
    background: var(--btn-bg);
  }
}
.radio-box__line {
  width: 50%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  transition: all 0.3s ease;
  &.on {
    left: 50%;
    background-color: #987;
  }
}
</style>
