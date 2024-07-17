<template>
  <div class="market">
    <table>
      <thead>
        <tr>
          <th>{{ $t("table_exchange") }}</th>
          <th>{{ $t("table_price") }}&nbsp;({{ tokenSwapPair }})</th>
          <th>{{ $t("table_output") }}</th>
          <th>{{ $t("table_diff") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td>
            <div>
              <img
                :src="
                  'https://ethapi.openocean.finance/asset/' +
                  toLowerCase(item.dexCode, true) +
                  '.png'
                "
                alt=""
              />
              <span>{{ item.dexCode }}</span>
            </div>
          </td>
          <td>
            {{ item.diff ? item.price : "--" }}
          </td>
          <td>
            {{ item.diff ? item.amount : "--" }}
          </td>
          <td>
            <i
              :class="
                item.diff === 'BEST' ? 'i-best' : item.diff === 'MATCH' ? 'i-match' : 'i-red'
              "
              >{{ item.diff ? item.diff : "--" }}</i
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      return this.exchangeList.filter((item) => {
        return !!item.diff;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.market {
  padding: 30px 0 20px;
  margin: 0 24px;
  border-radius: 12px;
  border: 1px solid var(--classic-border);

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
        // font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: var(--classic-text-common);
        text-align: left;
        padding-bottom: 16px;
        &:first-child {
          padding-left: 24px;
        }
        &:last-child {
          width: 60px;
          text-align: right;
          padding-right: 38px;
        }
      }
    }
  }
  tbody {
    display: block;
    max-height: 210px;
    overflow: auto;
    tr {
      position: relative;
      &:first-child {
        td {
          // font-weight: 600;
          // color: var(--classic-green);
          // background: var(--background-classic-token);
          // i {
          //   font-weight: 600;
          // }
          color: var(--classic-text-common);
          &:first-child {
            font-weight: 600;
          }

        }
      }
      td {
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 42px;
        color: var(--classic-text-title);
        text-align: left;
        &:first-child {
          padding-left: 24px;
        }
        &:last-child {
          width: 60px;
          text-align: right;
          padding-right: 24px;
        }
        img {
          width: 24px;
          margin-right: 8px;
          border-radius: 12px;
        }
        div {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        i {
          display: inline-block;
          width: 59px;
          height: 26px;
          // background: var(--classic-green);
          border-radius: 12px;

          font-family: Roboto;
          font-style: normal;
          font-weight: 400;
          font-size: 11px;
          line-height: 26px;
          text-align: center;
          // color: #fff;
        }
        .i-best {
          background: var(--classic-status-color);
          color: var(--classic-status-best);
        }
        .i-match {
          background: var(--classic-status-color);
          color: var(--classic-status-match);
        }
        .i-red {
          background: var(--classic-status-color);
          color: var(--classic-status-normal);
        }
      }
    }
  }
}
</style>