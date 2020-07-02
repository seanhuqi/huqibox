<template>
  <div class="pass-modify">
    <Card>
      <span slot="title">密码修改</span>
      <div slot="content" class="content">
        <el-form
          :model="passForm"
          :rules="rules"
          size="small"
          status-icon
          ref="passForm"
          label-width="100px"
        >
          <!-- 账号 -->
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="passForm.oldPwd"></el-input>
          </el-form-item>

          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="passForm.newPwd"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input v-model="passForm.confirmPwd"></el-input>
          </el-form-item>

          <!-- 添加和重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm" icon="el-icon-plus">添加</el-button>
            <el-button @click="resetForm" icon="el-icon-refresh-right">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import { PASS_REG } from "../../utils/reg";
import { checkOld, editPwd } from "../../api/account";
import local from "../../utils/local";
export default {
  components: {
    Card
  },
  data() {
    // 旧密码验证
    const checkOldPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      } else {
        let { code, msg } = await checkOld({ oldPwd: value });
        if (code === "00") {
          callback();
        } else {
          callback(new Error(msg));
        }
      }
    };
    // 新密码验证
    const checknewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!PASS_REG.test(value)) {
        callback(new Error("3 ~ 12位(字母丶数字丶下划线丶减号)"));
      } else {
        if (this.passForm.confirmPwd) {
          this.$refs.passForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    // 确认新密码
    const checkConfirmPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请确认新密码"));
      } else if (value !== this.passForm.newPwd) {
        callback(new Error("3 ~ 12位(字母丶数字丶下划线丶减号)"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      passForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      // 验证规则
      rules: {
        oldPwd: { required: true, validator: checkOldPwd, trigger: "blur" }, // 自定义验证
        newPwd: { required: true, validator: checknewPwd, trigger: "blur" }, // 自定义验证
        confirmPwd: {
          required: true,
          validator: checkConfirmPwd,
          trigger: "blur"
        } // 自定义验证
      }
    };
  },
  methods: {
    // 修改密码
    submitForm() {
      this.$refs.passForm.validate(async valid => {
        if (valid) {
          let { code } = await editPwd({ newPwd: this.passForm.newPwd });
          if (code === 0) {
            local.clear(); // 清除本地token等数据
            this.$router.push("/login"); // 跳转到登录
          }
        } else {
          console.log("失败");
          return;
        }
      });
    },
    resetForm() {
      this.alterAddForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.pass-modify {
  .content {
    .el-form {
      width: 360px;
    }
  }
}
</style>