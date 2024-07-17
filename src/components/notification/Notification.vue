<template>
  <NouDialog close-on-click-modal :dialog-class="contentClasses">
    <div class="notification">
      <div class="loading" v-if="status === 'loading'">
        <svg viewBox="0 0 100 100" enable-background="new 0 0 100 100">
          <circle
            class="circle"
            fill="none"
            stroke="var(--background_base)"
            stroke-width="8.7"
            cx="50"
            cy="50"
            r="45.5"
            stroke-linecap="round"
          />
          <path
            fill="var(--button_text_interactive)"
            d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
          c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </svg>
        <b>{{ title }}</b>
        <div class="text notice_top">
          {{ notice }}
        </div>
        <div class="text">
          {{ text }}
        </div>
      </div>

      <div class="submitted" v-else-if="status === 'submitted'">
        <svg viewBox="0 0 400 400" class="success">
          <circle
            class="circle"
            fill="none"
            stroke="#73BF77"
            stroke-width="36"
            cx="200"
            cy="200"
            r="180"
            stroke-linecap="round"
            transform="rotate(-90,200,200)"
          />
          <polyline
            class="tick"
            fill="none"
            stroke="#73BF77"
            stroke-width="36"
            points="88,214 173,284 304,138"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <b>{{ title }}</b>
        <div class="text">
          {{ text }}
        </div>
        <div class="explorer">
          <a :href="blockExplorerUrl" target="_blank">
            {{ t$("notification_view_transaction") }}
          </a>
        </div>
      </div>

      <div class="rejected" v-else-if="status === 'rejected'">
        <svg viewBox="0 0 400 400" class="rejected">
          <circle
            class="circle"
            fill="none"
            stroke="#EA4848"
            stroke-width="36"
            cx="200"
            cy="200"
            r="180"
            stroke-linecap="round"
            transform="rotate(-90,200,200)"
          />
          <polyline
            class="tick"
            fill="none"
            stroke="#EA4848"
            stroke-width="36"
            points="125,125 275,275"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            class="tick2"
            fill="none"
            stroke="#EA4848"
            stroke-width="36"
            points="125,275 275,125"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <b>{{ title }}</b>
        <div class="text">
          {{ text }}
        </div>
      </div>

      <div class="failed" v-else-if="status === 'failed'">
        <svg viewBox="0 0 400 400" class="failed">
          <circle
            class="circle"
            fill="none"
            stroke="#EA4848"
            stroke-width="36"
            cx="200"
            cy="200"
            r="180"
            stroke-linecap="round"
            transform="rotate(-90,200,200)"
          />
          <polyline
            class="tick"
            fill="none"
            stroke="#EA4848"
            stroke-width="36"
            points="275,125 125,275"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            class="tick2"
            fill="none"
            stroke="#EA4848"
            stroke-width="36"
            points="125,125 275,275"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <b>{{ title }}</b>
        <div class="text">
          {{ text }}
        </div>
      </div>

      <i class="iconfont iconClose icon_close" @click="close" v-if="isShowClose"></i>
    </div>
  </NouDialog>
</template>

<script>
import NouDialog from "./NouDialog";
import getChains from "@/utils/getChains";

export default {
  name: "Notification",
  components: { NouDialog },
  data(vm) {
    const { params } = vm.$options || {};
    const { status, chain, address, timeout, title, text, notice } =
      params || {};
    return {
      status,
      chain,
      address,
      title,
      text,
      timeout,
      notice,
      isShowClose: window.parent === window.self,
      contentClasses: {
        progress_wrapper: true,
      },
    };
  },
  computed: {
    blockExplorerUrl() {
      const chain = getChains().filter((item) => {
        return item.walletValue === this.chain;
      });
      return (
        ((chain && chain[0] && chain[0].blockExplorerUrl) ||
          "https://etherscan.io/tx/") + this.address
      );
    },
  },
  mounted() {
    this.autoDestroy();
  },
  methods: {
    t$(key) {
      return window.$t(key);
    },
    autoDestroy() {
      if (this.timeout) {
        setTimeout(() => {
          this.close();
        }, this.timeout);
      }
    },
    change(params) {
      const { status, chain, address, timeout, title, text, notice, type, subcontent } =
        params || {};
      this.status = status;
      this.chain = chain;
      this.address = address;
      this.timeout = timeout;
      this.title = title;
      this.text = text;
      this.notice = notice;
    },
    close() {
      this.isShow = false;
      document.body.style.overflow = "auto";
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  padding: 60px 24px 0;
  min-height: 440px;
  background: var(--background_container);
  border-radius: 24px;
  position: relative;

  svg {
    width: 133px;
  }

  b {
    font-size: 24px;
    font-weight: 600;
    margin: 24px 0 30px;
  }

  .text {
    text-align: center;
    font-size: 16px;
    color: var(--button_back);
    line-height: 19px;
  }

  .icon_close {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 15px;
    cursor: pointer;
  }

  .explorer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 24px;
    text-align: center;
    a {
      color: var(--classic-button-infinite-unlock-color);
    }
  }
}

.loading,
.submitted,
.rejected,
.failed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    text-align: center;
  }
  .notice_top {
    margin-bottom: 16px;
    color: var(--button_back);
  }
}

@keyframes tick {
  from {
    stroke-dashoffset: 350;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes circle {
  from {
    stroke-dashoffset: 1194;
  }
  to {
    stroke-dashoffset: 2388;
  }
}

.success {
  .circle {
    stroke-dasharray: 1194;
    stroke-dashoffset: 1194;
    animation: circle 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  .tick {
    stroke-dasharray: 350;
    stroke-dashoffset: 350;
    animation: tick 0.8s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 0.95s;
  }
}

.rejected,
.failed {
  .circle {
    stroke-dasharray: 1194;
    stroke-dashoffset: 1194;
    animation: circle 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  .tick {
    stroke-dasharray: 350;
    stroke-dashoffset: 350;
    animation: tick 0.3s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 0.95s;
  }
  .tick2 {
    stroke-dasharray: 350;
    stroke-dashoffset: 350;
    animation: tick 0.3s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 1.15s;
  }
}
</style>
