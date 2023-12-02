<template>
  <div class="mine">
    <userCard :info="userInfo" v-if="userInfo"></userCard>
    <!-- 当前没有用户登录-->
    <view v-else>
      <view class="text">当前没有用户登录</view>

      <view class="mainBtn" @click="login">
        login
      </view>
    </view>

  </div>
</template>

<script setup lang="ts">
import userCard from './components/userCard/index.vue'
import {ref} from "vue";
import api from "@/utils/api";
import {useMemberStore} from "@/stores";

/**
 * 存储用户信息
 */
let userInfo = ref(null)

let code = ref('')
const store = useMemberStore()

const login = () => {
  uni.showToast({
    title: '正在登录',
    icon: 'loading',
    duration: 1300
  })
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
              uni.hideToast()
              store.setProfile(res.result)
              userInfo.value = res.result;
              console.log("userInfo.value:", userInfo.value)
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

const getUserInfo = () => {
  if (!store.$state.profile) {
    return false
  } else {
    userInfo.value = store.$state.profile
    console.log(userInfo.value);
  }
}
/**
 * 本地存储的有用户的登录信息时触发
 */
getUserInfo()

</script>

<style scoped lang="less">
.mine{
  padding: @padding-n;
}

</style>
