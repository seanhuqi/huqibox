<template>
  <div class="box" ref="content">
    <div class="ratings">
      <div class="content">
        <div class="left">
          <h1>4.5</h1>
          <span>综合评分</span>
          <p>高于周边商家89.2%</p>
        </div>
        <div class="right">
          <p>
            服务态度
            <van-rate size="14px" v-model="value1" allow-half void-icon="star" void-color="#eee" />
            <span>4.5</span>
          </p>
          <p>
            口味评分
            <van-rate size="14px" v-model="value2" allow-half void-icon="star" void-color="#eee" />
            <span>4.7</span>
          </p>
          <p>
            送达时间
            <span>44分钟</span>
          </p>
        </div>
      </div>
      <div class="box">
        <div class="main">
          <div>
            <van-button size="mini" type="primary" @click="type='all'">全部{{allLen}}</van-button>
            <van-button size="mini" type="info" @click="type='ok'">满意{{okLen}}</van-button>
            <van-button size="mini" type="default" @click="type='noOk'">不满意{{noOkLen}}</van-button>
          </div>
          <div class="text">
            <i class="iconfont icon-xuanze"></i> 只看有内容的评价
          </div>
          <!-- 评价数据 -->
          <div class="pinjia" v-for="(item,i) in ratingsData" :key="i">
            <div class="data">
              <div class="avatar">
                <img :src="item.avatar" width="30px" height="30px" alt />
              </div>
              <div class="neirong">
                <p>{{item.username}}</p>
                <p>
                  <van-rate
                    size="14px"
                    v-model="item.score"
                    allow-half
                    void-icon="star"
                    void-color="#eee"
                  />
                </p>
                <p>{{item.text}}</p>
                <p>
                  <i class="iconfont icon-dianzan"></i>
                  <span>甜品</span>
                  <span>饮料</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "../api/sell";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      value1: 4.5,
      value2: 4.7,
      RatingForm: [],
      type: "all"
    };
  },
  methods: {
    // 全部
    quanbu() {},
    // 满意
    manyi() {},
    // 不满意
    bumanyi() {}
  },
  async created() {
    // 获取评论
    let { data } = await getRatings();
    this.RatingForm = data;
    console.log(this.RatingForm);
  },
  mounted() {
    this.content = new BScroll(this.$refs.content);
  },
  // 计算属性
  computed: {
    // 全部
    allLen() {
      return this.RatingForm.length;
      // console.log(RatingForm);
    },
    okLen() {
      return this.RatingForm.filter(v => v.rateType == 0).length;
    },
    noOkLen() {
      return this.RatingForm.filter(v => v.rateType == 1).length;
    },
    // 要循环的评价数据
    ratingsData() {
      if (this.type === "all") {
        return this.RatingForm;
      } else if (this.type === "ok") {
        return this.RatingForm.filter(v => v.rateType === 0);
      } else if (this.type === "noOk") {
        return this.RatingForm.filter(v => v.rateType === 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  .ratings {
    margin-top: 1px;
    .content {
      width: 100%;
      height: 100px;
      background: #fff;
      display: flex;
      box-sizing: border-box;
      padding: 15px;
      .left {
        width: 40%;
        border-right: 1px solid #e6e6e6;
        text-align: center;
        h1 {
          font-weight: bold;
          font-size: 22px;
          color: #fd9d0a;
          margin: 5px 0;
        }
        span {
          font-size: 14px;
          margin: 5px 0;
        }
        p {
          font-size: 12px;
          color: #93989c;
          margin: 5px 0;
        }
      }
      .right {
        padding-left: 40px;
        width: 60%;
        text-align: center;
        p {
          text-align: left;
          margin: 5px 0;
          font-size: 12px;
        }
        span {
          line-height: 12px;
          padding-left: 12px;
          text-align: right;
          color: #fd9d0a;
        }
      }
    }
    .box {
      background: #ffffff;
      width: 100%;

      margin-top: 10px;
      box-sizing: border-box;
      padding: 20px;
      .main {
        button {
          width: 50px;
          height: 30px;
        }
        .text {
          margin-top: 20px;
          color: #93989c;
          line-height: 30px;
          i {
            &.active {
            }
          }
        }
        .pinjia {
          border-top: solid 1px #f3f3f3;

          .data {
            display: flex;
            margin: 20px 0;
            border-bottom: 1px solid #f3f3f3;
            .avatar {
              margin-top: 5px;
              img {
                border-radius: 50%;
              }
            }
            .neirong {
              padding-left: 10px;
              width: 100%;
              p {
                margin: 5px 0;
                font-size: 12px;
                color: #51585e;
                vertical-align: middle;
                i {
                  color: #00a0dc;
                }
                span {
                  margin: 0 5px;
                  padding: 0 5px;
                  height: 20px;
                  line-height: 20px;
                  display: inline-block;
                  font-size: 12px;
                  background: #e7e7e7;
                  color: #ffff;
                  border-radius: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>