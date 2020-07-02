<template>
  <div class="goods">
    <!-- 左侧导航栏 -->
    <div class="left-nav" ref="leftNav">
      <ul class="content">
        <li
          class="item-name"
          @click="btn(item.name)"
          :class="{active:isActive==item.name}"
          v-for="item in goods"
          :key="item.name"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- 右侧内容 -->
    <div class="right-main" ref="rightBox">
      <!-- 子 -->
      <div class="content">
        <!-- 循环分类 -->
        <div :id="item.name" class="foods" v-for="item in goods" :key="item.name">
          <!-- 分类名称 -->
          <h1>{{item.name}}</h1>
          <ul>
            <!-- 食品列表 -->
            <li class="food" @click="showDetail(food)" v-for="food in item.foods" :key="food.name">
              <img class="img" width="80" height="80" :src="food.imgUrl" alt />
              <div class="info">
                <p class="name">{{ food.name }}</p>
                <p class="desc">{{ food.goodsDesc }}</p>
                <p class="count">月售{{food.sellCount}}份 好评率{{food.rating}}%</p>
                <p class="price">￥{{ food.price }}</p>
              </div>
              <!-- 按钮 -->
              <div class="control-box">
                <!-- + - 组件 -->
                <button v-if="food.count > 0" @click.stop="food.count--">-</button>
                <span v-if="food.count > 0">{{ food.count }}</span>
                <button @click.stop="food.count++">+</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 食品详情组件 -->
      <transition name="detail">
        <FoodDetail :food="food" @close="hideDetail" v-show="detailVisible" />
      </transition>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import FoodDetail from "../Goods/FoodDetail";
export default {
  props: ["goods"],
  components: {
    FoodDetail
  },
  data() {
    return {
      isActive: "滋补养生",
      hArr: [],
      detailVisible: false,
      food: {} // 当前食品数据
    };
  },
  methods: {
    btn(name) {
      this.isActive = name;
      // 滚动
      this.rightFoodScroll.scrollToElement(document.getElementById(name), 300);
    },
    showDetail(food) {
      // console.log(1);
      this.detailVisible = true;
      this.food = food;
    },
    hideDetail() {
      this.detailVisible = false;
    }
  },
  mounted() {
    // 获取左侧dom
    this.left = new BScroll(this.$refs.leftNav, {
      click: true
    });
    // 获取右侧dom
    this.rightFoodScroll = new BScroll(this.$refs.rightBox, {
      click: true,
      probeType: 3 //派发滚动事件
    });

    // 监听滚动事件
    this.rightFoodScroll.on("scroll", pos => {
      let y = Math.abs(pos.y); // 获取垂直方向的y的值

      // 判断y落在哪个区间
      for (let i = 0; i < this.hArr.length; i++) {
        if (y >= this.hArr[i].min && y < this.hArr[i].max) {
          this.isActive = this.hArr[i].name; // 这个区间的分类名赋值给当前激活类
        }
      }
    });
  },
  updated() {
    // 循环数组
    let total = 0; // 初始值是0

    for (let item of this.goods) {
      let cateHeight = document.getElementById(item.name).offsetHeight; // 获取每个分类的高度

      // 计算每个区间
      this.hArr.push({
        min: total,
        max: total + cateHeight,
        name: item.name
      });

      total = total + cateHeight; // 把上一次的结束 当成下一次的开始
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100%;
  .left-nav {
    flex: 0 0 80px;
    background: #f4f5f7;
    list-style: none;
    overflow: hidden;

    .item-name {
      box-sizing: border-box;
      padding: 10px;
      height: 50px;
      font-size: 12px;
      text-align: center;
      // line-height: 50px;
      line-height: 18px;
      font-weight: normal;
      border-bottom: #dddee0 solid 1px;
      &.active {
        background: #fff;
        font-weight: bold;
      }
    }
  }
  .right-main {
    flex: 1;
    overflow: hidden;
    .content {
      .foods {
        h1 {
          margin-left: 20px;
          font-size: 14px;
          color: #92959a;
          height: 30px;
          line-height: 30px;
          font-weight: bold;
        }
        .food {
          background: #fff;
          display: flex;
          border-bottom: #dddee0 solid 1px;
          box-sizing: border-box;
          padding: 20px;

          position: relative;
          .control-box {
            top: 87px;
            right: 15px;
            position: absolute;

            span {
              display: inline-block;
              text-align: center;
              vertical-align: middle;
              width: 20px;
              font-size: 14px;
            }
            button {
              text-align: center;
              font-size: 10px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 0;
              background: #1296db;
              color: #fff;
            }
          }
          .info {
            margin-left: 20px;
            .name {
              font-weight: bold;
            }
            .desc,
            .count {
              font-size: 12px;
              color: #92959a;
              margin: 10px 0;
            }
            .price {
              font-weight: bold;
              color: #fe0e19;
            }
          }
          .img {
            border-radius: 5px;
          }
        }
      }
    }
  }
  // 进入动画 和 离开动画的过程中 有什么效果
  .detail-enter-active,
  .detail-leave-active {
    transition: all 0.3s; // 有过渡效果 过度的是透明度
  }

  // 动态的开始状态{瞬间} 和 结束状态{瞬间}
  .detail-enter,
  .detail-leave-to {
    transform: translateY(100%);
  }
}
</style>