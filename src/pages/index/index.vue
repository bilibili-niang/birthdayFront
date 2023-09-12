<template>
  <view class="content">
    主页

    <view class="add" @click="getAdd">
      <image class="image" src="../static/images/nav5.png"></image>
    </view>
  </view>
</template>

<script setup lang="ts">

const getAdd = () => {
  console.log('getAdd')

}
</script>

<style scoped lang="less">

.add {
  width: 120rpx;
  height: 120rpx;
  position: fixed;
  right: 4%;
  bottom: 5%;
  z-index: 2;

  .image {
    width: 100%;
    height: 100%;
  }
}

</style>
