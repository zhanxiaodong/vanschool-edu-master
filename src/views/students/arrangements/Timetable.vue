<template>
  <el-card shadow="never">
    <search-bar
      :form-map="searchFormData"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="list">
        <el-table-column
          prop="class"
          label="班级"
          align="center"
        />
        <el-table-column
          prop="director"
          label="班主任"
          align="center"
        />
        <el-table-column
          label="A"
          align="center"
        >
          <el-table-column
            prop="a-course"
            align="center"
          />
          <el-table-column
            prop="a-user"
            align="center"
          />
        </el-table-column>
        <el-table-column
          label="B"
          align="center"
        >
          <el-table-column
            prop="b-course"
            align="center"
          />
          <el-table-column
            prop="b-user"
            align="center"
          />
        </el-table-column>
        <el-table-column
          label="C"
          align="center"
        >
          <el-table-column
            prop="c-course"
            align="center"
          />
          <el-table-column
            prop="c-user"
            align="center"
          />
        </el-table-column>
        <el-table-column
          label="D"
          align="center"
        >
          <el-table-column
            prop="d-course"
            align="center"
          />
          <el-table-column
            prop="d-user"
            align="center"
          />
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
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
export default {
  name: "StudentsTimetable",
  components: { SearchBar, Pagination },
  data() {
    return {
      searchFormData: {
        class: { label: "班级", type: "select", col:{md:7,lg:5,xl:5} },
        semester: { label: "学期", type: "select", col: {md:7,lg:5,xl:5}  },
        classStatus: { label: "班级状态", type: "select", col: {md:7,lg:5,xl:5}  }
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 30,
      list: [
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        },
        {
          class: "A 班",
          director: "张三",
          "a-course": "技",
          "a-user": "李四",
          "b-course": "技",
          "b-user": "李四",
          "c-course": "技",
          "c-user": "李四",
          "d-course": "技",
          "d-user": "李四"
        }
      ]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>