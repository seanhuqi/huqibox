<template>
  <div class="app">
    <!-- 头部 -->
    <Header :seller="seller"></Header>
    <!-- 导航栏 -->
    <Nav></Nav>
    <!-- 内容 -->
    <div class="content" ref="box">
      <router-view :goods="goods" :seller="seller" />
    </div>
    <!-- 购物车 -->
    <Shop></Shop>
  </div>
</template>

<script>
import Header from "./components/layout/Header/Header";
import Nav from "./components/layout/Nav";
import Shop from "./components/layout/Shop";
import { getGoodList, getSeller } from "./api/sell";

export default {
  components: {
    Header,
    Nav,
    Shop
  },
  data() {
    return {
      goods: {}, // 商品数据
      seller: {} // 商家数据
    };
  },
  async created() {
    let { goodsList } = await getGoodList(); // 获取商品数据
    // 循环 给每个食品都添加一个字段 count 数量
    for (let item of goodsList) {
      for (let food of item.foods) {
        food.count = 0;
      }
    }
    this.goods = goodsList; // 赋值
    // console.log("商品数据:", goodsList);

    // 直接把商品数据放入仓库中
    this.$store.commit("SET_GOODS", goodsList);

    let { data } = await getSeller(); // 获取商家数据
    this.seller = data; // 赋值
    console.log("商家数据:", data);
  }
};
</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f4f5f7;
  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>