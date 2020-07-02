<template>
  <div class="shop-cart">
    <!-- 购物车 -->
    <div class="shop-cart-wrap">
      <!-- 左侧盒子 -->
      <div @click="changeVisible" class="left-box">
        <div class="icon-wrap" :class="{active: totalCount > 0}">
          <i class="iconfont icon-gouwucheman"></i>
          <span class="jiage" v-show="totalCount > 0">{{ totalCount }}</span>
        </div>
        <div class="content-box">
          <span style="color: #808589;">{{ totalCount > 0 ? '￥' + totalPrice : '未选中商品' }}</span>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right-box">
        <button v-if="totalPrice > 20">去结算</button>
        <span v-else-if="totalPrice > 0">还差{{ (20 - totalPrice).toFixed(2) }}元</span>
        <span v-else>￥20起送</span>
      </div>
    </div>

    <!-- 购物列表 -->
    <transition name="slide">
      <div v-show="visible" class="shop-cart-list">
        <div class="header">
          <span>已选购商品</span>
          <span @click="empty">清空</span>
        </div>
        <ul class="list">
          <!-- 动态循环出来 -->
          <li v-for="item in shopListData" :key="item.name">
            <p>
              <span>{{ item.name }}</span>
              <span>￥{{ (item.price * item.count).toFixed(2) }}</span>
            </p>
            <div class="control-box">
              <!-- + - 组件 -->
              <i class="iconfont icon-jian" @click="changeCount(item.name, -1)"></i>
              <span>{{ item.count }}</span>
              <i class="iconfont icon-wuuiconxiangjifangda" @click="changeCount(item.name, 1)"></i>
            </div>
          </li>
        </ul>
      </div>
    </transition>

    <!-- 蒙层 -->
    <transition name="fade">
      <div v-show="visible" class="modal"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  created() {
    // console.log("购物车组件打印this:", this.$store.state.yeji);
  },
  computed: {
    // 计算选中的商品数组
    shopListData() {
      return this.$store.getters.shopListData; // 获取仓库中数量大于0的数据
    },

    // 计算数量
    totalCount() {
      let total = 0;
      this.shopListData.forEach(v => (total += v.count));

      if (total === 0) this.visible = false; // 加上一句隐藏的代码

      return total;
    },

    // 计算总价格
    totalPrice() {
      let totalPrice = 0;
      this.shopListData.forEach(v => (totalPrice += v.count * v.price));
      return totalPrice.toFixed(2);
    }
  },
  methods: {
    // 改变商品的数据量
    changeCount(name, num) {
      // 调用仓库中的函数 改变商品的数量( 让仓库中的数据改变 )
      this.$store.commit("CHANGE_NUM", { name, num });
    },

    // 清空
    empty() {
      // 触发清空mutation函数
      this.$store.commit("EMPTY");
      this.visible = false; // 隐藏模态框
    },

    // 切换显示和隐藏
    changeVisible() {
      if (this.totalCount > 0) {
        this.visible = !this.visible;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shop-cart {
  flex: 0 0 50px;
  .shop-cart-wrap {
    position: relative;
    z-index: 999;
    height: 50px;
    display: flex;
    .left-box {
      flex: 1;
      background-color: #141c27;
      display: flex;
      align-items: center;
      position: relative;

      .icon-wrap {
        height: 50px;
        width: 50px;
        background-color: #2b343d;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin: 0 20px;
        position: absolute;
        top: -10px;
        left: 0px;

        i {
          // margin-left: 5px;
          color: #808589;
          font-size: 26px !important;
        }

        span {
          padding-left: 5px;

          // font-weight: bold;
        }
        &.active {
          background-color: #00a0dc;
          i {
            margin-left: 12px;
            color: #ffffff;
          }
          span {
            padding: 2px 5px;
            color: #ffffff;
            margin-bottom: 35px;
            margin-left: -3px;
            font-size: 14px;

            border-radius: 50%;
            background: red;
            color: #fff;
          }
        }
      }
      .content-box {
        display: flex;
        padding-left: 35%;
        color: #808589;
        line-height: 30px;
        font-weight: bold;
        font-size: 14px;

        .jiage {
          font-weight: bold;
          padding: 0 10px;
        }
      }
    }
    .right-box {
      flex: 0 0 105px;
      font-size: 14px;
      background-color: #2b343b;
      display: flex;
      align-items: center;

      color: #808589;
      font-weight: bold;
      button {
        border: 0;
        background: #2b343b;
        color: #00a0dc;
        margin-left: 20px;
      }
      span {
        margin-left: 20px;
      }
    }
  }
  .shop-cart-list {
    position: fixed;
    z-index: 21;
    bottom: 50px;
    width: 100%;
    left: 0;
    height: 300px;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    .header {
      flex: 0 0 40px;
      background-color: #eceff1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .list {
      flex: 1;
      overflow: scroll;
      padding: 20px;
      font-weight: 100;
      font-size: 14px;
      li {
        display: flex;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        margin: 10px 0;
        p {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
        .control-box {
          flex: 0 0 100px;
          text-align: center;
          margin-left: 10px;
          i {
            margin: 0px 10px;
            font-size: 20px;
            color: #2395ff;
          }
        }
      }
    }
  }
  .modal {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  // 进入个过程 和 离开的过程
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  // 进入的瞬间 和 离开的瞬间
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  // 进入个过程 和 离开的过程
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }

  // 进入的瞬间 和 离开的瞬间
  .slide-enter,
  .slide-leave-to {
    transform: translateY(300px);
  }
}
</style>