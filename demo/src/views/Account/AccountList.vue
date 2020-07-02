<template>
  <div class="account-list">
    <!-- 卡片面板 -->
    <Card>
      <!-- 卡片头部 -->
      <span slot="title">账号列表</span>
      <!-- 卡片内容 -->
      <div slot="content" class="content">
        <!-- 表格组件 -->
        <el-table
          @selection-change="selectChange"
          :data="tableData"
          ref="accTable"
          style="width: 100%"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 账号 -->
          <el-table-column prop="account" label="账号" width="280"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

          <!-- 创建时间 -->
          <el-table-column prop="ctime" label="创建时间" width="280"></el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button @click="del(scope.row)" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <div class="pagination-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 30, 50]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>

        <!-- 批量删除 和 取消选择 -->
        <div class="del-cancel">
          <el-button @click="batchDel" type="danger" size="mini" icon="el-icon-delete">批量删除</el-button>
          <el-button @click="cancel" type="primary" size="mini" icon="el-icon-refresh-right">取消选择</el-button>
        </div>

        <!-- 编辑的时候弹出的模态框 -->
        <el-dialog class="dialog" title="账号编辑" :visible.sync="dialogVisible" width="360px">
          <!-- 表单 -->
          <el-form
            :model="editForm"
            :rules="rules"
            size="small"
            status-icon
            ref="editForm"
            label-width="70px"
          >
            <!-- 账号 -->
            <el-form-item label="账号" prop="account">
              <el-input v-model="editForm.account" class="acc-input" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item label="用户组" prop="userGroup">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import { getAccList, delAcc, batchDelAcc, editAcc } from "../../api/account";
import moment from "moment";
export default {
  components: {
    Card
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      currentPage: 1, // 当前页
      pageSize: 3, // ,每页条数
      total: 30, // 总条数
      dialogVisible: false, // 编辑模态框是否显示
      // 编辑表单
      editForm: {
        account: "",
        userGroup: ""
      },
      // 验证规则
      rules: {
        account: {},
        userGroup: {}
      }
    };
  },
  methods: {
    // pageSize[每页条数] 改变时会触发
    handleSizeChange(val) {
      // console.log("每页条数:", val);
      this.pageSize = val;
      this.gatData();
    },
    // currentPage[当前页码] 改变时会触发
    handleCurrentChange(val) {
      // console.log("当前页码:", val);
      this.currentPage = val;
      this.gatData();
    },
    // 取消选择
    cancel() {
      this.$refs.accTable.clearSelection();
    },
    // 当选择发生变化
    selectChange(rows) {
      this.ids = rows.map(row => row.id); // 把选中的id获取到 存起来
    },
    // 批量删除
    batchDel() {
      // console.log("需要删除数据的id:", this.ids);
      if (!this.ids || !this.ids.length) {
        this.$message.error("请选择以后再操作");
        return;
      }
      this.$confirm("确定批量删除嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await batchDelAcc({
            ids: JSON.stringify(this.ids)
          });
          //  判断
          if (code == 0) {
            // 刷新
            this.gatData();
          }
        })
        .catch(() => {
          // 点取消就隐藏
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await delAcc({ id: row.id });
          if (code == 0) {
            // 刷新
            this.gatData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    edit(row) {
      console.log("要编辑的数据", row);
      this.dialogVisible = true; // 显示模态框
      this.editForm = { ...row }; // 回填数据
    },
    // 获取数据
    async gatData() {
      // 获取数据
      let { total, data } = await getAccList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this.tableData = data;
      this.total = total;
      // 边界判断
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        // 刷新
        this.gatData();
      }
      // 时间格式处理
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY/MM/DD HH:mm:ss");
      });
    },
    // 保存修改
    async saveEdit() {
      // 隐藏模态框
      this.dialogVisible = false;
      // 发送请求
      let { code, msg } = await editAcc({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.userGroup
      });
      if (code == 0) {
        // 刷新
        this.gatData();
      }
    }
  },
  // 进入页面调用
  created() {
    this.gatData();
  }
};
</script>

<style lang="less" scoped>
.account-list {
  .box-card {
    .content {
      .pagination-wrap {
        margin-top: 20px;
      }
      .del-cancel {
        margin-top: 20px;
      }
      .dialog {
        .acc-input {
          width: 209px;
        }
      }
    }
  }
}
</style>