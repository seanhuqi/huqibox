<template>
  <div class="header">
    <!-- 上 -->
    <div class="top">
      <img class="avatar" width="60" height="60" :src="seller.avatar" alt />
      <div class="right-text">
        <div class="biaoti">
          <img src="../../../assets/img/brand.png" width="30px" alt />
          <span>{{seller.name}}</span>
        </div>
        <div class="text-buttom">
          <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>

          <p v-if="seller.supports">{{seller.supports[0]}}</p>
        </div>
        <span @click="showModal" v-if="seller.supports" class="btn">
          {{ seller.supports.length }}个活动
          <i class="iconfont icon-jiantou"></i>
        </span>
      </div>
    </div>
    <p></p>
    <!-- 下 -->
    <div class="bottom" @click="showModal">
      <img src="../../../assets/img/bulletin.png" width="30px" alt />
      {{seller.bulletin}}
    </div>
    <!-- 模态框组件 -->
    <transition name="detail">
      <DetaiModal @close="closeModal" :seller="seller" v-show="visible" />
    </transition>
  </div>
</template>

<script>
import DetaiModal from "../Header/DetaiModal";
export default {
  components: {
    DetaiModal
  },
  props: ["seller"],
  data() {
    return {
      visible: false
    };
  },
  methods: {
    // 打开蒙层
    showModal() {
      this.visible = true;
    },
    // 关闭蒙层
    closeModal() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 150px;
  background: url("../../../assets/img/店铺图.jpg") center;
  background-size: 70%;

  .top {
    height: 120px;
    display: flex;
    box-sizing: border-box;
    padding: 35px;
    position: relative;
    background: rgba(59, 59, 59, 0.51);
    font-weight: 100;

    .avatar {
      border-radius: 8px;
    }
    .right-text {
      color: #ffffff;
      margin-left: 15px;
      font-size: 16px;

      .biaoti {
        line-height: 20px;
        margin: 5px 0;
        img {
          display: inline-block;
          vertical-align: middle;
        }
        span {
          font-size: 22px;
          line-height: 16px;
          font-weight: bold;
        }
      }
      .text-buttom {
        font-size: 12px;
        p {
          margin-bottom: 3px;
        }
      }
      .btn {
        position: absolute;
        right: 20px;
        bottom: 10px;
        background: rgba(49, 49, 49, 0.599);
        padding: 8px 12px;
        border-radius: 20px;
        color: #ffffff;
        font-size: 12px;
        font-weight: 100;
        line-height: 12px;
        i {
          vertical-align: middle;
        }
      }
    }
  }
  .bottom {
    height: 30px;
    background: rgba(39, 38, 38, 0.599);
    font-size: 14px;
    line-height: 30px;
    padding: 0 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #f3f3f3;
    img {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .detail-enter-active,
  .detail-leave-active {
    transition: opacity 0.5s;
  }
  .detail-enter,
  .detail-leave-to {
    opacity: 0;
  }
}
</style>