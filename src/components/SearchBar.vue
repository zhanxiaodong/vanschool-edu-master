<template>
  <el-form
    class="serach-form"
    label-position="left"
  >
    <el-row :gutter="24">
      <el-col
        v-for="(item, key) in formMap"
        :key="key"
        :span="item.col.md"
        :lg="item.col.lg"
        :xl="item.col.xl"
      >
        <el-form-item
          :label="`${item.label}：`"
          :label-width="(item.label.length + 2)+'em'"
        >
          <el-input
            v-if="item.type === 'input'"
            v-model="searchForm[key]"
            @change="handleChange"
          />
          <el-select
            v-if="item.type === 'select'"
            v-model="searchForm[key]"
            @change="handleChange"
            :filterable="item.filterable ? true : false"
            :multiple="item.multiple ? true : false"
          >
            <el-option
              v-for="option in item.options"
              :label="option.label"
              :key="option.value"
              :value="option.value"
            />
          </el-select>
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="searchForm[key]"
            @change="handleChange"
          >
            <el-radio
              v-for="option in item.options"
              :key="option.value"
              :label="option.value"
            >{{ option.label }}</el-radio>
          </el-radio-group>
          <el-date-picker
            v-if="item.type === 'daterange'"
            v-model="searchForm[key]"
            type="daterange"
            range-separator="–"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChange"
          />
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="searchForm[key]"
            type="date"
            placeholder="选择日期"
            @change="handleChange"
          />
          <el-date-picker
            v-if="item.type === 'datetime'"
            v-model="searchForm[key]"
            type="datetime"
            placeholder="选择日期时间"
            @change="handleChange"
          />
          <el-date-picker
            v-if="item.type === 'week'"
            v-model="searchForm[key]"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
            @change="handleChange"
          />
          <el-date-picker
            v-if="item.type === 'month'"
            v-model="searchForm[key]"
            type="month"
            placeholder="选择月"
            @change="handleChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button
            type="success"
            icon="el-icon-search"
            @click="onSearch"
          >查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    formMap: { type: Object, required: true }
  },
  data() {
    return {
      searchForm: {}
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", { ...this.searchForm });
    },
    handleChange() {
      this.$emit("change", { ...this.searchForm });
    }
  }
};
</script>
