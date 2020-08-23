<template>
  <div class="rightContent">
    <card>
      <h1 slot="title">店铺管理</h1>
      <p slot="content">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
    </card>
    <btn>
      <span slot="name">按钮</span>
    </btn>
    <!-- <div id="main" style="width: 100%;height:600px;background-color:#fff"></div> -->
    <chart></chart>
  </div>
</template>

<script>
import card from "./card";
import btn from "./btn";
import chart from "./chart";
// import echarts from "echarts";
export default {
  components: {
    card,
    btn,
    chart
  },

  methods: {
    // huizhi() {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = echarts.init(document.getElementById("main"));
    //   // 指定图表的配置项和数据
    //   let option = {
    //     title: {
    //       text: "某站点用户访问来源",
    //       subtext: "纯属虚构",
    //       left: "center"
    //     },
    //     tooltip: {
    //       trigger: "item",
    //       formatter: "{a} <br/>{b} : {c} ({d}%)"
    //     },
    //     legend: {
    //       orient: "vertical",
    //       left: "left",
    //       data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
    //     },
    //     series: [
    //       {
    //         name: "访问来源",
    //         type: "pie",
    //         radius: "55%",
    //         center: ["50%", "60%"],
    //         data: [
    //           { value: 335, name: "直接访问" },
    //           { value: 310, name: "邮件营销" },
    //           { value: 234, name: "联盟广告" },
    //           { value: 135, name: "视频广告" },
    //           { value: 1548, name: "搜索引擎" }
    //         ],
    //         emphasis: {
    //           itemStyle: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: "rgba(0, 0, 0, 0.5)"
    //           }
    //         }
    //       }
    //     ]
    //   };
    //   myChart.setOption(option);
    // }
  },
  mounted() {
    // alert(1);
    // this.huizhi();
  }
};
</script>

<style lang="less" scoped>
.rightContent {
  width: 100%;
  height: 100%;
  background: cadetblue;
}
</style>