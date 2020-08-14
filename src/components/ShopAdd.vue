<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">商品添加</div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <!-- 1 -->
          <p>
            商品名称
            <el-input v-model="text_input" placeholder="商品名称" clearable size="small"></el-input>
          </p>
          <!-- 2 -->
          <p>
            商品分类
            <el-select v-model="select_value" placeholder="请选择商品分类" size="small">
              <el-option v-for="item in options" :key="item.cateName" :value="item.cateName"></el-option>
            </el-select>
          </p>
          <!-- 3 -->
          <p>
            商品价格
            <el-input-number v-model="num_input" :min="1" label="描述文字" size="small"></el-input-number>
          </p>
          <!-- 4 -->
          <p class="upload">
            <span>商品图片</span>
            <el-upload
              class="avatar-uploader"
              :action="img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <!-- 5 -->
          <p class="text">
            <span>商品描述</span>
            <el-input
              style="width:300px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea"
              size="small"
            ></el-input>
          </p>
          <!-- 6 -->
          <p>
            <el-button type="primary" size="small" @click="clickupload">添加商品</el-button>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 接口 */
import { goodsalllist } from "../api/apis";
import { goodsadd } from "../api/apis";
import { img_upload  } from "../api/apis";

export default {
  data() {
    return {
      text_input: "",
      options: [],
      select_value: "",
      num_input: 1,
      textarea: "",
      imageUrl: "",
      imgUrl: "",
      img_upload ,
    };
  },
  created() {
    goodsalllist().then((res) => {
      this.options = res.data.categories;
      this.select_value=res.data.categories[0].cateName;
    });
  },
  methods: {
    /* 上传图片 */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
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
    /* 商品添加按钮 */
    clickupload() {
      if (
        this.text_input == "" ||
        this.select_value == "" ||
        this.num_input == "" ||
        this.imgUrl == "" ||
        this.textarea == ""
      ) {
        this.$message.error("商品信息填写错误！");
        return;
      }
      goodsadd(
        this.text_input,
        this.select_value,
        this.num_input,
        this.imgUrl,
        this.textarea
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
  padding: 10px 15px;
  margin-bottom: 1px;
  p {
    margin: 20px 10px;
  }
  .el-input {
    flex: 1;
    margin-left: 15px;
    width: 300px;
  }
  .el-select {
    margin-left: 15px;
  }
  .el-input-number {
    margin-left: 15px;
  }
  .upload,
  .text {
    display: flex;
    span {
      display: inline-block;
      width: 75px;
    }
  }
  .el-button {
    margin-left: 75px;
  }
}

.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>