<template>
  <view class="content">
    主页
    avatar:

    <view class="add" @click="getAdd">
      <image class="image" src="../static/images/nav5.png"></image>
    </view>

    <view @tap="info" class="mainBtn">getUserInfo</view>
    <view @tap="login" class="mainBtn">login</view>


  </view>
</template>

<script setup lang="ts">
import api from "@/api";
import {ref} from "vue";

const user = ref({})


const getAdd = () => {
  console.log('getAdd')
  // 获取本地登录信息
  let userInfo = uni.getStorageSync('userInfo')
  let setInfo = uni.getStorageSync('setInfo')
  console.log(userInfo, setInfo)


}
const login = async () => {
  const res = await api.login()
  console.log(res)
}


const info = () => {
  uni.getUserProfile({
    desc: '请登录',
    lang: 'zh_CN',
    fail: function (res) {
      uni.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000,
      })
    },
    success: async function (res) {
      console.log('res.rawData')
      console.log(res.rawData)
      user.value = res.rawData
      console.log(user)
    }
  })
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
}

.image {
  width: 100%;
  height: 100%;
}

</style>
