<template>
  <div class="account-add">
    <Card>
      <span slot="title">账号添加</span>
      <div slot="content" class="content">
        <el-form
          :model="addForm"
          :rules="rules"
          status-icon
          ref="addForm"
          size="mini"
          label-width="100px"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="addForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item label="用户组">
            <el-select v-model="addForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" icon="el-icon-plus">添加</el-button>
            <el-button @click="resetForm" icon="el-icon-refresh-left">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import { ACC_REG, PASS_REG } from "../../utils/reg";
// 引入请求层
import { addUser } from "../../api/account.js";
export default {
  components: {
    Card
  },
  data() {
    // 自定义验证账号
    const checkAcc = (rule, value, callback) => {
      // 非空判断
      if (!value) {
        callback(new Error("请输入账号"));
        // 正则判断
      } else if (!ACC_REG.test(value)) {
        callback(new Error("3 ~ 12位(字母丶数字丶下划线丶减号)"));
      } else {
        callback();
      }
    };
    // 自定义验证密码
    const checkPass = (rule, value, callback) => {
      // 非空判断
      if (!value) {
        callback(new Error("请输入密码"));
        // 正则判断
      } else if (!PASS_REG.test(value)) {
        callback(new Error("3 ~ 12位(字母丶数字丶下划线丶减号)"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      addForm: {
        account: "",
        password: "",
        userGroup: ""
      },
      // 验证规则
      rules: {
        account: { required: true, validator: checkAcc, trigger: "blur" },
        password: { required: true, validator: checkPass, trigger: "blur" },
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 添加账号请求
          let { code, msg } = await addUser(this.addForm);
          if (code === 0) {
            // 跳转到列表
            this.$router.push("/account/account-list");
          }
        } else {
          console.log("不通过");
          return;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.addForm.resetFields();
      console.log("重置成功");
    }
  }
};
</script>

<style lang="less" scoped>
.account-add {
  .content {
    /deep/.el-form {
      width: 360px;
    }
  }
}
</style>