<template>
  <div class="quick-filter">
    <div
      class="filter-title"
      :style="`width:${titleWidth}`"
    >{{title}}：</div>
    <div class="filter-opts">
      <div
        v-for="item in opts"
        :key="item.key"
        :class="{'opts-item':true,'active':selected === item.key}"
        @click="handleOptsCheck(item)"
      >{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuickFilter",
  props: {
    opts: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "分组"
    },
    titleWidth: {
      type: String,
      default: "auto"
    },
    active: {
      type: Number
    }
  },
  data() {
    return {
      selected: ""
    };
  },
  watch: {
    active() {
      this.selected = this.active;
    }
  },
  methods: {
    handleOptsCheck(item) {
      this.selected = item.key;
      this.$emit("change", { ...item });
    }
  }
};
</script>
<style lang="scss">
.quick-filter {
  display: flex;
  align-items: baseline;
  margin: 0 0 1.2em 0;
  min-height: 2em;
  .filter-title {
    flex-shrink: 0;
  }
  .filter-opts {
    display: flex;
    flex-wrap: wrap;
  }
  .opts-item {
    line-height: 32px;
    padding: 0 1.2em;
    margin: 0 0.5em 0.5em 0;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    &:not(.active):hover {
      cursor: pointer;
      color: #ffcd38;
    }
    &.active {
      background-color: #ffcd38;
      border-color: #ffcd38;
    }
  }
}
</style>
