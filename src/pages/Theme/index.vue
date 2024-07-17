<template>
  <div class="theme_box">
    <div class="theme">
      <div class="theme__setting">
        <div class="module configure">
          <h3>Configure</h3>
          <div class="list">
            <div class="item">
              <span class="lable">Widget Title</span>
              <input class="input long" placeholder="Widget Title" v-model="title" type="text" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Widget Logo Url</span>
              <input class="input long" placeholder="Widget Logo Url" v-model="logoUrl" type="text" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Default Chain</span>
              <div class="select" @click="isShowChain = true">
                <div class="icon-name">
                  <img class="icon-logo" :src="chainIcon" alt="" />
                  <span>{{ chainNameLable }}</span>
                </div>
                <div class="icon-button">
                  <i class="iconfont iconDropdown"></i>
                </div>
              </div>
            </div>
            <div class="item">
              <span class="lable">Theme Example</span>
              <div class="theme-button-group">
                <div class="button g-clickable" v-for="(item, i) in themeList" :key="i" :class="{ on: item.name === theme }" @click="changeTheme(item)">
                  <span>{{ item.name }}</span>
                </div>
              </div>
              <!-- <input class="input long" placeholder="Widget Logo Url" v-model="logoUrl" type="text" @change="preview" /> -->
            </div>
            <div class="item">
              <span class="lable">Default In Token</span>
              <div class="select" @click="showToken('in')">
                <div class="icon-name">
                  <img class="icon-logo" :src="inTokenIcon" alt="" />
                  <span>{{ inToken }}</span>
                </div>
                <div class="icon-button">
                  <i class="iconfont iconDropdown"></i>
                </div>
              </div>
            </div>
            <div class="item">
              <span class="lable">Font family</span>
              <SelectBase v-model="fontFamily" :options="fontList" @change="preview"></SelectBase>
            </div>
            <div class="item">
              <span class="lable">Default Out Token</span>
              <div class="select" @click="showToken('out')">
                <div class="icon-name">
                  <img class="icon-logo" :src="outTokenIcon" alt="" />
                  <span>{{ outToken }}</span>
                </div>
                <div class="icon-button">
                  <i class="iconfont iconDropdown"></i>
                </div>
              </div>
            </div>
            <div class="item">
              <span class="lable">Background Base</span>
              <SelectColor v-model="background_base" colorKey="background_base" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Background Container</span>
              <SelectColor v-model="background_container" colorKey="background_container" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Background Interactive</span>
              <SelectColor v-model="background_interactive" colorKey="background_interactive" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Background Uninteractive</span>
              <SelectColor v-model="background_uninteractive" colorKey="background_uninteractive" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Text Primary</span>
              <SelectColor v-model="text_primary" colorKey="text_primary" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Text Secondary</span>
              <SelectColor v-model="text_secondary" colorKey="text_secondary" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Button Background Interactive</span>
              <SelectColor v-model="button_background_interactive" colorKey="button_background_interactive" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Button Text Interactive</span>
              <SelectColor v-model="button_text_interactive" colorKey="button_text_interactive" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Button Background Uninteractive</span>
              <SelectColor v-model="button_background_uninteractive" colorKey="button_background_uninteractive" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Button Text Uninteractive</span>
              <SelectColor v-model="button_text_uninteractive" colorKey="button_text_uninteractive" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Success</span>
              <SelectColor v-model="success" colorKey="success" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item">
              <span class="lable">Fail</span>
              <SelectColor v-model="fail" colorKey="fail" :showColorKey="showColorKey" @showColor="showColor" @change="preview" />
            </div>
            <div class="item select1_box">
              <span class="lable">Connectors</span>
              <div class="select select1">
                <div class="tokens">
                  <div class="item1" v-for="(item, i) in moreList" :key="i">
                    <img class="icon-logo" :src="item.icon" alt="" />
                    <span>{{ item.symbol }}</span>
                    <i @click="closeMore(i)" class="iconfont iconClose nou-dialog__close nou-g-btn--hover" />
                  </div>
                </div>
                <div class="icon-button" @click="showTokenMore('connectors')">
                  <i class="iconfont iconDropdown"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="module">
            <h3>Referral (Revenue Generation)</h3>
            <div class="list">
              <div class="item">
                <div class="lable">
                  Referral Name
                  <ToolTip :text="`Set your protocol's name here to enable the commission function`" />
                </div>
                <input placeholder="Referral Name" v-model="referralName" class="input long" type="text" @change="preview" />
              </div>
              <div class="item">
                <div class="lable">
                  Referral Address
                  <ToolTip :text="`The wallet address you can receive the commission`" />
                </div>
                <input placeholder="The wallet address" v-model="referralAddress" class="input long" type="text" @change="preview" />
              </div>
              <div class="item">
                <div class="lable">
                  Referral Fee
                  <ToolTip :text="`Percentage of in-token you will get from the transaction, range from 0 to 3%, 1 means 1%. OpenOcean share 15% of the fee by default. Please contact us for rate changing.`" />
                </div>
                <input placeholder="Ranges from 0 to 3%" v-model="referralFee" class="input long" type="number" @change="referralFeeChange" />
                <span class="tag">%</span>
              </div>
            </div>
          </div>
          <div class="module url">
            <div class="title">
              <h3>URL</h3>
              <div>
                <span class="copy g-clickable" @click="copy">Copy</span>
                <span class="reset g-clickable" @click="reset">Reset</span>
              </div>
            </div>
            <div class="list">
              <div class="textarea">{{ showUrl }}</div>
            </div>

            <div class="title">
              <h3>Reset By Url</h3>
            </div>
            <div class="list list1">
              <textarea @change="changeReset" rows="5" cols="5" v-model="showUrlReset"/>
            </div>
          </div>
        </div>
      </div>
      <div class="theme__priview">
        <h3>Preview</h3>
        <div class="iframe" v-if="loadUrl">
          <iframe ref="widget" :src="loadUrl" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe>
        </div>
      </div>
    </div>
    <NouDialog close-on-click-modal :visible.sync="isShowChain" :dialog-class="advanceContentClasses">
      <SelectChain :chainList="chainList" ref="selectChain" @close="isShowChain = false" @change="selectChain"></SelectChain>
    </NouDialog>
    <NouDialog close-on-click-modal :visible.sync="isShowToken" :dialog-class="advanceContentClasses">
      <SelectToken :chain="chain" v-if="isShowToken" @close="isShowToken = false" @select="selectToken" />
    </NouDialog>
    <NouDialog close-on-click-modal :visible.sync="isShowTokenMore" :dialog-class="advanceContentClasses">
      <SelectToken :chain="chain" v-if="isShowTokenMore" @close="isShowTokenMore = false" @select="selectTokenMore" />
    </NouDialog>
  </div>
