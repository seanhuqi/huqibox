<template>
  <div class="nav">
    <li class="item-nav" v-for="item in navs" :key="item.path">
      <router-link :class="{active:$route.path===item.path}" :to="item.path">{{item.tital}}</router-link>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { tital: "商品", path: "/goods" },
        { tital: "评价", path: "/ratings" },
        { tital: "商家", path: "/seller" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 40px;
  background: #fff;
  display: flex;
  border-bottom: solid 1px #f3f3f3;
  .item-nav {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    a {
      color: rgb(57, 57, 57);
      text-decoration: none;
      display: inline-block;
      height: 100%;
      width: 100%;
      &.active {
        color: rgba(214, 0, 0, 0.85);
        border-bottom: 2px solid #fd9d0a;
      }
    }
  }
}
</style>