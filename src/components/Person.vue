<template>
  <div>
    <el-col :span="24">
      <div class="grid-content bg-purple">管理员信息</div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content bg-purple">管理员ID：{{id}}</div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content bg-purple">账号：{{name}}</div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content bg-purple">用户组：{{person}}</div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content bg-purple">创建时间：{{time}}</div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content bg-purple">
        管理员头像：
        <el-upload
          class="avatar-uploader"
          :action="acc_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="uploaddata"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-col>
  </div>
</template>

<script>
/* 接口 */
import { accinfo } from "../api/apis";
import { acc_upload } from "../api/apis";
/* 时间转换 */
import { gettime } from "../utils/utils";

export default {
  data() {
    return {
      id: "",
      name: "",
      person: "",
      time: "",
      imageUrl: "",
      uploaddata: {},
      acc_upload,
    };
  },
  created() {
    accinfo(localStorage.id).then((res) => {
      this.id = res.data.accountInfo.id;
      this.name = res.data.accountInfo.account;
      this.person = res.data.accountInfo.userGroup;
      this.time = gettime(res.data.accountInfo.ctime);
    });
    this.uploaddata = { id: localStorage.id };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 0) {
        this.$message.success(res.msg);
        this.$bus.$emit("up")
      } else {
        this.$message.error(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #fff;
}
.innerbox {
  padding: 0 5px;
  background-color: #fff;
}
.grid-content {
  display: flex;
  align-items: center;
  border-radius: 4px;
  min-height: 50px;
  padding: 15px 20px;
  margin-bottom: 2px;
}

.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>