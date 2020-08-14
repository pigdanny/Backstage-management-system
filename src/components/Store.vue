<template>
  <div>
    <el-row>
      <!-- 标题 -->
      <el-col :span="24">
        <div class="grid-content bg-purple">店铺管理</div>
        <div class="add">
          <el-button type="primary" @click="clicksave" size="small">保存</el-button>
        </div>
      </el-col>
      <!-- 内容 -->
      <el-col :span="24">
        <div class="grid-content2 bg-purple">
          <!-- 1 -->
          <p>
            店铺名称
            <el-input v-model="name_input" clearable style="width:300px" size="small"></el-input>
          </p>
          <!-- 2 -->
          <p class="text">
            <span>店铺公告</span>
            <el-input
              style="width:300px"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10}"
              placeholder="请输入内容"
              v-model="textarea_input"
              size="small"
            ></el-input>
          </p>
          <!-- 3 -->
          <p class="hand_upload">
            <span>店铺头像</span>
            <el-upload
              class="avatar-uploader"
              :action="shop_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="head_input" :src="shop_download+head_input" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <!-- 4 -->
          <p class="shop_upload">
            <span>店铺图片</span>
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :action="shop_upload"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess2"
              :file-list="fileList"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <!-- 5 -->
          <p class="price">
            配送费
            <el-input v-model="dlprice_input" clearable style="width:300px" size="small"></el-input>
          </p>
          <!-- 6 -->
          <p>
            配送时间
            <el-input type="number" min="0" v-model="dltime_input" style="width:300px" size="small"></el-input>
          </p>
          <!-- 7 -->
          <p>
            配送描述
            <el-input v-model="dltext_input" clearable style="width:300px" size="small"></el-input>
          </p>
          <!-- 8 -->
          <p>
            店铺评分
            <el-input
              type="number"
              min="0"
              step="0.5"
              v-model="dlrank_input"
              style="width:300px"
              size="small"
            ></el-input>
          </p>
          <!-- 9 -->
          <p class="sell">
            销量
            <el-input type="number" min="0" v-model="dlsell_input" style="width:300px" size="small"></el-input>
          </p>
          <!-- 10 -->
          <p class="check">
            <span>活动</span>
            <el-checkbox-group v-model="checkList_input" style="width:350px">
              <el-checkbox label="在线支付满25减5"></el-checkbox>
              <el-checkbox label="全场饮品8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </p>
          <!-- 11 -->
          <p class="time">
            <span>营业时间</span>
            <el-time-picker
              is-range
              v-model="time_input"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              style="width:400px"
              size="small"
              align="center"
            ></el-time-picker>
          </p>
          <!-- 12 -->
          <p>
            起送价格
            <el-input
              type="number"
              min="0"
              v-model="minprice_input"
              style="width:300px"
              size="small"
            ></el-input>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 接口 */
import { shopinfo } from "../api/apis";
import { shop_download } from "../api/apis";
import { shop_upload } from "../api/apis";
import { shopedit } from "../api/apis";
/* 时间转换 */
import { gettime } from "../utils/utils";

export default {
  data() {
    return {
      id: "",
      name_input: "",
      textarea_input: "",
      head_input: "1590473180839.webp",
      imgs_input: [],
      fileList: [],
      shop_download,
      shop_upload,
      dlprice_input: "",
      dltime_input: "",
      dltext_input: "",
      dlrank_input: "",
      dlsell_input: "",
      checkList_input: [],
      time_input: [],
      minprice_input: "",
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    /* 获取店铺详情 */
    getlist() {
      shopinfo().then((res) => {
        this.id = res.data.data.id;
        this.name_input = res.data.data.name;
        this.textarea_input = res.data.data.bulletin;
        this.head_input = res.data.data.avatar;
        this.fileList = res.data.data.pics.map((item) => {
          return {
            name: item,
            url: shop_download + item,
          };
        });
        this.imgs_input = res.data.data.pics;
        this.dlprice_input = res.data.data.deliveryPrice;
        this.dltime_input = res.data.data.deliveryTime;
        this.dltext_input = res.data.data.description;
        this.dlrank_input = res.data.data.score;
        this.dlsell_input = res.data.data.sellCount;
        this.checkList_input = [...res.data.data.supports];
        this.time_input = [...res.data.data.date];
        this.minprice_input = res.data.data.minPrice;
      });
    },
    /* 店铺头像上传 */
    handleAvatarSuccess(res) {
      this.head_input = res.imgUrl;
    },
    /* 店铺图片上传 */
    handleRemove(file) {
      let index = this.fileList.indexOf(file.naem);
      this.imgs_input.splice(index, 1);
    },
    handleAvatarSuccess2(res) {
      this.imgs_input.push(res.imgUrl);
    },
    /* 店铺信息保存 */
    clicksave() {
      let checkList_inputs = JSON.stringify(this.checkList_input);
      let time_input = JSON.stringify([
        gettime(this.time_input[0]),
        gettime(this.time_input[1]),
      ]);
      let imgs_input = JSON.stringify(this.imgs_input);
      shopedit(
        this.id,
        this.name_input,
        this.textarea_input,
        this.head_input,
        this.minprice_input,
        this.dltime_input,
        this.dltext_input,
        this.dlrank_input,
        this.dlsell_input,
        checkList_inputs,
        time_input,
        imgs_input
      )
        .then((res) => {
          this.$message.success(res.data.msg);
        })
        .catch((res) => {
          this.$message.error(res.data.msg);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 2px;
  .add {
    margin-right: 20px;
  }
}

.bg-purple {
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  min-height: 50px;
  line-height: 50px;
  text-indent: 15px;
}

.grid-content2 {
  border-radius: 4px;
  min-height: 40px;
  padding: 10px 20px;
  p {
    margin: 20px;
  }
  .el-input {
    margin-left: 15px;
  }
  .hand_upload,
  .shop_upload,
  .text {
    display: flex;
    span {
      display: inline-block;
      width: 75px;
    }
  }
  .price {
    padding-left: 15px;
  }
  .sell {
    padding-left: 28px;
  }
  .check {
    display: flex;
    padding-left: 28px;
    span {
      display: inline-block;
      width: 48px;
    }
    .el-checkbox {
      margin-bottom: 15px;
    }
  }
  .time {
    margin-bottom: 40px;
    span {
      margin-right: 18px;
    }
  }
}

.avatar-uploader,
.el-upload {
  border: 1px dashed #ffffff;
  border-radius: 6px;
  width: 150px;
  height: 150px;
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
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>