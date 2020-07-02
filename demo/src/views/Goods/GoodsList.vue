<template>
  <div class="goods-list">
    <Card>
      <span slot="title">商品列表</span>
      <div slot="content">
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" height="310">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- 商品ID -->
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <!-- 商品名称 -->
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <!-- 所属分类 -->
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <!-- 商品价格 -->
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <!-- 商品评价 -->
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <!-- 商品销量 -->
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <!-- 创建时间 -->
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <!-- 商品图片 -->
                <el-form-item label="商品图片">
                  <span>{{ props.row.imgUrl }}</span>
                </el-form-item>
                <!-- 商品描述 -->
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price" width="180"></el-table-column>
          <el-table-column label="商品图片" width="180">
            <template slot-scope="scope">
              <img
                class="goods-img"
                width="50"
                height="50"
                :src="baseImgUrl+scope.row.imgUrl"
                alt="商品图片"
              />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc" width="180"></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit( scope.row)"
                icon="el-icon-edit"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete( scope.row)"
                icon="el-icon-delete"
              >删除</el-button>
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
        <!-- 编辑的时候弹出的模态框 -->
        <el-dialog class="dialog" title="编辑商品" :visible.sync="dialogVisible" width="360px">
          <!-- 表单 -->
          <el-form :model="editForm" size="small" status-icon ref="editForm" label-width="70px">
            <!-- 商品名称 -->
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="editForm.name" autocomplete="off" style="width:240px"></el-input>
            </el-form-item>
            <!-- 商品分类 -->
            <el-form-item label="商品分类">
              <el-select v-model="editForm.category" placeholder="请选择商品分类">
                <el-option
                  v-for="item in categories"
                  :key="item.cateName"
                  :label="item.cateName"
                  :value="item.cateName"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item label="商品价格" prop="price">
              <el-input-number v-model="editForm.price" :min="0" :max="100000" label="商品价格"></el-input-number>
            </el-form-item>
            <!-- 商品图片 -->
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleImgSuccess"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="editForm.imgUrl"
                  :src="baseImgUrl + editForm.imgUrl"
                  class="avatar"
                  style="width:100px"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 商品描述 -->

            <el-form-item label="商品描述">
              <el-input type="textarea" v-model="editForm.goodsDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="sureEdit" size="small ">确认</el-button>
          </span>
        </el-dialog>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import { goodsList, delGoods, editGoods, GetCateGories } from "../../api/goods";
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [], //数据列表
      currentPage: 1, // 当前页
      pageSize: 10, // ,每页条数
      total: 30, // 总条数
      dialogVisible: false, // 编辑模态框是否显示
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      // 编辑表单
      editForm: {
        name: "",
        category: "",
        imgUrl: "",
        goodsDesc: "",
        price: 0,
        imgUrl: ""
      },
      categories: [], //分类
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/" //服务器地址
    };
  },
  methods: {
    // 获取列表
    async getdata() {
      let { total, data } = await goodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // 渲染页面
      this.tableData = data;
      // 渲染总条数
      this.total = total;
    },

    // 每页条数发生改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdata();
    },
    // 当前页发生改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getdata();
    },
    // 获取分类名称
    async getCateNames() {
      let { categories } = await GetCateGories();
      this.categories = categories;
      // console.log(this.categories);
    },
    // 上传成功的函数
    handleImgSuccess(res) {
      // console.log(res);
      let { code, imgUrl, msg } = res;
      if (code === 0) {
        this.editForm.imgUrl = imgUrl; // 回填图片
        // 弹出提示
        this.$message({
          type: "success",
          message: msg
        });
      }
    },
    beforeImgUpload() {},
    // 编辑
    handleEdit(row) {
      this.getCateNames(); //获取分类
      this.dialogVisible = true; //显示模态框
      this.editForm = { ...row }; // 回填数据
    },
    // 确认编辑
    async sureEdit() {
      // let categories = this.categories.forEach(v => {
      //   console.log(v.cateName);
      // });
      let { code, msg } = await editGoods(this.editForm);

      if (code === 0) {
        this.dialogVisible = false; //显示模态框
        this.getdata();
      }
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await delGoods({ id: row.id }); //发送删除请求
          this.getdata(); //刷新
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  // 进入页面获取列表
  created() {
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
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
.pagination-wrap {
  margin-left: 20px;
  margin-top: 30px;
}
</style>