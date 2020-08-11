<template>
  <!-- 登录页 -->
  <div class="login">
    <!-- 封面 -->
    <div class="login_img">
      <img src="../assets/images/login.jpg" />
    </div>
    <!-- 登录注册 -->
    <div class="box">
      <div class="tab_box">
        <h1>标准出版社</h1>
        <p>标准数据智能服务平台</p>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="tab_content"
          stretch="true"
        >
          <el-tab-pane label="登录" name="first">
            <!-- 登录 -->
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
              v-model="input1"
            >
            </el-input>
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="input2"
              show-password="yincang"
            >
            </el-input>
            <!-- 登录按钮 -->
            <el-button
              type="primary"
              style="width:100%;height:50px;margin-top:20px;
              "
              >立即登录</el-button
            >
            <el-button
              style="width:100%;height:50px;margin-top:20px;
              "
              >忘记密码？</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <!-- 注册 -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // 默认选中登录
      activeName: "first",
      input1: "",
      input2: "",

      yincang: true,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  .login_img {
    width: 350%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .box {
    width: 100%;
    .tab_box {
      .tab_content {
        /deep/.el-input__inner {
          margin: 10px 0;
          height: 55px;
          border-radius: 50px;
        }
        .el-button + .el-button {
          margin-left: 0px;
        }
      }
      font-family: "微软雅黑";
      h1 {
        color: #0f6eff;
        font-size: 28px;

        font-weight: normal;
        margin: 25px 0;
      }
      p {
        font-size: 16px;
        color: #2a2c2d;
        margin-bottom: 50px;
      }
      height: 200px;
      margin: 50px;
      margin-top: 100px;
      text-align: center;
      /deep/.el-tabs__nav {
        float: none;
        .el-tabs__item {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
