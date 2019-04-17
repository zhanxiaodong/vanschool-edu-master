<template>
  <div class="teachers-management">
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
      <search-bar
        :formMap="searchForm"
        @search="handleSearch"
      />
      <el-row class="table-tools-bar">
        <el-col style="text-align:right">
          <el-button
            type="primary"
            @click="dialogVisible=true"
          >教师录入</el-button>
          <el-button type="primary">导出数据</el-button>
        </el-col>
      </el-row>
      <div v-loading="loading" class="table-container">
        <el-table :data="list">
          <!-- <el-table-column
            width="120"
            label="头像"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.avatarUrl" class="avatar">
                <img :src="scope.row.avatarUrl">
              </div>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
          />
          <el-table-column
            prop="group"
            label="分组"
            align="center"
          />
          <el-table-column
            prop="subjects"
            label="学科组"
            align="center"
            min-width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.subjects.join('、') }}
            </template>
          </el-table-column>
          <el-table-column
            label="负责班级"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.classes.join('、') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mainHours"
            label="主课时"
            align="center"
          />
          <el-table-column
            prop="selfHours"
            label="自习课时"
            align="center"
          />
          <el-table-column
            prop="vipHours"
            label="VIP课时"
            align="center"
          />
          <el-table-column
            prop="totalHours"
            label="总课时"
            align="center"
          />
          <el-table-column
            prop="lateWork"
            label="晚坐班"
            align="center"
          />
          <el-table-column
            prop="exams"
            label="监考"
            align="center"
          />
          <el-table-column
            prop="substitute"
            label="代课次数"
            align="center"
          />
          <el-table-column
            prop="replace"
            label="换课次数"
            align="center"
          />
          <el-table-column
            prop="lateRecords"
            label="当月迟录"
            align="center"
          />
          <el-table-column
            prop="offRecords"
            label="当月未录"
            align="center"
          />
          <el-table-column
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="$router.push({path:`/teachers/list/details`,query:{id:scope.row.id}})"
                type="text"
              >查看详情</el-button>
            </template>
          </el-table-column>
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
    <edit-dialog
      :visible="dialogVisible"
      :group-opts="[...dutyGroupOpts]"
      :subjectOpts="[...subjectGroupOpts]"
      :teacher-status="teacherStatusMap"
      @close="dialogVisible=false"
      @refresh="handleEditComplete"
    />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import QuickFilter from "@/components/QuickFilter";
import Pagination from "@/components/Pagination";

import EditDialog from "./EditDialog.vue";

// 老师状态
const teacherStatusMap = {
  "1": "在职",
  "2": "离职",
  "3": "休假（长假）",
  "4": "借调"
};

export default {
  name: "TeachersManagement",
  components: { SearchBar, QuickFilter, Pagination, EditDialog },
  data() {
    return {
      searchForm: {
        name: { label: "姓名", type: "input", col: { md: 5, lg: 5, xl: 5 } },
        class: {
          label: "负责班级",
          type: "select",
          options: [],
          col: { md: 7, lg: 5, xl: 5 }
        },
        dates: {
          label: "时间",
          type: "daterange",
          col: { md: 9, lg: 6, xl: 6 }
        }
      },
      dutyGroupOpts: [],
      subjectGroupOpts: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: [],
      dialogVisible: false,
      dialogForm: {},
      subjects: [],
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
      },
      teacherStatusMap,
      loading:false
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
        this.searchForm.class.options = res.result.map(item => ({
          label: item.name,
          value: item.name
        }));
      })
      .catch(() => {});
    // 获取列表
    this.queryTableList();
  },
  computed:{
    schoolId(){
      return this.$store.state.schoolId
    }
  },
  methods: {
    queryTableList() {
      this.loading = true;
      this.$root
        .request({
          url: `/man/teacher/querys`,
          method: "POST",
          data: { ...this.queryKeysObj }
        })
        .then(res => {
          this.list = res.result.map(item => {
            return {
              id:item.teacher.id,
              name: item.teacher.name,
              gender: ["男", "女"][item.teacher.gender - 1] || "-",
              group: item.teacher.groups,
              subjects: item.subjects.map(s => s.courseName),
              mobile: item.teacher.phone,
              classes: item.teacherClasses.map(c => c.name),
              status: teacherStatusMap[item.teacher.status],
              avatarUrl: item.teacher.imageUrl || ""
            };
          });
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        }).finally(() => {
          this.loading = false;
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.queryKeysObj.teacherParam.page = page;
      this.queryKeysObj.teacherParam.pageSize = pageSize;
      this.queryTableList();
    },
    // 搜索
    handleSearch(keys) {
      this.queryKeysObj.teacherParam = {
        name: keys.name || "",
        page: 1
      };
      this.queryKeysObj.classParam = {
        name: keys.class || ""
      };
      this.queryTableList();
    },
    // 上面状态切换
    handleFilterChange(selected, field) {
      const fieldArr = field.split(".");
      this.queryKeysObj[fieldArr[0]][fieldArr[1]] = selected.label;
      this.queryTableList();
    },
    handleEditComplete(){
      this.dialogVisible = false;
      this.queryTableList();
    }
  }
};
</script>


<style lang="scss" scoped>
.avatar {
  width: 3em;
  height: 3em;
  border-radius: 0.2em;
  display: inline-block;
}
</style>

