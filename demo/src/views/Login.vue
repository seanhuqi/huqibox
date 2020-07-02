<template>
  <div class="login">
    <el-form
      :model="loginForm"
      size="small "
      status-icon
      :rules="rules"
      ref="loginForm"
      class="login-form"
    >
      <h1>用户登录</h1>
      <el-form-item label prop="user">
        <el-input v-model="loginForm.account" autocomplete="off" prefix-icon="iconfont icon-yonghu"></el-input>
      </el-form-item>
      <el-form-item label prop="password">
        <el-input
          @click.native="changeType"
          @keydown.native.13="submitForm"
          v-model="loginForm.password"
          :type="isOpen?'password':'text'"
          autocomplete="off"
          prefix-icon="iconfont icon-password"
          :suffix-icon="isOpen?'iconfont icon-yanjing_bi':'iconfont icon-yanjing_kai'"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
          icon="el-icon-position"
          v-loading.fullscreen.lock="fullscreenLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkLogin } from "../api/account.js";
import local from "../utils/local";
export default {
  data() {
    return {
      // 表单
      loginForm: {
        account: "",
        password: ""
      },
      // 登录动画
      fullscreenLoading: false,
      // 验证规则
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "请输入3~6个字符的用户名",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "请输入3~6个字符的密码", trigger: "blur" }
        ]
      },
      // 控制密码显示隐藏
      isOpen: true
    };
  },
  methods: {
    submitForm() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 800);
      // console.log(1111);
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // console.log("发送请求");
          // 调用请求
          // 发送登录请求
          let { code, msg, token } = await checkLogin(this.loginForm);
          if (code === 0) {
            // 拿到token将它存入本地
            local.set("tk", token);

            this.$router.push("/"); // 跳转后台首页
          }
        } else {
          console.log("请求失败");
          return;
        }
      });
    },

    // 切换显示隐藏
    changeType(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../assets/imgs/beijin2.jpg") center;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    h1 {
      color: rgb(255, 255, 255);
      text-align: center;
      margin-bottom: 30px;
      font-size: 20px;
    }
    width: 300px;
    /deep/.el-form-item__label {
      color: rgb(255, 255, 255);
    }
    /deep/.el-input--small .el-input__inner {
      background: #2d3a4b;
      color: #c0c4cc;
    }
    /deep/.el-button--primary {
      width: 300px;
    }
  }
}
</style>