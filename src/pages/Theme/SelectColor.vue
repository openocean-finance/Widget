<template>
  <div class="select-color">
    <input
      type="text"
      class="input"
      v-model="inputColor"
      @input="inputChnage"
    />
    <div
      ref="selectColor"
      class="color-box"
      @click.stop="$emit('showColor', colorKey)"
    >
      <span class="color-item" :style="{ background: inputColor }"></span>
      <div ref="colorPk" class="color-pk" @click.stop>
        <sketch-picker v-if="isShowColor" @input="input" v-model="color" />
      </div>
    </div>
  </div>
</template>
<script>
import { Photoshop, Sketch } from "vue-color";
export default {
  components: {
    "photoshop-picker": Photoshop,
    "sketch-picker": Sketch,
  },
  props: {
    value: {
      type: String,
      default: "#000",
    },
    colorKey: {
      type: String,
      default: "",
    },
    showColorKey: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(val) {
      this.inputColor = val;
      this.color = {
        hex: val,
      };
    },
  },
  data() {
    return {
      color: "",
      inputColor: "",
    };
  },
  computed: {
    isShowColor() {
      return this.colorKey && this.showColorKey === this.colorKey;
    },
  },
  mounted() {
    this.inputColor = this.value;
    this.color = {
      hex: this.value,
    };
  },
  methods: {
    input(obj) {
      this.inputColor = obj.hex;
      this.$emit("change", obj.hex);
      this.$emit("input", obj.hex);
    },
    inputChnage(v) {
      if (
        (this.inputColor.startsWith("#") && this.inputColor.length == 4) ||
        this.inputColor.length == 7
      ) {
        this.color = {
          hex: this.inputColor,
        };
        this.$emit("change", this.inputColor);
        this.$emit("input", this.inputColor);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  text-transform: uppercase;
}
</style>

<style lang="scss">
.input,
span {
  vertical-align: middle;
}
.select-color {
  position: relative;
  display: inline-block;
  z-index: 999 !important;
}

.color-box {
  position: absolute;
  right: 3px;
  top: 3px;
  .color-item {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
}
.color-pk {
  position: absolute;
  top: 0;
  right: -225px;
  z-index: 9;
}
</style>