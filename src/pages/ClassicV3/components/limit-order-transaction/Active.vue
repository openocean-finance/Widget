<template>
  <div class="active">
    <table v-if="orderList.length > 0">
      <thead>
        <tr>
          <th>{{ $t("limit_order_pay") }}</th>
          <th>{{ $t("limit_order_receive") }}</th>
          <th>{{ $t("limit_order_rate") }}</th>
          <th>{{ $t("limit_order_expiration") }}</th>
          <th>{{ $t("limit_order_action") }}</th>
        </tr>
      </thead>
      <tbody id="action-sheet-scroll">
        <tr v-for="(item, i) in orderList" :key="i">
          <td>
            <div class="pay">
              <img :src="item.markerImg" alt="" v-if="item.markerImg" />
              <i v-else></i>
              <div class="from">
                <div>{{ item.markerName || "---" }}</div>
                <div>
                  {{ formatLongNum(item.marketAmountFormat) }}
                </div>
              </div>
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.32666 12.4199L1.50666 13.5999L8.10666 6.9999L1.50666 0.399902L0.32666 1.5799L5.74666 6.9999L0.32666 12.4199Z"
                  fill="var(--classic-button-disabled)"
                />
              </svg>
            </div>
          </td>
          <td>
            <div class="recieve">
              <img :src="item.takerImg" alt="" v-if="item.takerImg" />
              <i v-else></i>
              <div class="to">
                <div>{{ item.takerName }}</div>
                <div>
                  {{ formatLongNum(item.takerAmountFormat) }}
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="rate">
              <div>
                1 {{ item.takerName }} =
                {{
                  +formatRate(
                    item.makerAmount,
                    item.makerDecimals,
                    item.takerAmount,
                    item.takerDecimals
                  )
                }}
                {{ item.markerName }}
              </div>
              <div>
                1 {{ item.markerName }} =
                {{
                  +formatRate(
                    item.takerAmount,
                    item.takerDecimals,
                    item.makerAmount,
                    item.makerDecimals
                  )
                }}
                {{ item.takerName }}
              </div>
            </div>
          </td>
          <td>
            <div class="expiration">
              <div>{{ new Date(item.expireTime).toLocaleDateString() }}</div>
              <div>{{ new Date(item.expireTime).toLocaleTimeString() }}</div>
            </div>
          </td>
          <td class="action" @click="cancelOrder(item)">
            <div>{{ $t("limit_order_cancel") }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <NotFind v-else />
  </div>
</template>


<script>
import { toFixed,formatLongNum } from "@/utils/format";
import BigNumber from "bignumber.js";
import { isEmpty } from "@/utils/helpers.js";
import { cancelLimitOrder } from "@/init";
import NotFind from "./components/not-find";

export default {
  name: "Active",

  components: {
    NotFind,
  },

  data() {
    return {
      toFixed,
      formatLongNum,
      list: [],
      loading: true,
      activeTab: "active",
      page: 1,
      limit: 100,
      orderList: [],
      type: "active",
      typeMap: {
        active: "%5B1,2%5D",
        history: "%5B3,4%5D",
        fill: "%5B1,2%5D",
      },
    };
  },
  computed: {
    logoPath() {
      const walletType = localStorage.getItem("walletType");
      return `https://ethapi.openocean.finance/logos/${walletType}`;
    },
    requestPath() {
      const chainId = localStorage.getItem("walletChainId");
      const account = this.default_account;
      return `https://open-api.openocean.finance/v1/${chainId}/limit-order/address/${account}`;
    },
  },
  watch: {
    tokenList() {
      this.fetchOrder();
    },
  },
  mounted() {
    this.fetchOrder();
    setInterval(() => {
      this.fetchOrder(true);
    }, 10000);
  },

  methods: {
    async fetchOrder(flag) {
      if (!this.account || !this.tokenList || !this.tokenList.length) return;

      if (!flag) {
        this.orderList = [];
      }
      const url = `${this.requestPath}?page=${this.page}&limit=${
        this.limit
      }&statuses=${this.typeMap[this.type]}&sortBy=createDateTime&exclude=${
        this.type === "fill" ? "1" : "0"
      }`;
      const res = await this.$axios.get(url);
      const { code, data } = res || {};
      if (code > 0) {
        this.orderList = data;
        this.orderList.forEach((order) => {
          const sellToken = this.tokenMap[order.data.makerAsset.toLowerCase()];
          if (sellToken) {
            order.markerImg = sellToken.icon;
            order.markerName = sellToken.symbol;
            order.makerDecimals = sellToken.decimals;
            order.sellToken = sellToken;
            order.marketAmountFormat = toFixed(
              this.decimals2AmountBig(
                order.makerAmount,
                sellToken.decimals
              ).toNumber(),
              6,
              6
            );
          }

          const buyToken = this.tokenMap[order.data.takerAsset.toLowerCase()];
          if (buyToken) {
            order.takerImg = buyToken.icon;
            order.takerName = buyToken.symbol;
            order.takerDecimals = buyToken.decimals;
            order.buyToken = buyToken;
            order.takerAmountFormat = toFixed(
              this.decimals2AmountBig(
                order.takerAmount,
                buyToken.decimals
              ).toNumber(),
              6,
              6
            );
          }
        });
        this.orderList = this.orderList.filter(t => t.buyToken)
      }
    },

    async cancelOrder(order) {
      if (confirm("cancel order?")) {
        const { chainId = 56, orderHash } = order;
        const result = await this.$axios.post(
          `https://open-api.openocean.finance/v1/${chainId}/limit-order/cancelLimitOrder`,
          { orderHash }
        );
        const { status } = (result && result.data) || {};
        if (!(status === 3 || status === 4)) {
          cancelLimitOrder(order, this.gasPrice);
        } else {
          this.fetchOrder();
        }
      }
    },

    decimals2AmountBig(amount, decimals) {
      return new BigNumber(amount).shiftedBy(Number(-decimals));
    },

    formatRate(inAmount, inDecimals, outAmount, outDecimals) {
      if (isEmpty(inDecimals)) {
        inDecimals = 18;
      }
      if (isEmpty(outDecimals)) {
        outDecimals = 18;
      }
      const rate = this.decimals2AmountBig(inAmount, inDecimals)
        .div(this.decimals2AmountBig(outAmount, outDecimals))
        .toNumber();
      return toFixed(rate, 8, 8);
    },

    formatAmount(amount, decimals) {
      try {
        if (isEmpty(decimals)) {
          decimals = 18;
        }
        const _amount = (+this.decimals2AmountBig(amount, decimals)).toNumber();
        return toFixed(_amount, 8, 8);
      } catch (e) {
        return 0;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.active {
  overflow: hidden;
  @media (max-width:440px) {
    overflow: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    tbody tr,
    thead {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
  }

  thead {
    tr {
      th {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: var(--classic-text-common);
        text-align: left;
        padding-bottom: 16px;
        &:nth-child(1) {
          padding-left: 24px;
          width: 150px;
          @media (max-width:440px) {
            padding-left: 6px;
            width: 30%;
          }
        }
        &:nth-child(2) {
          width: 150px;
          @media (max-width:440px) {
            width: 30%;
          }
        }
        &:nth-child(3) {
          width: 210px;
          @media (max-width:440px) {
            display: none;
          }
        }
        &:last-child {
          width: 80px;
          text-align: right;
          padding-right: 31px;
           @media (max-width:440px) {
            width: 15%;
            padding-right: 6px;
          }
        }
      }
    }
  }

  tbody {
    display: block;
    max-height: 400px;
    overflow: auto;
    /* margin-right: -14px;
    padding-right: 7px; */
     @media (max-width:440px) {
      max-height: 85vh;
    }
    tr {
      position: relative;

      td {
        height: 32px;
        padding-bottom: 26px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 40px;
        color: var(--classic-text-common);
        text-align: left;

        @media (max-width:440px) {
          font-size: 12px;
        }
        &:nth-child(1) {
          padding-left: 24px;
          width: 150px;
          @media (max-width:440px) {
            width: 30%;
            padding-left: 6px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipse;
          }
        }
        &:nth-child(2) {
          width: 150px;
          @media (max-width:440px) {
            width: 30%;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipse;
          }
        }
        &:nth-child(3) {
          width: 210px;
          @media (max-width:440px) {
            display: none;
          }
        }
        &:last-child {
          width: 80px;
          text-align: right;
          padding-right: 24px;
          color: var(--classic-limit-order-action);
          font-weight: 400;
          line-height: 16px;
          cursor: pointer;

          @media (max-width:440px) {
            width: 15%;
            padding-right: 6px;
          }
        }
        img, i {
          width: 32px;
          // margin-right: 8px;
          border-radius: 16px;
          text-align: left;

          @media (max-width:440px) {
            display: none;
          }
        }

        .pay {
          display: grid;
          grid-template-columns: 38px 1fr 28px;
          align-items: center;

          @media (max-width:440px) {
            grid-template-columns: 1fr .5rem;
          }
        }

        .recieve {
          display: grid;
          grid-template-columns: 38px 1fr;

          @media (max-width:440px) {
            grid-template-columns:.5rem 1fr;
          }
        }

        .from,
        .to {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-direction: column;
          div {
            line-height: 1.1;
            &:last-child {
              color: var(--classic-text-title);
            }
          }
        }

        .rate,
        .expiration {
          display: block;

          div {
            font-family: "Roboto";
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: var(--classic-text-common);
          }
        }
      }
    }
  }
}
</style>
