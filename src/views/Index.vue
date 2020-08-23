<template>
  <div class="index">
    <!-- 左侧导航栏 -->
    <LeftNav></LeftNav>
    <!-- 右侧内容 -->
    <RightContent></RightContent>
  </div>
</template>

<script>
import LeftNav from "../components/Layout/leftNav";
import RightContent from "../components/Layout/rightContent";
export default {
  components: {
    LeftNav,
    RightContent
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>