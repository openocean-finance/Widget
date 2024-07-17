<template>
  <div class="info">
    <div class="label">
      {{ label }}
      <ToolTip v-if="help" :text="explaination? explaination: $t('help_swap_you_save')" :left="false" />
    </div>
    <!-- <ToolTip v-if="help" :text="$t('help_swap_you_save')" :left="true" /> -->
    <span v-if="usd" class="usd">{{ usd }}</span>
    <span class="value" :class="color">{{ value }}</span>
  </div>
</template>

<script>
import ToolTip from "@/components/ToolTip";

export default {
  components: {
    ToolTip,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    usd: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    help: {
      type: String,
      default: "",
    },
    explaination:{
      type: String,
      default:"",
    }
  },
};
</script>

<style lang="scss" scoped>
.info {
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  .label {
    flex: 1;
    display: flex;
    flex-direction: row;
    
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: var(--text_secondary);

    @media (max-width: 440px) {
      font-size: 12px;
    }
  }

  .usd {
    
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: var(--text_secondary);
    margin-right: 8px;

    @media (max-width: 440px) {
      font-size: 12px;
    }
  }

  .value {
    
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: var(--classic-text-grey);

    @media (max-width: 440px) {
      font-size: 12px;
    }

    &.red {
      color: var(--fail);
    }

    &.green {
      color: var(--success);
    }
  }

  .help {
    display: flex;
    align-items: center;
    margin-left: 3px;
    cursor: pointer;
  }

  img {
    height: 14px;
  }
}
</style>