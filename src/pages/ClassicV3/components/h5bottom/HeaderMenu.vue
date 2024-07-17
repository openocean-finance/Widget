<template>
  <div class="header-menu">
    <NouFoldTransition>
      <ul v-if="isShow" class="header-menu__menu g-font-mid">
        <li
          v-for="item in menus"
          :key="item.label"
          class="header-menu__menu__item"
          @touchend="item.action"
        >
          {{ item.label }}
        </li>
      </ul>
    </NouFoldTransition>
  </div>
</template>

<script>

import NouFoldTransition from './FoldTransition';

export default {
  name: 'HeaderMenu',
  components: { NouFoldTransition },
  data() {
    return {
      isShow: false,
      onClose: () => {},
      menus: [],
    };
  },
  methods: {
    leaveHandler() {
      this.removeEl();
      this.$nextTick(() => {
        this.onClose();
      });
    },
    removeEl() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    handleBlur() {
      this.isShow = false;
      document.body.removeEventListener('touchend', this.handleBlur);
      setTimeout(() => {
        this.leaveHandler();
      }, 1000);
    },
    showMenu() {
      this.isShow = true;
      this.$nextTick(() => {
        document.body.addEventListener('touchend', this.handleBlur);
      });
    },
  },
  mounted() {
    this.showMenu();
  },
};
</script>

<style lang="scss">
.header-menu {
  z-index: var(--z-index-header);
  position: fixed;
  right: var(--space-common);
  bottom: 50px;
  right: .2rem;
  width: 2.9rem;
  overflow: hidden;
}

.header-menu__menu {
  margin: 0;
  padding: 0 .1rem;
  border-radius: .1rem;
  background: var(--background_header-menu);
  list-style: none;
  text-align: center;
  font-size: .24rem;
  backdrop-filter: blur(20px);
}

.header-menu__menu__item {
  margin: 0;
  padding: 0;
  line-height: .74rem;

  &:hover{
    background: #fff;
  }

  & + & {
    border-top: 1px solid var(--border-light);
  }
}
</style>