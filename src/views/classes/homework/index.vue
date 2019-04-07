<template>
  <el-card shadow="never">
    <el-row class="simple-search-bar">
      <el-col :sm="{span:6}" :md="{span:6}" :lg="{span:4}" :xl="{span:4}">
        <el-date-picker
          v-model="queryDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="class"
          label="班级"
          align="center"
        />
        <el-table-column
          label="语文"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.chinese.teacher }} {{ scope.row.chinese.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.chinese.teacher }} {{ scope.row.chinese.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="英语"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.english.teacher }} {{ scope.row.english.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.english.teacher }} {{ scope.row.english.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="政治"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.politics.teacher }} {{ scope.row.politics.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.politics.teacher }} {{ scope.row.politics.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="历史"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.history.teacher }} {{ scope.row.history.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.history.teacher }} {{ scope.row.history.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="地理"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.geography.teacher }} {{ scope.row.geography.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.geography.teacher }} {{ scope.row.geography.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="物理"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.physics.teacher }} {{ scope.row.physics.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.physics.teacher }} {{ scope.row.physics.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="化学"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.chemistry.teacher }} {{ scope.row.chemistry.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.chemistry.teacher }} {{ scope.row.chemistry.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="生物"
          width="220px"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.biology.teacher }} {{ scope.row.biology.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.biology.teacher }} {{ scope.row.biology.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="技术"
          width="220px"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.technology.teacher }} {{ scope.row.technology.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.technology.teacher }} {{ scope.row.technology.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="日语"
          width="220px"
        >
          <template slot-scope="scope">
            <div class="split-cells">
              <div class="split-cells__item">
                {{ scope.row.japanese.teacher }} {{ scope.row.japanese.homework }} | {{ scope.row.total }}
              </div>
              <div class="split-cells__item">
                {{ scope.row.japanese.teacher }} {{ scope.row.japanese.test }} | {{ scope.row.total }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-container-footer">
        <pagination
          v-show="total"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "ClassesHomework",
  components: { Pagination },
  data() {
    return {
      queryDate:"",
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          id: 1,
          class: "1班",
          total: 30,
          chinese: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          english: {
            teacher: "张三丰",
            homework: 28,
            test: 28
          },
          politics: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          history: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          geography: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          physics: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          chemistry: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          biology: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          technology: {
            teacher: "张三",
            homework: 28,
            test: 28
          },
          japanese: {
            teacher: "张三",
            homework: 28,
            test: 28
          }
        }
      ]
    };
  },
  methods: {
    onSearch(payload) {
      window.console.log(payload.form);
    },
    getList() {
      // this.getTableData()
    }
  }
};
</script>
