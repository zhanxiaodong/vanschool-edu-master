<template>
  <el-card shadow="never">
    <el-row class="simple-search-bar">
      <el-col :span="6">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit(null)"
        >添 加</el-button>
      </el-col>
    </el-row>
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table :data="listData">
        <el-table-column
          prop="groupName"
          label="角色名称"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑角色"
    >
      <el-form label-width="6em">
        <el-form-item label="角色名称：">
          <el-input
            v-model="formData.groupName"
            placeholder="输入人员名称"
          />
        </el-form-item>
        <el-form-item label="角色权限：">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="path"
            ref="permissionTree"
            show-checkbox
          ></el-tree>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleSubmit"
        >提 交</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { authRouterMap } from "@/router/index";
export default {
  name: "Management",
  data() {
    function routerArr(data) {
      let routerItem = {};
      if ((data.path || data.name) && data.meta) {
        routerItem.path = data.path;
        routerItem.title = data.meta ? data.meta.title : "";
        if (data.children && data.children.length > 1) {
          routerItem.children = data.children
            .map(item => routerArr(item))
            .filter(item => item && JSON.stringify(item) !== "{}");
        }
      }
      return routerItem;
    }
    const treeData = [...authRouterMap]
      .map(item => routerArr(item))
      .filter(item => item && JSON.stringify(item) !== "{}");

    return {
      loading: false,
      dialogVisible: false,
      formData: {
        groupName: ""
      },
      listData: [],
      treeData,
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    this.queryTableData();
  },
  methods: {
    // 获取列表
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/teacher/group/querys`,
          method: "POST"
        })
        .then(res => {
          this.listData = res.result;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 添加和编辑
    handleEdit(row) {
      if (row) {
        this.formData = {
          id: row.id,
          groupName: row.groupName
        };
      } else {
        this.formData = {
          groupName: ""
        };
      }
      this.dialogVisible = true;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$root
            .request({
              url: `/man/teacher/group/delete/${row.id}`,
              method: "POST",
              data: { id: row.id }
            })
            .then(this.handleSucceed)
            .catch(err => {
              window.console.error(err);
            });
        })
        .catch(() => {});
    },
    // 添加和编辑的表单提交
    handleSubmit() {
      const { id, groupName } = this.formData;

      window.console.log(this.$refs.permissionTree.getCheckedKeys(false));
      // if (id) {
      //   this.$root
      //     .request({
      //       url: `/man/teacher/group/update/${id}`,
      //       method: "POST",
      //       data: { id, groupName }
      //     })
      //     .then(this.handleSucceed)
      //     .catch(err => {
      //       window.console.error(err);
      //     });
      // } else {
      //   this.$root
      //     .request({
      //       url: `/man/teacher/group/add`,
      //       method: "POST",
      //       data: { groupName }
      //     })
      //     .then(this.handleSucceed)
      //     .catch(err => {
      //       window.console.error(err);
      //     });
      // }
    },
    // 操作成功
    handleSucceed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.queryTableData();
      this.dialogVisible = false;
    }
  }
};
</script>
