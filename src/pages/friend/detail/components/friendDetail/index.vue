<script setup lang="ts">
import iceAvatar from '@/components/common/avatar'
import {defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config";
import iceInput from '@/components/common/iceInput'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 模式
   * @example{mode}
   * detail (默认) 仅仅展示,无法修改
   * edit 展示并可以修改
   */
  mode: {
    type: String,
    default: 'detail'
  }
})
let data = ref({})
const init = () => {
  data.value = props.item
}

/**
 * 完成的提交
 */
const complete = () => {
  console.log(data.value)
}
init()
</script>

<template>
  <div class="friendDetail">
    <div class="friendInfo ice-column ">
      <iceAvatar :url="baseUrl+item.avatar" size="s"></iceAvatar>
      <div class="ice-row">
        <div class="ice-tag">
          名字:
        </div>
        <div class="lineLeft">
          <!--<div class="ice-text" v-if="mode==='detail'">
                      {{ data.name }}
                    </div>-->
          <ice-input v-model="data.name" :disable="mode==='detail'"></ice-input>
          <!--<uni-easyinput v-model="data.name" placeholder="名字" :disabled="mode==='detail'" v-else></uni-easyinput>-->
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          生日:
        </div>
        <div class="lineLeft">
          <div class="ice-text" v-if="mode==='detail'">
            {{ data.birthday }}
          </div>
          <uni-easyinput v-model="data.birthday" placeholder="生日" :disabled="mode==='detail'" v-else></uni-easyinput>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          阴历生日:
        </div>
        <div class="lineLeft">
          <div class="ice-text" v-if="mode==='detail'">
            {{ data.lunaBirthday }}
          </div>
          <uni-easyinput v-model="data.lunaBirthday" placeholder="阳历生日" :disabled="mode==='detail'"
                         v-else></uni-easyinput>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          生肖:
        </div>
        <div class="lineLeft">
          <div class="ice-text" v-if="mode==='detail'">
            {{ data.animalSign }}
          </div>
          <uni-easyinput v-model="data.animalSign" placeholder="生肖" :disabled="mode==='detail'"
                         v-else></uni-easyinput>
        </div>
      </div>
    </div>
    <div class="operate ice-column" v-if="mode==='edit'">
      <div class="ice-row widthFit">
        <div class="mainBtn" @click="complete">
          完成
        </div>
        <div class="verticalBlock"></div>
        <div class="mainBtn">
          重置
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less">
.friendDetail{
  margin: @margin-m;
  box-sizing: border-box;

  .friendInfo{
    padding: @padding-s-s;
    background: @bacColor-bleak-bleak;
    border-radius: @radio-m;

    .ice-row{
      justify-content: space-between;
      margin-bottom: @margin-s;

      .lineLeft{
        width: 70%;
        height: 2.1rem;
        display: flex;
        align-items: center;
      }
    }
  }

  .operate{
    padding: @padding-s-s;
    background: @bacColor-bleak-bleak;
    border-radius: @radio-m;
    margin-top: @margin-m;
  }

}

</style>