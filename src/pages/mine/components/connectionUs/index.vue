<script setup lang="ts">
import {ref, Ref} from "vue"
import customPopup from "@/components/common/customPopup/index.vue";
import iceTextarea from "@/components/common/ice-textarea/index.vue"
import api from "@/utils/api";


let customPopupRef = ref()

const showPopup = () => {
  customPopupRef.value.show()
}
let text: Ref<string> = ref('')
const submit = async () => {
  if (!text.value) {
    return false
  } else {
    await api.submitMessage(text.value)
        .then(res => {
          if (res.success) {
            uni.showToast({
              duration: 1300,
              icon: 'none',
              title: res.message + ''
            })

          }
        })
        .catch(e => {
          console.log("e:")
          console.log(e)
        })
  }
}
</script>

<template>
  <div class="connectionsUs">
    <div class="ice-column">

      <div class="ice-row justBetween white">
        <div class="ice-tag">联系我们</div>
        <div class="ice-text">
          killicestone@126.com
        </div>
      </div>
      <div class="ice-column justBetween white">
        <div class="ice-tag">或者</div>
        <!-- <div class="mainBtn" @click="showPopup">
                  留言
                </div>-->

        <div class="ice-column">
          <div class="ice-text">
            建议?留言?
          </div>
          <ice-textarea v-model="text"></ice-textarea>
        </div>
        <div class="transverseBlock"></div>
        <div class="ice-row">
          <div class="mainBtn" @click="submit">
            提交
          </div>
        </div>
      </div>
    </div>

    <!--从上到下的弹窗-->
    <customPopup ref="customPopupRef" height="70vh">
      <div class="ice-column">
        <div class="ice-text">
          建议?留言?
        </div>
        <ice-textarea :value="text"></ice-textarea>
      </div>
      <div class="transverseBlock"></div>
      <div class="ice-row">
        <div class="mainBtn" @click="submit">
          提交
        </div>
      </div>

    </customPopup>

  </div>
</template>

<style scoped lang="less">

</style>