<template>
  <div class="c-item">
    <FromTo
      :from-amount="fromAmount"
      :from-token="fromToken"
      :to-amount="toAmount"
      :to-token="toToken"
      v-if="fromToken && toToken"
    />
    <FieldItem label="Height" :content="block"/>
    <FieldItem label="Hash">
    <a :href="`${blockExplorerUrl}${hash}`" target="_blank">{{ this.formatExplore(hash) }}</a>
    </FieldItem>
  </div>
</template>

<script>

import FieldItem from './FieldItem';
import FromTo from './FromTo';
import getChains from "@/utils/getChains";
import { formatUrl } from "@/utils/format";

export default {
  name: 'H5History',
  components: { FieldItem, FromTo },
  props: ['hash', 'fromToken', 'fromAmount', 'toToken', 'toAmount', 'block'],
  computed: {
    blockExplorerUrl() {
      const chain = getChains().filter((item) => {
        return item.walletValue === this.chainName;
      });
      return (
        (chain && chain[0] && chain[0].blockExplorerUrl) ||
        "https://etherscan.io/tx/"
      );
    },
  },
  methods:{
    formatExplore(val){
      return formatUrl(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-item {
  padding: var(--space-common);
  border-radius: var(--radius-common);
  background: var(--background_base);

  & + & {
    margin-top: var(--space-common-sm);
  }
}

</style>