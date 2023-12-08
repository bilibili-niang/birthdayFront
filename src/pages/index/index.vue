<template>
  <view class="container">
    <!--展示联系人生日列表-->
    <view class="description">
      <view class="itemLim">
        <div class="ice-row white">
          <div class="ice-text">
            联系人列表
          </div>
        </div>
        <view class="item" v-for="(item,index) in userList" :key="index" @click="friendDetail(item)">
          <uni-card :title="item.name" :sub-title="'关系:'+(item.relationship||'-')"
                    :extra="'距离生日还有'+getDaysToBirthday(item.cMonth,item.cDay)+'天'"
                    :thumbnail="baseUrl+item.avatar">
            <div class="ice-row">
              <div class="ice-tag">生日:</div>
              <div class="ice-text">
                {{ item.cMonth }}-{{ item.cDay }}
              </div>
            </div>
          </uni-card>
        </view>
      </view>
    </view>
    <add v-if="userFlag" @close="addPopupClose"></add>
  </view>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import api from "@/utils/api";
import {onPullDownRefresh, onReady, onShow} from "@dcloudio/uni-app";
import dayjs from "dayjs";
import {useMemberStore} from "@/stores";
import Add from "./components/add/index.vue";
import {baseUrl} from "@/utils/config";

let loopItem = ref<any>([])

const content = ref('')

// 下拉触发获取随机文章
onPullDownRefresh(() => {
  getPeopleList();
})

// 分类列表
const classifyItem = ref<any>([])

// 初始化方法
const init = async () => {
  const res = await api.homeRecommend()
  loopItem.value = res.result
  const tags = await api.allTags()
  classifyItem.value = tags.result
}

interface userObject {
  name: string,
  avatar: string,
  birthday: string,
  icon: string,
}

let userList = ref<userObject[]>([
  {
    name: '张三',
    avatar: '/images/avatar.png',
    birthday: dayjs().format('YYYY-MM-DD'),
    icon: '/images/icon_user.png',
  }
])
let userFlag = ref(false)

const store = useMemberStore();
onReady(async () => {
  const token = uni.getStorageSync("token");
  if (!token) {
    return false;
  } else {
    await api.loginByToken(token)
        .then(res => {
          userFlag.value = true
          store.setProfile(res.result);
        })
  }
})
let onLoadFlag = ref(true)
onShow(async () => {
  if (!onLoadFlag.value) {
    return false;
  }
  const token = uni.getStorageSync("token");
  if (token) {
    await api.loginByToken(token)
        .then(res => {
          userFlag.value = true
          store.setProfile(res.result);
          onLoadFlag.value = false
          getPeopleList()
        })
  }
})

/**
 * 获取联系人列表
 */
const getPeopleList = async () => {
  await api.getPeopleList()
      .then(res => {
        uni.stopPullDownRefresh();
        userList.value = res.result
      })

}
// 跳转联系人详情
const friendDetail = (item: any) => {
  const {friendId = null} = item;
  if (!friendId) {
    uni.showToast({
      title: '该联系人无法跳转',
      icon: 'error',
      duration: 1300
    })
    return false
  } else {
    // 跳转
    uni.navigateTo({
      url: '/pages/friend/detail/index?friendId=' + friendId
    });
  }
}
/**
 * 添加弹窗关闭,重新获取数据
 */
const addPopupClose = () => {
  getPeopleList();
  userFlag.value = !userFlag.value
}
getPeopleList()
/**
 * 计算距离天数
 */
const distanceDays = computed(() => {
  return getDaysToBirthday()

})
//给出生日的月份和日期，计算还有多少天过生日
const getDaysToBirthday = (month: number, day: number) => {
  const nowTime: any = new Date();
  const thisYear = nowTime.getFullYear();
  //今年的生日
  const birthday: any = new Date(thisYear, month - 1, day);

  //今年生日已过，则计算距离明年生日的天数
  if (birthday < nowTime) {
    birthday.setFullYear(nowTime.getFullYear() + 1);
  }
  const timeDec = birthday - nowTime;
  const days = timeDec / (24 * 60 * 60 * 1000);
  return Math.ceil(days);
}

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
