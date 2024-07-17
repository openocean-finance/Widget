<template>
  <div class="select" @mousedown.stop>
    <div class="top" @click.stop="switchUnfold">
      <span>{{ selectedItem.label }}</span>
      <i class="iconfont iconDropdown select__icon" />
    </div>
    <div v-if="isUnfold" class="select__options">
      <ul>
        <li
          class="select__options__item g-font-mid"
          v-for="item in options"
          :key="item.value"
          @click="select(item)"
        >
          {{ item.label }}
          <span v-if="item.unit">{{ item.unit }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NouFoldTransition from "@/components/common/FoldTransition";

export default {
  name: "DropDown",
  components: { NouFoldTransition },
  props: {
    options: {
      type: Array,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    align: {
      type: String,
      default: "left",
    },
  },
  computed: {
    selectedItem() {
      if (!this.value) {
        return { label: this.name };
      }
      return (
        this.options.find((item) => item.value === this.value) || {
          label: this.name,
        }
      );
    },
  },
  data() {
    return {
      value: "7D",
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
      this.value = target.value;
      this.$emit("change", this.code, target.value);
      this.fold();
    },
  },
};
</script>

<style lang="scss">
.select {
  position: relative;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: var(--classic-text-active);
  margin-top: 6px;

    @media (max-width:440px) {
      font-size: 12px;
    }

  .top {
    display: flex;
    align-items: center;
    span {
        display: block;
        vertical-align: middle;

       @media (max-width:440px) {
      font-size: 12px;
    }
    }
  }
}

.select__icon {
  display: inline-block;
  font-size: 12px;
  transform: scale(0.416);
  transform-origin: right;
}

.select__options {
  z-index: 1000;
  position: absolute;
  top: 42px;
  right: -8px;
  margin: 0;
  width: 159px;
  padding: 12px 0;
  box-sizing: border-box;
  background: var(--background-select-options);
  box-shadow: 0px 4px 4px var(--classic-dropdown-shadow);
  border-radius: 8px;
  
  ul {
    height: 156px;
    overflow: auto;
    &::-webkit-scrollbar-thumb:vertical {
      background-color: var(--classic-button-disabled);
    }

    &::-webkit-scrollbar-thumb:horizontal {
      background-color: var(--classic-button-disabled);
    }
  }
}

.select__options__item {
  margin: 0 0 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  padding-left: 16px;
  line-height: 24px;
  color: var(--classic-text-active);

      @media (max-width:400px) {
      font-size: 10px;
    }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: var(--background-table-hover);
  }
  display: flex;
  align-items: center;
  span {
    flex: 1;
    text-align: right;
    color: var(--color-des);
  }
}
</style>
