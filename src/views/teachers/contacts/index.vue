<template>
  <el-card shadow="never">
    <quick-filter
      title="分组"
      :opts="dutyGroupOpts"
      title-width="5em"
      @change="(item)=>{handleFilterChange(item,'teacherParam.groups')}"
    />
    <quick-filter
      title="学科组"
      :opts="subjectGroupOpts"
      title-width="5em"
      @change="(item)=>{handleFilterChange(item,'subjectParam.courseName')}"
    />
    <search-bar :formMap="searchForm" @search="onSearch"/>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column prop="name" label="姓名" align="center" width="120"/>
        <el-table-column prop="gender" label="性别" align="center" width="100"/>
        <el-table-column prop="group" label="分组" align="center" min-width="80"/>
        <el-table-column label="科学" align="center">
          <template slot-scope="scope">{{ scope.row.subjects.join('、') }}</template>
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" align="center"/>
        <el-table-column label="负责班级" align="center">
          <template slot-scope="scope">{{ scope.row.classes.join('、') }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center"/>
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="handlePageChange"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import QuickFilter from "@/components/QuickFilter";
import Pagination from "@/components/Pagination";

// 老师状态
const teacherStatusMap = {
  "1": "在职",
  "2": "离职",
  "3": "休假（长假）",
  "4": "借调"
};

export default {
  name: "Contacts",
  components: { QuickFilter, SearchBar, Pagination },
  data() {
    return {
      searchForm: {
        name: { type: "input", label: "姓 名", col: { md: 7, lg: 5, xl: 5 } },
         grade: {
          type: "select",
          label: "负责班级",
          options: [],
          col: { md: 7, lg: 5, xl: 5 }
        },
        status: {
          type: "select",
          label: "状态",
          options: Object.keys(teacherStatusMap).map(key => ({
            label: teacherStatusMap[key],
            value: key
          })),
          col: { md: 7, lg: 5, xl: 5 }
        }
      },
      dutyGroupOpts: [],
      subjectGroupOpts: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      radio5: "",
      list: [],
      queryKeysObj: {
        teacherParam: {
          name: "",
          groups: "",
          result: "",
          page: 1,
          pageSize: 20
        },
        classParam: {
          name: ""
        },
        subjectParam: {
          courseName: ""
        }
      }
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

    // 查询班级
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.searchForm.grade.options = res.result.map(item => ({
          label: item.name,
          value: item.name
        }));
      })
      .catch(() => {});
    // 获取通讯录列表
    this.queryTableList();
  },
  computed:{
    schoolId(){
      return this.$store.state.schoolId
    }
  },
  methods: {
    // 获取列表
    queryTableList() {
      this.$root
        .request({
          url: `/man/teacher/querys`,
          method: "POST",
          data: { ...this.queryKeysObj }
        })
        .then(res => {
          this.list = res.result.map(item => {
            return {
              name: item.teacher.name,
              gender: ["男", "女"][item.teacher.gender - 1] || "-",
              group: item.teacher.groups,
              subjects: item.subjects.map(s => s.courseName),
              mobile: item.teacher.phone,
              classes: item.teacherClasses.map(c => c.name),
              status: teacherStatusMap[item.teacher.status]
            };
          });
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.queryKeysObj.teacherParam.page = page;
      this.queryKeysObj.teacherParam.pageSize = pageSize;
      this.queryTableList();
    },
    // 搜索
    onSearch(keys) {
      this.queryKeysObj.teacherParam = {
        name: keys.name || "",
        result: keys.status || "",
        page: 1
      };
      this.queryKeysObj.classParam = {
        name: keys.grade || ""
      };
      this.queryTableList();
    },
    // 快速筛选切换
    handleFilterChange(selected, field) {
      const fieldArr = field.split(".");
      this.queryKeysObj[fieldArr[0]][fieldArr[1]] = selected.label;
      this.queryTableList();
    },
    // 单独查询请求
    queryByParam(queryObj = {}) {
      this.$root
        .request({
          url: `/teacher/group/querys`,
          method: "POST",
          data: queryObj
        })
        .then(res => {
          window.console.log(res);
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>