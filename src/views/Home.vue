<template>
  <el-container class="body">
    <!-- 侧边栏 -->
    <el-aside width="220px">
      <div class="tilte">
        <img alt="" class="logoimg" src="https://www.gin-vue-admin.com/img/logo.png">
        <div class="tit-text" style="color: rgb(255, 255, 255);">Xue-Yi-An</div>
      </div>
      <el-menu default-active="2" class="menu" background-color="rgb(25, 26, 35)" text-color="#FFFFFF"
        active-text-color="#409EFF" router unique-opened>
        <el-submenu :index="index + ''" v-for="(item, index) in routes" v-if="!item.hidden" :key="index">
          <template slot="title">
            <i :class="item.iconCls" class="iconCls"></i>
            <span class="RouteName">{{ item.name }}</span>
          </template>
          <el-menu-item :index="child.path" v-for="(child, indexJ) in item.children" :key="indexJ">
            <template slot="title">
              <i :class="child.iconCls" class="iconCls"></i>
              <span class="RouteName">{{ child.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- <el-menu router unique-opened class="menu">
        <el-submenu :index="index + ''" v-for="(item, index) in routes" v-if="!item.hidden" :key="index">
          <template slot="title">
            <i :class="item.iconCls" class="iconCls"></i>
            <span class="RouteName">{{ item.name }}</span>
          </template>
          <el-menu-item :index="child.path" v-for="(child, indexJ) in item.children" :key="indexJ">
            <template slot="title">
              <i :class="child.iconCls" class="iconCls"></i>
              <span class="RouteName">{{ child.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu> -->
    </el-aside>

    <!-- 右侧部分 -->
    <el-container style=" width= calc(100% -220px)">
      <el-header class="homeHeader">

        <el-row type="flex" class="row-bg" justify="end">
          <el-col :span="3">
            <div class="personCenter">
              <el-button icon="el-icon-bell" type="text" class="goChat" size="normal" @click="goChat"></el-button>
              <el-dropdown class="userInfo" @command="commandHandler">
                <span class="el-dropdown-link">
                  {{ user.name }}<i><img :src="user.userface" alt=""></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                  <el-dropdown-item command="setting">设置</el-dropdown-item>
                  <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>

        </el-row>

        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
        </el-breadcrumb>


      </el-header>

      <el-main>
        <div class="mainBox">

          <myCard class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">

          </myCard>
          <router-view class="homeRouterView" />
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import card from "./../components/index/card.vue"
export default {
  name: "Home",
  components: {
    myCard: card,
  },
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  computed: {
    routes() {
      // this.$route == this.$route.currentRoute --本组件路由
      // this.$router 所有组件路由
      console.log(this.$route);
      return this.$store.state.routes;
    }
  },
  methods: {
    goChat() {
      this.$router.push("/chat")
    },
    // 个人中心选择
    commandHandler(cmd) {
      // 注销
      if (cmd == 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/logout');
          window.sessionStorage.removeItem('user')
          this.$router.replace('/')
          this.$store.commit('initRoutes', [])
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
      if (cmd == 'userinfo') {
        this.$router.push("/adminCenter");
      }
    }
  }
}
</script>

<style scoped>
/* 侧边栏 */
.el-aside {
  background-color: rgb(25, 26, 35);
}

/* 清除侧边栏滑动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}

.tilte {
  min-height: 60px;
  line-height: 60px;
  text-align: center;
  transition: all .3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(25, 26, 35);
}

.tilte .logoimg {
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  padding: 3px;
}

.tilte .tit-text {
  display: inline-block;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  padding-left: 10px;
}

.el-menu {
  border: 0;
  height: 100vh;
}

.RouteName {
  margin-left: 10px;
}

.RouteName,
.iconCls {
  color: #fff;
  font-size: 16px;
}

.el-submenu /deep/ .el-submenu__title:hover,
.el-submenu /deep/ .el-menu-item:hover {
  background-color: rgb(25, 26, 35) !important;
}


/* 右侧 */
/* .right {
  width: calc(100% -220px)
}

.homeHeader {
  background-color:  rgb(25, 26, 35); */
/* display: flex;
  position: absolute;
  right: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}
 */

.homeHeader {
  background-color: #fff;
  height: 100px !important;
}

.el-breadcrumb {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}

.row-bg {
  border-bottom: 1px solid #F4F4F4;
  height: 60px;
}

.personCenter {
  margin-top: 10px;
}

.goChat {
  margin-right: 8px;
  color: #000000;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

/* 主体 */
.el-main {
  padding: 5px 0 0 12px;
  margin-top: 5px;
}

.mainBox {
  padding: 10px 0 0 10px;
  /* border: 1px solid black; */
  background-color: #fff;
}

.homeWelcome {
  margin-top: -10px;
  margin-left: -10px;
}

.homeRouterView {
  margin-top: 20px;
}

.page .gva-top-card[data-v-ca92126c] {
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: #777; */
}

.page .gva-top-card-right[data-v-ca92126c] {
  /* height: 600px; */
  width: 600px;
  margin-top: 28px;
}
</style>

