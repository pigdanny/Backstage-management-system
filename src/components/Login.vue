<template>
  <div v-show="show" class="login">
    <div class="innerbox">
      <h6>成都市XXX有限公司后台系统登录</h6>
      <p>
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
          v-model="name_input"
          clearable
          size="small"
          style="width:300px"
        ></el-input>
      </p>
      <p>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="psd_input"
          show-password
          size="small"
          style="width:300px"
        ></el-input>
      </p>
      <p>
        <el-button type="primary" size="small" style="width:300px" @click="clicklogin">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
/* 接口 */
import { login } from "../api/apis";

export default {
  data() {
    return {
      show: true,
      name_input: "",
      psd_input: "",
    };
  },
  methods: {
    clicklogin() {
      if (this.name_input == "" || this.psd_input == "") {
        this.$message({
          showClose: true,
          message: "用户名或密码输入错误！",
          type: "warning",
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        login(this.name_input, this.psd_input).then((res) => {
          if (res.data.code == 0) {
            localStorage.username = this.name_input;
            localStorage.token = res.data.token;
            localStorage.role = res.data.role;
            localStorage.id = res.data.id;
            localStorage.navindex="后台首页"
            this.show = false;
            location.hash = "/Index";
            this.$bus.$emit("login")
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
      }, 200);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #304156;
  .innerbox {
    width: 30%;
    height: 45%;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
    background-color: #304156;
    h6 {
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
      color: #ffffff;
      margin-bottom: 20px;
    }
    .el-input {
      margin-bottom: 20px;
    }
  }
}
</style>