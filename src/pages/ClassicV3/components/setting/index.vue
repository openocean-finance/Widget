<template>
  <div class="advance_settings">
    <h2 class="g-dialog-title">
      <div class="g-clickable back-button" @click="back">
        <i class="iconfont iconClose"></i>
      </div>
      <span>{{ $t("exchange_advanced_settings") }}</span>
      <div class="g-clickable reset-button" @click="reset">
        <span>Reset</span>
      </div>
    </h2>
    <div class="advance_settings__content">
      <!-- <FoldLabel
        label="Light Mode"
        inline
        no
      >
        <CommonSwitch min :value="lightMode" @input="changeLightMode" />
      </FoldLabel> -->
      <FoldLabel v-if="chainName === 'eth'" :label="$t('exchange_gas_price')" :content="formatGasPrice">
        <SlippageSelect v-model="gasPriceV3" :gas="true" :options="gasPriceOptionList" />
      </FoldLabel>
      <FoldLabel :label="$t('exchange_slippage_tolerance')" :content="`${toleranceV3}%`" no>
        <SlippageSelect v-model="toleranceV3" :options="toleranceOptions" inline />
      </FoldLabel>
    </div>
  </div>
</template>

<script>
import { isCustomToken } from "@/utils/getChains";
import * as BN from "bignumber.js";
import FoldLabel from "@/pages/ClassicV3/components/setting/FoldLabel";
import CustomToken from "@/pages/ClassicV3/components/setting/CustomToken";
import SlippageSelect from "@/pages/ClassicV3/components/setting/SlippageSelect";
import CommonSwitch from "@/pages/ClassicV3/components/setting/CommonSwitch";
import { contract as state } from "@/contract";
import { changeTheme, getTheme, THEMES } from "@/utils/theme";
import { getWalletType } from "@/utils/config";

