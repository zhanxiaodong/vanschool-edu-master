<template>
  <div class="student-details">
    <el-card
      class="card-style"
      shadow="never"
    >
      <div
        slot="header"
        class="card-title"
      >
        <span>学生基本信息</span>
        <router-link :to="`/students/list/student/modify?id=${$route.query.id}`">修改</router-link>
      </div>
      <table class="info-table">
        <tbody>
          <tr>
            <td>姓名：</td>
            <td>{{detailsData.student.name | defaultDisplay}}</td>
            <td>性别：</td>
            <td>{{detailsData.student.gender | gender2text }}</td>
            <td>年级：</td>
            <td>{{(detailsData.studentClass ? detailsData.studentClass.graduate : '') | defaultDisplay}}</td>
            <td>学期：</td>
            <td>{{(detailsData.studentClass ? detailsData.studentClass.tern : '') | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>班级：</td>
            <td>{{(detailsData.studentClass ? detailsData.studentClass.roomName : '') | defaultDisplay }}</td>
            <td>寝室：</td>
            <td>{{detailsData.studentInfo.room | defaultDisplay}}</td>
            <td>身份证号：</td>
            <td>{{detailsData.student.idCard | defaultDisplay}}</td>
            <td>学号：</td>
            <td>{{detailsData.student.studNo | defaultDisplay}}</td>

          </tr>
          <tr>
            <td>手机号：</td>
            <td>{{detailsData.student.phone | defaultDisplay}}</td>
            <td>户籍：</td>
            <td>浙江省杭州市萧山区</td>
            <td>原学校：</td>
            <td>{{detailsData.studentInfo.originalSchool | defaultDisplay}}</td>
            <td>画室/机构：</td>
            <td>{{detailsData.studentInfo.specialistAgencies | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>微信号：</td>
            <td>{{detailsData.studentInfo.wechat | defaultDisplay}}</td>
            <td>专业：</td>
            <td>{{detailsData.studentInfo.major | defaultDisplay}}</td>
            <td>目标学校：</td>
            <td>{{detailsData.studentInfo.willSchool | defaultDisplay}}</td>
            <td>报读科目</td>
            <td>{{detailsData.studentInfo.enrollProduct | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>目标分：</td>
            <td colspan="7">{{subjectsScore(detailsData.studentSubjects,'targetScore')}}</td>
          </tr>
          <tr>
            <td>入学测：</td>
            <td colspan="7">{{subjectsScore(detailsData.studentSubjects,'initScore')}}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card
      class="card-style"
      shadow="never"
    >
      <div slot="header">
        <span>背景信息</span>
      </div>
      <table class="info-table">
        <tbody>
          <tr
            v-for="item in detailsData.studentRelatives"
            :key="item.id"
          >
            <td>{{item.relative || "未知"}}：</td>
            <td>{{item.name | defaultDisplay}}</td>
            <td>联系手机：</td>
            <td>{{item.relativePhone | defaultDisplay}}</td>
            <td>职业：</td>
            <td>{{item.career | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>家庭住址：</td>
            <td colspan="5">{{detailsData.studentInfo.homeAddress | defaultDisplay}}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card
      class="card-style"
      shadow="never"
    >
      <div slot="header">
        <span>报读信息</span>
      </div>
      <table class="info-table">
        <tbody>
          <tr>
            <td>课程顾问：</td>
            <td>{{detailsData.studentInfo.courseConsultant | defaultDisplay}}</td>
            <td>报名日期：</td>
            <td>{{detailsData.studentInfo.enrollDay | date2str}}</td>
            <td>报到日期：</td>
            <td>{{detailsData.studentInfo.registerDay | date2str}}</td>
          </tr>
          <tr>
            <td>报读课程：</td>
            <td>{{detailsData.studentInfo.enrollProduct | defaultDisplay}}</td>
            <td>选考科目：</td>
            <td>{{detailsData.studentInfo.chooseExamSubject | defaultDisplay}}</td>
            <td>退费银行卡号：</td>
            <td>{{detailsData.studentInfo.refundBankAccount | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>用户名：</td>
            <td>{{detailsData.studentInfo.accountName | defaultDisplay}}</td>
            <td>银行支行：</td>
            <td>{{detailsData.studentInfo.bankBranch | defaultDisplay}}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card
      class="card-style"
      shadow="never"
    >
      <div slot="header">
        <span>其他信息</span>
      </div>
      <table class="info-table">
        <tbody>
          <tr>
            <td>最喜欢的科目：</td>
            <td>{{detailsData.studentInfo.favoriteCourse | defaultDisplay}}</td>
            <td>最不喜欢的科目：</td>
            <td>{{detailsData.studentInfo.hateCourse | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>学习专注力：</td>
            <td>{{detailsData.studentInfo.focus | defaultDisplay}}</td>
            <td>文化学习基础：</td>
            <td>{{detailsData.studentInfo.base | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>是否接受严格管理：</td>
            <td>{{detailsData.studentInfo.base | defaultDisplay}}</td>
            <td>遇到困难如何解决：</td>
            <td>{{detailsData.studentInfo.insist | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>爱好：</td>
            <td>{{detailsData.studentInfo.hobby | defaultDisplay}}</td>
            <td>性格：</td>
            <td>{{detailsData.studentInfo.characters | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>体重：</td>
            <td>{{detailsData.studentInfo.weigth | defaultDisplay}}</td>
            <td>身高：</td>
            <td>{{detailsData.studentInfo.tall | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>校服尺码：</td>
            <td>{{detailsData.studentInfo.suit | defaultDisplay}}</td>
            <td>有无精神性、遗传性、传染性等疾病：</td>
            <td>{{detailsData.studentInfo.disease | defaultDisplay}}</td>
          </tr>
          <tr>
            <td>父母是否经常与孩子沟通：</td>
            <td>{{detailsData.studentInfo.bonding | defaultDisplay}}</td>
            <td>父母对孩子的评价：</td>
            <td>{{detailsData.studentInfo.comment | defaultDisplay}}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card
      class="card-style"
      shadow="never"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane
          label="请假纪录"
          name="leaves"
        >
          <leaves />
        </el-tab-pane>
        <el-tab-pane
          label="纪律纪录"
          name="discipline"
        >
          <discipline />
        </el-tab-pane>
        <el-tab-pane
          label="课表"
          name="schedule"
        >
          <schedule />
        </el-tab-pane>
        <el-tab-pane
          label="考试"
          name="exams"
        >
          <exams />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Leaves from "./components/Leaves";
import Discipline from "./components/Discipline";
import Schedule from "./components/Schedule";
import Exams from "./components/Exams";
export default {
  name: "Student",
  components: { Leaves, Discipline, Schedule, Exams },
  data() {
    return {
      detailsData: {
        student: {},
        studentClass: {},
        studentInfo: {},
        studentRelatives: [],
        studentSubjects: []
      },
      activeTab: "leaves"
    };
  },
  activated() {
    const studentId = this.$route.query.id;
    this.getDetails(studentId);
  },
  methods: {
    getDetails(stuid) {
      this.$root
        .request({
          url: `/man/student/find/${stuid}`,
          method: "POST"
        })
        .then(res => {
          this.detailsData = {
            student: res.student || {},
            studentClass: res.studentClass || {},
            studentInfo: res.studentRelatives || {},
            studentRelatives: res.studentRelatives || [],
            studentSubjects: res.studentSubjects || []
          };
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 过滤 目标分 和 入学测
    subjectsScore(data, field) {
      return data
        .map(item => `${item.subjectName} | ${item[field] || "-"}`)
        .join("、");
    }
  }
};
</script>
<style lang="scss" scoped>
.info-table {
  width: 100%;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  td {
    border: 1px solid #ebeef5;
    padding: 12px 10px;
    text-align: center;
  }
}
</style>
