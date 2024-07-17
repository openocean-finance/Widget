<template>
  <div class="expired">
    <div>
      <span>{{ $t("limit_order_expired_in") }}</span>
      <ToolTip :text="$t('help_limit_expired_in')" />
    </div>
    <DropDown code="expired" :options="options" @change="change" />
  </div>
</template>

<script>
import DropDown from "../dropdown";
import ToolTip from "@/components/ToolTip";

export default {
  components: {
    DropDown,
    ToolTip,
  },
  data() {
    return {
      options: [
        {
          value: "10M",
          label: "10 Mins",
        },
        {
          value: "1H",
          label: "1 Hour",
        },
        {
          value: "1D",
          label: "1 Day",
        },
        {
          value: "3D",
          label: "3 Days",
        },
        {
          value: "7D",
          label: "7 Days",
        },
        {
          value: "30D",
          label: "30 Days",
        },
        {
          value: "3Month",
          label: "3 Months",
        },
        {
          value: "6Month",
          label: "6 Months",
        },
        {
          value: "1Y",
          label: "1 Year",
        }
      ],
    };
  },
  methods: {
    change(code, value) {
      this.$emit('change', code, value);
    }
  }
};
</script>

<style lang="scss" scoped>
.expired {
  width: 160px;
  height: 64px;
  // background: var(--classic-routing-bg);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px 8px 8px 16px;
  margin-right: 16px;
  background: var(--background-input-highlight);
  border: 1px solid var(--background-classic-form-border);

  @media (max-width: 440px) {
      width: 40%;
  }

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: var(--classic-text-common);

      @media (max-width: 440px) {
        font-size: 10px;
      }
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>