<script setup lang="ts">
import {defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config.js";
import customPopup from "@/components/common/customPopup/index.vue";
import connectionUs from '../connectionUs/index.vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {
        username: '张三',
        randomId: 1,
        avatar: '',
        word: ''
      }
    }
  }
})

let customPopupRef = ref()
const userCardClick = () => {
  customPopupRef.value.show();
}
const goEditMein = () => {
  uni.navigateTo({url: '/pages/mine/edit/index'})
}

const cleanStorage = () => {
  uni.clearStorage()
  // 重启
  uni.reLaunch({
    url: '/pages/mine/index'
  })
}
</script>

<template>
  <div class="userCard">
    <uni-section title="关于我" type="line">
      <uni-card :title="info?.name" :isFull="true" sub-title="暂无" extra="操作"
                :thumbnail="baseUrl+info?.avatar" @click="userCardClick">
        <!-- <text class="uni-body">-->
        text
      </uni-card>
    </uni-section>

    <div class="userInfo ice-column">

      <div class="ice-row white justBetween">
        <div class="ice-text">手机号:</div>
        <div class="ice-text">{{ info?.phone || '-' }}</div>
      </div>

      <div class="ice-row white justBetween">
        <div class="ice-text">生日:</div>
        <div class="ice-text">{{ info?.birthday || '-' }}</div>
      </div>

    </div>

    <customPopup ref="customPopupRef">
      <div class="ice-column layoutColumn">

        <div class="ice-row layoutLine" @click="goEditMein">
          <div class="icon">></div>
          <div class="mainBtn">
            编辑我的信息
          </div>
        </div>

        <div class="ice-row layoutLine">
          <div class="icon">></div>
          <div class="mainBtn" @click="cleanStorage">
            clean
          </div>
        </div>
      </div>

      <connectionUs/>
    </customPopup>
  </div>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";
.userCard{
  padding: @padding-l;
  box-sizing: border-box;
  border-radius: @padding-n;
}
.layoutColumn{
  .layoutLine{
    justify-content: space-between;
    align-items: center;
  }
}
</style>