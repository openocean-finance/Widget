<template>
  <div class="select-token">
    <h2 class="g-dialog-title">
      <span>{{ $t("select_token_title") }}</span>
      <div class="g-circle-button" @click="$emit('close')">
        <i class="iconfont iconClose"></i>
      </div>
    </h2>
    <SearchInput
      class="select-token__input"
      v-model="query"
      :placeholder="$t('exchange_search')"
    />
    <div class="all-token" style="border: none;">
      <div
        class="item"
        v-for="(item, i) in filterToken"
        :key="i"
        @click="selectToken(item)"
      >
        <img v-if="item.icon" class="item__icon" :src="item.icon" alt="" />
        <img
          v-else
          class="item__icon"
          :src="`https://ethapi.openocean.finance/logos/bsc/0x9029fdfae9a03135846381c7ce16595c3554e10a1.png`"
          alt=""
        />
        <div class="item__text">
          <div class="item__symbol">{{ item.symbol }}</div>
          <div class="item__name">{{ item.name }}</div>
        </div>
        <div class="item__value">
          {{ item.balance }}
        </div>
      </div>
      <div class="not-find" v-if="filterToken.length === 0">
        <img class="g-light-only" src="@/assets/v3/no-order.png" />
        <img class="g-dark-only" src="@/assets/v3/no-order-dark.png" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";

export default {
  name: "SelectToken",
  components: { SearchInput },
  props: {
    chain: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      query: "",
      selectTokenList: [],
    };
  },
  computed: {
    filterToken() {
      if (!this.query) {
        return this.selectTokenList;
      }
      const _query = this.query.toLowerCase();
      return this.selectTokenList.filter((item) => {
        return (
          item.symbol.toLowerCase().indexOf(_query) >= 0 ||
          item.address.toLowerCase() === _query
        );
      });
    },
  },
  mounted() {
    this.loadTokenList();
  },
  methods: {
    async loadTokenList() {
      const { data = [] } = await this.$axios.get(`v2/${this.chain}/token`, {
        cache: true,
        expire: 300000,
      });
      this.selectTokenList = data.map((item) => {
        item.id = item.code || "";
        item.icon = item.icon;
        return item;
      });
      this.query = " ";
      this.$nextTick(() => {
        this.query = "";
      });
    },
    selectToken(item) {
      this.$emit("select", item);
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/pages/ClassicV3/components/select-token/index.scss";
</style>