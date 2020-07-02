<template>
  <div class="DetaiModal">
    <div class="content">
      <!-- 上 -->
      <div class="top">
        <!-- 店铺名 -->
        <h3>{{seller.name}}</h3>
        <p>
          <van-rate v-model="value" readonly />
        </p>
        <!-- 评分 -->
      </div>
      <!-- 中 -->
      <div class="main">
        <van-divider>优惠信息</van-divider>
        <p v-if="seller.supports">
          <img src="../../../assets/img/special.png" width="15" alt />
          {{seller.supports[0]}}
        </p>
        <p v-if="seller.supports">
          <img src="../../../assets/img/discount.png" width="15" alt />
          {{seller.supports[1]}}
        </p>
        <p v-if="seller.supports">
          <img src="../../../assets/img/decrease.png" width="15" alt />
          {{seller.supports[2]}}
        </p>
      </div>
      <!-- 下 -->
      <div class="bottom">
        <van-divider>商家公告</van-divider>
        <p>{{seller.bulletin}}</p>
      </div>
      <div class="btn">
        <span @click="hideModal">×</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["seller"],
  data() {
    return {
      value: 4.5
    };
  },
  methods: {
    hideModal() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.DetaiModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(28, 30, 39, 0.904);
  z-index: 999;

  .content {
    text-align: center;
    margin-top: 20%;
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 40px;
    .van-divider {
      font-weight: bold;
      font-size: 14px;
      color: #fff;
    }
    .top {
      h3 {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: bold;
      }
    }
    .main {
      margin-top: 30px;
      font-size: 14px;
      text-align: left;
      font-weight: 50;
      p {
        margin-bottom: 15px;
        img {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .bottom {
      font-size: 14px;
      text-align: left;

      p {
        line-height: 20px;
        font-weight: 50;
      }
    }
    .btn {
      font-size: 40px;
      color: rgb(193, 193, 193);
      position: absolute;
      bottom: 50px;
      left: 50%-2px;
    }
  }
}
</style>