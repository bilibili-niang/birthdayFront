<script setup lang="ts">
import {defineProps} from 'vue'
import {baseUrl} from "@/utils/config.js";

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {
        username: '张三',
        id: 1,
        avatar: '',
        word: ''
      }
    }
  }
})

</script>

<template>
  <view class="userCard">

    <uni-section title="关于我" type="line">
      <uni-card :title="info?.username" :isFull="true" :sub-title="'id'+info?.id" :thumbnail="baseUrl+info?.avatar">
        <text class="uni-body">{{ info?.word || '-' }}</text>
      </uni-card>
    </uni-section>

  </view>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";
.userCard{
  padding: @padding-l;
  box-sizing: border-box;
}
</style>