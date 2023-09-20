<template>
  <customNavBar :back="false" title="首页"></customNavBar>
  <iceSwiper :list="loopItem" @index="getIndex"></iceSwiper>
  <view class="container">
    <recommendMarkdown :list="loopItem" :activeIndex="activeIndex"></recommendMarkdown>
    <!--分类-->
    <classify :item="classifyItem"></classify>

    <view class="description">
      <view class="item">
        <view class="left">
          title
        </view>
        <view class="right">
          {{ randomOne?.title }}
        </view>
      </view>
    </view>
    <view class="content" v-html="content">
    </view>
  </view>
  <tabBar/>
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import IceSwiper from "./components/iceSwiper.vue";
import {ref} from "vue";
import api from "@/utils/api";
import RecommendMarkdown from "@/pages/index/components/recommendMarkdown.vue";
import Classify from "@/pages/index/components/classify.vue";
import {onPullDownRefresh} from "@dcloudio/uni-app";

let loopItem = ref<any>([])
const activeIndex = ref(0)
const getIndex = (id: number) => {
  // console.log(`前激活id: ${id}`)
  activeIndex.value = id
}

const content = ref('')

// 下拉触发获取随机文章
onPullDownRefresh(() => {
  random()
})

// 分类列表
const classifyItem = ref<any>([])

// 随机的一条数据
const randomOne = ref()

// 初始化方法
const init = async () => {
  const res = await api.homeRecommend()
  loopItem.value = res.result
  console.log(loopItem)
  const tags = await api.allTags()
  classifyItem.value = tags.result
  random()
}

const random = async () => {
  const random = await api.getRandomOne()
  randomOne.value = random.result
  const contentTemp = await api.getMarkdownContent({id: randomOne.value.id})
  if (contentTemp.success) {
    content.value = contentTemp.result + ''
  }
}

init()
</script>
<style scoped lang="less">
.container {
  padding-bottom: 10vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.text-area {
  display: flex;
  justify-content: center;
}

.description {
  margin-bottom: @margin-l;
}

.item {
  .flex-row();
  width: 100%;
  justify-content: space-evenly;
}

</style>
