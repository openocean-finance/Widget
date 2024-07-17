import Vue from 'vue';
import View from './index.vue';

const showConnect = () => {
  const ToastCon = Vue.extend(View);
  const instance = new ToastCon().$mount();
  document.body.appendChild(instance.$el);
  return instance;
}

export default showConnect;
