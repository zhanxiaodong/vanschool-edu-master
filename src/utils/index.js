import request from "./http";
import alioss from './alioss';

// sessionStorage,localStorage 简单包装
const extStorage = (type) => {
  if (['sessionStorage', 'localStorage'].indexOf(type) != -1) {
    return {
      get(key) {
        var data = window[type].getItem(key);
        try {
          data = JSON.parse(data);
        } catch (error) {
          data = data || null;
        }
        return data;
      },
      set(key, data) {
        window[type].setItem(key, typeof (data) == "string" ? data : JSON.stringify(data));
      },
      del(key) {
        window[type].removeItem(key);
      },
      clean() {
        window[type].clear();
      }
    }
  }
};
const sStorage = extStorage("sessionStorage");
const lStorage = extStorage("localStorage");

// 格式化时间
const formatDate = {
  pad(num) {
    return Number(num) < 10 ? `0${num}` : num
  },
  toStr(timestamp, formatStr = "YYYY/MM/DD HH:mm") {
    // 时间戳转字符串
    try {
      const sec = Number(timestamp);
      const dt = new Date(sec);
      const formatMap = {
        YYYY: dt.getFullYear(),
        MM: formatDate.pad(dt.getMonth() + 1),
        DD: formatDate.pad(dt.getDate()),
        HH: formatDate.pad(dt.getHours()),
        mm: formatDate.pad(dt.getMinutes()),
        ss: formatDate.pad(dt.getSeconds())
      };
      let final = formatStr;
      Object.keys(formatMap).forEach(key => {
        final = final.replace(new RegExp(key, 'g'), formatMap[key]);
      });
      return final;
    } catch (error) {
      window.console.warn(error);
      return timestamp;
    }
  },
  toSec(str) {
    // 字符串转时间戳
    try {
      const dateObj = new Date(str);
      return dateObj.getTime();
    } catch (error) {
      window.console.warn(error);
      return str;
    }
  }
};

export {
  sStorage,
  lStorage,
  formatDate,
  request,
  alioss
}

export default {
  sStorage,
  lStorage,
  formatDate,
  request,
  alioss
};