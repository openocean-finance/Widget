<template>
  <div>
    <div class="token" :class="{ from: from }" @click="showSelectToken">
      <img :src="token.icon" class="icon" v-if="token.icon" />
      <i class="empty-icon" v-else></i>
      <span class="name">{{ token.symbol }}</span>
      <div class="arrow">
        <i class="iconfont iconreturn"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { contract as state } from "@/contract";
export default {
  props: {
    token: {
      type: Object,
      default() {
        return {};
      },
    },
    from: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showSelectToken() {
      state.isShowSelectToken = true;
      window.changeToken = (target) => {
        this.changeToken(target);
      };
    },
    changeToken(target) {
      this.$emit("change", target);
    },
  },
};
</script>

<style lang="scss" scoped>
.token {
  cursor: pointer;
  display: flex;
  align-items: center;

  .icon {
    width: 24px;
    border-radius: 50%;
  }

  .empty-icon {
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: var(--text_primary);
  }

  .name {
    
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: var(--text_primary);
    margin: 0 4px 0 8px;
    transition: all .3s ease;
    &:hover {
      color: var(--classic-token-hover);
    }
  }

  .arrow {
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      display: block;
      line-height: 1;
      font-size: 24px;
      color: var(--classic-field-arrow);
      transform: rotate(-90deg);
      transition: all .3s ease;
      &:hover {
        color: var(--classic-token-hover);
      }
    }
  }
}
</style>