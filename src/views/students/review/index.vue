<template>
  <div class="students-review">
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
        <el-col :span="6">
          <el-switch
            v-model="showOverdues"
            active-text="仅显示欠费学生"
          />
        </el-col>
        <el-col
          :span="18"
          style="text-align:right"
        >
          <el-button
            :disabled="!selectedRows.length"
            @click="transferDialogVisible = true"
          >换校区</el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="$router.push({name:'studentsCreate'})"
          >录入</el-button>
        </el-col>
      </el-row>
      <div class="table-container">
        <el-table
          fit='false'
          :data="list"
          @selection-change="onSelectRows"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            prop="num"
            label="学号"
            align="center"
          />
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
          />
          <el-table-column
            prop="gender"
            label="性别"
            align="center"
            min-width="60"
          />
          <el-table-column
            prop="semester"
            label="学期"
            align="center"
            min-width="80"
          />
          <el-table-column
            label="班级"
            align="center"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.class">{{ scope.row.class }}</template>
              <template v-else>
                <span class="dot-orange">未分班</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="报读课程"
            align="center"
            min-width="140"
          >
            <template slot-scope="scope">
              {{ scope.row.lessons.join('、') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="rollupTime"
            label="报名时间"
            align="center"
            min-width="100"
          />
          <el-table-column
            prop="enterTime"
            label="入学时间"
            align="center"
            min-width="100"
          />
          <el-table-column
            label="学费状态"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <span :class="`dot-${FEES[scope.row.feeStatus].color}`">{{ FEES[scope.row.feeStatus].name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            min-width="80"
          >
            <template slot-scope="scope">
              <span :class="`dot-${STATUSES[scope.row.status].color}`">{{ STATUSES[scope.row.status].name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleInvite(scope.row.id)"
              >邀约</el-button>
              <el-button
                type="text"
                @click="handleInterview(scope.row.id)"
              >面谈</el-button>
              <el-button
                type="text"
                @click="handleCheckIn(scope.row.id)"
              >报到</el-button>
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
            @pagination="onSearch"
          />
        </div>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="transferDialogVisible"
      title="更换校区"
    >
      <el-form label-width="6em"> 
        <el-form-item label="已选学生：">
          <el-tag
            class="students-tag"
            v-for="item in selectedRows"
            :key="item.id"
            disable-transitions
          >{{item.name}}</el-tag>
        </el-form-item>
        <el-form-item label="校区选择：">
          <el-select v-model="transferDialogForm.campus" />
        </el-form-item>
        <el-form-item label="更换理由：">
          <el-input
            v-model="transferDialogForm.reason"
            type="textarea"
            rows="4"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="transferDialogVisible = false; transferDialogForm = {};">取 消</el-button>
        <el-button
          type="primary"
          @click="transferDialogVisible = false; transferDialogForm = {};"
        >提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const FEES = {
  1: { name: "预报名", color: "blue" },
  2: { name: "已缴费", color: "green" },
  3: { name: "欠费", color: "pink" }
};

const STATUSES = {
  1: { name: "待邀约", color: "yellow" },
  2: { name: "待面谈", color: "orange" },
  3: { name: "待报到", color: "blue" },
  4: { name: "已报到", color: "green" },
  5: { name: "邀约流失", color: "pink" }
};

export default {
  name: "StudentsReview",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        name: { label: "姓名", type: "input", col: { md: 7, lg: 5, xl: 4 } },
        feeStatus: {
          label: "学费状态",
          type: "select",
          col: { md: 8, lg: 6, xl: 5 }
        },
        status: { label: "状态", type: "select", col: { md: 6, lg: 5, xl: 4 } }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      showOverdues: true,
      list: [
        {
          id: 1,
          num: "123456",
          semester: "201801",
          name: "张三",
          gender: "男",
          class: "1任-A班",
          lessons: ["大沖班", "VIP"],
          rollupTime: "2017/11/24",
          enterTime: "2017/11/24",
          feeStatus: 1,
          status: 1
        },
        {
          id: 2,
          num: "123456",
          semester: "201801",
          name: "张三",
          gender: "男",
          class: null,
          lessons: ["大沖班", "VIP"],
          rollupTime: "2017/11/24",
          enterTime: "2017/11/24",
          feeStatus: 2,
          status: 2
        },
        {
          id: 3,
          num: "123456",
          semester: "201801",
          name: "张三",
          gender: "男",
          class: "1任-A班",
          lessons: ["大沖班", "VIP"],
          rollupTime: "2017/11/24",
          enterTime: "2017/11/24",
          feeStatus: 3,
          status: 5
        }
      ],
      selectedRows: [],
      addDialogVisible: false,
      transferDialogVisible: false,
      transferDialogForm: {},
      FEES,
      STATUSES
    };
  },
  methods: {
    onSelectRows(val) {
      this.selectedRows = val;
    },
    handleInvite(id) {
      window.console.log(id);
      this.$confirm("是否邀约成功？", "邀约", {
        confirmButtonText: "成功",
        cancelButtonText: "流失"
      })
        .then(() => {
          // 成功
        })
        .catch(() => {
          // 流失
        });
    },
    handleInterview(id) {
      window.console.log(id);
      this.$confirm("是否面谈成功？", "面谈", {
        confirmButtonText: "成功",
        cancelButtonText: "流失"
      })
        .then(() => {
          // 成功
        })
        .catch(() => {
          // 流失
        });
    },
    handleCheckIn(id) {
      window.console.log(id);
    },
    onSearch(f) {
      window.console.log(f);
    }
  }
};
</script>
<style lang="scss" scoped>
.students-tag {
  margin: 0 1em 1em 0;
}
</style>

