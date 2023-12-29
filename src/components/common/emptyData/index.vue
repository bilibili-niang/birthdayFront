<script setup lang="ts">
import {baseUrl} from "@/utils/config";
import iceAvatar from '@/components/common/avatar'

const props = defineProps({
  title: {
    type: String,
    default: '暂无数据'
  }
})

</script>

<template>
  <div class="emptyData">
    <div class="ice-text ice-row justCenter">
      {{ title }}
    </div>
    <div class="emptyIcon">
      <iceAvatar :url="baseUrl+'/icons/empty.png'" size="s"></iceAvatar>
    </div>
    <div class="ice-column">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.emptyIcon{
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: @radio-m;
  background: @bacColor;
  justify-content: center;
  align-items: center;
}

</style>