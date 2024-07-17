<template>
  <li class="chain-item" :class="{active,disabled: chainItem.disabled, bg: bg}" @click="selectHandler">
    <div class="chain-item__icon" :title="name">
      <img
        class="g-dark-only chain-item__img"
        :src="chainItem.iconDark"
        alt=""
      >
      <img
        class="g-light-only chain-item__img"
        :src="chainItem.icon"
        alt=""
      >
      <div class="chain-item__line"/>
    </div>
  </li>
</template>

<script>

export default {
  name: 'ChainItem',
  props: ['chainItem', 'active', 'name', 'bg'],
  methods: {
    selectHandler() {
      if (this.active || this.chainItem.disabled) {
        return;
      }
      this.$emit('select', this.chainItem);
    }
  }
};
</script>

<style lang="scss" scoped>
.chain-item {
  position: relative;
  margin: 0;
  cursor: pointer;
  height: 40px;

  & + & {
    margin-top: 20px;
  }

  &.active {
    cursor: initial;

    .chain-item__line {
      display: block;
    }
  }

  &.disabled {
    cursor: initial;
    filter: grayscale(100%);
    filter: gray;
    opacity: 0.5;
  }
}

.chain-item__img {
  width: 40px;
  height: 40px;
}

.chain-item__line {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
  border-radius: 0 1px 1px 0;
  background: var(--button_text_interactive)
}
.chain-item__icon {
  position: relative;
  z-index: 2;
  padding: 0 18px;
  &.bg {
    background: var(--background);
  }
}
.chain-item__name {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  white-space: nowrap;
  word-break: keep-all;
  z-index: 1;
  background: var(--background);
  border-radius: 0 6px 6px 0;
}
</style>