</template>
<script>
import NouDialog from "@/components/common/NouDialog";
import SelectColor from "./SelectColor.vue";
import SelectChain from "./SelectChain.vue";
import SelectToken from "./SelectToken.vue";
import SelectTokenMore from "./SelectTokenMore.vue";
import SelectBase from "./SelectBase";
import RadioBox from "./RadioBox";
import ToolTip from "@/components/ToolTip";
import getChains from "@/utils/getChains";
import copy from "copy-to-clipboard";
import showToast from "@/components/toast";
import { debounce } from "@/utils/helpers";
import { getDefaultToken } from "@/utils/getChains";

export default {
  components: {
    NouDialog,
    RadioBox,
    SelectBase,
    ToolTip,
    SelectColor,
    SelectChain,
    SelectToken,
    SelectTokenMore
  },
  data () {
    const list = getChains();
    return {
      showUrlReset: '',
      chainList: list.filter((item) => item.disabled !== true),
      loadUrl: "",
      showUrl: "",
      theme: "",
      themeList: [
        {
          name: "Default",
          data: "JTIzMTcxMjJCJTI0KiUyNCUyMzIyMjAzNyUyNColMjQlMjMxNzEyMmIlMjQqJTI0JTIzMjkyNzNEJTI0KiUyNCUyM2ZmZiUyNColMjQlMjM4QzdGOEMlMjQqJTI0JTIzZmI1MzRmJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNmNzUwMjklMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0ZXRoJTI0KiUyNEVUSCUyNColMjRVU0RU",
        },
        {
          name: "Light",
          data: "JTIzZWFlOGVmJTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjNlYWU4ZWYlMjQqJTI0JTIzZjdmNmZhJTI0KiUyNCUyMzAwMDAwMCUyNColMjQlMjNhNzllYTclMjQqJTI0JTIzRkZGMEVDJTI0KiUyNCUyM0ZGNkIxOCUyNColMjQlMjNjNmMzY2YlMjQqJTI0JTIzZmZmZmZmJTI0KiUyNCUyMzQ3RTA0OCUyNColMjQlMjNEQTMwNTAlMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0ZXRoJTI0KiUyNEVUSCUyNColMjRVU0RUJTI0KiUyNA==",
        },
        {
          name: "Daisy",
          data: "JTIzRkZGM0RFJTI0KiUyNCUyM0ZGRDk2NiUyNColMjQlMjNGRkZGRkYlMjQqJTI0JTIzRkZFQUE1JTI0KiUyNCUyMzAwMDAwMCUyNColMjQlMjM2NTM0MTElMjQqJTI0JTIzRkY2NjAwJTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjNGRkVCQzglMjQqJTI0JTIzRkY2NjAwJTI0KiUyNCUyMzAwQTUwNCUyNColMjQlMjNBNTFCMDAlMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0ZXRoJTI0KiUyNEVUSCUyNColMjRVU0RU",
        },
        {
          name: "Indigo",
          data: "JTIzMDAwNTFBJTI0KiUyNCUyMzBCMTIyRSUyNColMjQlMjMwMDA1MUElMjQqJTI0JTIzMUUyMTNCJTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjNBMUExQTIlMjQqJTI0JTIzMzIzRUYwJTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjM3NzdFREQlMjQqJTI0JTIzMzIzRUYwJTI0KiUyNCUyMzBBRDk5NyUyNColMjQlMjNGODJCNTAlMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0ZXRoJTI0KiUyNEVUSCUyNColMjRVU0RU",
        },
        {
          name: "Purple",
          data: "JTIzMEYwMDFBJTI0KiUyNCUyMzFFMTgyMiUyNColMjQlMjMwRjAwMUElMjQqJTI0JTIzMzAyOTNBJTI0KiUyNCUyM0ZGRkZGRiUyNColMjQlMjM4RDg0OUElMjQqJTI0JTIzOTc0MURCJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzI2M0UlMjQqJTI0JTIzQjU2NUY1JTI0KiUyNCUyMzQ3RTA0OCUyNColMjQlMjNEQTMwNTAlMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0ZXRoJTI0KiUyNEVUSCUyNColMjRVU0RU",
        },
      ],
      fontList: [
        {
          label: "Roboto",
          value: "Roboto",
        },
        {
          label: "Serif",
          value: "Serif",
        },
        {
          label: "Monospace",
          value: "Monospace",
        },
      ],
      background_base: "#17122B",
      background_container: "#222037",
      background_interactive: "#17122b",
      background_uninteractive: "#29273D",

      text_primary: "#fff",
      text_secondary: "#8C7F8C",

      button_background_interactive: "#fb534f",
      button_text_interactive: "#ffffff",
      button_background_uninteractive: "#333147",
      button_text_uninteractive: "#b1a7b1",

      success: "#479a4b",
      fail: "#f75029",

      title: "OpenOcean",
      logoUrl: "",
      fontFamily: "Roboto",

      chain: "eth",
      chainNameLable: "Ethereum",
      chainIcon: "",
      inToken: "ETH",
      inTokenIcon: "ETH",
      outToken: "USDT",
      outTokenIcon: "USDT",

      connectorsToken: "",
      connectorsTokenIcon: "",

      referralName: "",
      referralAddress: "",
      referralFee: "",

      showColorKey: "",
      isShowChain: false,
      advanceContentClasses: {
        select_chain: true,
      },
      isShowToken: false,
      showTokenType: "",

      isShowTokenMore: false,
      showTokenMoreType: "",

      moreList: [],
      chainData: []
    };
  },
  mounted () {
    if (localStorage.getItem("themeStr")) {
      let themeStr = localStorage.getItem("themeStr");
      this.setTheme(themeStr);
    }
    this.initChain();
    window.addEventListener("click", () => {
      this.showColorKey = "";
    });
    this.showUrl = this.getUrl();
    this.loadUrl = this.showUrl;
  },
  methods: {
    async initChain () {
      if (!this.chainData.length) {
        const { data = [] } = await this.$axios.get(`v2/${this.chain}/token`, {
          cache: true,
          expire: 300000,
        });
        this.chainData = data
      }
      let chainObj = this.chainList.find((item) => item.value == this.chain);
      let inTokenObj = this.chainData.find((item) => item.symbol == this.inToken);
      let outTokenObj = this.chainData.find((item) => item.symbol == this.outToken);
      this.selectChain(chainObj, true);
      this.inTokenIcon = inTokenObj.icon;
      this.outTokenIcon = outTokenObj.icon;



    },
    changeReset(){
      let data = this.showUrlReset.split('?p=')
      if(data.length==2){
        this.setTheme(data[1]);
      }
    },
    showColor (key) {
      this.showColorKey = key;
    },
    selectChain (item, isInit) {
      const { value, label, icon } = item;
      this.chain = value;
      this.chainNameLable = label;
      this.chainIcon = icon;
      this.isShowChain = false;
      if (!isInit) {
        const tokenList = getDefaultToken(this.chain);
        this.inToken = tokenList[0].symbol;
        this.inTokenIcon = tokenList[0].icon;
        this.outToken = tokenList[1].symbol;
        this.outTokenIcon = tokenList[1].icon;
      }
      this.preview();
    },
    showToken (type) {
      this.showTokenType = type;
      this.isShowToken = true;
    },
    selectToken (item) {
      const { symbol, icon } = item;
      if (this.showTokenType === "in") {
        this.inToken = symbol;
        this.inTokenIcon = icon;
      } else if (this.showTokenType == 'out') {
        this.outToken = symbol;
        this.outTokenIcon = icon;
      }
      this.isShowToken = false;
      this.preview();
    },

    showTokenMore (type) {
      if (this.moreList.length >= 3) {
        showToast(
          {
            text: "Customize middle token (<=3).",
            type: "danger",
          }
        );
        return
      }
      this.showTokenMoreType = type;
      this.isShowTokenMore = true;
    },
    selectTokenMore (item) {
      if (this.moreList.length >= 3) {
        this.isShowTokenMore = false;
        showToast("Customize middle token (<=3).");
        return
      }
      let k = false
      this.moreList.forEach(element => {
        if (element.address == item.address) k = true
      });
      if (!k) this.moreList.push(item)
      this.isShowTokenMore = false;
      this.preview();
    },
    closeMore (i) {
      let list = []
      this.moreList.forEach((item, ii) => {
        if (i != ii) list.push(item)
      })
      this.moreList = list
      this.preview();
    },

    preview: debounce(async function () {
      this.showUrl = this.getUrl();
      this.$refs.widget.contentWindow.postMessage(
        {
          type: "theme",
          href: this.showUrl,
        },
        "*"
      );
    }, 500),
    copy () {
      let url = this.getUrl();
      if (url) {
        copy(url);
        showToast(this.$t("toast_copy_success"));
      }
    },
    reset () {
      this.background_base = "#17122B";
      this.background_container = "#222037";
      this.background_interactive = "#17122b";
      this.background_uninteractive = "#29273D";
      this.text_primary = "#fff";
      this.text_secondary = "#8C7F8C";
      this.button_background_interactive = "#fb534f";
      this.button_text_interactive = "#ffffff";
      this.button_background_uninteractive = "#333147";
      this.button_text_uninteractive = "#b1a7b1";
      this.success = "#479a4b";
      this.fail = "#f75029";
      this.title = "OpenOcean";
      this.fontFamily = "Roboto";
      this.logoUrl = "";
      this.referralName = "";
      this.referralAddress = "";
      this.referralFee = "";
      this.chain = "eth";
      this.inToken = "ETH";
      this.outToken = "USDT";
      this.preview();
      localStorage.removeItem("themeStr");
      this.changeTheme(this.themeList[0]);
    },
    getUrl () {
      const v = Number(this.referrFee);
      // if (
      //   (this.referralName && this.referralAddress && this.referralFee) ||
      //   (!this.referralName && !this.referralAddress && !this.referralFee)
      // ) {
      // } else {
      //   showToast({
      //     text: "Referral input error",
      //     type: "danger",
      //   });
      //   return;
      // }

      // let advList = []
      // this.advertisings.forEach(item => {
      //   if (item.img) {
      //     advList.push(item)
      //   }
      // })
      // advList = window.btoa(encodeURIComponent(JSON.stringify(advList)))

      let bl = [
        this.background_base,
        this.background_container,
        this.background_interactive,
        this.background_uninteractive,
        this.text_primary,
        this.text_secondary,
        this.button_background_interactive,
        this.button_text_interactive,
        this.button_background_uninteractive,
        this.button_text_uninteractive,
        this.success,
        this.fail,

        this.title,
        this.fontFamily,
        this.logoUrl,
        this.referralName,
        this.referralAddress,
        this.referralFee,

        this.chain,
        this.inToken,
        this.outToken,
        this.moreList.length ? this.moreList.map(item => item.address).join(',') : ''
        // advList
      ];
      let origin = window.location.origin;

      return origin + "?p=" + window.btoa(encodeURIComponent(bl.join("$*$")));
    },
    referralFeeChange (e, b) {
      let v = Number(e.target._value);
      if (v < 0) {
        this.referralFee = 0;
        showToast({
          text: "The input ranges from 0 to 3%",
          type: "danger",
        });
      }
      if (v > 3) {
        this.referralFee = 3;
        showToast({
          text: "The input ranges from 0 to 3%",
          type: "danger",
        });
      }
      if (v > 0 && v < 0.01) {
        this.referralFee = 0.01;
        showToast({
          text: "The input should greater than 0.01%",
          type: "danger",
        });
      }
      this.preview();
    },
    async setTheme (data) {
      const themeStr = decodeURIComponent(window.atob(data));
      const themeList = themeStr.split("$*$");

      this.background_base = themeList[0];
      this.background_container = themeList[1];
      this.background_interactive = themeList[2];
      this.background_uninteractive = themeList[3];
      this.text_primary = themeList[4];
      this.text_secondary = themeList[5];
      this.button_background_interactive = themeList[6];
      this.button_text_interactive = themeList[7];
      this.button_background_uninteractive = themeList[8];
      this.button_text_uninteractive = themeList[9];

      this.success = themeList[10];
      this.fail = themeList[11];

      this.title = themeList[12];
      this.fontFamily = themeList[13];
      this.logoUrl = themeList[14];
      this.referralName = themeList[15];
      this.referralAddress = themeList[16];
      this.referralFee = themeList[17];
      this.chain = themeList[18];
      this.inToken = themeList[19];
      this.outToken = themeList[20];
      if (themeList[21]) {
        if (!this.chainData.length) {
          const { data = [] } = await this.$axios.get(`v2/${this.chain}/token`, {
            cache: true,
            expire: 300000,
          });
          this.chainData = data
        }
        let moreList = []
        themeList[21].split(',').forEach((address) => {
          let token = this.chainData.find((item) => item.address == address);
          if (token) moreList.push(token)
        })
        this.moreList = moreList
      }
      this.preview();
    },
    changeTheme (item) {
      const { name, data } = item;
      this.theme = name;
      this.setTheme(data);
    },
  },
};
</script>

