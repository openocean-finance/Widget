<template>
  <div class="icon" :class="{ small: size === 'small', big: size === 'big' }">
    <img :src="src" v-if="iconSuccess" />
    <div class="g-skeleton icon-empty" v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      iconSuccess: false,
    };
  },
  watch: {
    src() {
      this.loadIcon();
    },
  },
  mounted() {
    this.loadIcon();
  },
  methods: {
    loadIcon() {
      this.iconSuccess = false;
      if (!this.src) return;
      const img = new Image();
      img.src = this.src;
      // console.log("loadIcon", img.src);
      img.onload = () => {
        // console.log("loadIcon", "success");
        this.iconSuccess = true;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;

  &.big {
    img {
      width: 42px;
      height: 42px;
      border-radius: 6px;
    }

    .g-skeleton {
      height: 42px;
    }

    .icon-empty {
      width: 42px;
      height: 42px;
      border-radius: 6px;
    }
  }

  &.small {
    img {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 12px;
    }

    .g-skeleton {
      height: 32px;
    }

    .icon-empty {
      width: 32px;
      height: 32px;
      border-radius: 16px;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    object-fit: cover;
  }

  .icon-empty {
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background-color: var(--background-classic-form-item);
    margin-right: 12px;
  }
}
</style>