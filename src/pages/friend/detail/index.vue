<!--联系人列表页面,进入该页面为修改联系人信息-->
<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app"
import {ref, Ref} from 'vue'
import api from "@/utils/api";
import emptyData from "@/components/common/emptyData"

let friendId: Ref<String> = ref('')
onLoad((data: any) => {
  friendId.value = data.friendId
})
let data: Ref<Object> = ref({})
const init = async () => {
  await api.getFriendDetailById({
    friendId: friendId.value
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

init()
</script>

<template>
  <div class="friendDetail">
    <div class="ice-text">
      friendDetail
    </div>
    <emptyData v-if="JSON.stringify(data) === '{}'"></emptyData>
    <div class="ice-column" v-else>
      {{ data}}
    </div>
  </div>

</template>

<style scoped lang="less">

</style>