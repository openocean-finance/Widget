<template>
  <div class="chain">
    <h2 class="g-dialog-title">
      <span>{{ $t("dialog_connect_chain") }}</span>
      <div class="g-circle-button" @click="close">
        <i class="iconfont iconClose icon_close"></i>
      </div>
    </h2>
    <div class="chain-list">
      <div
        class="item g-clickable"
        v-for="(item, i) in chainList"
        :key="i"
        @click="change(item)"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChainView",
  props: {
    chainList: {
      type: [],
      default: [],
    },
  },
  data() {
    return {
    };
  },
  methods: {
    change(item) {
      this.$emit("change", item);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.chain {
  color: #fff;

  .chain-list {
    height: 425px;
    padding: 0 20px 20px;
    box-sizing: border-box;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
    overflow: auto;

    .item {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border: 1px solid transparent;

      padding: 0 10px;
      transition: all 0.3s ease;
      border-radius: 10px;

      &:hover {
        border-color: #fff;
      }

      img {
        width: 32px;
        margin: 0 10px 0 5px;
      }
    }
  }
}
</style>