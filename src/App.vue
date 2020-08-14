<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="220px">
      <!-- 标题 -->
      <p class="title">
        <el-button type="primary" icon="el-icon-dish-1" circle></el-button>
        <span>外卖商家中心</span>
      </p>
      <!-- 导航栏 -->
      <el-row class="tac">
        <el-col>
          <el-menu
            :default-active="hash"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff"
            router
            unique-opened
          >
            <!-- 权限列表 -->
            <div v-for="item in powerarr" :key="item.url">
              <!-- 不展开列表 -->
              <el-menu-item
                v-if="!item.children"
                :index="item.url"
                @click.native="clicklist(item.name)"
              >
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
              <!-- 展开列表 -->
              <el-submenu v-else :index="item.url">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.url"
                  :index="child.url"
                  @click.native="clicklist(item.name,child.name)"
                >{{child.name}}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <!-- 头部-主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <b>{{titel}}</b>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{subtitel}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="person">
          <span class="user">欢迎你，{{name}}</span>
          <router-link to="/Person" @click.native="clicklist(person)">
            <el-avatar :src="url"></el-avatar>
          </router-link>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken } from "./api/apis";
import { accinfo } from "./api/apis";

export default {
  data() {
    return {
      hash: "",
      name: localStorage.username,
      titel: "",
      subtitel: "",
      person: "个人中心",
      role: localStorage.role,
      url: "",
      powerarr: "",
      list: [
        /* 1 */
        {
          url: "/Index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        /* 2 */
        {
          url: "/Order",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        /* 3 */
        {
          url: "/Shop",
          icon: "el-icon-s-management",
          name: "商品管理",
          children: [
            { url: "/ShopList", name: "商品列表" },
            { url: "/ShopAdd", name: "商品添加" },
            { url: "/ShopClass", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        /* 4 */
        {
          url: "/Store",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        /* 5 */
        {
          url: "/Account",
          icon: "el-icon-user",
          name: "账号管理",
          children: [
            { url: "/AccountList", name: "账号列表" },
            { url: "/AccountAdd", name: "添加账号" },
            { url: "/AccountPsd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        /* 6 */
        {
          url: "/Info",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/InfoShop", name: "商品统计" },
            { url: "/InfoOrder", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
    };
  },
  methods: {
    //面包削渲染
    clicklist(index, subindex) {
      if (index == undefined) {
        index = "";
      }
      if (subindex == undefined) {
        subindex = "";
      }
      localStorage.navindex = index;
      localStorage.navsubindex = subindex;
      this.titel = index;
      this.subtitel = subindex;
    },
    login() {
      this.powerarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
    },
  },
  computed: {
    //权限数组
    /* powerarr() {
      let newarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
      return newarr;
    }, */
  },
  created() {
    this.hash = location.hash.substring(1);
    this.clicklist(localStorage.navindex, localStorage.navsubindex);
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.name = localStorage.username;
      } else {
        this.name = "请登录";
      }
    });
    accinfo(localStorage.id).then((res) => {
      this.url = res.data.accountInfo.imgUrl;
    });
    this.$bus.$on("up", () => {
      accinfo(localStorage.id).then((res) => {
        this.url = res.data.accountInfo.imgUrl;
      });
    });
    this.$bus.$on("login", () => {
      this.login();
    });
    this.login();
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #304156;
  .title {
    margin: 10px 0;
    text-align: center;
    span {
      color: #fff;
      margin-left: 5px;
    }
  }
  ul {
    border: none;
  }
}

.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }
  .person {
    display: flex;
    align-items: center;
    padding-right: 10px;
    .user {
      margin-right: 10px;
    }
  }
}

.el-main {
  background-color: #f0f2f5;
  color: #333;
}
</style>
