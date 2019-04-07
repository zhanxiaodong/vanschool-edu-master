<template>
  <div class="class-details">
    <el-card v-loading="loading" class="card-style" shadow="never">
      <el-form class="info-form-style">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="班级名称：">
              <span>{{classData.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班主任：">
              <span>{{classData.classAdviser||'-'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学届：">
              <span>{{classData.grade}}学届</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学生数：">
              <span>11/{{classData.numbers||'-'/classData.capacity||'-'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="走班数：">
              <span>11/{{classData.goReadNumber||'-'/classData.goReadMax||'-'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="校区：">
              <span >{{ classData.schoolName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="教室：">
              <span>{{classData.roomName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="科目：">
              <span>语文、数学、英语</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态：">
              <span>{{classData.result|ClassStatus}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注：">
              <span>{{classData.remark||'空'}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card-style" shadow="never">
      <el-tabs v-model="activeName">
        <el-tab-pane label="班级学员" name="member">
          <class-member/>
        </el-tab-pane>
        <el-tab-pane label="课表" name="schedule">
          <class-schedule/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ClassMember from "./ClassMember.vue";
import ClassSchedule from "./ClassSchedule.vue";
export default {
  name: "ClassDetails",
  components: { ClassMember, ClassSchedule },
  data() {
    return {
      activeName: "member",
      classData: {},
      id: parseInt(this.$route.query.id),
      schoolData: [],
      loading: false
    };
  },
  created() {
    this.getClassDataById(this.id);
    this.getSchoolData();
    // this.getStudentDataByClsId(this.id);
  },
  methods: {
    // 根据班级ID获取班级信息
    getClassDataById(id) {
      this.loading = true;
      this.$root
        .request({
          url: `/man/class/find/${id}`,
          method: "POST"
        })
        .then(res => {
          // window.console.log(res);
          this.classData = res;
          // this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 根据班级ID获取学生信息
    // getStudentDataByClsId(id) {
    //   window.console.log(id);
    //   this.loading = true;
    //   this.$root
    //     .request({
    //       url: `/man/student/query`,
    //       method: "POST",
    //       data: { classId: id }
    //     })
    //     .then(res => {
    //       // window.console.log(res);
    //       // this.classData = res;
    //       // this.total = res.totalNum;
    //     })
    //     .catch(err => {
    //       window.console.error(err);
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    // 获取校区数据
    getSchoolData() {
      this.loading = true;
      this.$store
        .dispatch("queryCampusList")
        .then(res => {
          // window.console.log(res);
          res.forEach(item => {
            // this.schoolData.push({ id: item.id, name: item.name });
            if (item.id === this.classData.schoolId) {
              this.classData.schoolName = item.name;
              return;
            }
          });
          window.console.log(this.classData);
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    $route() {
      // 监听路由在'/classes/manage/details'路径下的参数变化，对应对应动态展示相关数据
      // window.console.log(this.$route.query.id);
      if (this.$route.query.id) {
        // window.console.log(this.$route);
        if (this.$route.path === "/classes/manage/details") {
          this.getClassDataById(parseInt(this.$route.query.id));
          // this.getStudentDataByClsId(parseInt(this.$route.query.id));
        }
      }
    }
  }
};
</script>