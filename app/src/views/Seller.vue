<template>
  <div class="father" ref="father">
    <div class="seller">
      <div class="top">
        <div class="biaoti">
          <div>
            <h1>{{seller.name}}</h1>
            <p>
              <van-rate size="14px" v-model="value1" allow-half void-icon="star" void-color="#eee" />
              <span>(661)月售2045单</span>
            </p>
          </div>
          <div>
            <i class="iconfont icon-shoucang"></i>
            <p>已收藏</p>
          </div>
        </div>
        <div class="xinxi">
          <div>
            <p>起送价</p>
            <span>20</span>
            <i>元</i>
          </div>
          <div>
            <p>商家配送</p>
            <span>4</span>
            <i>元</i>
          </div>
          <div>
            <p>平均配送时间</p>
            <span>39</span>
            <i>分钟</i>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="gonggao">
          <p>活动与公告</p>
          <span>{{seller.bulletin}}</span>
        </div>
        <div class="youhui">
          <p v-if="seller.supports">
            <img src="../assets/img/special.png" width="15" alt />
            {{seller.supports[0]}}
          </p>
          <p v-if="seller.supports">
            <img src="../assets/img/discount.png" width="15" alt />
            {{seller.supports[1]}}
          </p>
          <p v-if="seller.supports">
            <img src="../assets/img/decrease.png" width="15" alt />
            {{seller.supports[2]}}
          </p>
        </div>
      </div>
      <div class="dianpu">
        <h1>商家实景</h1>
        <div>
          <img src="../assets/img/店铺店2.jpg" width="100px" height="70px
      " alt />
          <img src="../assets/img/店铺3.jpg" width="100px" height="70px
      " alt />
          <img src="../assets/img/店铺图.jpg" width="100px" height="70px
      " alt />
          <img src="../assets/img/店铺店2.jpg" width="100px" height="70px
      " alt />
          <img src="../assets/img/店铺3.jpg" width="100px" height="70px
        " alt />
        </div>
      </div>
      <div class="message">
        <h1>商家信息</h1>
        <p>该商家支持开发票</p>
        <p>品类：甜点类</p>
        <p>地址：北京市昌平区回龙观西大街龙冠置大厦底伤B座102单元</p>
        <p>营业时间：10：00-20：30</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: ["seller"],
  data() {
    return {
      value1: 4.5
    };
  },
  methods: {
    created() {
      // this.seller = seller;
    },
    mounted() {
      this.content2 = new BScroll(this.$refs.father);
    }
  }
};
</script>

<style lang="less" scoped>
.father {
  height: 100%;
  overflow: scroll;
  .seller {
    .top {
      margin-top: 1px;
      box-sizing: border-box;
      padding: 20px;
      background: #fff;
      .biaoti {
        display: flex;
        justify-content: space-between;

        i {
          color: #51585e;
        }
        div {
          h1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          i {
            font-size: 30px;
            color: #ec1717;
          }
          p {
            font-size: 12px;
            color: #51585e;
          }
        }
      }
      .xinxi {
        margin-top: 20px;
        display: flex;
        p {
          color: #51585e;
          font-size: 12px;
          padding-bottom: 5px;
        }
        span {
          color: #51585e;
          font-size: 24px;
          font-weight: 100;
        }
        i {
          font-size: 12px;
        }
        div {
          text-align: center;
          width: 33%;
          height: 50px;
        }
      }
    }
    .main {
      margin-top: 20px;
      box-sizing: border-box;
      padding: 20px;
      background: #fff;
      .gonggao {
        p {
          font-size: 16px;
          font-weight: bold;
          margin: 20px 0;
        }
        span {
          color: #51585e;
          font-weight: 100;
          font-size: 14px;
        }
      }
      .youhui {
        p {
          font-weight: 100;
          margin: 30px 0;
          color: #51585e;
        }
      }
    }
    .dianpu {
      margin-top: 20px;
      box-sizing: border-box;
      padding: 20px;
      background: #fff;
      h1 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      div {
        display: flex;
        overflow-x: scroll;
        img {
          margin: 0 10px;
        }
      }
    }
    .message {
      margin-top: 20px;
      box-sizing: border-box;
      padding: 20px;
      background: #fff;
      h1 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        line-height: 50px;
        height: 50px;
        font-size: 12px;
        border-bottom: 1px solid #f3f3f3;
        font-weight: 100;
      }
    }
  }
}
</style>