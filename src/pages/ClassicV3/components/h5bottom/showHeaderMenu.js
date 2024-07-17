import HeaderMenu from './HeaderMenu.vue';
import Vue from 'vue';

const showHeaderMenu = (menus, onClose) => {
  const MenuCon = Vue.extend(HeaderMenu);
  const instance = new MenuCon({
    data: {
      menus,
      onClose,
    },
  }).$mount();
  document.body.appendChild(instance.$el);
};

export default showHeaderMenu;
