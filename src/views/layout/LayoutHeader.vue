<template>
  <div class="app-header-inner">
    <div
      :class="['app-header-left',isCollapse ? 'is-collapse' : '']"
      :style="`width:${currAsideWidth}`"
    >
      <div class="collapse-logo">
        <i class="logo"></i>
        <span class="logo-text">非凡教育</span>
      </div>
    </div>
    <div class="app-header-right">
      <a
        href="#"
        @click.prevent="$store.commit('changeAsideCollapse',!isCollapse)"
      >
        <font-awesome-icon
          v-if="isCollapse"
          icon="indent"
        />
        <font-awesome-icon
          v-else
          icon="outdent"
        />
      </a>
      <div class="header-nav">
        <a
          class="links"
          href="#"
        >切换 CRM 系统</a>
        <el-dropdown @command="handleCommand">
          <span class="links">
            {{campus}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in campusList"
              :key="item.id"
              :command="item.id"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a
          href="#"
          class="links"
          @click.prevent="handleLogOut"
        >退出登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LayoutHeader",
  data() {
    return {
      campus: "",
      campusList: []
    };
  },
  computed: {
    ...mapState({
      asideWidth: state => state.app.asideWidth,
      isCollapse: state => state.app.asideIsCollapse,
      schoolId: state => state.schoolId
    }),
    currAsideWidth() {
      return this.isCollapse ? "64px" : `${this.asideWidth}px`;
    }
  },
  created() {
    this.getSchoolListData();
  },
  methods: {
    // 点击校区选择框 切换校区id 刷新页面 存储校区Id
    handleCommand(command) {
      this.campus = this.campusList.find(item => item.id === command).name;
      this.$store.commit("changeSchoolId", command);
      window.location.reload();
    },
    handleLogOut() {
      this.$store.commit("logOut");
      this.$router.replace({ path: "/login" });
    },
    // 获取校区列表数据
    getSchoolListData() {
      this.$store
        .dispatch("queryCampusList")
        .then(res => {
          const curr = res.find(item => item.id == this.schoolId);
          this.campusList = res;
          this.campus = curr && curr.name ? curr.name : res[0].name;
          this.$store.commit('changeSchoolId',res[0].id);
        })
        .catch(() => {});
    }
  }
};
</script>