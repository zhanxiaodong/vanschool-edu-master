<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-size: 14px;
  color: #606266;
}
a {
  text-decoration: none;
  color: inherit;
}
img {
  width: 100%;
  display: block;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.app-header {
  position: relative;
  padding: 0 20px 0 0;
  // border-bottom: 1px solid #f2f2f2;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
  .app-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 100%;
  }
  .app-header-left {
    display: flex;
    align-items: center;
    border-right: 1px solid #f6f6f6;
    box-sizing: border-box;
    justify-content: flex-start;
    padding: 0 0 0 5px;
    transition: all 0.3s;
    overflow: hidden;
  }
  .is-collapse {
    padding: 0;
  }
  .collapse-logo {
    position: relative;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      flex-shrink: 0;
      display: inline-block;
      width: 2.4em;
      height: 2.4em;
      background-color: red;
      background: url("./assets/logo.png") no-repeat 50% 50% / 100%;
    }
    .logo-text {
      position: absolute;
      top: 50%;
      left: 100%;
      font-size: 1.5em;
      width: 5em;
      display: block;
      transform: translateY(-50%);
    }
  }
  .app-header-right {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 20px;
    & .links {
      display: inline-block;
      margin: 0 0 0 2em;
    }
  }
}
.app-main {
  background-color: #f5f6fa;
  height: calc(100vh - 64px);
  overflow: auto;
  scroll-behavior: smooth;
}
.app-aside {
  transition: all 0.3s;
  border-right: 1px solid #f2f2f2;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  height: calc(100vh - 64px);
  overflow: auto;
}
.app-menu {
  border-right-width: 0;
}
.app-breadcrumb {
  margin: 0 0 1.5em 0;
}
.card-style {
  margin: 0 0 1.2em 0;
}
.simple-search-bar {
  padding: 0.5em 0 2em 0;
}
.table-container-footer {
  padding: 1.5em 0 0 0;
}
.app-main .el-select,
.app-main .el-date-editor {
  width: 100%;
}
.table-tools-bar {
  margin: 0 0 1em 0;
}
.info-form-style .el-form-item {
  margin: 0;
}
.svg-inline--fa {
  margin-right: 12px;
  text-align: center;
  font-size: 16px;
  vertical-align: middle;
  display: inline-block;
}
.el-menu--collapse .svg-inline--fa {
  margin: 0 3px;
}
.el-input__prefix .svg-inline--fa {
  margin: 0 6px;
}
.dashboard-stata-table {
  width: 100%;
  border: 1px solid #eeeeee;
  border-collapse: collapse;
  font-size: 95%;
  & td,
  & th {
    min-width: 2.2em;
    padding: 0.4em 0;
    border: 1px solid #eeeeee;
    text-align: center;
    font-weight: normal;
  }
  & th {
    background-color: #f0f0f0;
  }
  & td:nth-of-type(1) {
    background-color: #f0f0f0;
  }
}
.dashboard-switch-header {
  padding: 0 0 1em 0;
}
.card-title {
  display: flex;
  align-self: center;
  justify-content: space-between;
}
.my-radio {
  margin: 0 10px 10px 0 !important;
}
.el-cascader {
  width: 100%;
}
.inline-info-form .el-form-item {
  margin: 0 2em 1em 0;
}
.info-form .el-form-item {
  margin: 0 0 0 0;
}
.scheduling-table {
  width: 100%;
  margin: 0 0 1em 0;
  border-collapse: collapse;
  td {
    text-align: center;
    padding: 12px 0;
    border: 1px solid #ebeef5;
  }
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #ffcd38;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
}
.links:hover {
  cursor: pointer;
}
.cell-row {
  line-height: 42px;
}
</style>

