import Vue from 'vue';
import View from './Notification.vue';

const showNotification = params => {
  const Progress = Vue.extend(View);
  const instance = new Progress({
    params,
  }).$mount();
  document.body.appendChild(instance.$el);
  return instance;
}

export default showNotification;
