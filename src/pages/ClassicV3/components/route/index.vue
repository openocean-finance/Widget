<template>
  <div class="g-font-mid routing">
    <h2 class="routing__title">Routing</h2>
    <div class="path_finder" v-if="routes && routes.length">
      <div class="path_from">
        <img :src="fromToken.icon" alt="" />
      </div>
      <div class="path_routing">
        <RoutingItem v-for="(item, i) in routes" :key="i" :item="item" :total="total" />
      </div>
      <div class="path_to">
        <img :src="toToken.icon" alt="" />
      </div>
    </div>
    <div class="screen-root" v-else>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import RoutingItem from "./RoutingItem";
import { contract as state } from "@/contract";

export default {
  name: 'Routing',
  components: {
    RoutingItem
  },
  computed: {
    fromToken: () => state.fromToken,
    toToken: () => state.toToken,
    routes () {
      return this.routePath && this.routePath.routes || [];
    },
    total () {
      let sum = 0;
      this.routes.forEach(item => {
        sum += item.parts;
      })
      return sum;
    }
  },
  methods: {
    setShowAll () {
      this.showAll = !this.showAll;
      window.localStorage.setItem('classic_showall', this.showAll ? '1' : '0');
    },
  }
};
</script>

<style lang="scss" scoped>
.routing {
  margin: 20px 0 0;
  position: relative;
}

.routing__title {

  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;
  color: var(--text_primary);
  padding-bottom: 6px;
}

.path_finder {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.path_from,
.path_to {
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;

  img {
    border-radius: 16px;
    width: 32px;
    height: 32px;
  }
}

.path_from {
  &:after {
    content: "";
    position: absolute;
    width: 0;
    border: 1px solid;
    border-image: var(--routing-line-color);
    top: 0;
    bottom: 0;
    right: -1px;
  }
}

.path_routing {
  flex: 1;
  padding: 0 20px;
}

.path_to {
  &:after {
    content: "";
    position: absolute;
    width: 0;
    border: 1px solid;
    border-image: var(--routing-line-color);
    top: 0;
    bottom: 0;
    left: -1px;
  }
}

.screen-root {
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 0.6s ease;

  &.hide {
    opacity: 0;
  }

  ul {
    width: 100%;

    li {
      background-image: linear-gradient(90deg, transparent 25%, var(--background_classic-card) 37%, transparent 63%);
      width: 100%;
      height: 35px;
      list-style: none;
      background-size: 400% 100%;
      margin-bottom: 10px;
      background-position: 100% 50%;
      animation: skeleton-loading 1.4s ease infinite;

      li:first-child {
        width: 38%;
      }

      li:last-child {
        width: 61%;
      }
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
