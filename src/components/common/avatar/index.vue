<script setup lang="ts">
import {defineProps} from 'vue'

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
</script>
<template>
  <div class="ice-avatar">
    <img :src="url" alt="" class="ice-avatar-image"
         :class="[
        'size-'+size,
        round?'round':'noRound'
    ]">
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
    width: 25vw;
    height: 25vw;
  }

  .size-n{
    width: 30vw;
    height: 30vw;
  }

  .size-l{
    width: 40vw;
    height: 40vw;
  }

  .size-l-s{
    width: 45vw;
    height: 45vw;
  }

  .noRound{
    border-radius: @radio-m;
  }

  .round{
    border-radius: 50%;
  }

}

</style>