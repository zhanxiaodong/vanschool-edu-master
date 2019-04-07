<template>
  <el-menu
    class="app-menu"
    :default-active="currPath"
    :collapse="isCollapse"
    :collapse-transition="false"
    router
  >
    <template v-for="item in navList">
      <el-submenu
        v-if="item.children"
        :key="item.path"
        :index="item.path"
      >
        <template slot="title">
          <font-awesome-icon :icon="item.icon" />
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
          v-for="subItem in item.children"
          :key="`${item.path}/${subItem.path}`"
          :index="`${item.path}/${subItem.path}`"
        >{{subItem.title}}</el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else
        :key="item.path"
        :index="item.path"
      >
        <font-awesome-icon :icon="item.icon" />
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LayoutAside",
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      currPath: state =>
        state.app.currPath
          .split("/")
          .slice(0, 3)
          .join("/"),
      isCollapse : state=>state.app.asideIsCollapse
    })
  }
};
</script>