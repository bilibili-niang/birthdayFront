<script setup lang="ts">
import {defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config";

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  /**
   * size props
   * @emample{size}
   * n (default),s (small), l (large),ls (more large)
   */
  size: {
    type: String,
    default: 'n'
  },
  /**
   * round props
   * @emample{round}
   * true (50% border-radius), false (default border-radius)
   */
  round: {
    type: Boolean,
    default: false
  }
})
let itemData = ref({})
const init = () => {
  itemData.value = (JSON.parse(JSON.stringify(props)))
}
init();
/**
 * 图片的ref,用来移除 onerror 事件
 */
let imgController = ref()
let imgOnError = () => {
  itemData.value.url = baseUrl + '/images/avatar.png';
  imgOnError = null
}

</script>
<template>
  <div class="ice-avatar"
       :class="[
      size==='s'?'noMargin':''
  ]"
  >
    <img :src="itemData.url" alt="" class="ice-avatar-image"
         :class="[
        'size-'+itemData.size,
        itemData.round?'round':'noRound'
    ]"
         ref="imgController"
         @error="imgOnError"
    >
  </div>
</template>

<style scoped lang="less">
.ice-avatar{
  display: flex;
  margin: @margin-m;

  .ice-avatar-image{
    display: flex;
  }

  .size-s{
    width: 3rem;
    height: 3rem;
  }

  .size-n{
    width: 20vw;
    height: 20vw;
  }

  .size-l{
    width: 40vw;
    height: 40vw;
  }

  .size-l-s{
    width: 45vw;
    height: 45vw;
  }

  .size-full{
    width: 100%;
    height: 100%;
  }

  .noRound{
    border-radius: @radio-m;
  }

  .round{
    border-radius: 50%;
  }

}

</style>