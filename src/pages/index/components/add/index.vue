<script lang="ts" setup>
import {computed, ref} from 'vue'
import {activeColor} from "@/utils/config";
import customPopup from "@/components/common/customPopup/index.vue";
import api from "@/utils/api";

const color = computed(() => {
  return activeColor
})
const customPopupRef = ref()
const open = () => {
  customPopupRef.value.show()
}

let formData = ref({
  birthday: "2023-11-10",
  lunaBirthday:''
})

/**
 * 打开日期选择器
 */
const openDayChoose = () => {
  console.log(calendar.value);
  calendar.value.open();
}

// 生日选择器的数据
let info = ref({})
let calendar = ref()
const birthdayChange = (val:any) => {
  console.log("birthdayChange")
  console.log("val:", val)
  let {lunar = null} = val
  formData.value.birthday = val.fulldate
  formData.value.lunaBirthday = val.lunar.IMonthCn + val.lunar.IDayCn

  if (lunar) {
    formData.value.animalSign = lunar.Animal
  }
}
/**
 * 提交
 */
const submitFormData = async () => {
  const data = JSON.parse(JSON.stringify(formData.value))
  console.log(Object.keys(data))
  await api.addBirthday(data)
      .then(res => {
        console.log("res:")
        console.log(res)
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })

}
</script>

<template>
  <view class="add" @click="open">
    <uni-icons type="plusempty" :color="color" size="30"></uni-icons>
  </view>

  <customPopup ref="customPopupRef">
    <uni-forms :modelValue="formData">

      <uni-section title="添加" type="line">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名"/>
        </uni-forms-item>

        <uni-forms-item label="生日" name="name">

          <view class="text" @click="openDayChoose">
            {{ formData.birthday }}
          </view>

        </uni-forms-item>
        <uni-calendar
            ref="calendar"
            :insert="false"
            :showMonth="false"
            lunar
            @confirm="birthdayChange"
        />

        <view class="row line">
          <view class="title">生肖</view>
          <view class="text">
            {{ formData.animalSign }}
          </view>
        </view>

        <view class="manBtn bottom" @click="submitFormData">
          submit
        </view>

      </uni-section>

    </uni-forms>

  </customPopup>

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
.line{
  display: flex;
  flex-direction: row;
  width: 100%;

  .title{
    width: 25%;
    background: gray;

    .text{
      flex: 1;
      background: rgba(0, 0, 0, .1);
    }
  }
}
</style>