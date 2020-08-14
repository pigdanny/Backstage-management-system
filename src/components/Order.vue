<template>
  <div>
    <!-- 输入信息 -->
    <el-col :span="24">
      <div class="grid-content bg-purple">
        <p class="titel">
          <span>订单号</span>
          <el-input
            placeholder="订单号"
            v-model="order_input"
            clearable
            style="width:200px"
            size="mini"
          ></el-input>
          <span>收货人</span>
          <el-input
            placeholder="收货人"
            v-model="person_input"
            clearable
            style="width:200px"
            size="mini"
          ></el-input>
          <span>手机号</span>
          <el-input placeholder="手机号" v-model="tel_input" clearable style="width:200px" size="mini"></el-input>
          <span>订单状态</span>
          <el-select v-model="select_value" placeholder="订单状态" style="width:200px" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p class="time">
          <span>选择时间</span>
          <el-date-picker
            v-model="time_value"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="left"
            style="width:450px"
            size="small"
          ></el-date-picker>
          <el-button type="primary" size="small" @click="clickorder">查询</el-button>
        </p>
      </div>
    </el-col>
    <!-- 信息表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <!-- 0 -->
      <!-- <el-table-column prop="id" label="ID">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.id }}</span>
          <el-input v-show="scope.row.ischange" v-model="scope.row.id" clearable size="small"></el-input>
        </template>
      </el-table-column>-->
      <!-- 1 -->
      <el-table-column prop="orderNo" label="订单号">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.orderNo }}</span>
          <el-input v-show="scope.row.ischange" v-model="scope.row.orderNo" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 2 -->
      <el-table-column prop="orderTime" label="下单时间" width="180">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.orderTime }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.orderTime"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 3 -->
      <el-table-column prop="phone" label="手机号">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.phone }}</span>
          <el-input v-show="scope.row.ischange" v-model="scope.row.phone" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 4 -->
      <el-table-column prop="consignee" label="收货人">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.consignee }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.consignee"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 5 -->
      <el-table-column prop="deliverAddress" label="配送地址">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.deliverAddress }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.deliverAddress"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 6 -->
      <el-table-column prop="deliveryTime" label="送达时间" width="180">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.deliveryTime }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.deliveryTime"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 7 -->
      <el-table-column prop="remarks" label="用户备注">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.remarks }}</span>
          <el-input v-show="scope.row.ischange" v-model="scope.row.remarks" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 8 -->
      <el-table-column prop="orderAmount" label="订单金额">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.orderAmount }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.orderAmount"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 9 -->
      <el-table-column prop="orderState" label="订单状态">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.orderState }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.orderState"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 10 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <!-- 查看弹框 -->
          <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="watch">
              <el-table-column property="id" label="ID"></el-table-column>
              <el-table-column property="orderNo" label="订单号"></el-table-column>
              <el-table-column property="orderTime" label="下单时间"></el-table-column>
              <el-table-column property="phone" label="手机号"></el-table-column>
              <el-table-column property="consignee" label="收货人"></el-table-column>
              <el-table-column property="deliverAddress" label="配送地址"></el-table-column>
              <el-table-column property="deliveryTime" label="送达时间"></el-table-column>
              <el-table-column property="remarks" label="用户备注"></el-table-column>
              <el-table-column property="orderAmount" label="订单金额"></el-table-column>
              <el-table-column property="orderState" label="订单状态"></el-table-column>
            </el-table>
          </el-dialog>
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.ischange?"完成":"编辑"}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-col :span="24">
      <div class="grid-content2 bg-purple">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
/* 接口 */
import { orderlist } from "../api/apis";
import { orderdetail } from "../api/apis";
import { orderedit } from "../api/apis";
/* 时间转换 */
import { gettime } from "../utils/utils";

export default {
  data() {
    return {
      order_input: "",
      person_input: "",
      tel_input: "",
      select_value: "全部",
      time_value: "",
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
      ],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      dialogTableVisible: false,
      watch: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    };
  },
  created() {
    //获取列表
    this.getlist();
  },
  methods: {
    //获取列表接口函数
    getlist() {
      let obj={}
      if (this.order_input!="") {
        obj.orderNo = this.order_input;
      }
      if (this.person_input!="") {
        obj.consignee = this.person_input;
      }
      if (this.tel_input!="") {
        obj.phone = this.tel_input;
      }
      if (this.select_value != "全部") {
        obj.orderState = this.select_value;
      }
      if (this.time_value!="") {
        this.time_value[0] = gettime(this.time_value[0]);
        this.time_value[1] = gettime(this.time_value[1]);
        this.time_value = JSON.stringify([this.time_value[0],this.time_value[1]])
        obj.date = this.time_value;
      }
      orderlist(
        this.currentPage,
        this.pageSize,
        obj.orderNo,
        obj.consignee,
        obj.phone,
        obj.orderState,
        obj.date
      ).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = gettime(obj.orderTime);
          obj.deliveryTime = gettime(obj.deliveryTime);
          obj.ischange = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
        this.time_value=""
      });
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist();
    },
    //当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    /* 查询指定信息 */
    clickorder() {
      this.getlist();
    },
    /* 查看当前行 */
    handleClick(row) {
      this.dialogTableVisible = true;
      orderdetail(row.id).then((res) => {
        let arr = [];
        res.data.data.orderTime = gettime(res.data.data.orderTime);
        res.data.data.deliveryTime = gettime(res.data.data.deliveryTime);
        arr.push(res.data.data);
        this.watch = arr;
        console.log(this.watch);
      });
    },
    //修改账号
    handleEdit(index, row) {
      if (row.ischange) {
        row.ischange = false;
        orderedit(
          row.id,
          row.orderNo,
          row.orderTime,
          row.phone,
          row.consignee,
          row.deliverAddress,
          row.deliveryTime,
          row.remarks,
          row.orderAmount,
          row.orderState
        )
          .then((res) => {
            this.$message.success(res.data.msg);
          })
          .catch((res) => {
            this.$message.error(res.data.msg);
          });
      } else {
        row.ischange = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  .titel {
    height: 50px;
    line-height: 50px;
    span {
      margin: 0 10px 0 20px;
    }
  }
  .time {
    height: 50px;
    line-height: 50px;
    span {
      margin: 0 10px 0 20px;
    }
    .el-button {
      margin-left: 20px;
    }
  }
}

.grid-content2 {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px 0;
}

.bg-purple {
  background: #ffffff;
}
</style>