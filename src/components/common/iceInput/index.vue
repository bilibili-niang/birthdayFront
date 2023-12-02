<script setup lang="ts">
import {computed, defineEmits, defineProps} from 'vue';

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  /**
   * 是否开启input禁用
   */
  disable: {
    type: Boolean,
    default: false
  }
})

const nativeInputValue = computed(() =>
    props.modelValue === null || props.modelValue === undefined
        ? ""
        : String(props.modelValue)
)

const handleChange = (e: any) => {
  const value = e.target.value
  if (value === nativeInputValue.value) return
  emits("update:modelValue", value)
}
</script>

<template>
  <div class="ice-input">
    <div class="ice-text inputBlock" v-if="disable">
      {{ nativeInputValue }}
    </div>
    <input type="text" :value="nativeInputValue" :disable="disable"
           @input="handleChange" class="inputContent ice-text" v-else>
  </div>
</template>

<style scoped lang="less">
ice-input{
  width: 100%;
}
.ice-input{
  width: 100%;

  .inputBlock{
    border-bottom: rgba(0, 0, 0, 0) 1px solid;
  }

  .inputContent{
    width: 100%;
    transition-duration: @time-m;
    border-bottom: @borderColor 1px solid;
  }
}

</style>