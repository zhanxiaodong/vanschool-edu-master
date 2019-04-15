<template>
  <el-card shadow="never">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <el-row
      type="flex"
      align="middle"
      class="simple-search-bar"
    >
      <el-col
        :span="24"
        style="text-align:right"
      >
        <el-button
          type="primary"
          icon="el-icon-download"
        >导 出</el-button>
      </el-col>
    </el-row>
    <div
      v-loading="loading"
      class="table-container"
    >
      <el-table :data="listData">
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
        />
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        >
          <template slot-scope="scope">
            <router-link :to="`/students/list/student?id=${scope.row.id}`">{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          align="center"
          width="60"
        >
          <template slot-scope="scope">{{scope.row.gender | gender2text}}</template>
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级"
          align="center"
        />
        <el-table-column
          prop="room"
          label="寝室"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="phone"
          label="在校电话"
          align="center"
          width="110"
        />
        <el-table-column
          prop="enrollProduct"
          label="报读课程"
          align="center"
          min-width="180"
        />
        <el-table-column
          prop="enrollDay"
          label="入学时间"
          align="center"
          width="110"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="90"
        />
        <el-table-column
          label="操作"
          align="center"
          min-width="60"
        >
          <template slot-scope="scope">
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
          :limit.sync="listQuery.pageSize"
          @pagination="handlePageChange"
        />
      </div>
    </div>
  </el-card>
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
  name: "StudentList",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        studNo: {
          label: "学  号",
          type: "input",
          col: { md: 8, lg: 6, xl: 6 }
        },
        semester: { label: "学  期", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        name: { label: "姓  名", type: "input", col: { md: 8, lg: 6, xl: 6 } },
        gender: {
          label: "性  别",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 2
            }
          ]
        },
        className: {
          label: "班  级",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: [],
          filterable: true
        },
        dorm: {
          label: "寝  室",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: [],
          filterable: true
        },
        origin: {
          label: "原学校 ",
          type: "input",
          col: { md: 8, lg: 6, xl: 6 }
        },
        phone: {
          label: "在校电话",
          type: "input",
          col: { md: 8, lg: 6, xl: 6 }
        },
        status: {
          label: "状  态",
          type: "select",
          col: { md: 8, lg: 6, xl: 6 },
          options: []
        },
        dates: {
          label: "入学时间",
          type: "daterange",
          col: { md: 10, lg: 6, xl: 6 }
        }
      },
      listQuery: {
        page: 1,
        pageSize: 20
      },
      total: 0,
      listData: [],
      loading: false,
      searchKeys: {}
    };
  },
  created() {
    this.getListData();
    // 获取筛选寝室列表
    this.$store
      .dispatch("queryDorm")
      .then(res => {
        this.formatOpts("dorm", res.result);
      })
      .catch(err => {
        window.console.error(err);
      });

    // 获取班级列表
    this.$store
      .dispatch("queryClasses")
      .then(res => {
        this.formatOpts("className", res.result);
      })
      .catch(err => {
        window.console.error(err);
      });
  },
  methods: {
    // 获取列表
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
          this.listData = this.reconditionData(res.result);
          this.total = res.totalNum;
        })
        .catch(err => {
          window.console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 翻页
    handlePageChange({ page, pageSize }) {
      this.getListData({ page, pageSize });
    },
    // 搜索
    onSearch(queryForm) {
      window.console.log(queryForm);
    },
    // 表格数据整理
    reconditionData(resData) {
      return resData.map(item => ({
        id: item.student.id,
        studNo: item.student.studNo,
        name: item.student.name,
        phone: item.student.phone,
        gender: item.student.gender,
        className: item.studentClass ? item.studentClass.name : "-",
        semester: item.studentClass ? item.studentClass.tern : "-",
        room: item.studentInfo ? item.studentInfo.room : "-",
        enrollProduct: item.studentInfo ? item.studentInfo.enrollProduct : "-",
        enrollDay: item.studentInfo
          ? this.$root.formatDate.toStr(
              item.studentInfo.enrollDay,
              "YYYY/MM/DD"
            )
          : "-",
        status: statusMap[item.student.result]
      }));
    },
    // 格式化筛选选项 （班级，寝室）
    formatOpts(field, optList) {
      if (optList && optList.length > 0) {
        this.searchFormData[field].options = optList.map(item => ({
          label: item.name,
          value: item.name
        }));
      }
    }
  }
};
</script>
