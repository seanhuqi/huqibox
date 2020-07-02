<template>
  <div class="goods-cate">
    <Card>
      <span slot="title">商品分类</span>
      <el-button
        slot="btn"
        type="primary"
        size="mini"
        class="btn"
        @click="addCate"
        icon="el-icon-plus"
      >添加分类</el-button>
      <div slot="content">
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 序号 -->
          <el-table-column label="序号" type="index" width="100"></el-table-column>
          <!-- 分类名称 -->
          <el-table-column label="分类名称" width="300">
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>
              <el-input v-else size="mini" v-model="scope.row.cateName"></el-input>
            </template>
          </el-table-column>
          <!-- 是否启用 -->
          <el-table-column label="是否启用" width="400">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="!scope.row.isEdit"
              ></el-switch>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                v-if="!scope.row.isEdit"
                size="mini"
                icon="el-icon-edit"
              >编辑</el-button>
              <el-button @click="saveEdit" v-else size="mini" type="success">完成</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- 分页组件 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="total"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>

        <!-- 模态框 -->
        <!-- 编辑的时候弹出的模态框 -->
        <el-dialog class="dialog" title="添加分类" :visible.sync="dialogVisible" width="360px">
          <!-- 表单 -->
          <el-form :model="addForm" size="small" status-icon ref="addForm" label-width="70px">
            <!-- 分类名称 -->
            <el-form-item label="分类名称" prop="cateName">
              <el-input v-model="addForm.cateName" autocomplete="off" style="width:240px"></el-input>
            </el-form-item>

            <!-- 启用状态 -->
            <el-form-item label="启用状态" prop="state">
              <el-select v-model="addForm.state" placeholder="是否启用？" style="width:240px">
                <el-option label="启用" value="true"></el-option>
                <el-option label="禁用" value="flase"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="sureAdd" size="small " icon="el-icon-plus">添加</el-button>
          </span>
        </el-dialog>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import { editCate, getCateNameList, delCate, addCate } from "../../api/goods";
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页
      total: 28, // 总条数
      pageSize: 5, // 每页条数
      dialogVisible: false, // 编辑模态框是否显示
      // 添加表单
      addForm: {
        cateName: "",
        state: ""
      }
    };
  },
  methods: {
    // 当前页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 完成
    async saveEdit() {
      // 发送修改分类请求
      let { code } = await editCate({
        id: this.row.id,
        cateName: this.row.cateName,
        state: this.row.state
      });

      if (code === 0) this.getData(); // 刷新
    },
    // 编辑
    edit(row) {
      row.isEdit = !row.isEdit; // 当前行可编辑状态取反
      console.log(row);
      this.row = row;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await delCate({ id: row.id });
          // 刷新
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 显示模态框
    addCate() {
      this.dialogVisible = true; // 显示模态框
    },
    // 确认添加
    async sureAdd() {
      let { code, msg } = await addCate({
        cateName: this.addForm.cateName,
        state: this.addForm.state
      });
      if (code === 0) {
        this.dialogVisible = false; // 隐藏模态框
        this.getData(); // 刷新
      }
    },
    // 获取分类列表
    async getData() {
      let { data, total } = await getCateNameList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 处理数据格式
      data.forEach(item => {
        item.state = item.state === 1 ? true : false;
        item.isEdit = false; // 每一项添加一个字段 是否可以编辑 默认false
      });

      // 赋值
      this.tableData = data;
      this.total = total;
    }
  },
  created() {
    // 进入页面获取
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.btn {
  float: right;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>