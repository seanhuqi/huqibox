<template>
  <div class="order-detail">
    <Card class="card">
      <span slot="title">订单编辑</span>
      <el-button slot="btn" class="btn" type="primary" @click="edit" icon="el-icon-upload2">保存修改</el-button>
      <div slot="content">
        <el-form
          ref="editForm"
          :model="editForm"
          size="small"
          class="editForm"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="id">
            <el-input v-model="editForm.id"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="editForm.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-time-picker
              v-model="editForm.orderTime"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="任意时间点"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="editForm.consignee"></el-input>
          </el-form-item>
          <el-form-item label="送货地址">
            <el-input v-model="editForm.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间">
            <el-time-picker
              v-model="editForm.deliveryTime"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="任意时间点"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="editForm.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input-number
              v-model="editForm.orderAmount"
              @change="handleChange"
              :min="0"
              :max="100000"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="editForm.orderState" placeholder="订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card";
import { editOrder, getDetail } from "../../api/order";
export default {
  components: {
    Card
  },
  data() {
    return {
      editForm: {
        orderNo: "", //订单号
        orderTime: "", //下单时间
        phone: "", //联系电话
        consignee: "", //收货人
        deliverAddress: "", //送货地址
        deliveryTime: "", //送达时间
        remarks: "", //备注
        orderAmount: 1, //订单金额
        orderState: "" //订单状态
      }
    };
  },
  methods: {
    handleChange() {},
    async getData() {
      // 获取订单详情
      let { data } = await getDetail({ id: this.$route.query.id });
      // console.log(data);
      this.editForm = data;
    },
    // 保存修改
    async edit() {
      let { code, msg } = await editOrder(this.editForm);
      this.getData();
    }
  },
  created() {
    this.getData();

    // 获取query方式传递过来的数据 【问题： 传递少量数据 数据量大的话，地址栏过长】

    console.log(this.$route.query.id);

    // 获取params方式传递过来的数据 【问题： 不能刷新浏览器 刷新数据就没有了】
    // console.log("params获取到的数据：", this.$route.params);
  }
};
</script>

<style lang="less" scoped>
.order-detail {
  .card {
    height: 600px;
    overflow: scroll;
    .btn {
      margin-left: 85%;
    }
    .editForm {
      margin-left: 20px;
      width: 400px;
    }
  }
}
</style>