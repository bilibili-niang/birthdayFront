<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

</script>

<template>
  <view class="userCard">
    <uni-section title="通栏卡片" type="line">
      <uni-card title="基础卡片" :isFull="true" sub-title="副标题" extra="额外信息" :thumbnail="avatar">
        <text class="uni-body">这是一个通栏卡片 ，通栏没有外边距，左右会贴合父元素。</text>
      </uni-card>
    </uni-section>

  </view>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";
.userCard {
  padding: @padding-l;
  box-sizing: border-box;
}
</style>