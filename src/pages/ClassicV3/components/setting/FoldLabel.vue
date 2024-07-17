<template>
  <div class="fold-label__wrapperv3" :class="{ inline: inline }">
    <div class="fold-label g-font-mid" @click="isUnfold=!isUnfold">
      <!-- <div class="fold-label__box"></div> -->
      <div class="fold-label__labelv3">{{ label }}</div>
      <div class="fold-label__contentv3">
        <slot name="content">{{ content }}</slot>
      </div>
      <i v-if="!no" :class="{isUnfold}" class="iconfont icondrop_down fold-label__icon1"></i>
    </div>
    <NouFoldTransition>
      <div v-if="isUnfold||no" class="fold-label__fold">
        <slot/>
      </div>
    </NouFoldTransition>
  </div>
</template>

<script>

import NouFoldTransition from "@/components/common/FoldTransition";

export default {
  name: 'FoldLabel',
  components: { NouFoldTransition },
  props: {
    label: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: false
    },
    no: {
      type: Boolean,
      require: false,
      default: false
    },
    inline: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data () {
    return {
      isUnfold: false
    }
  }
};
</script>

<style lang="scss" scoped>
.fold-label__wrapperv3 {
  color: var(--text_primary);
  position: relative;
  & + & {
    margin-top: 20px;
  }

  &.inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .fold-label {
      cursor: initial;
    }
  }
}

.fold-label {
  display: flex;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  align-items: center;
  padding-top: 10px;
}
.fold-label__box {
  width: 32px;
  height: 32px;
  background: var(--classic-no-icon);
  margin-right: 10px;
}

.fold-label__labelv3 {
  // color: var(--color-content);
}

// .fold-label__fold{
//   @media (max-width:440px) {
//     max-height: 40vh;
//     overflow: auto;
//   }
// }

.fold-label__contentv3 {
  margin-left: auto;
  font-size: 14px;
  
  color: var(--classic-setting-content-value);
}

.fold-label__icon1 {
  margin-left: 10px;
  font-size: 10px;
  color: var(--classic-arrow);
  transform: scale(0.8);
  opacity: 0.5;
  &.isUnfold {
    transform: scale(0.8) rotate(180deg);
  }
}

</style>
