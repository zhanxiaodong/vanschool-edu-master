<template>
  <div class="base-campuses">
    <el-card shadow="never">
      <el-row class="simple-search-bar">
        <el-col :span="6">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleEditCampus(null)"
          >添 加</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table :data="tableData">
          <el-table-column
            prop="name"
            label="校区"
            width="140px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="教室"
            align="center"
          >
            <template slot-scope="scope">
              <ul class="nested-cells">
                <li
                  v-for="(item, index) in scope.row.classrooms"
                  :key="index"
                >{{ item.roomName }} [ {{ item.numberMax }} ]</li>
              </ul>
              <p
                v-show="scope.row.classrooms.length > 0"
                class="total-style"
              >总计：{{ scope.row.classrooms.length }} 间</p>
            </template>
          </el-table-column>
          <el-table-column
            label="寝室"
            align="center"
          >
            <template slot-scope="scope">
              <ul class="nested-cells">
                <li
                  v-for="(item, index) in scope.row.dorms"
                  :key="index"
                >{{ item.roomName }} [ {{ item.numberMax }} ]</li>
              </ul>
              <p
                v-show="scope.row.dorms.length > 0"
                class="total-style"
              >总计：{{ scope.row.dorms.length }} 间</p>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                style="margin-right:1em"
                @click="handleEditCampus(scope.row)"
              >校区编辑</el-button>
              <el-dropdown @command="(c)=>{handleCommand(c,scope.row)}">
                <el-button type="text">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">教室编辑</el-dropdown-item>
                  <el-dropdown-item command="b">寝室编辑</el-dropdown-item>
                  <el-dropdown-item command="c">删除校区</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="campusDialogVisible"
      title="编辑校区"
      width="540px"
    >
      <el-form label-width="6em">
        <el-form-item label="校区名称：">
          <el-input
            v-model="campusForm.name"
            placeholder="输入校区名称"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="campusDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmitCampus"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="classroomsDialogVisible"
      title="编辑教室"
      width="620px"
    >
      <el-table :data="selectedCampus.classrooms">
        <el-table-column
          label="教室名称"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.roomName" />
            </template>
            <template v-else>
              {{ scope.row.roomName }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="人数上限"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.numberMax" />
            </template>
            <template v-else>
              {{ scope.row.numberMax }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-button
                type="text"
                @click="handleConfirmEdit(scope.row,1)"
              >确认</el-button>
              <el-button
                type="text"
                @click="cancelEditClassroom(scope.row)"
              >取消</el-button>
            </template>
            <template v-else>
              <el-button
                type="text"
                @click="scope.row.editing = true"
              >
                修改
              </el-button>
              <el-button
                type="text"
                @click="handleDeleteRoom(scope.row,1)"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onAddClassroom">添加教室</el-button>
        <el-button @click="classroomsDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleRefresh"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dormsDialogVisible"
      title="编辑寝室"
      width="620px"
    >
      <el-table :data="selectedCampus.dorms">
        <el-table-column
          prop="floorNumber"
          label="所属楼号"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.floorNumber" />
            </template>
            <template v-else>
              {{ scope.row.floorNumber }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="寝室名称"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.roomName" />
            </template>
            <template v-else>
              {{ scope.row.roomName }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="人数上限"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.numberMax" />
            </template>
            <template v-else>
              {{ scope.row.numberMax }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-button
                type="text"
                @click="handleConfirmEdit(scope.row,2)"
              >确认</el-button>
              <el-button
                type="text"
                @click="cancelEditDorm(scope.row)"
              >取消</el-button>
            </template>
            <template v-else>
              <el-button
                type="text"
                @click="scope.row.editing = true"
              >修改</el-button>
              <el-button
                type="text"
                @click="handleDeleteRoom(scope.row,2)"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onAddDorm">添加寝室</el-button>
        <el-button @click="dormsDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleRefresh"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseCampuses",
  data() {
    return {
      loading: false,
      tableData: [],
      campusDialogVisible: false,
      selectedCampus: {
        classrooms: [],
        dorms: []
      },
      classroomsDialogVisible: false,
      dormsDialogVisible: false,
      selectedShoolId: "",
      campusForm: {
        name: ""
      }
    };
  },
  created() {
    this.queryTableData();
  },
  methods: {
    // 获取校区列表数据
    queryTableData() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/school/room/query`,
          method: "POST"
        })
        .then(res => {
          this.tableData = res.map(item => ({
            id: item.school.id,
            name: item.school.name,
            classrooms: item.classRooms,
            dorms: item.bedRooms
          }));
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 更多操作
    handleCommand(command, row) {
      ({
        a: this.handleEditClasses,
        b: this.handleEditDorm,
        c: this.handleDelCampus
      }[command](row));
    },
    // 编辑校区
    handleEditCampus(row) {
      if (row) {
        this.campusForm = {
          name: row.name,
          id: row.id
        };
      } else {
        this.campusForm = {
          name: ""
        };
      }
      this.campusDialogVisible = true;
    },
    // 获取教室列表
    queryClassRoom() {
      return new Promise((resolve, reject) => {
        this.$root
          .request({
            url: `/man/room/query`,
            method: "POST",
            data: { type: 1, schoolId: this.selectedShoolId }
          })
          .then(res => {
            this.selectedCampus.classrooms = res.result.map(item => ({
              ...item,
              editing: false,
              originalName: item.roomName,
              originalNumber: item.numberMax
            }));
            resolve();
          })
          .catch(reject);
      });
    },
    // 编辑教室
    handleEditClasses(row) {
      this.selectedShoolId = row.id;
      this.queryClassRoom();
      this.classroomsDialogVisible = true;
    },
    // 删除教室或寝室
    handleDeleteRoom(row, type) {
      this.$root
        .request({
          url: `/man/room/delete/${row.id}`,
          method: "POST",
          data: { id: row.id }
        })
        .then(() => {
          if (type === 1) {
            this.queryClassRoom();
          } else if (type === 2) {
            this.queryDormRoom();
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 编辑寝室
    handleEditDorm(row) {
      this.selectedShoolId = row.id;
      this.queryDormRoom();
      this.dormsDialogVisible = true;
    },
    // 获取寝室列表
    queryDormRoom() {
      return new Promise((resolve, reject) => {
        this.$root
          .request({
            url: `/man/room/query`,
            method: "POST",
            data: { type: 2, schoolId: this.selectedShoolId }
          })
          .then(res => {
            this.selectedCampus.dorms = res.result.map(item => ({
              ...item,
              editing: false,
              originalName: item.roomName,
              originalNumber: item.numberMax
            }));
            resolve();
          })
          .catch(reject);
      });
    },
    // 添加教室
    onAddClassroom() {
      this.selectedCampus.classrooms.push({
        roomName: "",
        numberMax: 0,
        originalName: "",
        originalNumber: 0,
        editing: true
      });
    },
    // 取消教室编辑
    cancelEditClassroom(row) {
      row.name = row.originalName;
      row.number = row.originalNumber;
      row.editing = false;
    },
    // 确定提交编辑
    handleConfirmEdit(row, type) {
      if (row.id) {
        this.$root
          .request({
            url: `/man/room/update/${row.id}`,
            method: "POST",
            data:
              type === 1
                ? {
                    id: row.id,
                    type: row.type,
                    schoolId: row.schoolId,
                    roomName: row.roomName,
                    numberMax: row.numberMax
                  }
                : {
                    id: row.id,
                    type: row.type,
                    schoolId: row.schoolId,
                    roomName: row.roomName,
                    numberMax: row.numberMax,
                    floorNumber: row.floorNumber
                  }
          })
          .then(() => {
            if (type === 1) {
              this.queryClassRoom(row.schoolId);
            } else if (type === 2) {
              this.queryDormRoom(row.schoolId);
            }
          })
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/man/room/add`,
            method: "POST",
            data:
              type === 1
                ? {
                    type,
                    schoolId: this.selectedShoolId,
                    roomName: row.roomName,
                    numberMax: row.numberMax
                  }
                : {
                    type,
                    schoolId: this.selectedShoolId,
                    roomName: row.roomName,
                    numberMax: row.numberMax,
                    floorNumber: row.floorNumber
                  }
          })
          .then(() => {
            if (type === 1) {
              this.queryClassRoom();
            } else if (type === 2) {
              this.queryDormRoom();
            }
          })
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 添加寝室
    onAddDorm() {
      this.selectedCampus.dorms.push({
        floorNumber: "",
        roomName: "",
        numberMax: 0,
        originalName: "",
        originalNumber: 0,
        editing: true
      });
    },
    // 取消寝室编辑
    cancelEditDorm(row) {
      row.name = row.originalName;
      row.number = row.originalNumber;
      row.editing = false;
    },
    // 刷新列表
    handleRefresh() {
      this.classroomsDialogVisible = false;
      this.dormsDialogVisible = false;
      this.queryTableData();
    },
    // 提交校区编辑
    handleSubmitCampus() {
      const { name, id } = this.campusForm;
      if (id) {
        this.$root
          .request({
            url: `/man/school/update/${id}`,
            method: "POST",
            data: { id, name }
          })
          .then(this.handleCampusEditSucceeded)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        this.$root
          .request({
            url: `/man/school/add`,
            method: "POST",
            data: { name }
          })
          .then(this.handleCampusEditSucceeded)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 删除校区
    handleDelCampus(row) {
      this.$confirm("此操不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$root
            .request({
              url: `/man/school/delete/${row.id}`,
              method: "POST",
              data: { id: row.id }
            })
            .then(this.handleCampusEditSucceeded)
            .catch(err => {
              window.console.error(err);
            });
        })
        .catch(() => {});
    },
    // 添加删除校区，成功回调
    handleCampusEditSucceeded() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.queryTableData();
      this.campusDialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.nested-cells {
  display: flex;
  flex-wrap: wrap;
  & li {
    padding: 0 1em;
    flex-shrink: 1;
  }
}
.total-style {
  color: #999999;
  margin: 0.2em 0 0 0;
}
</style>

