<template>
  <div class="tooltip">
    <slot>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00004 0.333313C3.32004 0.333313 0.333374 3.31998 0.333374 6.99998C0.333374 10.68 3.32004 13.6666 7.00004 13.6666C10.68 13.6666 13.6667 10.68 13.6667 6.99998C13.6667 3.31998 10.68 0.333313 7.00004 0.333313ZM7.66671 11.6666H6.33337V10.3333H7.66671V11.6666ZM9.04671 6.49998L8.44671 7.11331C8.11337 7.45331 7.87337 7.75998 7.75337 8.23998C7.70004 8.45331 7.66671 8.69331 7.66671 8.99998H6.33337V8.66665C6.33337 8.35998 6.38671 8.06665 6.48004 7.79331C6.61337 7.40665 6.83337 7.05998 7.11337 6.77998L7.94004 5.93998C8.24671 5.64665 8.39337 5.20665 8.30671 4.73998C8.22004 4.25998 7.84671 3.85331 7.38004 3.71998C6.64004 3.51331 5.95337 3.93331 5.73337 4.56665C5.65337 4.81331 5.44671 4.99998 5.18671 4.99998H4.98671C4.60004 4.99998 4.33337 4.62665 4.44004 4.25331C4.72671 3.27331 5.56004 2.52665 6.59337 2.36665C7.60671 2.20665 8.57337 2.73331 9.17337 3.56665C9.96004 4.65331 9.72671 5.81998 9.04671 6.49998Z"
          fill="#8C7F8C"
        />
      </svg>
    </slot>
    <span class="tooltiptext tooltip-top" v-if="!left">{{ text }}</span>
    <span class="tooltiptext-left tooltip-top" v-else>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    left:{
      tye:Boolean,
      default:false
    }
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    height: 16px;
    margin-left: 8px;
  }

  .tooltiptext {
    visibility: hidden;
    position: absolute;
    background-color: var(--background_base);
    text-align: center;
    width: 280px;
    padding: 10px;
    border-radius: 8px;
    z-index: 1;
    opacity: 0;
    bottom: 25px;
    left: 50%;
    transition: opacity 0.6s;
    transform: translateX(-30%);
    word-break: keep-all;
    box-sizing: border-box;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: var(--tooltip-text);
    text-align: left;

    box-shadow: 2px 2px 13px 0px var(--background_base);

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 30%;
      margin-left: -2.5px;
      border-width: 5px;
      border-style: solid;
      border-color: var(--background_base) transparent transparent transparent;
    }
  }

  .tooltiptext-left {
    visibility: hidden;
    position: absolute;
    background-color: var(--background_base);
    text-align: center;
    width: 280px;
    padding: 10px;
    border-radius: 8px;
    z-index: 1;
    opacity: 0;
    bottom: 35px;
    left: -600%;
    transition: opacity 0.6s;
    transform: translateX(-30%);
    word-break: keep-all;
    box-sizing: border-box;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: var(--tooltip-text);
    text-align: left;

    box-shadow: 2px 2px 13px 0px var(--background_base);

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 80%;
      margin-left: -2.5px;
      border-width: 5px;
      border-style: solid;
      border-color: var(--background_base) transparent transparent transparent;
    }
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

    &:hover .tooltiptext-left {
    visibility: visible;
    opacity: 1;
  }
}
</style>