<template>
  <transition name="fadeBack" @after-leave="handleLeave">
    <div
      v-show="isShow"
      ref="scrollDom"
      class="nou-dialog nou-g-box"
      @click="handleClickModal"
    >
      <transition name="fade">
        <div
          v-show="isShow"
          class="nou-dialog__container"
          :class="{ ...dialogClass }"
          @click.stop
        >
          <slot name="close">
            <i
              v-if="showClose"
              class="iconfont iconClose nou-dialog__close nou-g-btn--hover"
              @click="close"
            />
          </slot>
          <h2 v-if="title.length > 0" class="nou-dialog__title nou-g-font-mid">
            {{ title }}
          </h2>
          <slot v-if="contentActive" />
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { lock, unlock } from "tua-body-scroll-lock";

/**
 * dialog
 * @author yuanzeyu
 * @date 2019-12-23
 * @desc
 */
export default {
  name: "NouDialog",
  props: {
    width: {
      type: [String, Number],
      default: 400,
    },
    visible: {
      type: Boolean,
      require: false,
      default: true,
    },
    keepSlot: {
      // keep slot instead of recreated
      type: Boolean,
      require: false,
      default: false,
    },
    title: {
      type: String,
      require: true,
      default: "",
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    dialogClass: {
      type: Object,
      require: false,
      default: () => {},
    },
    showClose: {
      type: Boolean,
      require: false,
      default: false,
    },
    fixedMobile: {
      // fixed bottom when mobile
      type: Boolean,
      require: false,
      default: false,
    },
    scrollDomID: {
      type: String,
      require: false,
      default: "js-dialog-scroll-dom",
    },
    noLock: {
      type: Boolean,
      require: false,
      default: false,
    },
    checkDom: {
      type: String,
      require: false,
      default: "js-dialog-scroll-dom",
    },
  },
  data() {
    return {
      isShow: false,
      contentActive: false,
    };
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.show();
        } else {
          this.close();
        }
      },
      immediate: true,
    },
    checkDom(val) {
      console.log(val);
      if (val && val === this.scrollDomID) {
        const dom = document.getElementById(this.scrollDomID);
        lock(dom);
        unlock(dom);
      }
    },
  },
  beforeDestroy() {
    unlock(); // unlock when destroy custom
  },
  created() {
    if (this.keepSlot) {
      this.contentActive = true;
    }
  },
  methods: {
    unlockScroll() {
      if (this.noLock) {
        return;
      }
      const dom = document.getElementById(this.scrollDomID);
      if (dom) {
        console.log("weunlock", dom);
        unlock(dom); // unlock when destroy custom
      } else {
        unlock();
      }
    },
    lockScroll() {
      if (this.noLock) {
        return;
      }
      const dom = document.getElementById(this.scrollDomID);
      if (dom) {
        lock(dom); // unlock when destroy custom
      } else {
        lock();
      }
    },
    close() {
      // public
      this.unlockScroll();
      this.isShow = false;
      this.$emit("update:visible", false);
    },
    handleClickModal() {
      if (this.closeOnClickModal) {
        this.close();
      }
    },
    show() {
      this.isShow = true;
      this.contentActive = true;
      this.$nextTick(() => {
        this.lockScroll();
      });
    },
    handleLeave() {
      if (!this.keepSlot) {
        // destroy slot after leave
        this.contentActive = false; // avoid view change between transition
      }
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
$g-screen-flag: 750px;

.nou-dialog {
  z-index: 9998;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  padding: 0;
}

.nou-dialog__container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: var(--background_container);
  text-align: left;
  box-sizing: border-box;
  overflow: hidden;
}

.nou-dialog__close {
  float: right;
  font-size: 14px;
  margin-top: 8px;
  cursor: pointer;
  @media (max-width: $g-screen-flag) {
    font-size: 0.28rem;
    margin-top: 0.07rem;
  }
}

.nou-dialog__title {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 21px;
  font-weight: 900;

  @media (max-width: $g-screen-flag) {
    font-size: 0.36rem;
    line-height: 0.42rem;
    // padding-bottom: 0.4rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  //transition: all .5s;
  //transform: translateZ(0);
}

.fade-enter,
.fade-leave-active {
  //opacity: 0;
  //transform: translate3d(0, 100%, 0);
}

.fadeBack-enter-active,
.fadeBack-leave-active {
  transition: opacity 0.5s;
  opacity: 1;
}

.fadeBack-enter,
.fadeBack-leave-active {
  opacity: 0;
}
</style>

