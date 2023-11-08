<script lang="ts" setup>
import {computed, ref} from 'vue'
import {activeColor} from "@/utils/config";
import customPopup from "@/components/common/customPopup/index.vue";

const color = computed(() => {
  return activeColor
})
const customPopupRef = ref()
const open = () => {
  // console.log(customPopupRef.value);
  customPopupRef.value.show()
}
let formData = ref({})

const submitForm = () => {

}
</script>

<template>
  <view class="add" @click="open">
    <uni-icons type="plusempty" :color="color" size="30"></uni-icons>
  </view>

  <customPopup ref="customPopupRef"></customPopup>

</template>

<style scoped lang="less">
.add{
  position: fixed;
  bottom: 5vh;
  right: 2vw;
  border: @themeActiveColor 1px solid;
  display: flex;
  min-width: 120upx;
  min-height: 120upx;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}
</style>