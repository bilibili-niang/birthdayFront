<template>
  <customNavBar :back="false" title="关于我"></customNavBar>
  <view class="mine">
    <userCard :info="info"></userCard>


    <view class="mainBtn" @click="login">
      login
    </view>

    <view class="data">
      {{ code }}
    </view>
  </view>
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import userCard from './components/userCard/index.vue'
import {reactive, ref} from "vue";
import api from "@/utils/api";
import {useMemberStore} from "@/stores";

let userInfo = ref()
let info = reactive({
  name: '张三',
  avatar: 'https://blog.icestone.work/upload_78351ef6c80b4d627a95dbaa9634cea6.jpg',
  gender: 'male',
  age: 23
})

let code = ref()
const store = useMemberStore()

console.log(store.$state.profile)

const login = () => {
  uni.login({
    provider: 'weixin', //使用微信登录
    onlyAuthorize: true,
    success: async function (loginRes) {
      code.value = loginRes.code
      await api.login({
        code: code.value
      })
          .then(res => {
            if (res.result) {
              store.setProfile(res.result)
            }
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
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
