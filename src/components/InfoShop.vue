<template>
  <div>
    <p>
      <span class="title">时间范围</span>
      <el-date-picker
        v-model="time_value"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="left"
        size="small"
      ></el-date-picker>
      <el-button type="primary" size="small" @click="clickinfo">查询</el-button>
    </p>
    <!-- 折线图 -->
    <div class="box">
      <div id="main" style="width: 1200px;height:500px;"></div>
    </div>
  </div>
</template>

<script>
/* 接口 */
import echarts from "echarts";
import { ordertotal } from "../api/apis";
/* 时间转换 */
import { gettime } from "../utils/utils";

export default {
  data() {
    return {
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
      time_value: "",
    };
  },
  methods: {
    clickinfo() {
      let myChart = echarts.init(document.getElementById("main"));
      if(!this.time_value){
        this.$message.error("请选择要查询的日期！");
        return
      }
      this.time_value[0] = gettime(this.time_value[0]);
      this.time_value[1] = gettime(this.time_value[1]);
      this.time_value = JSON.stringify(this.time_value);
      ordertotal(this.time_value).then((res) => {
        if(res.data.data==0){
          this.$message.error("当前时间段没有统计数据！");
          return
        }
        let arr = res.data.data.map((item) => {
          return gettime(item.orderTime);
        });
        let arr2 = res.data.data.map((item) => {
          return item.orderAmount;
        });
        let option = {
          xAxis: {
            type: "category",
            data: arr,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr2,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.3)",
              },
            },
          ],
        };
        myChart.setOption(option);
      });
      this.time_value=""
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-right: 10px;
}
.el-button {
  margin-left: 10px;
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