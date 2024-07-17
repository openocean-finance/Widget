<template>
  <div class="from-to">
    <div class="g-font-mid">{{ `${toFixed(fromAmount)} ${fromToken}` }}</div>
    <div class="arrow-box">
      <i class="iconfont iconArrow arrow"></i>
    </div>
    <div class="l-to g-font-mid">{{ `${toFixed(toAmount)} ${toToken}` }}</div>
  </div>
</template>

<script>

import { toFixed } from '@/utils/format';

export default {
  name: 'FromTo',
  props: ['fromToken', 'fromAmount', 'toToken', 'toAmount'],
  data() {
    return {
      toFixed,
    };
  },
};
</script>

<style lang="scss" scoped>
.from-to {
  margin-bottom: var(--space-common);
  position: relative;
  height: .5rem;
  display: flex;
  font-size: .26rem;
  line-height: .5rem;
}

.arrow-box {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: .5rem;
  height: .5rem;
  background: var(--background_base);
  color: var(--text_primary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.arrow {
  font-size: .24rem;
  transform: scale(.4) translateY(-2px);
}

.l-to {
  margin-left: auto;
}

</style>