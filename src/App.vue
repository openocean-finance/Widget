<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import { getters } from "./contract";
import { initTryConnect } from "./init";
import { MetaInfo } from "@/utils/config";
import { contract as state } from "@/contract";
import { isCustomGas } from "@/utils/getChains";

export default {
  metaInfo () {
    return {
      title:
        localStorage.getItem("title") ||
        "OpenOcean｜Decentralized Full Aggregation Protocol｜All For Your Trading",
      meta: MetaInfo.OPENOCEAN,
      link: [
        {
          rel: "icon",
          href: localStorage.getItem("logoUrl") || "/favicon-256x256.png",
        },
      ],
    };
  },
  computed: {
    ...getters,
  },
  data () {
    return {
      isRouterAlive: true,
      themeList: [
        {
          key: "--background_base",
          value: "#000",
        },
        {
          key: "--background_container", 
          value: "#222",
        },
        {
          key: "--background_interactive", 
          value: "#000",
        },
        {
          key: "--background_uninteractive", 
          value: "#444",
        },
        {
          key: "--text_primary", 
          value: "#fff",
        },
        {
          key: "--text_secondary", 
          value: "#999",
        },
        {
          key: "--button_background_interactive",
          value: "#fb534f",
        },
        {
          key: "--button_text_interactive",
          value: "#fff",
        },
        {
          key: "--button_background_uninteractive",
          value: "#fb534f",
        },
        {
          key: "--button_text_uninteractive",
          value: "#FF6B18",
        },
        {
          key: "--success",
          value: "#ebb425",
        },
        {
          key: "--fail",
          value: "#ebb425",
        },
      ],
    };
  },
  async mounted () {
    document.body.classList.add("lang-" + this.$i18n.locale.toLowerCase());
    window.reloadPage = (flag) => {
      if (flag) {
        window.location.reload();
      } else {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
          // initTryConnect();
        });
      }
    };
    window.addEventListener("message", (res) => {
      const { data } = res;
      if (data && data.type === "theme" && data.href) {
        this.setTheme(data.href.split('?p=')[1]);
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    });
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {

        let query = val.query
        if (!oldVal || query.p || (oldVal.path == '/' && !oldVal.name)) {
          let query1 = this.setTheme(query.p);
          query = { ...query1, ...query }
        }
        if (!val.meta.isConnect) return
        let queryOld = oldVal ? oldVal.query : {}
        if (!query.chain || !query.wallet) {
          this.changeRoute({
            chain: query.chain || 'bsc',
            wallet: query.wallet || 'MetaMask',
            ...query
          })
          return
        }
        if (query.chain == queryOld.chain && query.wallet == queryOld.wallet) {
          console.log('No initTryConnect--------', query)
          return
        }

        state.chainName = query.chain;
        state.walletName = query.wallet;
        localStorage.setItem("chainName", query.chain);
        localStorage.setItem("walletName", query.wallet);
        console.log('app--------', query)
        console.log('app--------old', oldVal)
        console.log('---------------InitTryConnect--------', query)
        initTryConnect(query.chain, query.wallet);
        if (isCustomGas(this.chainName)) {
          this.getGasPrice();
        }
        this.getExchange();

      },
      deep: true,
      // immediate: true,
    },
  },
  methods: {
    setTheme (p) {
      let query = {}
      let data = p
      if (data) {
        localStorage.setItem("themeStr", data);
      } else {
        data = localStorage.getItem("themeStr");
      }
      if (!data) return query
      data = decodeURIComponent(window.atob(data));

      let themeList = "";
      if (data.indexOf("$*$") != -1) themeList = data.split("$*$");
      if (!themeList) return query

      for (let i = 0; i < themeList.length; i++) {
        if (i < this.themeList.length) {
          this.themeList[i].value = themeList[i] || "";
        }
      }
      localStorage.setItem("title", themeList[12]);
      localStorage.setItem("logoUrl", themeList[14]);
      localStorage.setItem("referralName", themeList[15]);
      localStorage.setItem("referralAddress", themeList[16]);
      localStorage.setItem("referralFee", themeList[17]);
      localStorage.setItem("connectors", themeList[21]);

      const chain = themeList[18] || "";
      const fromSymbol = themeList[19] || "";
      const toSymbol = themeList[20] || "";

      localStorage.setItem("advertisings", themeList[21] || "");

      document.body.style.setProperty("font-family", themeList[13]);
      for (let i = 0; i < this.themeList.length; i++) {
        document.body.style.setProperty(
          this.themeList[i].key,
          this.themeList[i].value
        );
      }

      if (chain && fromSymbol, toSymbol) {
        query = {
          chain,
          fromSymbol,
          toSymbol,
          p: ''
        }
      }
      return query
    },
    changeToken (query) {
      query = {
        chain: 'bsc',
        wallet: 'MetaMask',
        ...query
      }
      this.changeRoute({
        ...query,
        p: ''
      })
    }
  },
};
</script>

<style>
body {
  font-size: 10pt;
  background: var(--background_base);
  color: var(--text_primary);
  font-family: Roboto;
  font-weight: 400;
}

@media (min-width: 750px) {
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
    -webkit-border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:vertical {
    height: 4px;
    background-color: var(--background_scroll);
    -webkit-border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    width: 4px;
    background-color: var(--background_scroll);
    -webkit-border-radius: 0;
  }
}
</style>
