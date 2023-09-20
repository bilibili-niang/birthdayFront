<template>
  <customNavBar :back="false" title="关于我"></customNavBar>
  <view class="mine">
    <view class="mainBtn" @tap="login">
      login
    </view>

    <view class="data">
      {{ code }}
    </view>


  </view>
  <tabBar/>
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import {ref} from "vue";
import api from "@/utils/api";

let userInfo = ref()

let code = ref()
const login = () => {
  uni.login({
    provider: 'weixin', //使用微信登录
    onlyAuthorize: true,
    success: async function (loginRes) {
      code.value = loginRes.code
      const res = await api.login({
        code: code.value
      })
      console.log(res)
    },
    fail: function (err) {
      console.log('err')
      console.log(err);
    }
  })
}

let rawData = ref("")
const getInfo = () => {
  uni.getUserProfile({
    desc: '请登录',
    lang: 'zh_CN',
    fail: function (res) {
      console.log('登录失败')
      console.log(res);
    },
    success: async function (res) {
      console.log('res')
      console.log(res)
      console.log('res.rawData')
      console.log(res.rawData)
      rawData.value = JSON.parse(res.rawData)
    }
  })
}


</script>

<style scoped lang="less">

</style>
