<template>
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 预留标题位置 -->
        <slot name="title"></slot>
        <slot name="btn" class="btn"></slot>
      </div>
      <div class="content">
        <!-- 预留内容位置 -->
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