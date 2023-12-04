<script setup lang="ts">
import {defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config.js";
import customPopup from "@/components/common/customPopup/index.vue";

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

</script>

<template>
  <div class="userCard">
    <uni-section title="关于我" type="line">
      <uni-card :title="info?.name" :isFull="true" sub-title="暂无" extra="操作"
                :thumbnail="baseUrl+info?.avatar" @click="userCardClick">
        <!-- <text class="uni-body">-->
        <div class="ice-column">
          <div class="ice-row alignCenter">
            <div class="ice-tag">生日:</div>
            {{ info?.birthday || '-' }}
          </div>
        </div>
      </uni-card>
    </uni-section>


    <customPopup ref="customPopupRef">
      <div class="ice-column layoutColumn">

        <div class="ice-row layoutLine" @click="goEditMein">
          <div class="icon">></div>
          <div class="ice-text">
            编辑我的信息
          </div>
        </div>

      </div>
    </customPopup>
  </div>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";
.userCard{
  padding: 0 @padding-l;
  box-sizing: border-box;
}
.layoutColumn{
  .layoutLine{
    justify-content: space-between;
    align-items: center;
  }
}
</style>