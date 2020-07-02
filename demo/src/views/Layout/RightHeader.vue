<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadCrumbArr"
            :key="item.title"
            :to="{ path: item.path }"
          >{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="right-box">
        <!-- 个人中心 -->
        <!-- 下拉框 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你，{{info.account }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal" icon="el-icon-s-custom">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button
">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 头像 -->
        <img class="avatar" width="50" height="50" :src="info.imgUrl" alt />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAccInfo } from "../../api/account";
import local from "../../utils/local";
export default {
  data() {
    return {
      // 个人中心信息
      info: {},
      breadCrumbArr: [] // 面包屑数组
    };
  },
  methods: {
    // 下拉框
    handleCommand(command) {
      if (command == "personal") {
        // 跳转
        this.$router.push("/account/personal");
      } else {
        // 清除本地存储
        local.clear();
        this.$message({
          type: "success",
          message: "退出登录成功,欢迎再来."
        });
        this.$router.push("/login");
        // 退出清除路由,解决路由重复加载
        Location.reload();
      }
    },
    // 获取数据
    async getInfo() {
      let { accountInfo } = await getAccInfo();
      this.info = accountInfo;
      // 存入本地
      local.set("info", this.info);
    },
    // 计算面包屑
    calcBreadCrumb(route) {
      // 默认首页
      let arr = [{ title: "首页", path: "/home" }];

      // 计算
      route.matched.forEach(item => {
        if (item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          });
        }
      });
      // 赋值
      this.breadCrumbArr = arr;
    }
  },
  created() {
    // 调用数据
    this.getInfo();
    // 接收bus信息
    this.$bus.$on("updateAvatar", () => {
      this.getInfo();
    });
    this.calcBreadCrumb(this.$route);
  },
  // 监听路由变化
  watch: {
    // 数据变化时走这里
    "$route.path"() {
      this.calcBreadCrumb(this.$route); // 路由变化( 切换导航会变 ) 调用一次计算面包屑的函数
    }
  }
};
</script>

<style lang="less" scoped>
.right-header {
  flex: 0 0 60px;
  line-height: 60px;
  background-color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
  .el-row {
    height: 60px;
    .el-col {
      height: 60px;
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
        margin-left: 10px;
      }
    }
    .right-box {
      justify-content: flex-end;
    }
  }
}
</style>
