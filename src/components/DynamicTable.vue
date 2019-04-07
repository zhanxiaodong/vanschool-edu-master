<template>
  <el-table
    :data="data"
    @selection-change="(val)=>{$emit('selection-change',val)}"
    @row-click="(row, event, column)=>{$emit('row-click',row, event, column)}"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      width="55"
    />
    <template v-for="item in columns">
      <el-table-column
        v-if="item.action"
        :key="item.field"
        :label="item.label"
        :width="item.width"
      >
        <template>
          <el-button
            v-for="btn in item.buttons"
            :key="btn.label"
            type="text"
            @click="$emit('btns-click',btn.field)"
          >{{ btn.label }}</el-button>
        </template>
      </el-table-column>
      <template v-else>
        <el-table-column
          v-if="item.width"
          :width="item.width"
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          show-overflow-tooltip
        />
        <el-table-column
          v-else-if="item.minWidth"
          :min-width="item.minWidth"
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          show-overflow-tooltip
        />
        <el-table-column
          v-else
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          show-overflow-tooltip
        />
      </template>
    </template>
  </el-table>
</template>

<script>
/* eslint-disable */
export default {
  name: "DynamicTable",
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: [
        {
          label: "col1",
          field: "name"
        },
        {
          label: "col2",
          field: "age",
          width: 100
        }
      ]
    },
    data: {
      type: Array,
      default: []
    }
  }
};
</script>