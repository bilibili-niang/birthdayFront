<script lang="ts" setup>
import {ref, Ref} from "vue"
import api from "@/utils/api";
import {baseUrl} from "@/utils/config";
import {userInfo} from "@/components/type/common";

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

</script>

<template>
  <div class="editMine">
    <div class="ice-column">
      <div class="avatarLim ice-row alignCenter" @click="avatarClick">
        <iceAvatar :url="baseUrl+data.avatar"></iceAvatar>
      </div>

      <div class="ice-row">
        <div class="ice-tag">
          昵称:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.name" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row">
        <div class="ice-tag">
          手机号:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.phone" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row">
        <div class="ice-tag">
          邮箱:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.email" :disable="mode==='detail'"></ice-input>
        </div>
      </div>

      <div class="ice-row">
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

</style>