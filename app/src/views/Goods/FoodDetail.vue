<template>
  <div class="father" ref="father">
    <div class="food-detail">
      <div class="content">
        <!-- 头部 -->
        <div class="top">
          <img :src="food.imgUrl" width="100%" alt />
          <div class="jieshao">
            <p class="name">{{food.name}}</p>
            <p class="info">月售{{food.sellCount}}份好评率100%</p>
            <p class="jiage">￥{{food.price}}</p>
          </div>
        </div>
        <!-- 介绍 -->
        <div class="main">
          <p>商品介绍</p>
          <span>{{food.goodsDesc}}</span>
        </div>
        <!-- 评价 -->
        <div class="pinjia">
          <p>商品评价</p>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
          <div class="btnBox">{{food.goodsDesc}}</div>
        </div>
      </div>
      <span @click="hideDetail" class="close">x</span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: ["food"],
  methods: {
    // 隐藏详情
    hideDetail() {
      this.$emit("close"); // 告诉父亲 关闭详情页面
    }
  },
  mounted() {
    // this.main = new BScroll(this.$refs.father2);
  }
};
</script>

<style lang="less" scoped>
.father {
  height: 100%;
  .food-detail {
    // overflow: scroll;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f4f5f7;
    height: 100%;
    width: 100%;
    z-index: 2;

    .content {
      .top {
        line-height: 23px;
        .jieshao {
          box-sizing: border-box;
          padding: 20px;
          widows: 100%;
          height: 100px;
          background: #fff;
          .name {
            font-weight: bold;
            font-size: 16px;
          }
          .info {
            font-weight: 100;
            font-size: 10px;
            color: #9299a1;
          }
          .jiage {
            font-weight: bold;
            font-size: 16px;
            color: #fe0e19;
          }
        }
      }
      .main {
        box-sizing: border-box;
        padding: 20px;
        margin-top: 20px;
        width: 100%;
        // height: 100px;
        background: #fff;
        span {
          font-size: 12px;
          font-weight: 100;
        }
      }
      .pinjia {
        box-sizing: border-box;
        padding: 20px;
        margin-top: 20px;
        background: #fff;
        // display: flex;
        // flex-wrap: wrap;
        p {
          flex: 0 0 100px;
        }

        .btnBox {
          flex: 1;
          height: 50px;
          border-bottom: 1px solid red;
        }
      }
    }
    .close {
      position: fixed;
      top: 85%;
      right: 50%;
      text-align: center;
      font-size: 30px;
      // color: #ffffff;
    }
  }
}
</style>