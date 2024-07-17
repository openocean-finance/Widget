<template>
  <div class="banner" v-if="list.length">
    <div class="banner__list">
      <a class="banner__item" :href="item.href" v-for="(item, i) in list" :key="i" target="_blank">
        <img :src="item.img" />
      </a>
      <a class="banner__item" :href="list[0].href" target="_blank" v-if="list.length > 0">
        <img :src="list[0].img" />
      </a>
    </div>
  </div>
</template>

<script>
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
export default {
  data () {
    return {
      list: [
        {
          img: banner1,
          href: "https://app.openocean.finance/portfolio/campaigns",
        },
        {
          img: banner2,
          href: "https://app.openocean.finance",
        },
      ],
    };
  },
  mounted () {
    let advertisings = window.localStorage.getItem("advertisings",);
    if (advertisings) {
      let list = JSON.parse(decodeURIComponent(window.atob(advertisings)));
      if (list && list.length) {
        this.list = list
      }
    }
  }
};
</script>

<style lang="scss">
:root {
  --w: 402;
  --speed: 5s;
  --s: 2;
}

.banner {
  border-radius: 10px;
  margin-top: 12px;
  overflow: hidden;

  &__list {
    display: flex;
    flex-wrap: nowrap;
    animation: move calc(var(--speed) * var(--s)) steps(var(--s)) infinite;
  }

  &__item {
    flex-shrink: 0;
    width: 100%;
    height: 100px;
    box-sizing: border-box;

    white-space: nowrap;
    animation: move1 calc(var(--speed)) infinite;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@keyframes move {
  0% {
    transform: translate(0, 0px);
  }
  100% {
    transform: translate(calc(var(--s) * var(--w) * -1px), 0);
  }
}

@keyframes move1 {
  0% {
    transform: translate(0, 0px);
  }
  30%,
  100% {
    transform: translate(calc(var(--w) * -1px), 0);
  }
}
</style>