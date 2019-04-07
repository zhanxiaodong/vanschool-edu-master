<template>
  <div class="create-info">
    <el-form
      :model="formData"
      ref="createForm"
      label-width="8em"
    >
      <el-card
        class="card-style"
        shadow="never"
      >
        <div slot="header">
          <span>基础信息</span>
        </div>
        <el-row
          class="form-row-style"
          :gutter="32"
        >
          <el-col :span="12">
            <el-form-item
              prop="student.name"
              label="学生姓名："
              :rules="[{ required: true, message: '请输入学生姓名', trigger: 'blur' }]"
            >
              <el-input
                v-model="formData.student.name"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-select v-model="formData.student.gender">
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
            <el-form-item label="年级：">
              <el-select v-model="formData.studentClass.graduate">
                <el-option
                  v-for="item in ['初一','初二','初三','中复','高一','高二','高三','高复','其他']"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学届：">
              <el-select v-model="formData.studentClass.grade">
                <el-option
                  v-for="item in ternOpts"
                  :key="item.id"
                  :value="item.grade"
                  :label="item.grade"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学期：">
              <el-select v-model="formData.studentClass.tern">
                <el-option
                  v-for="item in ternOpts"
                  :key="item.id"
                  :value="item.tern"
                  :label="{1:'上学期',2:'下学期'}[item.tern]"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级：">
              <el-select v-model="formData.studentClass.roomName">
                <el-option
                  v-for="item in classesOpts"
                  :key="item.id"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="寝室：">
              <el-select v-model="formData.studentInfo.room">
                <el-option
                  v-for="item in dormOpts"
                  :key="item.id"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="身份证号："
              prop="student.idCard"
              :rules="[{ required: true, message: '请输入正确的身份证号',validator:validatoridCard, trigger: 'blur' }]"
            >
              <el-input
                v-model="formData.student.idCard"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号：">
              <el-input
                v-model="formData.student.studNo"
                :disabled="true"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：">
              <el-input
                v-model="formData.student.phone"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户籍：">
              <el-input v-model="formData.studentInfo.census" />
              <!-- <el-cascader
                :options="provinceCityList"
                v-model="formData.studentInfo.census"
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原学校：">
              <el-input
                v-model="formData.studentInfo.originalSchool"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="画室/机构：">
              <el-input
                v-model="formData.studentInfo.specialistAgencies"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信号：">
              <el-input
                v-model="formData.studentInfo.wechat"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="专业："
              prop="studentInfo.major"
              :rules="[{ required: true, message: '请输入专业', trigger: 'blur' }]"
            >
              <el-select v-model="formData.studentInfo.major">
                <el-option
                  v-for="item in ['美术','音乐','舞蹈','影视','播音主持','编导','体育','纯文化','其他']"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标学校：">
              <el-input
                v-model="formData.studentInfo.willSchool"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="报读科目：">
              <el-select
                v-model="enrollSubject"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in subjectsOpts"
                  :key="item.subjectId"
                  :label="item.subjectName"
                  :value="item.subjectName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="入学成绩：">
              <div class="subjects-list-input">
                <div
                  v-for="item in formData.studentSubjects"
                  :key="item.id"
                  class="subjects-list-item"
                >
                  <span>{{item.subjectName}}：</span>
                  <el-input v-model="item.initScore" />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="目标成绩：">
              <div class="subjects-list-input">
                <div
                  v-for="item in formData.studentSubjects"
                  :key="item.id"
                  class="subjects-list-item"
                >
                  <span>{{item.subjectName}}：</span>
                  <el-input v-model="item.targetScore" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        class="card-style"
        shadow="never"
      >
        <div slot="header">
          <span>背景信息</span>
        </div>
        <el-row
          class="form-row-style"
          :gutter="32"
        >
          <el-col :span="12">
            <el-form-item :label="`${formData.studentRelatives[0].relative}姓名：`">
              <el-input
                v-model="formData.studentRelatives[0].name"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.studentRelatives[0].relative}电话：`">
              <el-input
                v-model="formData.studentRelatives[0].relativePhone"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.studentRelatives[0].relative}职业：`">
              <el-input
                v-model="formData.studentRelatives[0].career"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.studentRelatives[1].relative}姓名：`">
              <el-input
                v-model="formData.studentRelatives[1].name"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.studentRelatives[1].relative}电话：`">
              <el-input
                v-model="formData.studentRelatives[1].relativePhone"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="`${formData.studentRelatives[1].relative}职业：`">
              <el-input
                v-model="formData.studentRelatives[1].career"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家庭住址：">
              <el-input
                v-model="formData.studentInfo.homeAddress"
                placeholder=""
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        class="card-style"
        shadow="never"
      >
        <div slot="header">
          <span>报读信息</span>
        </div>
        <el-row
          class="form-row-style"
          :gutter="32"
        >
          <el-col :span="12">
            <el-form-item label="课程顾问：">
              <el-input
                v-model="formData.studentInfo.courseConsultant"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名日期：">
              <el-date-picker
                v-model="formData.studentInfo.enrollDay"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报到日期：">
              <el-date-picker
                v-model="formData.studentInfo.registerDay"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报读产品：">
              <el-input
                v-model="formData.studentInfo.enrollProduct"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="选考科目：">
              <el-select
                v-model="formData.studentInfo.chooseExamSubject"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in subjectsOpts"
                  :key="item.subjectId"
                  :label="item.subjectName"
                  :value="item.subjectName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名：">
              <el-input
                v-model="formData.studentInfo.accountName"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退费银行账号：">
              <el-input
                v-model="formData.studentInfo.refundBankAccount"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="银行支行：">
              <el-input
                v-model="formData.studentInfo.bankBranch"
                placeholder=""
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        class="card-style"
        shadow="never"
      >
        <div slot="header">
          <span>其他信息</span>
        </div>
        <el-row
          class="form-row-style"
          :gutter="32"
        >
          <el-col :span="12">
            <el-form-item label="最喜欢科目：">
              <el-input
                v-model="formData.studentInfo.favoriteCourse"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最喜不欢科目：">
              <el-input
                v-model="formData.studentInfo.hateCourse"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文化学习基础：">
              <el-select
                v-model="formData.studentInfo.base"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['强','弱','一般']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学习专注力：">
              <el-select
                v-model="formData.studentInfo.focus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['强','弱','一般']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学习习惯：">
              <el-select
                v-model="formData.studentInfo.habit"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['好','弱','一般']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性格：">
              <el-select
                v-model="formData.studentInfo.characters"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['内向','外向','居中']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接受严格管理：">
              <el-select
                v-model="formData.studentInfo.restricts"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['能','否','有困难']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="困难如何解决：">
              <el-select
                v-model="formData.studentInfo.insist"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['放弃','坚持']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="爱好：">
              <el-input
                v-model="formData.studentInfo.hobby"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身高：">
              <el-input
                v-model="formData.studentInfo.tall"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体重：">
              <el-input
                v-model="formData.studentInfo.weigth"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="校服尺码：">
              <el-select
                v-model="formData.studentInfo.suit"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ['S','M','L','XL','XXL','XXXL']"
                  :key="item"
                  :label="item"
                  :value="item.toLocaleLowerCase()"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="formData.studentInfo.disease === 1 ? 12:24">
            <el-form-item label="有无疾病：">
              <el-select
                v-model="formData.studentInfo.disease"
                placeholder="有无精神性、遗传性、传染性等疾病"
              >
                <el-option
                  value="1"
                  label="有"
                />
                <el-option
                  label="无"
                  value="0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="formData.hasDiseases === 2"
            :span="12"
          >
            <el-form-item label="其他疾病：">
              <el-input placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否沟通：">
              <el-select
                v-model="formData.studentInfo.bonding"
                placeholder="请选择父母是否经常与孩子沟通"
              >
                <el-option
                  value="1"
                  label="是"
                />
                <el-option
                  label="否"
                  value="0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="孩子的评价：">
              <el-input
                v-model="formData.studentInfo.comment"
                rows="4"
                type="textarea"
                placeholder="请输入父母对孩子的评价"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          class="form-row-style"
          :gutter="32"
        >
          <el-col style="text-align:right">
            <el-button type="danger">不通过</el-button>
            <el-button
              type="primary"
              @click="handleSubmit"
            >通过</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import provinceCitys from "@/assets/province-citys/province-citys.js";
