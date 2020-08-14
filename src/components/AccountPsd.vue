<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">修改密码</div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <p class="name">
            原密码
            <el-input v-model="oldpsd_input" show-password style="width:200px" size="small"></el-input>
          </p>
          <p class="psd">
            新密码
            <el-input v-model="newpsd_input" show-password style="width:200px" size="small"></el-input>
          </p>
          <p>
            确认新密码
            <el-input v-model="surepsd_input" show-password style="width:200px" size="small"></el-input>
          </p>
          <p>
            <el-button type="primary" size="small" @click="clickpsd">确定</el-button>
            <el-button size="small" @click="clickreload">重置</el-button>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 接口 */
import { accinfo } from "../api/apis";
import { accnewpwd } from "../api/apis";

export default {
  data() {
    return {
      oldpsd_input: "",
      newpsd_input: "",
      surepsd_input: "",
    };
  },
  methods: {
    clickpsd() {
      if (
        this.oldpsd_input == "" ||
        this.newpsd_input == "" ||
        this.surepsd_input == ""
      ) {
        this.$message.error("请输入密码！");
        return;
      } else if (this.oldpsd_input == this.newpsd_input) {
        this.$message.error("新久密码一致！");
        return;
      } else if (this.newpsd_input != this.surepsd_input) {
        this.$message.error("两次新密码不一致！");
        return;
      }
      accinfo(this.oldpsd_input, localStorage.id).then((res) => {
        if (res.data.code == "0") {
          accnewpwd(this.newpsd_input, localStorage.id).then((res) => {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          });
        } else {
          this.$message.error("原密码输入错误！");
        }
      });
    },
    clickreload() {
      this.oldpsd_input = "";
      this.newpsd_input = "";
      this.surepsd_input = "";
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
    padding-left: 28px;
  }
  .el-input {
    margin-left: 10px;
  }

  .el-button:first-child {
    margin-left: 85px;
  }
}
</style>