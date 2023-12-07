<script setup lang="ts">
import {ref, Ref} from "vue"
import customPopup from "@/components/common/customPopup/index.vue";
import iceTextarea from "@/components/common/ice-textarea/index.vue"


let customPopupRef = ref()

const showPopup = () => {
  customPopupRef.value.show()
}
const submit = () => {
  if (text.value < 1) {
    return false
  } else {
// await api.
  }
}
let text: Ref<String> = ref('')
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
      <div class="ice-row justBetween white">
        <div class="ice-tag">或者</div>
        <div class="mainBtn" @click="showPopup">
          留言
        </div>
      </div>
    </div>


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