import Vue from 'vue';
import {
  formatDate
} from "./utils/index.js";
// 注册全局过滤器,
// 时间戳转字符串
Vue.filter('date2str', sec => sec ? formatDate.toStr(sec) : "-");
Vue.filter('date2dateStr', sec => sec ? formatDate.toStr(sec, "YYYY/MM/DD") : "-");
Vue.filter('date2time', sec => sec ? formatDate.toStr(sec, "HH:mm") : "-");

// 性别转换
Vue.filter('gender2text', gender => ['男', '女'][gender - 1] || '-');

// 无效值，显示为‘-’
Vue.filter('defaultDisplay', val => val || '-');

// 上课状态
Vue.filter('ClassStatus', status => ({
  1: "待开课",
  2: "已开课",
  3: "已结课"
})[status])