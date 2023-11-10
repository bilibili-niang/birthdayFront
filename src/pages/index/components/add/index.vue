<script lang="ts" setup>
import {computed, ref, Ref} from 'vue'
import {activeColor} from "@/utils/config";
import customPopup from "@/components/common/customPopup/index.vue";
import {dayType} from "@/components/type/day.d.ts";

const color = computed(() => {
  return activeColor
})
const customPopupRef = ref()
const open = () => {
  customPopupRef.value.show()
}

interface forDataInterface {
  name: string,
  birthday: string,
  animalSign: string
}

let formData: Ref<forDataInterface> = ref({
  name: '张三',
  birthday: '2023-01-01',
  // 生肖
  animalSign: ''
})

/**
 * 生日选择改变
 */
/*
date: 10
extraInfo: {}
fulldate: "2023-11-10"
lunar: Proxy {lYear: 2023, lMonth: 9, lDay: 27, Animal: "兔", IMonthCn: "九月", …}
month: 11
range: {before: "", after: "", data: Array(0)}
year: 2023
* */
const birthdayChange = (day: dayType) => {
  console.log(day.lunar)
  formData.value.birthday = day.fulldate;
  formData.value.animalSign = day.lunar.Animal;
}

const calendar = ref()
/**
 * 打开日期选择器
 */
const openDayChoose = () => {
  calendar.value.open();
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

        <uni-forms-item label="生日" name="gender">

          <uni-calendar
              ref="calendar"
              :insert="false"
              @confirm="birthdayChange"
          />
          <view class="birthdayContainer" @click="openDayChoose">
            {{ formData.birthday }}
          </view>
        </uni-forms-item>

        <uni-forms-item label="生肖" name="gender">
          <uni-easyinput v-model="formData.animalSign" placeholder="生肖"></uni-easyinput>
        </uni-forms-item>


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
</style>