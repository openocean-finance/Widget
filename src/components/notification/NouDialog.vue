<template>
  <transition name="fadeBack" @after-leave="handleLeave">
    <div v-show="isShow" ref="scrollDom" class="nou-dialog nou-g-box" @click="handleClickModal">
      <div class="nou-dialog__container__wrapper">
        <transition name="fade">
          <div
              v-show="isShow"
              :style="{ 'width': width + 'px' }"
              class="nou-dialog__container"
              :class="{...dialogClass, 'fixed-mobile':fixedMobile}"
              @click.stop
          >
            <slot name="close">
              <i
                  v-if="showClose"
                  class="iconfont iconClose nou-dialog__close nou-g-btn--hover"
                  @click="close"
              />
            </slot>
            <h2 v-if="title.length > 0" class="nou-dialog__title nou-g-font-mid">{{ title }}</h2>
            <slot v-if="contentActive"/>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import {lock, unlock} from 'tua-body-scroll-lock'

/**
 * dialog
 * @author yuanzeyu
 * @date 2019-12-23
 * @desc
 */
export default {
  name: 'NouDialog',
  props: {
    width: {
      type: [String, Number],
      default: 400
    },
    visible: {
      type: Boolean,
      require: false,
      default: true
    },
    keepSlot: { // keep slot instead of recreated
      type: Boolean,
      require: false,
      default: false
    },
    title: {
      type: String,
      require: true,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    dialogClass: {
      type: Object,
      require: false,
      default: () => {
      }
    },
    showClose: {
      type: Boolean,
      require: false,
      default: false
    },
    fixedMobile: { // fixed bottom when mobile
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      contentActive: false,
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.show()
        } else {
          this.close()
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    unlock(this.$refs.scrollDom) // unlock when destroy custom
  },
  created() {
    if (this.keepSlot) {
      this.contentActive = true
    }
  },
  methods: {
    close() { // public
      // unlock(this.$refs.scrollDom)
      document.body.style.overflow = 'auto';
      this.isShow = false
      this.$emit('update:visible', false)
    },
    handleClickModal() {
      if (this.closeOnClickModal) {
        this.close()
      }
    },
    show() {
      this.isShow = true
      this.contentActive = true
      this.$nextTick(() => {
        lock(this.$refs.scrollDom)
      })
    },
    handleLeave() {
      if (!this.keepSlot) { // destroy slot after leave
        this.contentActive = false // avoid view change between transition
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
$g-screen-flag: 750px;

.nou-dialog { // todo remove pc
  z-index: 9998;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
  cursor: initial;
  overflow: auto;
}

.nou-dialog__container__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.nou-dialog__container {
  position: relative;
  // margin: 100px 0;
  max-width: 100%;
  width: 360px;
  // padding: 32px 24px;
  border-radius: var(--radius-sm);
  // background: var(--background_container);
  text-align: left;
  box-sizing: border-box;

  @media (max-width: $g-screen-flag) {
    // margin: 1rem .4rem;
    width: 5.9rem;
    // padding: .4rem;

    &.fixed-mobile {
      position: fixed;
      top: initial;
      bottom: 0;
      left: 50%;
      margin: 0;
      transform: translate3d(-50%, 0, 0);
    }
  }
}

.nou-dialog__close {
  width: 20px;
  height: 20px;
  font-size: 14px;
  margin-top: 5px;
  cursor: pointer;
  @media (max-width: $g-screen-flag) {
    width: .28rem;
    height: .28rem;
    font-size: .28rem;
    margin-top: .07rem;
  }
}

.nou-dialog__title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nou-dialog__title {
  margin: 0;
  padding: 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 900;
  
  text-align: center;

  @media (max-width: $g-screen-flag) {
    font-size: .36rem;
    line-height: .42rem;
    padding-bottom: .4rem;
  }
}

// .fade-enter-active, .fade-leave-active {
//   //transition: all .5s;
//   //transform: translateZ(0);
// }

// .fade-enter, .fade-leave-active {
//   //opacity: 0;
//   //transform: translate3d(0, 100%, 0);
// }

.fadeBack-enter-active, .fadeBack-leave-active {
  transition: all .5s;
  opacity: 1;
}

.fadeBack-enter, .fadeBack-leave-active {
  opacity: 0;
}

</style>

