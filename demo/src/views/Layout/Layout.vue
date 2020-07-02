<template>
  <div class="layout">
    <!-- 左侧组件 -->
    <LeftContent />
    <!-- 右侧组件 -->
    <div class="main">
      <!-- 面包屑导航 -->
      <RightHeader />
      <div class="content">
        <!-- 路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftContent from "./LeftContent.vue";
import RightHeader from "./RightHeader.vue";
export default {
  components: {
    LeftContent,
    RightHeader
  }
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    .content {
      background: #f0f2f5;
      flex: 1;
      box-sizing: border-box;
      padding: 20px;
    }
  }
}
</style>