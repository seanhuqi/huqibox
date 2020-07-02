<template>
  <div class="left-content">
    <div class="logo">
      <img width="50" height="50" src="../../assets/imgs/logo.png" alt />
    </div>
    <el-menu
      router
      :default-active="curActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
    >
      <!-- 后台首页 -->
      <el-menu-item index="/home">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 订单管理 -->
      <el-menu-item index="/order/order-list">
        <i class="iconfont icon-dingdan2"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <!-- 商品管理 -->
      <el-submenu index="goods">
        <template slot="title">
          <i class="iconfont icon-shangpin-tianchong"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
          <el-menu-item index="/goods/goods-add">添加商品</el-menu-item>
          <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="iconfont icon-dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <!-- 账号管理 -->
      <el-submenu index="account">
        <template slot="title">
          <i class="iconfont icon-icon_account"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/account/account-list">账号列表</el-menu-item>
          <el-menu-item index="/account/account-add">添加账号</el-menu-item>
          <el-menu-item index="/account/pass-modify">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 销售统计 -->
      <el-submenu index="total">
        <template slot="title">
          <i class="iconfont icon-tongji"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/total/goods-total">商品统计</el-menu-item>
          <el-menu-item index="/total/order-total">订单统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    // 当前激活
    curActive() {
      if (this.$route.path === "/order/order-detail")
        return "/order/order-list";

      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.left-content {
  .logo {
    margin-top: 10px;
    text-align: center;
  }

  /deep/.el-menu-item {
    background: red;
  }

  width: 200px;
  height: 100%;
  background: rgb(84, 92, 100);
  // h1 {
  //   margin-top: 30px;
  //   text-align: center;
  //   color: #fff;
  //   font-size: 16px;
  // }
  .iconfont {
    margin-right: 10px;
  }
  .icon-dingdan2,
  .icon-icon_account .icon-shouye {
    margin-left: -3px;
    font-size: 21px;
  }
  .el-menu {
    border-right: 0px;
  }
}
</style>