<template>
  <el-container class="app-container">
    <el-header
      class="app-header"
      height="64px"
    >
      <layout-header />
    </el-header>
    <el-container>
      <el-aside
        class="app-aside"
        :width="currAsideWidth"
      >
        <layout-aside :nav-list="navList" />
      </el-aside>
      <el-main class="app-main">
        <el-breadcrumb
          class="app-breadcrumb"
          separator=">"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="item in breadcrumb"
            :key="item.lable"
          >{{item.lable}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { constantRouterMap } from "@/router/index.js";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutAside from "./LayoutAside.vue";

export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutAside
  },
  data() {
    return {
      navList: []
    };
  },
  created() {
    function routerArr(data) {
      if (!data.hidden) {
        let routerItem = {};
        if (data.path || data.name) {
          routerItem.path = data.path;
          // window.console.log(data.path)
          routerItem.title = data.meta ? data.meta.title : "";
          routerItem.icon = data.meta ? data.meta.icon : "";
          if (data.children && data.children.length > 1) {
            routerItem.children = data.children
              .map(item => routerArr(item))
              .filter(item => item !=='');
          }
        }
        return routerItem;
      }
    }
    this.navList = [...constantRouterMap]
      .map(item => routerArr(item))
      .filter(item => item && JSON.stringify(item) !== "{}");
  },
  computed: {
    ...mapState({
      breadcrumb: state => state.app.breadcrumb,
      asideWidth: state => state.app.asideWidth,
      isCollapse: state => state.app.asideIsCollapse
    }),
    currAsideWidth() {
      return this.isCollapse ? "64px" : `${this.asideWidth}px`;
    }
  }
};
</script>