export default {
  name: "Setting",
  components: {
    FoldLabel,
    SlippageSelect,
    CommonSwitch,
    CustomToken,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const chainCode = getWalletType();
    return {
      inputHandler: null,
      customSlippage: null,
      liquiditySources: null,
      partialFillV3: null,
      toleranceV3: null,
      reward: 0,
      timer: null,
      qrshow: false,
      showComparedTo: false,
      chainCode,
      qrdata: {
        id: "",
        url: "",
      },
      gasPriceV3: null,
      dexesList: [],
      // internalVisible: false,
      liquiditySources: null,
      oldObj: null,
      defaultObj: {
        gasPriceV3: state.gasPriceOptions[0]?.ethgas.base,
        toleranceV3: "1",
        partialFillV3: false,
      },
      lightMode: getTheme() === THEMES.light
    };
  },
  watch: {
    gasPriceOptionList (e) {
      if (e.length && this.gasPriceV3) {
        this.gasPriceV3 = e[0].value + "";
      }
    },
    gasPriceV3 (e) {
      if (this.chainName === "eth") {
        state.gasPrice = e;
        window.localStorage.setItem(`${this.chainName}_setting_gasPrice`, e);
      }
    },
    toleranceV3 (e) {
      state.tolerance = e;
      window.localStorage.setItem(`${this.chainName}_setting_tolerance`, e);
    },
    partialFillV3 (e) {
      state.partialFill = e;
      window.localStorage.setItem("setting_partialFill", e);
    }
  },
  computed: {
    isCustomToken () {
      const result = isCustomToken(this.chainName);
      return result;
    },
    gasPriceOptionList () {
      // console.log('gas:', state.gasPriceOptions);
      return state.gasPriceOptions;
    },
    formatGasPrice () {
      let gasPrice = "--";
      switch (this.chainName) {
        case "ont":
          gasPrice = "0.15 ONG";
          break;
        case "eth":
          const gasLabel = this.$t(
            "gas_" +
            (window.localStorage.getItem("gasoption") || "").toLowerCase()
          );
          gasPrice =
            gasLabel +
            "(" +
            ((this.gasPriceV3 &&
              BN(this.gasPriceV3).div(BN(10).pow(9)).toFixed(2)) ||
              "-") +
            " GWEI)";
          break;
        case "bsc":
        case "polygon":
        case "xdai":
        case "heco":
        case "avax":
        case "okex":
        case "fantom":
          gasPrice =
            ((this.gasPriceV3 &&
              BN(this.gasPriceV3).div(BN(10).pow(9)).toFixed(2)) ||
              "-") + " GWEI";
          break;
      }
      return gasPrice;
    },
    dexesLength () {
      return this.dexesList.filter((a) => {
        return +a.checked === 1;
      }).length;
    },
  },
  mounted () {
    this.getData();
  },
  methods: {
    changeLightMode () {
      this.lightMode = !this.lightMode;
      localStorage.removeItem('themeStr')
      document.body.style = ''
      changeTheme();
    },
    getSetting () {
      return new Promise((r, j) => {
        if (!this.liquiditySources) {
          setTimeout(async () => {
            r(await this.getSetting());
          }, 200);
        } else {
          r({
            gasPrice: this.gasPriceV3,
            tolerance: this.toleranceV3,
            partialFill: this.partialFillV3,
            liquiditySources: this.liquiditySources,
          });
        }
      });
    },
    reset () {
      this.getData();
      if (this.chainName === "eth") {
        this.gasPriceV3 = this.defaultObj.gasPriceV3;
      }
      this.toleranceV3 = this.defaultObj.toleranceV3;
      this.partialFillV3 = this.defaultObj.partialFillV3;
      window.localStorage.removeItem(this.chainName + "_dexes");
      this.dexesChange(this.dexesList, 1);
    },
    back () {
      this.$emit("back");
    },
    switchDex (item) {
      item.checked = !!!item.checked;
      this.liquiditySources[item.code] = item.checked ? 1 : 0;
      window.localStorage.setItem(
        this.chainName + "_dexes",
        JSON.stringify(this.liquiditySources)
      );
    },
    switchPartialFill (e) {
      this.partialFillV3 = e;
    },
    async getData () {
      if (!this.dexesList.length) {
        this.getDexesList();
      }
      this.gasPriceV3 =
        window.localStorage.getItem(`${this.chainName}_setting_gasPrice`) ||
        this.defaultObj.gasPriceV3;
      this.toleranceV3 =
        window.localStorage.getItem(`${this.chainName}_setting_tolerance`) ||
        this.defaultObj.toleranceV3;
      this.partialFillV3 = window.localStorage.getItem("setting_partialFill")
        ? window.localStorage.getItem("setting_partialFill") == "true"
          ? true
          : false
        : this.defaultObj.partialFillV3;
      this.oldObj = JSON.parse(JSON.stringify(await this.getSetting()));
    },
    dexesChange (list, flag) {
      const map = {};
      const temp = window.localStorage.getItem(this.chainName + "_dexes");
      const dexes = (temp && JSON.parse(temp)) || {};
      // let unexchangeList = {}
      list.forEach((item) => {
        item.checked = !(dexes[item.code] == 0);
        map[item.code] = dexes[item.code] == 0 ? +dexes[item.code] : 1;
        // if(!item.checked)unexchangeList[item.code]
      });
      state.unexchangeList = this.liquiditySources = map;

      if (!flag) {
        this.changeToken();
      }
    },
    getDexesList () {
      if (this.chainName === "ont") {
        this.dexesList = [
          {
            code: "innoswap",
            index: 2,
            checked: true,
            name: "InnoSwap",
          },
        ];
        this.dexesChange(this.dexesList, 1);
        return;
      }
      this.$axios
        .get(this.walletPath + "dex", { cache: true })
        .then((res) => {
          this.dexesList = res.map((item) => {
            return Object.assign(item, {
              checked: true,
            });
          });
          this.dexesChange(this.dexesList, 1);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addtoken (item) {
      this.tokenList.unshift(item);
      // this.tokenMap[item.address.toLowerCase()] = item
    },

  },
};
</script>

<style lang="scss" scoped>
.setting_back {
  box-sizing: border-box;
  position: absolute;
  left: 25px;
  top: 30px;
  width: 30px;
  height: 30px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  background: var(--background_mask);

  img {
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
  }

  &:hover {
    background: var(--background_classic);
  }
}

.setting_reset {
  position: absolute;
  right: 30px;
  font-weight: bold;
  top: 33px;
  color: var(--color-content);
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: var(--text_primary);
  }
}

.custom-tokens_box {
  padding-top: 20px;

  .custom-tokens_warning {
    color: var(--red);
  }
}

.advance-settings__dex__label {
  margin-left: 10px;
}

.advance-settings__dex {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0 0 0;
}

.slippage-selectv3__custom {
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  background: var(--background_interactive);
  border-radius: 6px;
  outline: none;
  color: inherit;
  // text-align: right;
  font-size: inherit;
  font-family: inherit;
  -webkit-appearance: none;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &::placeholder {
    color: var(--color-des);
  }

  &:hover,
  &:focus {
    border-color: var(--background_classic-input-hover);
  }
}

.g-back-button {
  &:hover {
    i {
      color: var(--text_primary);
    }
  }

  i {
    transform: scale(0.45) rotate(90deg);
    color: var(--button_back);
  }
}

.advance_settings {
  padding-top: 0;

  &__content {
    height: 515px;
    padding: 0 20px;
    overflow: auto;
  }
}

.reset-button {
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 30px;
  width: 60px;
  height: 30px;
  border-radius: 6px;
  background-color: var(--button_back_bg);
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .3s ease;

  &:active {
    opacity: 0.8;
    transform: scale(0.9);
  }

  &:hover {
    span {
      color: var(--text_primary);
    }
  }

  span {
    font-size: 14px;

    color: var(--button_back);
  }
}

.back-button {
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: var(--button_back_bg);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: var(--button_back);
  }

  i {
    font-size: 24px;
  }

  &:active {
    opacity: 0.8;
    transform: scale(0.9);
  }

  &:hover {
    i {
      color: var(--text_primary);
    }
  }

  i {
    transform: scale(0.45) rotate(90deg);
    color: var(--button_back);
  }
}
</style>
