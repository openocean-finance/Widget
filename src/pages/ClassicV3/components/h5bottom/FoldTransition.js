const elTransition = '.3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out';

export default {
  name: 'NouFoldTransition',
  functional: true,
  render(h, {
    children,
    listeners,
  }) {
    const data = {
      on: {
        beforeEnter(el) {
          el.style.transition = elTransition;
          if (!el.dataset) el.dataset = {};
          const style = getComputedStyle(el);
          el.dataset.oldPaddingTop = style.paddingTop;
          el.dataset.oldPaddingBottom = style.paddingBottom;
          el.style.height = '0';
          el.style.paddingTop = '0';
          el.style.paddingBottom = '0';
        },

        enter(el) {
          const style = getComputedStyle(el);
          el.dataset.oldOverflow = style.overflow;
          if (el.scrollHeight !== 0) {
            el.style.height = `${el.scrollHeight}px`;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          }

          el.style.overflow = 'hidden';
        },

        afterEnter(el) {
          el.style.transition = '';
          el.style.height = '';
          el.style.overflow = el.dataset.oldOverflow;
        },

        beforeLeave(el) {
          if (!el.dataset) el.dataset = {};
          const style = getComputedStyle(el);
          el.dataset.oldPaddingTop = style.paddingTop;
          el.dataset.oldPaddingBottom = style.paddingBottom;
          el.dataset.oldOverflow = style.overflow;
          el.style.height = `${el.scrollHeight - style.paddingTop.replace('px', '') - style.paddingBottom.replace('px', '')}px`; // todo check
          el.style.overflow = 'hidden';
        },

        leave(el) {
          if (el.scrollHeight !== 0) {
            el.style.transition = elTransition;
            el.style.height = '0';
            el.style.paddingTop = '0';
            el.style.paddingBottom = '0';
          }
        },

        afterLeave(el) {
          el.style.transition = '';
          el.style.height = '';
          el.style.overflow = el.dataset.oldOverflow;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          if (listeners.leave) {
            listeners.leave();
          }
        },
      },
    };
    return h('transition', data, children);
  },
};