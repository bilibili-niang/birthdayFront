<script setup lang="ts">
import iceAvatar from '@/components/common/avatar'
import {defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config";
import iceInput from '@/components/common/iceInput'
import alertConfirm from "@/components/common/alertConfirm"

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
// 点击生日展开日期选择面板
let calendar = ref()
// 当进入编辑时,保存最初始的数据
let tempObj = ref()
const showCanlender = () => {
  if (props.mode === 'detail') {
    console.log(props.mode)
    return
  } else {
    calendar.value.open()
    tempObj.value = JSON.parse(JSON.stringify(data.value))
  }
}
const birthdayChange = (val: any) => {
  let {lunar = null} = val
  data.value.birthday = val.fulldate
  if (lunar) {
    data.value.lunaBirthday = lunar
    data.value.animalSign = lunar.Animal
    data.value.lunaBirthdayText = data.value.lunaBirthday?.IMonthCn + data.value.lunaBirthday?.IDayCn
  }
}

let alertConfirmRef = ref()

// 点击了重置,将data中的数据恢复到原来
const resetData = () => {
  console.log(alertConfirmRef.value)
  alertConfirmRef.value.show()

  if (tempObj.value) {
    data.value = JSON.parse(JSON.stringify(tempObj.value))
  }
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
          <ice-input v-model="data.name" :disable="mode==='detail'"></ice-input>
        </div>
      </div>
      <div class="ice-row" @click="showCanlender">
        <div class="ice-tag">
          生日:
        </div>
        <div class="lineLeft">
          <!-- <ice-input v-model="data.birthday" disable></ice-input>-->
          <div class="ice-text">
            {{ data.cYear }}-{{ data.cMonth }}-{{ data.cDay }}
          </div>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          阴历生日:
        </div>
        <div class="lineLeft">
          <!-- <ice-input v-model="data.lunaBirthday" disable></ice-input>-->
          <div class="ice-text">
            {{ data.IMonthCn }}-{{ data.IDayCn }}
          </div>
        </div>
      </div>
      <div class="ice-row">
        <div class="ice-tag">
          生肖:
        </div>
        <div class="lineLeft">
          <ice-input v-model="data.animalSign" disable></ice-input>
        </div>
      </div>
    </div>
    <div class="operate ice-column" v-if="mode==='edit'">
      <div class="ice-row widthFit">
        <div class="mainBtn" @click="complete">
          完成
        </div>
        <div class="verticalBlock"></div>
        <div class="mainBtn" @click="resetData">
          重置
        </div>
      </div>
    </div>

    <uni-calendar
        ref="calendar"
        :insert="false"
        :showMonth="false"
        lunar
        @confirm="birthdayChange"
    />

    <alertConfirm ref="alertConfirmRef" text="确定要重置吗,这会丢失当前已经修改的"></alertConfirm>

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

        ice-input{
          width: 100%;
        }
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