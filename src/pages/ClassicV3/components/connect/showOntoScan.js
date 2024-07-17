import Vue from 'vue';
import View from './OntoScan.vue';

const showOntoScan = (qrData) => {
  const OntoScanCon = Vue.extend(View);
  const instance = new OntoScanCon({ qrData }).$mount();
  document.body.appendChild(instance.$el);
  return instance;
}

export default showOntoScan;
