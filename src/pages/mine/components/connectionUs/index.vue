<script setup lang="ts">
import {ref} from "vue"
import customPopup from "@/components/common/customPopup/index.vue";

let customPopupRef = ref()

const showPopup = () => {
  customPopupRef.value.show()
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
        <div class="ice-row white">
          text
        </div>
      </div>

    </customPopup>

  </div>
</template>

<style scoped lang="less">

</style>