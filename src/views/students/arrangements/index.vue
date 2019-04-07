<template>
  <div class="students-arragenments">
    <el-card shadow="never">
      <search-bar
        :form-map="searchFormData"
        @search="onSearch"
      />
      <el-collapse
        class="collapse-box"
        v-model="activeCollapseNames"
      >
        <el-collapse-item
          title="学生总和：2000人"
          name="1"
        >
          <div class="subject-sum">
            <div class="subject-sum-item">语文：30人</div>
            <div class="subject-sum-item">数学：30人</div>
            <div class="subject-sum-item">英语：30人</div>
            <div class="subject-sum-item">物理：30人</div>
            <div class="subject-sum-item">化学：30人</div>
            <div class="subject-sum-item">生物：30人</div>
            <div class="subject-sum-item">日语：30人</div>
            <div class="subject-sum-item">地理：30人</div>
            <div class="subject-sum-item">历史：30人</div>
            <div class="subject-sum-item">政治：30人</div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-row
        type="flex"
        align="middle"
        class="simple-search-bar"
      >
        <el-col :span="12">
          <el-button
            type="primary"
            @click="$router.push({path:'/students/arrangements/timetable'})"
          >班级简易课表</el-button>
          <el-button
            type="primary"
            @click="$router.push({path:'/students/arrangements/courseAndStudents'})"
          >班级科目人数</el-button>
        </el-col>
        <el-col
          :span="12"
          style="text-align:right"
        >
          <el-button
            type="primary"
            @click="allotClassMode = !allotClassMode"
          >分班</el-button>
          <el-button
            type="primary"
            @click="allotDormMode = !allotDormMode"
          >分寝</el-button>
          <el-button>导出</el-button>
        </el-col>
      </el-row>
      <div
        v-loading="loading"
        class="table-container"
      >
        <el-table
          :data="list"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
          />
          <el-table-column
            prop="studNo"
            label="学号"
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="semester"
            label="学期"
            align="center"
            min-width="120"
          >
            <template slot-scope="scope">{{scope.row.grade && scope.row.semester ? `${scope.row.grade}年第${scope.row.semester}学期` : `-` }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
          />
          <el-table-column
            prop="gender"
            label="性别"
            align="center"
            width="50"
          >
            <template slot-scope="scope">{{scope.row.gender | gender2text}}</template>
          </el-table-column>
          <el-table-column
            label="班级"
            align="center"
            min-width="140"
          >
            <template slot-scope="scope">
              <template v-if="allotClassMode">
                <el-select
                  v-model="scope.row.selectedClass"
                  @change="(val)=>{handleClassChange(val,scope.row)}"
                >
                  <el-option
                    v-for="item in searchFormData.class.options"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </template>
              <template v-else>
                <template v-if="scope.row.className">{{ scope.row.className }}</template>
                <template v-else>
                  <span class="dot-orange">未分班</span>
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="寝室"
            align="center"
            min-width="160"
          >
            <template slot-scope="scope">
              <template v-if="allotDormMode">
                <el-cascader
                  v-model="scope.row.dromSelectArr"
                  :options="dormCascaderOpts"
                  @active-item-change="handleItemChange"
                  @change="(val)=>{handleCascaderChange(val,scope.row)}"
                  @visible-change="(vc)=>{handleCascaderShow(vc,scope.row.dromSelectArr)}"
                ></el-cascader>
              </template>
              <template v-else>
                <template v-if="scope.row.room">{{ scope.row.room }}</template>
                <template v-else>
                  <span class="dot-orange">未分寝</span>
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in subjects"
            :key="item.id"
            prop="studentSubjects"
            :label="item.courseName.substr(0,1)"
            align="center"
            width="40"
          >
            <template slot-scope="scope">
              <div :style="`background-color:${({2:'red',3:'blue'})[scope.row.studentSubjects[`${item.id}`]]}`">{{scope.row.studentSubjects[`${item.id}`] ? 1 : ''}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleWalk(scope.row.id)"
              >走读</el-button>
              <el-button
                type="text"
                @click="$router.push({path:'/students/list/student',query:{id:scope.row.id}})"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-container-footer">
          <pagination
            v-show="total"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="handleChangePaginate"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
const statusMap = {
  "1": "待报到",
  "2": "待面谈",
  "3": "待跟进",
  "4": "邀约流失",
  "5": "在校",
  "6": "结课",
  "7": "退学",
  "8": "休学",
  "9": "待报道"
};
export default {
  name: "StudentsArrangements",
  components: {
    SearchBar,
    Pagination
  },
  data() {
    return {
      searchFormData: {
        name: {
          label: "学生姓名",
          type: "input",
          col: { md: 8, lg: 6, xl: 6 }
        },
        num: { label: "学生学号", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        class: {
          label: "所属班级",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: []
        },
        status: {
          label: "学生状态",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: [
            {
              label: "在校",
              value: "1"
            },
            {
              label: "结课",
              value: "2"
            },
            {
              label: "休学",
              value: "3"
            },
            {
              label: "欠费",
              value: "4"
            }
          ]
        },
        semester: {
          label: "所属学期",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: []
        },
        classStatus: {
          label: "排课状态",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: [
            {
              label: "未满",
              value: "1"
            },
            {
              label: "已满",
              value: "2"
            }
          ]
        }
      },
      activeCollapseNames: "",
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: [],
      totalInfo: {
        students: 300,
        chinese: 50,
        maths: 50,
        english: 50,
        politics: 50,
        history: 50,
        geography: 10,
        physics: 10,
        chemistry: 10,
        biology: 10,
        "info-tech": 5,
        "general-tech": 5
      },
      selectedRows: [],
      subjects: [],
      dormCascaderOpts: [],
      loading: false,
      allotClassMode: false,
      allotDormMode: false
    };
  },
  created() {
    this.getListData();
    // 获取班级列表
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.formatOpts("class", res.result);
      })
      .catch(err => {
        window.console.error(err);
      });
    // 获取科目
    this.$store
      .dispatch("querySubject")
      .then(res => {
        this.subjects = res.result;
      })
      .catch(err => {
        window.console.error(err);
      });
    // 获取学期
    this.getTernData();
    //获取楼号
    this.$root
      .request({
        url: `/man/room/floor/query`,
        method: "POST",
        data: { type: 2, schoolId: this.schoolId }
      })
      .then(res => {
        this.dormCascaderOpts = res.map(item => ({
          value: item,
          label: item,
          children: []
        }));
      })
      .catch(err => {
        window.console.error(err);
      });
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    }
  },
  methods: {
    onSearch() {},
    // 走读
    handleWalk(id) {
      window.console.log(id);
    },
    // 多选行
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    // 翻页
    handleChangePaginate({ page, pageSize }) {
      this.getListData({ page, pageSize });
    },
    // 获取学生数据
    getListData(param = {}) {
      const { page, pageSize } = this.listQuery;
      this.loading = true;
      this.$root
        .request({
          url: `/man/student/query`,
          method: "POST",
          data: { page, pageSize, ...param }
        })
        .then(res => {
          this.list = this.reconditionData(res.result);
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 返回表单的数据整理
    reconditionData(resData) {
      return resData.map(item => {
        let studentSubjects = {};
        item.studentSubjects.forEach(s => {
          studentSubjects[s.subjectId] = s.color;
        });
        const classInfo = this.searchFormData["class"].options.find(
          c => c.label === (item.studentClass ? item.studentClass.name : "")
        );
        return {
          id: item.student.id,
          studNo: item.student.studNo,
          name: item.student.name,
          phone: item.student.phone ? item.student.phone : "-",
          gender: item.student.gender,
          className: item.studentClass ? item.studentClass.name : "",
          grade: item.studentClass ? item.studentClass.graduate : "",
          semester: item.studentClass ? item.studentClass.tern : "-",
          room: item.studentInfo ? item.studentInfo.room : "",
          enrollProduct: item.studentInfo
            ? item.studentInfo.enrollProduct
            : "-",
          enrollDay: item.studentInfo
            ? this.$root.formatDate.toStr(
                item.studentInfo.enrollDay,
                "YYYY/MM/DD"
              )
            : "-",
          status: statusMap[item.student.result],
          selectedClass: classInfo ? classInfo.value : "",
          selectedRoom: "",
          studentSubjects,
          dromSelectArr: item.studentInfo.room.replace("号床", "").split("-")
        };
      });
    },
    // 格式化筛选选项 （班级，寝室）
    formatOpts(field, optList) {
      if (optList && optList.length > 0) {
        this.searchFormData[field].options = optList.map(item => ({
          label: item.name,
          value: item.id
        }));
      }
    },
    // 获取学期数据
    getTernData() {
      this.$root
        .request({
          url: `/man/tern/querys`,
          method: "POST"
        })
        .then(res => {
          this.searchFormData.semester.options = res.result.map(item => ({
            label: `${item.ternName}年第${item.ternValue}学期`,
            value: item.id
          }));
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 修改班级
    handleClassChange(val, row) {
      const index = this.list.findIndex(item => item.id === row.id);
      const classInfo = this.searchFormData["class"].options.find(
        item => item.value === val
      );
      this.$root
        .request({
          url: `/man/class/student/add/${classInfo.value}`,
          method: "POST",
          data: {
            studentId: row.id,
            classId: classInfo.value,
            isGoRead: 0
          }
        })
        .then(() => {
          const newRow = { ...row };
          newRow.className = classInfo.label;
          this.list.splice(index, 1, newRow);
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 寝室选项改变时，动态获取下级选项
    handleItemChange(val) {
      if (val[0]) {
        this.$root
          .request({
            url: `/man/room/query`,
            method: "POST",
            data: { type: 2, floorNumber: val[0], schoolId: this.schoolId }
          })
          .then(res => {
            // 获取楼号所在数组的 index
            const currIndex = this.dormCascaderOpts.findIndex(
              item => item.label === val[0]
            );
            this.dormCascaderOpts.splice(currIndex, 1, {
              ...this.dormCascaderOpts[currIndex],
              children: res.result.map(item => ({
                label: item.roomName,
                value: item.roomName,
                id: item.id,
                numberMax: item.numberMax,
                children: []
              }))
            });
            if (val[1]) {
              // 获取楼号所在数组的 index
              const currIndex = this.dormCascaderOpts.findIndex(
                item => item.label === val[0]
              );
              // 获取寝室所在数组的 index
              const currIndexItem = this.dormCascaderOpts[
                currIndex
              ].children.findIndex(item => item.label === val[1]);
              // 获取寝室信息
              const currRoom = this.dormCascaderOpts[currIndex].children[
                currIndexItem
              ];

              // 拷贝寝室列表数据
              let dromList = JSON.stringify(
                this.dormCascaderOpts[currIndex].children
              );
              dromList = JSON.parse(dromList);

              this.$root
                .request({
                  url: `/man/room/student/bed/number/query`,
                  method: "POST",
                  data: { id: currRoom.id, numberMax: currRoom.numberMax }
                })
                .then(res => {
                  dromList.splice(currIndexItem, 1, {
                    ...dromList[currIndexItem],
                    children: res.map(cw => ({
                      label: cw,
                      value: cw
                    }))
                  });
                  this.dormCascaderOpts.splice(currIndex, 1, {
                    ...this.dormCascaderOpts[currIndex],
                    children: dromList
                  });
                })
                .catch(err => {
                  window.console.error(err);
                });
            }
          })
          .catch(err => {
            window.console.error(err);
          });
      }
    },
    // 修改寝室
    handleCascaderChange(val, row) {
      // 获取楼号所在数组的 index
      const currIndex = this.dormCascaderOpts.findIndex(
        item => item.label === val[0]
      );
      // 获取寝室所在数组的 index
      const currIndexItem = this.dormCascaderOpts[currIndex].children.findIndex(
        item => item.label === val[1]
      );
      // 获取寝室信息
      const currRoom = this.dormCascaderOpts[currIndex].children[currIndexItem];
      // 找到列表中当前编辑行
      const index = this.list.findIndex(item => item.id === row.id);

      this.$root
        .request({
          url: `/man/room/student/add`,
          method: "POST",
          data: {
            studentId: row.id,
            type: "",
            roomId: currRoom.id,
            bedNumber: val[2]
          }
        })
        .then(() => {
          const newRow = { ...row };
          newRow.room = `${val[0]}-${val[1]}-${val[2]}号床`;
          this.list.splice(index, 1, newRow);
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 回显寝室列表
    handleCascaderShow(vc, arr) {
      if (vc) {
        this.handleItemChange([...arr]);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.student-tag {
  margin: 0 1em 0 0;
  width: 6em;
  color: #333;
}
.collapse-box {
  margin: 0 0 1em 0;
}
.subject-sum {
  display: flex;
  flex-wrap: wrap;
  .subject-sum-item {
    min-width: 8em;
    margin: 0 0 1em 0;
  }
}
</style>
