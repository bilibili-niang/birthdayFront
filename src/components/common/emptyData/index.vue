<script setup lang="ts">

import {baseUrl} from "@/utils/config";
import iceAvatar from '@/components/common/avatar'
</script>

<template>
  <div class="emptyData">
    <div class="ice-text">
      暂无数据
    </div>
    <div class="emptyIcon">
      <iceAvatar :url="baseUrl+'/icons/empty.png'" size="s"></iceAvatar>
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