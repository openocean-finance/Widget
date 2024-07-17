<template>
  <div :class="version">
    <transition name="blur-mask__blur" @after-leave="$emit('leave')">
      <div v-if="visible" class="blur-mask">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
import {lock, unlock} from 'tua-body-scroll-lock';

export default {
  name: 'BlurMask',
  props: {
    visible: { // sync
      type: Boolean,
      require: true
    },
    scrollDomId: {
      type: String,
      require: false,
      default:'action-sheet-scroll'
    }
  },
  beforeDestroy() {
    unlock(this.scrollDomId);
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            lock(document.getElementById(this.scrollDomId));
          });
        } else {
          unlock(document.getElementById(this.scrollDomId));
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      version: '',
    };
  },
  mounted() {
    const u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Firefox') > -1) {
      this.version = 'android';
    }
  }
};
</script>

<style lang="scss">
.blur-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-mask);
  backdrop-filter: blur(50px);
  opacity: 1;
}


.blur-mask__blur {
  &-enter-active, &-leave-active {
    transition: all .3s;
    backdrop-filter: blur(20px);
    opacity: 1;
  }

  &-enter, &-leave-active {
    opacity: 0;
    backdrop-filter: blur(0);
  }
}
</style>
