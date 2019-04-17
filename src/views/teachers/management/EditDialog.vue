<template>
  <el-dialog
    :visible="visible"
    title="录入教师"
    @close="$emit('close')"
    @open="dialogOpen"
  >
    <el-form label-width="6em">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="姓 名：">
            <el-input v-model="dialogForm.name"  placeholder="请输入姓名"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：">
            <el-input v-model="dialogForm.phone" placeholder="请输入号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性 别：">
            <el-select v-model="dialogForm.gender">
              <el-option
                label="男"
                :value="1"
              />
              <el-option
                label="女"
                :value="2"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮 箱：">
            <el-input v-model="dialogForm.email" placeholder="请输入邮箱"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="校 区：">
            <el-select v-model="dialogForm.schoolId">
              <el-option
                v-for="item in campusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分 组：">
            <el-select v-model="dialogForm.groups">
              <el-option
                v-for="item in groupOpts"
                :key="item.key"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="教授科目：">
            <el-select
              v-model="dialogForm.subjectName"
              multiple
            >
              <el-option
                v-for="item in subjectOpts"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="直属上级：">
            <el-select
              v-model="dialogForm.leader"
              @change="handleSuperior"
            >
              <el-option
                v-for="item in groupOpts"
                :key="item.key"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级姓名：">
            <el-select v-model="dialogForm.parentId">
              <el-option
                v-for="item in teachersList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状 态：">
            <el-select v-model="dialogForm.result">
              <el-option
                v-for="(item,kf) in teacherStatus"
                :key="kf"
                :label="item"
                :value="kf"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item
        label="头 像："
        class="full-width"
      >
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleUpload"
        >
          <img
            v-if="dialogForm.imageUrl"
            :src="dialogForm.imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="handleSubmit"
      >提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "TeacherEditDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: () => ({})
    },
    groupOpts: {
      type: Array,
      default: () => []
    },
    subjectOpts: {
      type: Array,
      default: () => []
    },
    teacherStatus: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogForm: {
        name: "",
        phone: "",
        gender: "",
        email: "",
        groups: "",
        schoolId: "",
        subjectName: [],
        parentId: "",
        imageUrl: "",
        result: "",
        leader: "",
        leaderName: ""
      },
      teachersList: [],
      isEditMode: false
    };
  },
  computed: {
    campusList() {
      return this.$store.state.app.campusList;
    }
  },
  methods: {
    // 上传文件
    handleUpload(e) {
      this.$root
        .alioss({
          path: e.file.name,
          file: e.file
        })
        .then(res => {
          this.dialogForm.imageUrl = res.res.requestUrls[0];
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 直属上级改变时，获取对应的人员列表
    handleSuperior(groupName) {
      return new Promise((resolve, reject) => {
        const tid = this.$route.query.id;
        this.$root
          .request({
            url: `/man/teacher/querys`,
            method: "POST",
            data: {
              teacherParam: {
                name: "",
                groups: groupName,
                result: "",
                page: "",
                pageSize: ""
              },
              classParam: {
                name: ""
              },
              subjectParam: {
                courseName: ""
              }
            }
          })
          .then(res => {
            this.dialogForm.parentId = "";
            this.teachersList = res.result
              .map(item => ({
                label: item.teacher.name,
                value: item.teacher.id
              }))
              .filter(item => item.value != tid);
            resolve();
          })
          .catch(err => {
            window.console.error(err);
            reject(err);
          });
      });
    },
    // 编辑模式回先数据
    dialogOpen() {
      if (JSON.stringify(this.rowData) === "{}") {
        this.dialogForm = {
          name: "",
          phone: "",
          gender: "",
          email: "",
          groups: "",
          schoolId: "",
          subjectName: [],
          parentId: "",
          imageUrl: "",
          result: "",
          leader: "",
          leaderName: ""
        };
      } else {
        const rowData = this.rowData;
        this.handleSuperior(rowData.leader)
          .then(() => {
            this.dialogForm = {
              id: rowData.id,
              name: rowData.name,
              phone: rowData.mobile,
              gender: { 男: 1, 女: 2 }[rowData.gender],
              email: rowData.email,
              groups: rowData.group,
              schoolId: rowData.campus,
              subjectName: rowData.subjects
                .map(item => {
                  const curr = this.subjectOpts.find(s => s.label === item);
                  return curr ? curr.key : "";
                })
                .filter(item => !!item),
              parentId: rowData.parentId,
              imageUrl: rowData.avatarUrl,
              result: rowData.status,
              leader: rowData.leader,
              leaderName: rowData.leaderName,
              userId: rowData.userId
            };
          })
          .catch(() => {});
        this.isEditMode = true;
      }
    },
    // 提交表单
    handleSubmit() {
      let teacher = { ...this.dialogForm };
      if (this.teachersList.length > 0 && teacher.parentId) {
        teacher.leaderName = this.teachersList.find(
          item => item.value === teacher.parentId
        ).label;
      } else {
        teacher.leaderName = "";
      }
      if (this.isEditMode) {
        let subjects = teacher.subjectName.map(item => ({ id: item }));
        teacher.schoolId = this.campusList.find(
          item => item.name === teacher.schoolId
        ).id;

        Object.keys(this.teacherStatus).map(item => {
          if (this.teacherStatus[item] === teacher.result) {
            teacher.result = item;
          }
        });
        this.$root
          .request({
            url: `/man/teacher/update/${this.$route.query.id}`,
            method: "POST",
            data: { teacher, subjects }
          })
          .then(this.handleEditSucessed)
          .catch(err => {
            window.console.error(err);
          });
      } else {
        let subjects = teacher.subjectName.map(item => ({ id: item }));
        teacher.userId = 1;
        delete teacher.subjectName;
        this.$root
          .request({
            url: `/man/teacher/add`,
            method: "POST",
            data: { teacher, subjects }
          })
          .then(this.handleEditSucessed)
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 表单
    handleEditSucessed() {
      this.$notify({
        title: "操作成功！",
        type: "success"
      });
      this.$emit("refresh");
    }
  }
};
</script>
