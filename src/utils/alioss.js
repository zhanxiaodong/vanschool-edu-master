import http from './http.js';

const OSS = require('ali-oss');
let client = null;
let ossFileDir = '';
const uploadURL = '/man/teacher/ossinfo';

function ossClientUpload(path, file) {
  return new Promise((resolve, reject) => {
    client
      .multipartUpload(ossFileDir + path, file)
      .then(resolve)
      .catch(reject)
  });
}

/**
 * 上传阿里云oss
 * @path {string} 上传路径(直接用文件名即可)
 * @file {file} 上传文件 file对象
 * return promise
 */

export default function ossUpload(params) {
  if (client) {
    return ossClientUpload(params.path, params.file);
  } else {
    return new Promise((resolve, reject) => {
      http({
        url: uploadURL,
        method: 'GET'
      }).then(res => {
        ossFileDir = res.ossdir;
        client = new OSS({
          region: 'oss-cn-hangzhou',
          accessKeyId: res.ossid,
          accessKeySecret: res.osssecret,
          bucket: res.ossbucket
        });
        ossClientUpload(params.path, params.file).then(resolve).catch(reject);
      }).catch(err => {
        window.console.error('获取oss配置信息出错', err);
      })
    });
  }
}