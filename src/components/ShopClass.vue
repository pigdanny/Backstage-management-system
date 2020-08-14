<template>
  <div>
    <!-- 标题 -->
    <el-col :span="24">
      <div class="grid-content bg-purple">商品分类</div>
      <!-- 添加分类 -->
      <div class="add">
        <el-button type="primary" @click="dialogFormVisible = true" size="small">添加分类</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form" style="width:85%">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" clearable size="small"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="form">
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="clickshopadd" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
    <!-- 商品分类 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" :index="indexMethod" label="序号" width="200"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="300">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.cateName }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.cateName"
            clearable
            size="mini"
            style="width:250px"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="300">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="!scope.row.ischange"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.ischange?"完成":"编辑"}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >>></el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
/* 接口 */
import { shoplist } from "../api/apis";
import { shopdel } from "../api/apis";
import { shopreplace } from "../api/apis";
import { shopadd } from "../api/apis";

export default {
  data() {
    return {
      /* 表格分类 */
      currentPage: 1,
      pageSize: 5,
      total: 100,
      tableData: [],
      loading:true,

      /* 添加按钮 */
      dialogFormVisible: false,
      form: {
        name: "",
        value: true,
      },
      formLabelWidth: "150px",
    };
  },
  created() {
    /* 渲染 */
    this.getlist();
  },
  methods: {
    /* 商品序号 */
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    /* 获取列表接口函数 */
    getlist() {
      shoplist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          if (obj.state) {
            obj.state = true;
          } else {
            obj.state = false;
          }
          obj.ischange = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
      this.loading=false;
    },
    /* 每页条数 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist();
    },
    /* 当前页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    /* 添加商品 */
    clickshopadd() {
      if (this.form.name == "") {
        this.$message.error("请输入商品分类名称！");
        return;
      }
      this.dialogFormVisible = false;
      shopadd(this.form.name, this.form.value).then((res) => {
        this.$message.success(res.data.msg);
      });
      this.getlist();
    },
    /* 删除商品 */
    handleDelete(index, row) {
      this.$confirm("你确定要删除当前商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          shopdel(row.id).then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
          });
          shoplist(this.currentPage, this.pageSize).then((res) => {
            if (res.data.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.getlist();
            } else {
              this.getlist();
            }
          });
        })
        .catch(() => {});
    },
    /* 修改商品 */
    handleEdit(index, row) {
      if (row.ischange) {
        row.ischange = false;
        shopreplace(row.id, row.cateName, row.state).then((res) => {
          this.$message.success(res.data.msg);
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
  padding: 10px 0;
}

.el-table {
  padding: 10px 20px;
}

.el-pagination {
  margin-left: 20px;
}
</style>