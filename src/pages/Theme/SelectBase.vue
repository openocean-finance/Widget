<template>
  <div class="select-base" :class="{ minSelect: min, unfold: isUnfold }" @mousedown.stop>
    <div class="select-base__selected" @click.stop="switchUnfold">
      <span>{{ selectedItem.label }}</span>
      <div class="select-base__selected-icon">
        <i class="iconfont iconDropdown"></i>
      </div>
    </div>
    <NouFoldTransition>
      <div v-if="isUnfold" class="select-base__options">
        <ul>
          <li
            class="select-base__options__item"
            v-for="item in options"
            :key="item.value"
            @click="select(item)"
          >
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </NouFoldTransition>
  </div>
</template>

<script>
import NouFoldTransition from "@/components/common/FoldTransition";

export default {
  name: "SelectBase",
  components: { NouFoldTransition },
  props: {
    value: {
      type: [Number, String],
      require: true,
    },
    options: {
      type: Array,
      require: true,
    },
    min: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectedItem() {
      return (
        this.options.find((item) => item.value === this.value) || { label: "" }
      );
    },
  },
  data() {
    return {
      isUnfold: false,
    };
  },
  methods: {
    switchUnfold() {
      if (this.isUnfold) {
        this.fold();
      } else {
        this.unfold();
      }
    },
    unfold() {
      this.isUnfold = true;
      this.$nextTick(() => {
        document.body.addEventListener("mousedown", this.fold);
      });
    },
    fold() {
      document.body.removeEventListener("mousedown", this.fold);
      this.isUnfold = false;
    },
    select(target) {
      if (target.disabled) return;
      this.$emit("change", target.value);
      this.$emit("input", target.value);
      this.fold();
    },
  },
};
</script>

<style lang="scss">
.select-base {
  background: #29273d;
  padding-left: 10px;
  border-radius: 6px;
  width: 160px;
  height: 36px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &.unfold {
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
    .select-base__options {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }
  }

  &__selected {
    width: 100%;
    height: 100%;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 14px;
    }
  }

  &__selected-icon {
    margin: 2px 4px 2px 0;
    height: 30px;
    width: 30px;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--button_back_bg);

    i {
      font-size: 8px;
      color: var(--button_back);
    }
  }

  &__options {
    z-index: 1000;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    margin: 0;
    padding: 10px 0;
    background: #29273d;
    border-radius: 0 0 10px 10px;
    overflow: hidden;

    ul {
      max-height: 200px;
      overflow: auto;
    }

    &.left {
      left: 0;
      right: auto;
    }

    &.right {
      left: auto;
      right: 0;
    }
  }

  &__options__item {
    margin: 0;
    padding: 10px 20px;
    line-height: 20px;
    font-size: 12px;
    white-space: nowrap;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      span {
        color: #fff;
      }
    }

    display: flex;
    align-items: center;
    span {
      flex: 1;
      text-align: left;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.minSelect {
  .select__selected {
    height: 40px;
    border-radius: 12px;
    padding: 0 12px;
  }
  .select__options {
    ul {
      max-height: 160px;
    }
  }
}
</style>