let provinceCityList = provinceCitys.map(item => ({
  value: item.name,
  label: item.name,
  children: item.children.map(v => ({ value: v.name, label: v.name }))
}));
export default {
  name: "CreateInfo",
  data() {
    return {
      provinceCityList,
      formData: {
        student: {
          userId: "1",
          clientId: "1",
          schoolId: "1",
          name: "",
          gender: "",
          idCard: "",
          studNo: "",
          phone: ""
        },
        studentClass: {
          id: "",
          roomName: "",
          tern: "",
          grade: ""
        },
        studentInfo: {
          id: "",
          originalSchool: "",
          room: "",
          phone: "",
          census: "",
          specialistAgencies: "",
          wechat: "",
          major: "",
          willSchool: "",
          homeAddress: "",
          courseConsultant: "",
          enrollDay: "",
          registerDay: "",
          enrollProduct: "",
          chooseExamSubject: [],
          refundBankAccount: "",
          accountName: "",
          bankBranch: "",
          favoriteCourse: "",
          hateCourse: "",
          focus: "",
          base: "",
          habit: "",
          characters: "",
          restricts: "",
          insist: "",
          hobby: "",
          tall: "",
          suit: "",
          disease: "",
          bonding: "",
          comment: "",
          weigth: ""
        },
        studentRelatives: [
          {
            id: "",
            relative: "父亲",
            name: "",
            relativePhone: "",
            career: ""
          },
          {
            id: "",
            relative: "母亲",
            name: "",
            relativePhone: "",
            career: ""
          }
        ],
        studentSubjects: []
      },
      subjectsOpts: [],
      dormOpts: [],
      classesOpts: [],
      ternOpts: [],
      isEditMode: false,
      enrollSubject: []
    };
  },
  activated() {
    const { name, query } = this.$route;
    // 获取科目列表
    this.$store
      .dispatch("queryCourseList")
      .then(res => {
        const courseArr = res.result.map(item => ({
          subjectName: item.courseName,
          subjectId: item.id,
          initScore: "",
          targetScore: ""
        }));
        this.subjectsOpts = courseArr;
        this.formData.studentSubjects = courseArr;
      })
      .catch(err => {
        window.console.error(err);
      });

    // 获取学期,学界列表
    this.$store
      .dispatch("queryTern")
      .then(res => {
        this.ternOpts = res.result
          ? res.result.map(item => ({
              id: item.id,
              grade: item.ternName,
              tern: item.ternValue
            }))
          : [];
      })
      .catch(err => {
        window.console.error(err);
      });

    // 获取筛选寝室列表
    this.$store
      .dispatch("queryDorm")
      .then(res => {
        this.dormOpts = res.result
          ? res.result.map(item => ({
              id: item.id,
              label: item.roomName,
              value: item.roomName
            }))
          : [];
      })
      .catch(err => {
        window.console.error(err);
      });

    // 获取班级列表
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.classesOpts = res.result
          ? res.result.map(item => ({
              id: item.id,
              label: item.roomName,
              value: item.roomName
            }))
          : [];
      })
      .catch(err => {
        window.console.error(err);
      });

    //编辑模式
    if (name === "studentModify" && query.id != undefined) {
      this.getStudentInfo(query.id);
      this.isEditMode = true;
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      clientId: state => state.user.clientId,
      schoolId: state => state.user.schoolId
    })
  },
  methods: {
    // 编辑模式下获取用户信息
    getStudentInfo(stuid) {
      this.$root
        .request({
          url: `/man/student/find/${stuid}`,
          method: "POST"
        })
        .then(this.reconditionData)
        .catch(err => {
          window.console.error(err);
        });
    },
    // 表单提交
    handleSubmit() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          let sendData = JSON.parse(JSON.stringify(this.formData));
          let classInfo = this.classesOpts.find(
            item => item.label === sendData.studentClass.roomName
          );
          sendData.studentInfo.chooseExamSubject = sendData.studentInfo.chooseExamSubject.join(
            ","
          );
          sendData.studentInfo.enrollDay = sendData.studentInfo.enrollDay
            ? new Date(sendData.studentInfo.enrollDay).getTime()
            : "";
          sendData.studentInfo.registerDay = sendData.studentInfo.registerDay
            ? new Date(sendData.studentInfo.registerDay).getTime()
            : "";
          sendData.studentInfo.userId = this.userId;
          sendData.student.clientId = this.clientId;
          sendData.student.schoolId = this.schoolId;

          sendData.studentClass.id = classInfo ? classInfo.id : "";

          sendData.studentSubjects = sendData.studentSubjects.filter(item =>
            this.enrollSubject.find(i => i === item.subjectName)
          );

          // 编辑模式或新增模式
          if (this.isEditMode) {
            this.$root
              .request({
                url: `/man/student/update/${this.$route.query.id}`,
                method: "POST",
                data: sendData
              })
              .then(() => {
                this.$notify({
                  title: "操作成功！",
                  type: "success",
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              })
              .catch(err => {
                window.console.error(err);
              });
          } else {
            this.$root
              .request({
                url: `/man/student/add`,
                method: "POST",
                data: sendData
              })
              .then(res => {
                window.console.log(res);
              })
              .catch(err => {
                window.console.log(err);
              });
          }
        } else {
          if(document.querySelector(".app-main")){
            document.querySelector(".app-main").scrollTop = 0;
          }
        }
      });
    },
    // 编辑模式回显数据整理
    reconditionData(resData) {
      let formData = JSON.parse(JSON.stringify(this.formData));
      Object.keys(formData).forEach(key => {
        Object.keys(formData[key]).forEach(sk => {
          formData[key][sk] =
            formData[key][sk] instanceof Array
              ? []
              : resData[key]
              ? resData[key][sk]
              : "";
        });
      });
      this.formData.student = formData.student;
      this.formData.student.id = resData.student ? resData.student.id : '';
      this.formData.studentClass = formData.studentClass;
      this.formData.studentClass.id = resData.studentClass
        ? resData.studentClass.id
        : "";
      this.formData.studentInfo = formData.studentInfo;
      this.formData.studentInfo.studentId = resData.studentInfo ? resData.studentInfo.studentId : '';
      this.formData.studentInfo.id = resData.studentInfo ? resData.studentInfo.id : '';
      this.formData.studentInfo.chooseExamSubject =  resData.studentInfo ? resData.studentInfo.chooseExamSubject.split(
        ","
      ) : '';
      this.formData.studentRelatives = [
        {
          id: resData.studentRelatives ? resData.studentRelatives[0].id : "",
          studentId:resData.student ? resData.student.id : "",
          relative: formData.studentRelatives[0]
            ? formData.studentRelatives[0].relative
            : "父亲",
          name: formData.studentRelatives
            ? formData.studentRelatives[0].name
            : "",
          relativePhone: formData.studentRelatives
            ? formData.studentRelatives[0].relativePhone
            : "",
          career: formData.studentRelatives
            ? formData.studentRelatives[0].career
            : ""
        },
        {
          id: resData.studentRelatives ? resData.studentRelatives[1].id : "",
          studentId: resData.student ? resData.student.id : "",
          relative: formData.studentRelatives[1]
            ? formData.studentRelatives[1].relative
            : "母亲",
          name: formData.studentRelatives[1]
            ? formData.studentRelatives[1].name
            : "",
          relativePhone: formData.studentRelatives[1]
            ? formData.studentRelatives[1].relativePhone
            : "",
          career: formData.studentRelatives[1]
            ? formData.studentRelatives[1].career
            : ""
        }
      ];
      this.formData.studentSubjects = this.formData.studentSubjects.map(
        item => {
          const targetItem =resData.studentSubjects ? resData.studentSubjects.find(
            t => t.subjectName === item.subjectName
          ) : null;
          if (targetItem) {
            return {
              ...item,
              initScore: targetItem.initScore,
              targetScore: targetItem.targetScore,
              id: targetItem.id
            };
          } else {
            return { ...item };
          }
        }
      );
      this.enrollSubject = resData.studentSubjects ? resData.studentSubjects
        .filter(item => item)
        .map(item => item.subjectName) : [];
    },
    // 身份证验证
    validatoridCard(rule, value, callback) {
      if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的身份证号码"));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form-row-style {
  width: 840px;
}
.subjects-list-input {
  display: flex;
  flex-wrap: wrap;
  .subjects-list-item {
    display: flex;
    padding: 0 2em 0.5em 1em;
    width: 33.333%;
    box-sizing: border-box;
    & > span {
      flex-shrink: 0;
      min-width: 3em;
    }
  }
}
</style>
