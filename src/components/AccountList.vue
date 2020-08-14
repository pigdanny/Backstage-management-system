<template>
  <div>
    <!-- 标题 -->
    <el-col :span="24">
      <div class="grid-content bg-purple">账号列表</div>
    </el-col>
    <!-- 商品列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      v-loading="loading"
    >
      >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="account" label="账号" width="200">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.account }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.account"
            clearable
            size="mini"
            style="width:150px"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="250">
        <template slot-scope="scope">
          <span v-show="!scope.row.ischange">{{ scope.row.userGroup }}</span>
          <el-input
            v-show="scope.row.ischange"
            v-model="scope.row.userGroup"
            clearable
            size="mini"
            style="width:200px"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="300"></el-table-column>
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
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >></el-pagination>
        <div style="margin-top: 20px">
          <el-button type="danger" size="small" @click="accremove">批量删除</el-button>
          <el-button @click="toggleSelection()" type="primary" size="small">取消选择</el-button>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
/* 接口 */
import { acclist } from "../api/apis";
import { accdel } from "../api/apis";
import { accclear } from "../api/apis";
import { accreplace } from "../api/apis";
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
      loading:true,
    };
  },
  //获取列表
  created() {
    this.getlist();
  },
  methods: {
    //获取列表接口函数
    getlist() {
      acclist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = gettime(obj.ctime);
          obj.ischange = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
      this.loading=false;
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
      if (row.account == localStorage.username) {
        this.$message.error("不能删除当前用户！");
        return;
      }
      this.$confirm("你确定要删除当前管理员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          accdel(row.id).then((res) => {
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
    //取消全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //单选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    accremove() {
      let arr = [];
      let ids = "";
      for (let i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].id);
      }
      ids = JSON.stringify(arr);
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择要删除的账号！");
        return;
      } else if (ids.includes(localStorage.id)) {
        this.$message.error("选择账号不能包含自己！");
        return;
      }
      this.$confirm("确定删除当前管理员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          accclear(ids).then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
          });
          acclist(this.currentPage, this.pageSize).then((res) => {
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
    //修改账号
    handleEdit(index, row) {
      if (row.account == localStorage.username) {
        this.$message.error("不能修改当前用户！");
        return;
      }
      if (row.ischange) {
        row.ischange = false;
        accreplace(row.id, row.account, row.userGroup).then((res) => {
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
  .el-button:first-child {
    margin: 0 0 10px 20px;
  }
}

.bg-purple {
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  line-height: 40px;
  text-indent: 15px;
  margin-bottom: 2px;
}

.grid-content2 {
  border-radius: 4px;
  min-height: 40px;
  padding: 10px 0;
}

.el-table {
  padding: 10px 20px;
}

.el-pagination {
  margin-left: 20px;
}
</style>