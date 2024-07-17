<template>
  <div
    class="button-base"
    :class="`${type} ${status}`"
    @click="click"
    role="button"
    :aria-disabled="disable"
    tabindex="0"
  >
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'ButtonBase',
  props: {
    type: {
      type: String,
      require: false,
      default: 'primary',
      // validator: (val) => ['primary', 'text'].indexOf(val) > -1
    },
    disable: {
      type: Boolean,
      require: false,
      default: false
    },
    status: {
      type: String,
      require: false,
      default: ''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
};
</script>

<style lang="scss">
.button-base {
  box-sizing: border-box;
  cursor: pointer;
  transition: opacity .3s;
  outline: none;

  &:hover {
    opacity: .8;
  }

  &.primary {
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: var(--blue);
    border-radius: var(--radius-sm);
    color: #000;
    font-family: Roboto;
    font-weight: 600;
    font-size: 12px;
  }

  &.danger {
    background: #F84960;
  }

  &.disabled {
    background-color: var(--color-disable);
    color: var(--color-content);
    &:hover {
      opacity: 1;
    }
  }

  &.text {
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    font-family: Roboto;
    font-weight: 600;
    color: var(--color-content);
  }

  &.submit {
    background: var(--blue);
    color: #000;
  }
}
</style>