<style lang="scss">
body {
  color: #fff;
  background: #17122b;
}

.nou-dialog {
  background-color: rgba(0, 0, 0, 0.35);
}

.icon-button {
  margin: 2px 4px 2px 0;
  height: 30px;
  width: 30px;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333147;

  i {
    font-size: 8px;
    color: #857685;
  }
}

.icon-name {
  display: flex;
  // justify-content: center;
  align-items: center;

  .icon-logo {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    border-radius: 100px;
  }
}

.select_chain {
  width: 420px !important;
  height: 60vh !important;
  min-height: 520px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
}

.theme_box {
  height: 100vh;
  overflow-y: auto;
}

.theme {
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  font-family: Roboto;

  display: flex;
  justify-content: center;

  h3 {
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
    margin-top: 10px;
  }

  &__setting {
    flex: 1;
    max-width: 1000px;
    min-height: 400px;
    background: #222037;
    border-radius: 15px;
    padding: 20px;

    .group {
      display: grid;
      grid-template-columns: 1fr 1fr;

      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #17122b;

      .module:first-child {
        .item {
          margin-left: 0;
        }
      }

      .module:last-child {
        margin-left: 15px;
      }
    }

    .configure {
      .list {
        display: grid;
        align-items: flex-start;
        grid-gap: 10px;
        grid-template-columns: 1fr 1fr;

        .item:nth-child(2n + 1) {
          margin-left: 0;
        }

        .item:nth-child(2n) {
          margin-right: 0;
        }
      }
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        span {
          display: block;
          color: #999;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: normal;
          margin-left: 10px;
          background: #29273d;
          transition: all 0.3s ease;

          &:hover {
            color: #ff6b18;
            background: #362b27;
          }
        }
      }
    }

    .list {
      padding: 15px 0 0 0;
    }

    .item {
      margin: 10px 15px 0 15px;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .colorPk {
        position: absolute;
        right: 0;
        z-index: 100;
      }

      .lable {
        width: 200px;
        display: flex;
        color: #999;
        font-size: 14px;
      }

      .input {
        height: 36px;
        background: #29273d;
        border: none;
        outline: none;
        padding-left: 10px;
        border-radius: 6px;
        border: 2px solid #29273d;
        box-sizing: border-box;
        transition: all 0.3s ease;

        color: #fff;
        font-size: 14px;

        &:focus {
          border-color: #ff6b18;
        }

        &.long {
          width: 80%;
        }
      }

      .color-box {
        cursor: pointer;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
      }

      .tag {
        position: absolute;
        right: -15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }

      .select {
        background: #29273d;
        padding-left: 10px;
        border-radius: 6px;
        width: 160px;
        height: 36px;
        border: 2px solid #29273d;
        box-sizing: border-box;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
          height: 30px;
          width: 30px;
          border-radius: 3px;
          background-color: #333147;

          display: flex;
          align-items: center;
          justify-content: center;

          span {
            font-size: 14px;
          }
        }
      }




      .theme-button-group {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        column-gap: 8px;

        .button {
          height: 32px;
          border: 1px solid #2c2b38;
          border-radius: 8px;

          display: flex;
          align-items: center;
          justify-content: center;

          transition: all 0.3s;

          span {
            font-size: 12px;
            font-weight: 500;
            color: #fff;
            margin: 8px;
          }

          &.on {
            background-image: linear-gradient(198deg, #ff3e67 0%, #fc8a3e 100%);
          }
        }
      }
    }

    .select1_box {
      .lable {
        width: 90px
      }

      .select1 {
        width: 90%;

        .tokens {
          display: flex;
        }

        .item1 {
          position: relative;
          border: 1px solid var(--button_back_bg);
          border-radius: 4px;
          padding: 4px 6px;
          margin-right: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;

          img {
            width: 16px;
            height: 16px;
            border-radius: 10px;
            margin-right: 4px;
          }

          .iconClose {
            margin-left: 6px;
            font-size: 10px;
            color: #ff3e67;
            cursor: pointer;
            opacity: 0.6;

            &:hover {
              opacity: 1;
            }
          }
        }

      }
    }

    .url {
      .list {
        width: 100%;
        word-break: break-all !important;
        word-wrap: break-word !important;
        white-space: pre-wrap !important;
        background: #17122b;
        margin-top: 15px;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 15px 0;


        textarea {
          background: none;
          height: 60px;
          width: 100%;
          border-radius: 8px;
          border: none;
          color: #fff;
          padding: 0 15px;
          box-sizing: border-box;

          &:hover,
          &:focus {
            border-color: var(--background_classic-input-hover);
          }
        }

        .textarea {
          height: 40px;
          padding: 0 15px;
          overflow: auto;
          color: #fff;
          line-height: 1.6;
          box-sizing: border-box;
        }
      }
      .list1 {
        padding: 15px 0;
      }
    }

    
  }

  &__priview {
    min-width: 450px;
    max-width: 520px;
    min-height: 400px;
    margin-left: 20px;
    background: #222037;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .iframe {
      border-radius: 15px;
      overflow: hidden;
      margin-top: 15px;
      flex: 1;
      box-sizing: border-box;

      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.advertising {
  display: flex;

  .item {
    width: 50%;

    .lable {
      width: auto;
    }
  }

  .icon-box {
    width: 60px;
    padding-top: 18px;

    svg {
      cursor: pointer;
      margin-left: 5px;
      fill: var(--text_primary);

      &:hover {
        fill: var(--text_secondary);
      }
    }
  }
}
</style>