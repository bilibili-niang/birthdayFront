<script lang="ts" setup>
import {computed, ref, Ref} from 'vue'
import {activeColor, baseUrl} from "@/utils/config";
import customPopup from "@/components/common/customPopup/index.vue";
import api from "@/utils/api";
import iceInput from '@/components/common/iceInput'
import iceAvatar from '@/components/common/avatar'
import flow from "@/utils/flow.js"

const color = computed(() => {
  return activeColor
})
const customPopupRef = ref()
const open = () => {
  customPopupRef.value.show()
}

let formData: Ref<any> = ref({})

/**
 * 打开日期选择器
 */
const openDayChoose = () => {
  calendar.value.open();
}

// 生日选择器的数据
let info = ref({})
let calendar = ref()
const birthdayChange = (val: any) => {
  let {lunar = null} = val
  formData.value.birthday = val.fulldate
  if (lunar) {
    formData.value.lunaBirthday = lunar
    formData.value.animalSign = lunar.Animal
    formData.value.lunaBirthdayText = formData.value.lunaBirthday?.IMonthCn + formData.value.lunaBirthday?.IDayCn
  }
}
// 是否允许提交
let allowFlag = ref(true)
/**
 * 提交
 */
const submitFormData = async () => {
  if (!allowFlag.value) {
    return
  }
  allowFlag.value = false
  const data = JSON.parse(JSON.stringify(formData.value))
  const verifyRes = flow.verify(data, ['name', 'birthday', 'lunaBirthday'])
  uni.showToast({
    title: '添加中',
    icon: 'none'
  });
  if (!verifyRes.flag) {
    uni.showToast({
      duration: 1300,
      icon: 'none',
      mask: true,
      title: '请选择生日'
      // title: (verifyRes.result).join(',')
    })
    allowFlag.value = true
    return false;
  }
  await api.addBirthday(data)
      .then(res => {
        if (res.success) {
          uni.showToast({
            title: '添加成功',
            icon: 'success'
          });
          setTimeout(() => {
            uni.hideToast();
            customPopupRef.value.close()
            emits('close')
          }, 1500)
        } else {
          // 添加失败
          uni.showToast({
            title: (res.message + ''),
            duration: 2000,
            icon: 'none'
          });
        }
        allowFlag.value = true
      })
      .catch(e => {
        console.log(e)
        allowFlag.value = true
      })
}
const emits = defineEmits(['close'])
/**
 * 取消
 */
const cancelSubmit = () => {
  customPopupRef.value.close()
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
          <ice-input v-model="formData.name"></ice-input>
        </uni-forms-item>
        <uni-forms-item label="生日" name="name">
          <ice-input v-model="formData.birthday" disable @clickTrigger="openDayChoose"
                     placeholderText="点击选择日期"></ice-input>
        </uni-forms-item>
        <uni-forms-item label="阴历" name="name">
          <ice-input v-model="formData.lunaBirthdayText" disable placeholderText="请点击生日进行选择"></ice-input>
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
            <!-- <ice-input v-model="formData.animalSign" disable></ice-input>-->
            <view class="animalSign ice-row">
              {{ formData.animalSign || "请点击生日进行选择" }}
              <div v-if="formData.animalSign">
                <iceAvatar :url="baseUrl+'/icons/animalSign/'+formData.animalSign+'.png'" size="s"></iceAvatar>
              </div>
            </view>
          </view>
        </view>
        <div class="row">
          <div class="manBtn bottom" @click="submitFormData">添加</div>
          <div class="verticalBlock"></div>
          <div class="manBtn" @click="cancelSubmit">取消</div>
        </div>
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
  align-items: center;

  .title{
    width: 20%;
    max-width: 20%;

    .text{
      flex: 1;
    }
  }
}
/deep/ .uni-forms-item__content{
  display: flex;
  align-items: center;
}
</style>