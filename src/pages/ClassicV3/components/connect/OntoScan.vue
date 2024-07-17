<template>
  <div class="onto-scan">
    <div class="content">
      <div class="content__header">
        <img class="content__header__logo" src="@/assets/icon-onto-white.svg" alt="">
        <h2 class="content__header__title">{{ $t("connect_onto_mobile_title") }}</h2>
        <div class="content__header__close" @click="emitClose">
          <div class="content__header__close__line"/>
          <div class="content__header__close__line second"/>
        </div>
      </div>
      <div class="content__box">
        <div class="content__box__tip">{{ $t("connect_onto_mobile_tip") }}</div>
        <vue-qr :text="text" :size="500" :margin="15" :correctLevel="3" />
      </div>
    </div>
  </div>
</template>

<script>
  import vueQr from 'vue-qr'
  
  export default {
    data(vm){
      const { qrData } = vm.$options || {};
      const { id, qrCode } = qrData || {};
      return {
        ids: null,
        success: false,
        id,
        text: JSON.stringify(qrCode)
      }
    },
    components:{
      vueQr
    },
    mounted() {
      this.loop();
    },
    methods: {
      loop(){
        this.$axios.get('ont/qrcode/result/' + this.id).then((res) => {
            console.log('success', res)
            const { action, state, account } = res;
            if(state === '0'){
              this.$emit('close', action, account, 'success', this.$el);
            } else if(state === '1'){
              this.$emit('close', action, account, 'error', this.$el);
            } else {
              this.ids = setTimeout(() => {
                this.loop();
              }, 1000);
            }
        }).catch((e) => {
            console.log(e);
        });
      },
      emitClose() {
        this.$emit('close');
        document.body.removeChild(this.$el);
      }
    },
  }
</script>

<style lang="scss" scoped>
.onto-scan {
  z-index: 999999999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px;
  background: var(--classic-onto-scan);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content__header {
  display: flex;
  align-items: center;
  line-height: 26px;
}

.content__header__logo {
  height: 24px;
}

.content__header__title {
  flex: 1;
  margin: 0 0 0 10px;
  padding: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--background_container);
}

.content__header__close {
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--background_container);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  cursor: pointer;
}

.content__header__close__line {
  position: absolute;
  width: 14px;
  border: 1px solid rgb(48, 52, 59);

  &.second {
    transform: rotate(90deg);
  }
}

.content__box {
  margin-top: 20px;
  box-sizing: content-box;
  padding: 24px 24px 22px;
  background: var(--background_container);
  border-radius: 24px;
}

.content__box__tip {
  color: var(--classic-onto-scan-tip);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 10px 0 15px 0;
  text-align: center;
}
</style>
