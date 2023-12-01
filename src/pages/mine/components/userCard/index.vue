<script setup lang="ts">
import {defineProps} from 'vue'
import {baseUrl} from "@/utils/config.js";

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

</script>

<template>
  <div class="userCard">
    <uni-section title="关于我" type="line">
      <uni-card :title="info?.name" :isFull="true" sub-title="暂无"
                :thumbnail="baseUrl+info?.avatar">
        <!-- <text class="uni-body">-->
        <div class="ice-column">
          <div class="ice-row alignCenter">
            <div class="ice-tag">生日:</div>
            {{ info?.birthday || '-' }}
          </div>
        </div>
      </uni-card>
    </uni-section>

  </div>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";
.userCard{
  padding: @padding-l;
  box-sizing: border-box;
}
</style>