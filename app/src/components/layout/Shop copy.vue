<template>
  <div class="shop">
    <div class="left-content">
      <i class="iconfont icon-gouwucheman"></i>
      <i class="iconfont icon-fl-renminbi">0</i>
      <span>另需配送费￥4元</span>
    </div>
    <div class="right-content">
      <i class="iconfont icon-fl-renminbi"></i>
      20起送
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.shop {
  flex: 0 0 50px;
  background: #141c27;
  display: flex;
  .left-content {
    width: 70%;
    background: #131d26;
    position: relative;
    .icon-gouwucheman {
      position: absolute;
      top: -10px;
      left: 10px;
      border-radius: 50%;
      display: inline-block;
      background: #2b343d;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 25px;
      color: #808589;
    }
    .icon-fl-renminbi {
      position: absolute;
      margin-top: 10px;
      line-height: 30px;
      left: 14px;
      color: #808589;
      font-size: 25px;
      font-weight: bold;
      width: 50px;
      height: 30px;
      padding-left: 20%;
      border-right: #808589 solid 1px;
    }
    span {
      position: absolute;
      left: 130px;
      top: 18px;
      color: #808589;
      font-size: 12px;
    }
  }
  .right-content {
    width: 30%;
    background: #2b343b;
    color: #808589;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>