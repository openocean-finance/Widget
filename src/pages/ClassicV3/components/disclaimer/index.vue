<template>
    <div class="disclaimer">
      <span> Please disconnect your wallet before selecting another chain, then reconnect your wallet to the selected chain.</span>
      <!-- <div
      class="g-clickable button"
      >
      <span>Change network</span>
    </div> -->
      
    </div>
</template>

<script>

import { isApp } from '@/utils/helpers';

export default {
  name: "Disclaimer",
  data() {
    return {}
  },
  methods: {
    tellApp(){
      return isApp()
    },
  }
};
</script>

<style lang="scss" scoped>
.disclaimer {
  background: rgba(255,82,68, 0.3000);
  margin-top: 1.5rem;
  margin-bottom: -1.2rem;
  border-radius: 12px;
  padding: 15px;
  text-align: center;

  .button {
    cursor: pointer;
    height: 35px;
    background-color: #FFFFFF;
    border-radius: 9px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;

    span {
        color: black;
      }
  }
}
</style>