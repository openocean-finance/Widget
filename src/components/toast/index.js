import Vue from 'vue';
import Toast from './Toast.vue';

const uniqueMap = new Map();
const instanceList = [];
let seed = 1;


function updateTop() {
  instanceList.forEach((item, i) => {
    // eslint-disable-next-line no-param-reassign
    item.top = (i * (42 + 20)) + 20;
  });
}

function initToast(ops) {
  const ToastCon = Vue.extend(Toast);
  const instance = new ToastCon({
    data: ops,
  }).$mount();
  instance.handleClose = () => {
    if (instance.uid) {
      uniqueMap.delete(instance.uid);
    }
    instanceList.splice(instanceList.findIndex(item => item.id === instance.id), 1);
    updateTop();
  };
  instance.top = (instanceList.length * (42 + 20)) + 20;
  // eslint-disable-next-line no-plusplus
  instance.id = seed++;
  instanceList.push(instance);
  document.body.appendChild(instance.$el);
  return instance;
}

function showToast(options, uid) {
  let ops = options || {};
  if (typeof ops === 'string') {
    ops = {
      text: ops,
      uid: uid || '',
      type: 'primary',
    };
  }
  const unique = ops.uid;
  if (unique) {
    const oldInstance = uniqueMap.get(unique);
    if (oldInstance) {
      oldInstance.resetTimer();
    } else {
      uniqueMap.set(unique, initToast(ops));
    }
  } else {
    initToast(ops);
  }
}

export default showToast;
