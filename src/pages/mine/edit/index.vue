<script lang="ts" setup>
import {ref, Ref} from "vue"
import api from "@/utils/api";
import {baseUrl} from "@/utils/config";
import {userInfo} from "@/components/type/common";
import iceAvatar from '@/components/common/avatar'
import iceInput from '@/components/common/iceInput'
import {onLoad} from "@dcloudio/uni-app"
// import WXBizDataCrypt from "@/static/js/WXBizDataCrypt.js";

let data: Ref<userInfo> = ref({
  id: '',
  randomId: '',
  name: '',
  password: '',
  avatar: '',
  sex: '',
  createdAt: '',
  updatedAt: '',
  iat: '',
  exp: ''
})

const init = async () => {
  await api.loginByToken()
      .then(res => {
        if (res.success) {
          data.value = res.result
        }
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}
const avatarClick = () => {
}
let mode = ref('detail')

init()
/**
 * 获取当前用户的手机号
 */
const onGetPhoneNumber = async (e: any) => {
  if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
    //用户决绝授权
    //拒绝授权后弹出一些提示
    uni.showToast({
      title: '用户取消授权',
      icon: 'loading',
      duration: 1300
    })
  } else {
    //允许授权
    console.log('e:')
    console.log(e)
    console.log("e.detail")
    console.log(e.detail)
    await api.decryptPhone({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      openId: openId.value
    })
        .then(res => {
          console.log("res:")
          console.log(res)
        })
        .catch(e => {
          console.log("e:")
          console.log(e)
        })
  }
}
/**
 * 获取openid
 */
let openId = ref('')
const getUserNew = () => {
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true,
    success: res => {
      openId.value = res.code
    }
  });
}
onLoad(() => {
  getUserNew();
})
</script>

<template>
  <div class="editMine">
    <div class="userEditForm ice-column">
      <div class="avatarLim ice-row justCenter" @click="avatarClick">
        <iceAvatar :url="baseUrl+data.avatar"></iceAvatar>
      </div>

      <div class="ice-row justBetween">
        <div class="ice-tag">
          昵称:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.name" :disable="mode==='detail'"></ice-input>
        </div>
      </div>
      <div class="ice-row justBetween">
        <div class="ice-tag">
          真实姓名:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.realName" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row justBetween">
        <div class="ice-tag">
          手机号:
        </div>
        <div class="lineLeft">
          <!-- <div class="ice-text" @getphonenumber="onGetPhoneNumber" open-type="getPhoneNumber" v-if="!data.phone"> 点击获取手机号 </div> <ice-input v-model="data.phone" :disable="mode==='detail'" v-else></ice-input>-->
          <div class="ice-text">
            <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">唤起授权</button>
          </div>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-text danger">注意,这里的手机号会作为您多平台登录的唯一标识</div>
      </div>

      <div class="ice-row justBetween">
        <div class="ice-tag">
          邮箱:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.email" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row justBetween">
        <div class="ice-tag">
          生日:
        </div>
        <div class="lineLeft">
          {{ data.birthday }}
        </div>
      </div>


    </div>


    编辑我的信息
    {{ data }}

  </div>
</template>

<style scoped lang="less">
.editMine{
  .userEditForm{
    padding: 0 @padding-l;
  }
}
</style>