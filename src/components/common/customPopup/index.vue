<!--自定义弹窗组件,支持slot-->
<script lang="ts" setup>
import {ref} from 'vue'

const popupRef = ref()
const show = () => {
  popupRef.value.open('top')
}

// 这个是必须要暴露的
defineExpose({
  show
})
</script>

<template>


  <uni-popup ref="popupRef" background-color="#fff">

    <view class="popContainer">
      <slot></slot>
    </view>
  </uni-popup>

</template>

<style scoped lang="less">

.popContainer{
  display: flex;
  flex-direction: column;
  height: 75vh;
  padding: @padding-n;
  margin-top: 9vh;
}
</style>