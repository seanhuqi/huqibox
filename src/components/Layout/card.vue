<template>
  <div class="card">
    <!-- 卡片封装 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 头部 -->
        <slot name="title"></slot>
      </div>
      <!-- 内容 -->
      <div>
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>