<script setup lang="ts">
import {onHide, onLaunch, onShow} from "@dcloudio/uni-app";
import {loginByLocalToken} from "./mixin/userService.mixin.js";

onLaunch(() => {
  loginByLocalToken()

});
onShow(() => {

});
onHide(() => {

});
</script>
<style lang="less">
#app{
  margin-bottom: 10vh;
}

</style>
