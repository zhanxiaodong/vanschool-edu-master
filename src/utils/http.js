import {
  Message
} from 'element-ui';

let debug = false;

function log(logstr) {
  if (debug && window.console && window.console.warn) {
    window.console.warn(logstr);
  } else if (debug && window.console && window.console.log) {
    window.console.log(logstr);
  }
}

function dataformat(data) {
  let dataString = "";
  if (data && typeof data === "object" && data.length === undefined) {
    // 传入参数必须为 Object
    let dataArr = Object.keys(data)
      .map(keyItem => {
        if (
          data[keyItem] !== "" &&
          data[keyItem] !== null &&
          data[keyItem] !== undefined &&
          typeof data[keyItem] !== "object"
        ) {
          return `${keyItem}=${data[keyItem]}`;
        } else {
          log(
            `参数类型不正确！已移除(${keyItem})，必须为 String 或 Number 类型`
          );
        }
      })
      .filter(item => item);
    dataString = dataArr.join("&");
  } else {
    log("参数必须为Object，如:{ a: 1, b : 2, c : 3}");
  }
  return dataString;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function checkResponseType(response) {
  try {
    var ContentType = response.headers.get("Content-Type");
    if (ContentType.includes("image") || ContentType.includes("video")) {
      log("返回类型为 Blob");
      return response.blob();
    } else if (
      ContentType.includes("text") ||
      ContentType.includes("application/x-javascript")
    ) {
      return response.text();
    } else if (ContentType.includes("application/json")) {
      return response.json();
    } else if (ContentType.includes("application/octet-stream")) {
      log("返回类型为 arrayBuffer");
      return response.arrayBuffer();
    } else {
      return response;
    }
  } catch (error) {
    log(error);
    return response.text();
  }
}

function customLocalToken() {
  return {};
}

function request(param) {
  let url = param.url;
  let method = param.method || "GET";
  let headers = param.headers || {};
  let data = param.data || {};
  let contentType = param.contentType || "json";
  let timeout = param.timeout || 100000;
  let isLog = param.isLog || false;
  debug = isLog;
  const ctm = {
    urlencoded: {
      header: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: () => dataformat(data)
    },
    json: {
      header: {
        "Content-Type": "application/json; charset=utf-8"
      },
      data: () => JSON.stringify(data)
    },
    formdata: {
      header: {},
      data: () => data
    }
  };

  let fetchUrl = url;
  let fetchOpts = {
    method,
    headers: Object.assign(
      ctm[contentType].header || {},
      customLocalToken(),
      headers
    ),
    credentials: "same-origin"
  };
  // 检查是否支持 AbortController，AbortSignal ，来确定是否使用超时
  if ('signal' in new Request('') && timeout > 0) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    fetchOpts.signal = controller.signal;
  }
  // fetch 中 GET 和 DELETE ,需以url方式传递数据，GET方式 body必须删除掉
  if (["GET", "DELETE"].includes(method)) {
    const dataStr = ctm["urlencoded"].data();
    fetchUrl = dataStr.length > 0 ? [fetchUrl, dataStr].join("?") : fetchUrl;
  } else {
    fetchOpts.body = ctm[contentType].data() || "";
  }
  return new Promise((resolve, reject) => {
    window
      .fetch(fetchUrl, fetchOpts)
      .then(checkStatus)
      .then(checkResponseType)
      .then(resolve)
      .catch(err => {
        if (err.name === 'AbortError') {
          Message({
            message: `请求超时，请重试！`,
            type: "error"
          });
          reject(`请求超时(${timeout})，请重试！`);
        } else {
          if (err.response) {
            checkResponseType(err.response).then(error => {
              Message({
                message: error.error_mesg || error.message || error,
                type: "error"
              });
              reject(error);
            }).catch(() => {});
          } else {
            const error = err.message === "Failed to fetch" ? "网络连接失败，请检查网络！" : err.message;
            Message({
              message: error,
              type: "error"
            });
            reject(error);
          }
        }
      });
  });
}

export default request;