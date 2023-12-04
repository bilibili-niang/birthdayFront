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

const userCardClick = () => {
  console.log("userCardClick")
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

    <uni-section title="操作" subTitle="编辑我的信息?" type="line">
      <div class="ice-row">
        <div class="mainBtn">
          编辑
        </div>
      </div>
    </uni-section>

  </div>
</template>

<style scoped lang="less">
@import "src/static/css/variable.less";
.userCard{
  padding: 0 @padding-l;
  box-sizing: border-box;
}
</style>