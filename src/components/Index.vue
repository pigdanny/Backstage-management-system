<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../assets/imgs/1.png" alt />
          <div>
            <p>总订单</p>
            <span>{{totalOrder}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../assets/imgs/2.png" alt />
          <div>
            <p>总销售额</p>
            <span>{{totalAmount}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../assets/imgs/3.png" alt />
          <div>
            <p>今日订单数</p>
            <span>{{todayOrder}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../assets/imgs/4.png" alt />
          <div>
            <p>今日销售额</p>
            <span>{{totayAmount}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 折线图 -->
    <div class="box">
      <div id="main" style="width: 100%;height:500px"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { totaldata } from "../api/apis";

export default {
  data() {
    return {
      totalOrder: "",
      totalAmount: "",
      todayOrder: "",
      totayAmount: "",
    };
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("main"));
    totaldata().then((res) => {
      this.totalOrder = res.data.totalOrder;
      this.totalAmount = res.data.totalAmount;
      this.todayOrder = res.data.todayOrder;
      this.totayAmount = res.data.totayAmount;
      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单数据", "金额数据"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };
      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 100px;
    height: 90px;
    margin-left: 10px;
  }
  div {
    margin: 10px 20px;
    text-align: center;
    p {
      font-size: 16px;
      color: #cccccc;
      margin-bottom: 2px;
    }
    span {
      font-weight: bold;
    }
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.box {
  min-width: 1200px;
  background-color: #ffffff;
}

#main {
  padding: 20px;
  margin-top: 40px;
}
</style>