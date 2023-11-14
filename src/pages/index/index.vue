<template>
  <customNavBar :back="false" title="首页"></customNavBar>
  <!--  <iceSwiper :list="loopItem" @index="getIndex"></iceSwiper>-->
  <view class="container">
    <!--分类-->
    <!--<classify :item="classifyItem"></classify>-->

    <!--展示联系人生日列表-->
    <view class="description">
      <view class="itemLim">
        <view class="item" v-for="(item,index) in userList" :key="index">

          <!-- <uni-section title="通栏卡片" type="line">-->
          <uni-card :title="item.name" sub-title="副标题" :extra="'还有n天'" :thumbnail="item.avatar">
            <text>{{ item.birthday }}</text>
          </uni-card>

        </view>

      </view>
    </view>
    <add v-if="userFlag"></add>

    <view class="mainBtn" @click="getPeopleList">
      get
    </view>
  </view>
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import {reactive, ref} from "vue";
import api from "@/utils/api";
import {onPullDownRefresh, onShow} from "@dcloudio/uni-app";
import dayjs from "dayjs";
import {useMemberStore} from "@/stores";
import Add from "./components/add/index.vue";

let loopItem = ref<any>([])

const content = ref('')

// 下拉触发获取随机文章
onPullDownRefresh(() => {
})

// 分类列表
const classifyItem = ref<any>([])

// 初始化方法
const init = async () => {
  const res = await api.homeRecommend()
  loopItem.value = res.result
  console.log(loopItem)
  const tags = await api.allTags()
  classifyItem.value = tags.result
}

interface userObject {
  name: string,
  avatar: string,
  birthday: string,
  icon: string,
}

let userList = reactive<userObject[]>([
  {
    name: '张三',
    avatar: '/static/images/avatar.png',
    birthday: dayjs().format('YYYY-MM-DD'),
    icon: '/static/images/icon_user.png',
  }
])
let userFlag = ref(false)

const store = useMemberStore();
onShow(async () => {
  const token = uni.getStorageSync("token");
  if (!token) {
    return false;
  }
  await api.loginByToken({
    token
  })
      .then(res => {
        userFlag.value = true
        store.setProfile(res.result);
      })
})
// init()

/**
 * 获取联系人列表
 */
const getPeopleList = async () => {
  await api.getPeopleList()
      .then(res => {
        userList = res.result
      })
}

getPeopleList()
</script>

<style scoped lang="less">
.container{
  padding-bottom: 10vh;
}

.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.text-area{
  display: flex;
  justify-content: center;
}

.description{
  margin-bottom: @margin-l;

  .itemLim{
    display: flex;
    flex-direction: column;

    .item{
      display: flex;
      flex-direction: column;

      /deep/ .uni-card{
        padding: 0;
      }
    }
  }
}
</style>
