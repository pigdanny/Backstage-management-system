<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">添加账号</div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <p class="name">
            账号
            <el-input v-model="text_input" clearable style="width:200px" size="small"></el-input>
          </p>
          <p class="psd">
            密码
            <el-input v-model="psd_input" show-password style="width:200px" size="small"></el-input>
          </p>
          <p class="select">
            用户组
            <el-select v-model="select_value" placeholder="请选择用户组" style="width:200px" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <p>
            <el-button type="primary" size="small" @click="clickadd">添加</el-button>
            <el-button size="small" @click="clickreload">重置</el-button>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 接口 */
import { accadd } from "../api/apis";

export default {
  data() {
    return {
      text_input: "",
      psd_input: "",
      select_value: "",
      options: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],
    };
  },
  methods: {
    clickadd() {
      if (
        this.text_input == "" ||
        this.psd_input == "" ||
        this.select_value == ""
      ) {
        this.$message({
            showClose: true,
            message: "信息输入错误！",
            type: "warning",
          });
        return;
      }
      accadd(this.text_input, this.psd_input, this.select_value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "warning",
          });
        }
      });
    },
    clickreload() {
      this.text_input = "";
      this.psd_input = "";
      this.select_value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
  margin-bottom: 1px;
}

.bg-purple {
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  min-height: 40px;
  padding: 10px 20px;
  p {
    display: flex;
    align-items: center;
    margin: 20px;
  }
  .name,
  .psd {
    padding-left: 30px;
  }
  .select {
    padding-left: 15px;
  }
  .el-input,
  .el-select {
    margin-left: 10px;
  }
  .el-button:first-child {
    margin-left: 75px;
  }
}
</style>