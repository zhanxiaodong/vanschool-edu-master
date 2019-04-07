<template>
  <div class="teachers-details">
    <el-card
      class="card-style"
      shadow="never"
    >
      <div slot="header">
        <span>教师详情</span>
      </div>
      <el-row
        v-loading="loading"
        :gutter="36"
      >
        <el-col :span="16">
          <el-form class="info-form">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="姓名：">{{ teacherInfo.name }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机：">{{ teacherInfo.mobile }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：">{{ teacherInfo.gender }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分组：">{{ teacherInfo.group }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="校区：">{{ teacherInfo.campus }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责班级：">{{ teacherInfo.classes.join('、') }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教授科目：">{{ teacherInfo.subjects.join('、') }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：">{{ teacherInfo.status }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="直属上级：">{{ teacherInfo.leaderName }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col
          :span="8"
          style="text-align:center"
        >
          <div class="info-avatar">
            <img :src="teacherInfo.avatarUrl">
          </div>
          <el-button
            plain
            size="small"
            icon="el-icon-edit"
            @click="dialogVisible = true"
          >編 輯</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card
      class="card-style"
      shadow="never"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane
          label="个人课表"
          name="personal"
        >
          <tab-personal />
        </el-tab-pane>
        <el-tab-pane
          label="违纪纪录"
          name="violations"
        >
          <tab-violations />
        </el-tab-pane>
        <el-tab-pane
          label="调课纪录"
          name="exchange"
        >
          <tab-exchange />
        </el-tab-pane>
        <el-tab-pane
          label="课时详情"
          name="hours"
        >
          <tab-hours />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <edit-dialog
      :visible="dialogVisible"
      :group-opts="[...dutyGroupOpts]"
      :subjectOpts="[...subjectGroupOpts]"
      :teacher-status="teacherStatusMap"
      :row-data="teacherInfo"
      @close="dialogVisible= false"
      @refresh="handleEditComplete"
    />
  </div>
</template>

<script>
import TabPersonal from "./components/TabPersonal.vue";
import TabViolations from "./components/TabViolations.vue";
import TabExchange from "./components/TabExchange.vue";
import TabHours from "./components/TabHours.vue";
import EditDialog from "../management/EditDialog.vue";

// 老师状态
const teacherStatusMap = {
  "1": "在职",
  "2": "离职",
  "3": "休假（长假）",
  "4": "借调"
};

export default {
  name: "Teacher",
  components: { TabPersonal, TabViolations, TabExchange, TabHours, EditDialog },
  data() {
    return {
      activeTab: "personal",
      teacherInfo: {
        name: "",
        mobile: "",
        gender: "",
        group: "",
        campus: "",
        classes: [],
        subjects: [],
        status: "",
        superior: "",
        parentId: "",
        schoolId: "",
        leaderName: ""
      },
      dialogVisible: false,
      subjects: [],
      teacherGroups: [],
      dutyGroupOpts: [],
      subjectGroupOpts: [],
      teacherStatusMap,
      loading: false
    };
  },
  created() {
    // 获取教师分组
    this.$store
      .dispatch("queryTeacherGroup")
      .then(res => {
        this.dutyGroupOpts = res.result.map(item => ({
          label: item.groupName,
          key: item.id
        }));
      })
      .catch(() => {});

    // 获取学科列表
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjectGroupOpts = res.result.map(item => ({
          label: item.courseName,
          key: item.id
        }));
      })
      .catch(() => {});
  },
  activated() {
    this.queryTableList();
  },
  computed: {
    campusList() {
      return this.$store.state.app.campusList;
    }
  },
  methods: {
    queryTableList() {
      const teacherId = this.$route.query.id;
      this.loading = true;
      this.$root
        .request({
          url: `/man/teacher/querys`,
          method: "POST",
          data: {
            teacherParam: {
              id: teacherId,
              name: "",
              groups: "",
              result: "",
              page: 1,
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
          this.teacherInfo = res.result.map(item => ({
            id:item.teacher.id,
            userId:item.teacher.userId,
            name: item.teacher.name,
            gender: ["男", "女"][item.teacher.gender - 1] || "-",
            group: item.teacher.groups,
            subjects: item.subjects.map(s => s.courseName),
            mobile: item.teacher.phone,
            classes: item.teacherClasses.map(c => c.name),
            status: teacherStatusMap[item.teacher.status],
            avatarUrl: item.teacher.imageUrl || "",
            parentId: item.teacher.parentId,
            leaderName: item.teacher.leaderName,
            leader: item.teacher.leader,
            schoolId: item.teacher.schoolId,
            email: item.teacher.email,
            campus: this.campusList.find(c => c.id === item.teacher.schoolId)
              .name
          }))[0];
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleEditComplete() {
      this.dialogVisible= false;
      this.queryTableList();
    }
  }
};
</script>

<style lang="scss" scoped>
.info-form {
  width: 800px;
}
.info-form .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.info-avatar {
  width: 9em;
  height: 9em;
  overflow: hidden;
  margin: 0 auto 1em auto;
  background-color: #eeeeee;
}
</style>
