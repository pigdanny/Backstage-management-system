<template>
  <div>
    <!-- 标题 -->
    <el-col :span="24">
      <div class="grid-content bg-purple">商品列表</div>
    </el-col>
    <!-- 商品列表 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <!-- 详细描述 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ scope.row.id}}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ scope.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ scope.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-image style="width: 50px; height: 50px" :src="img_download+scope.row.imgUrl"></el-image>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ scope.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ scope.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ scope.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ scope.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 商品描述 -->
      <!-- 1 -->
      <el-table-column label="商品名称" prop="name">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.name }}</span>
          <el-input v-show="scope.row.ischange" v-model="scope.row.name" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 2 -->
      <el-table-column label="商品分类" prop="category">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.category }}</span>
          <el-select
            v-show="scope.row.ischange"
            v-model="scope.row.category"
            placeholder="请选择商品分类"
            size="small"
          >
            <el-option v-for="item in options" :key="item.cateName" :value="item.cateName"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- 3 -->
      <el-table-column label="商品价格" prop="price">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.price }}</span>
          <el-input v-show="scope.row.ischange" v-model="scope.row.price" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <!-- 4 -->
      <el-table-column label="商品图片" prop="imgUrl">
        <template slot-scope="scope">
          <el-image
            v-show="!scope.row.ischange"
            style="width: 50px; height: 50px"
            :src="img_download+scope.row.imgUrl"
          ></el-image>
          <el-upload
            v-show="scope.row.ischange"
            class="avatar-uploader"
            :action="img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-table-column>
      <!-- 5 -->
      <el-table-column label="商品描述" prop="goodsDesc">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.goodsDesc }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.goodsDesc"
            clearable
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.ischange?"完成":"编辑"}}</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
import { goodslist } from "../api/apis";
import { goodsdel } from "../api/apis";
import { goodsreplace } from "../api/apis";
import { goodsalllist } from "../api/apis";
import { img_upload } from "../api/apis";
import { img_download } from "../api/apis";
/* 时间转换 */
import { gettime } from "../utils/utils";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      multipleSelection: [],
      options: [],
      imgUrl: "",
      img_upload,
      img_download,
    };
  },
  //获取列表
  created() {
    this.getlist();
  },
  methods: {
    //获取列表接口函数
    getlist() {
      goodslist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = gettime(obj.ctime);
          obj.ischange = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
      this.loading = false;
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
    //删除当前行
    handleDelete(index, row) {
      this.$confirm("你确定要删除当前商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          goodsdel(row.id).then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
          });
          this.getlist();
        })
        .catch(() => {});
    },
    //修改账号
    handleEdit(index, row) {
      goodsalllist().then((res) => {
        this.options = res.data.categories;
      });
      if (this.imgUrl) {
        row.imgUrl = this.imgUrl; //上传图片图片更新
      } 
      if (row.ischange) {
        this.flag = false;
        row.ischange = false;
        goodsreplace(
          row.name,
          row.category,
          row.price,
          row.imgUrl,
          row.goodsDesc,
          row.id
        )
          .then((res) => {
            this.$message.success(res.data.msg);
            this.imgUrl = "";
          })
          .catch((res) => {
            this.$message.error(res.data.msg);
            this.imgUrl = "";
          });
      } else {
        this.flag = true;
        row.ischange = true;
      }
    },
    /* 上传图片 */
    handleAvatarSuccess(res) {
      this.imgUrl = res.imgUrl; //将已经上传的图片地址更新
      this.$message.success(res.msg);
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
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  min-height: 40px;
  line-height: 40px;
  text-indent: 15px;
  margin-bottom: 1px;
}

.grid-content2 {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px 0;
}

.el-table {
  padding: 10px 20px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 10px;
  width: 50%;
}

.el-pagination {
  margin-left: 20px;
}

.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  width: 50px;
  height: 50px;
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
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar {
  width: 50px;
  height: 50px;
  display: block;
}

.el-image {
  border-radius: 6%;
}
</style>