<template>
  <div class="mine">
    <userCard :info="userInfo" v-if="userInfo"></userCard>
    <!-- 当前没有用户登录-->
    <view v-else>
      <emptyData title="当前没有用户登录">
        <div class="ice-row">
          <div class="ice-text">
            您可以选择:
          </div>
          <div class="mainBtn" @click="login">
            login
          </div>
        </div>
      </emptyData>
    </view>

  </div>
</template>

<script setup lang="ts">
import userCard from './components/userCard/index.vue'
import {ref} from "vue";
import api from "@/utils/api";
import {useMemberStore} from "@/stores";
import emptyData from '@/components/common/emptyData'
import {onPullDownRefresh} from "@dcloudio/uni-app";

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
    console.log(userInfo.value)
    uni.stopPullDownRefresh();
  }
}
/**
 * 本地存储的有用户的登录信息时触发
 */
getUserInfo()
// 下拉再次获取数据
onPullDownRefresh(() => {
  getUserInfo()
})
</script>

<style scoped lang="less">
.mine{
  padding: @padding-n;
}
</style>
