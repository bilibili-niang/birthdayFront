<template>
  <view class="container">
    <!--展示联系人生日列表-->
    <view class="description">
      <view class="itemLim">
        <uni-section title="联系人列表" type="line">
          <view class="item" v-for="(item,index) in userList" :key="index" @click="friendDetail(item)">
            <uni-card :title="item.name" :sub-title="'关系:'+item.relationship" :extra="'还有n天'"
                      :thumbnail="baseUrl+item.avatar">
              <div class="ice-row">
                <div class="ice-tag">出生年月:</div>
                <div class="ice-text">
                  {{ item.birthday }}
                </div>
              </div>
            </uni-card>
          </view>
        </uni-section>
      </view>
    </view>
    <add v-if="userFlag" @close="addPopupClose"></add>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import api from "@/utils/api";
import {onPullDownRefresh, onShow} from "@dcloudio/uni-app";
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
