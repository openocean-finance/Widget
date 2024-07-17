<template>
  <div class="g-font-mid common-tab">
    <div
      v-for="item in tabs"
      :key="item.value"
      class="common-tab__item"
      :class="{active:item.value===value}"
      @click="select(item)"
    >
      <img :src="item.icon" v-if="item.icon" />
      <span>{{ item.label }}</span>
      <div class="common-tab__item__line"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommonTab',
  props: {
    tabs: {
      type: Array,
      require: true,
    },
    value: {
      type: [String, Number],
      require: false,
      default: '',
    },
  },
  methods: {
    select(target) {
      this.$emit('change', target);
      this.$emit('input', target.value);
    },
  },
};
</script>

<style lang="scss">
.common-tab {
  display: inline-block;
  min-width: 390px;
  white-space: nowrap;
  border-bottom: var(--border);

  .common-tab__item {
    opacity: .6;

    &.active {
      opacity: 1;
    }
  }
}

.common-tab__item {
  position: relative;
  display: inline-block;
  padding-bottom: 20px;
  min-width: 80px;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  

  img {
    width: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }

  & + & {
    margin-left: 30px;
  }

  &.active {
    cursor: initial;

    .common-tab__item__line {
      display: block;
    }
  }
}

.common-tab__item__line {
  display: none;
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 4px;
  background: var(--blue);
}
</style>
