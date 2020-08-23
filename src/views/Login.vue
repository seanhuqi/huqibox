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

        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab_content">
          <el-tab-pane label="登录" name="first">
            <!-- 登录 -->
            <el-form
              :model="loginForm"
              :rules="login_rules"
              ref="loginForm"
              label-width="100px"
              class="demo-ruleForm"
              size="mini "
            >
              <el-form-item prop="login_user">
                <el-input
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user-solid"
                  v-model="loginForm.login_user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="login_password">
                <el-input
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  v-model="loginForm.login_password"
                ></el-input>
              </el-form-item>
            </el-form>

            <!-- 登录按钮 -->
            <el-button
              type="primary"
              style="width:100%;height:45px;margin-top:20px;
              "
              @click="loginBtn"
            >立即登录</el-button>
            <el-button style="width:100%;height:45px;margin-top:20px;
              ">忘记密码？</el-button>
          </el-tab-pane>

          <el-tab-pane label="注册" name="second">
            <!-- 注册 -->
            <el-form
              :model="register"
              :rules="register_rules"
              ref="register"
              label-width="100px"
              class="demo-ruleForm"
              size="mini "
            >
              <el-form-item prop="register_user">
                <el-input
                  placeholder="用户昵称"
                  prefix-icon="el-icon-user-solid"
                  v-model="register.register_user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="register_password">
                <el-input
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  v-model="register.register_password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="register_phone">
                <el-input placeholder="填写常用手机号" v-model="register.register_phone"></el-input>
              </el-form-item>
              <el-form-item prop="register_code">
                <el-input
                  placeholder="请输入验证码"
                  v-model="register.register_code"
                  class="code_input"
                  maxlength="6"
                ></el-input>
              </el-form-item>
              <el-form-item prop="type">
                <el-checkbox v-model="register.type" label="我已阅读《中国标准在线服务网注册说明》" name="type"></el-checkbox>
              </el-form-item>
              <el-button type="primary" round size="mini" class="code_button" @click="getCode">获取验证码</el-button>
              <el-button
                type="primary"
                style="width:100%;height:45px;margin-top:20px;
              "
                @click="registerBtn"
              >立即注册</el-button>
            </el-form>
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
      // 登录信息
      loginForm: { login_user: "", login_password: "" },
      // 登录验证规则
      login_rules: {
        login_user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        login_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 12, message: "长度在 8 到 12 个字符", trigger: "blur" }
        ]
      },
      // 注册信息
      register: {
        register_user: "",
        register_password: "",
        register_phone: "",
        register_code: "",
        type: []
      },
      // 注册验证规则
      register_rules: {
        register_user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在4 到 12 个字符", trigger: "blur" }
        ],
        register_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 12, message: "长度在 8 到 12 个字符", trigger: "blur" }
        ],
        register_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确格式的手机号",
            trigger: "blur"
          }
        ],
        register_code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请选择阅读条款",
            trigger: "change"
          }
        ]
      },
      // 条款
      checked: false
      // 密码隐藏
    };
  },
  methods: {
    // 登录
    loginBtn() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // alert("触发了登录");
          this.$router.push("/index");
        }
      });
    },
    // 注册
    registerBtn() {
      this.$refs.register.validate(valid => {
        if (valid) {
          alert("触发了注册");
        }
      });
    },
    // tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 获取验证码
    getCode() {
      alert("模拟验证码：123456");
    }
  }
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
        /deep/.el-form-item__content {
          margin-left: 0 !important;
        }
        /deep/.el-tabs__active-bar {
          display: none;
        }
        /deep/.el-input__inner {
          height: 45px;
          border-radius: 50px;
        }
        .el-button + .el-button {
          margin-left: 0px;
        }
        /deep/.el-checkbox__label {
          font-size: 4px;
        }
        .code_input {
          position: relative;
        }
        .code_button {
          position: absolute;
          top: 198px;
          left: 120px;
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
