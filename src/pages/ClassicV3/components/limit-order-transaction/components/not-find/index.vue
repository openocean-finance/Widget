<template>
  <div class="not-find">
    <i class="iconfont iconno-order"></i>
    <div>{{ $t("limit_order_tip1") }}</div>
  </div>
</template>

<style lang="scss" scoped>
.not-find {
  height: 313px;
  margin: 0 24px;
  border-radius: 12px;
  border: 1px solid var(--classic-border);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  i {
    display: block;
    font-size: 68px;
    color: var(--classic-chart-loading-letter);
  }

  div {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-top: 11px;
    color: var(--classic-chart-loading-letter);
  }
}
</style>