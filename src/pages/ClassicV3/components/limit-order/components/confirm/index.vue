<template>
  <NouDialog
    close-on-click-modal
    :visible.sync="isShow"
    @click.native="closeHandler"
    @leave="closeModal"
  >
    <div class="confirm">
      <div class="confirm__title">
        <span>{{ $t("dialog_confirm") }}</span>
      </div>
      <div class="confirm__content">
        <ul class="token">
          <li>
            <div class="title">
              <span>{{ $t("dialog_pay") }}</span>
            </div>
            <div class="value">
              <img :src="tokenLimitPrev.icon" class="icon" />
              <span>{{ tokenLimitPrev.symbol }}</span>
            </div>
          </li>
          <li>
            <div class="title">
              <span>~$ {{ tokenLimitPrevUsdValue }}</span>
            </div>
            <div class="value">
              <span>{{ tokenLimitPrev.value }}</span>
            </div>
          </li>
        </ul>
        <ul class="token">
          <li>
            <div class="title">
              <span>{{ $t("dialog_receive") }}</span>
            </div>
            <div class="value">
              <img :src="tokenLimitNext.icon" class="icon" />
              <span>{{ tokenLimitNext.symbol }}</span>
              <!-- <a href="#">{{ tokenLimitNext.symbol }}</a>
              <img src="@/assets/v3/icon-link.svg" class="link" /> -->
            </div>
          </li>
          <li>
            <div class="title">
              <span>~$ {{ tokenLimitNextUsdValue }}</span>
            </div>
            <div class="value">
              <span>{{ tokenLimitNext.value }}</span>
            </div>
          </li>
        </ul>
        <div class="info">
          <dl>
            <dt>
              <span>{{ $t("dialog_rate") }}</span>
            </dt>
            <dd>
              <span>{{ trade.rate }} / {{ tokenLimitPrev.symbol }}</span>
            </dd>
          </dl>
          <dl>
            <dt>
              <span>{{ $t("dialog_inverse_rate") }}</span>
            </dt>
            <dd>
              <span>{{ trade.inverseRate }} / {{ tokenLimitNext.symbol }}</span>
            </dd>
          </dl>
        </div>
        <div class="g-clickable button primary" @click="confirm">
          <span>{{ $t("dialog_confirm_order") }}</span>
        </div>
        <div class="g-clickable button cancel" @click="close">
          <span>{{ $t("dialog_cancel") }}</span>
        </div>
      </div>
    </div>
  </NouDialog>
</template>

<script>
import NouDialog from "@/components/common/NouDialog";

export default {
  name: "Confirm",
  components: { NouDialog },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    trade: {
      type: Object,
      default() {
        return {
          rate: "",
          inverseRate: "",
        };
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeHandler() {
      this.$emit("close");
    },
    closeModal() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>