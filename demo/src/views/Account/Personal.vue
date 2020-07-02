<template>
  <div class="personal">
    <!-- 卡片 -->
    <Card>
      <span slot="title">个人中心</span>
      <!-- 内容 -->
      <div slot="content" class="content">
        <p>管理员ID：{{info.id}}</p>
        <el-divider></el-divider>
        <p>账号：{{ info.account }}</p>
        <el-divider></el-divider>
        <p>用户组：{{ info.userGroup }}</p>
        <el-divider></el-divider>
        <p>创建时间：{{ info.ctime | filterCtime }}</p>
        <el-divider></el-divider>
        <div>
          <h3 class="text">管理员头像：</h3>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" size="mini" @click="changeAvatar">确认修改</el-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import moment from "moment";
import local from "@/utils/local";
import { updateAvatar } from "@/api/account";
export default {
  components: {
    Card
  },
  data() {
    return {
      // 用户数据对象
      info: {},
      imgUrl: "",
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/"
    };
  },
  methods: {
    // 上传成功
    handleAvatarSuccess(res) {
      let { code, imgUrl, msg } = res;
      if (code == 0) {
        this.imgUrl = imgUrl;
        this.$message({
          type: "success",
          message: msg
        });
      }
    },
    // 上传之前
    beforeAvatarUpload() {},
    // 确认修改
    async changeAvatar() {
      let { code, msg } = await updateAvatar({ imgUrl: this.imgUrl });
      if (code == 0) {
        this.$bus.$emit("updateAvatar");
      }
    }
  },
  created() {
    // 赋值
    this.info = local.get("info");
  },
  filters: {
    // 过滤器
    filterCtime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  .content {
    .text {
      margin-bottom: 30px;
    }
    .el-button {
      margin-top: 20px;
    }
    /deep/.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
}
</style>