import {
  request,
  sStorage
} from "@/utils";

const app = {
  state: {
    asideWidth: 230, // 边栏宽度
    asideIsCollapse: sStorage.get("asideIsCollapse") || false, // 边栏是否折叠
    breadcrumb: [], // 面包屑
    currPath: "", // 存放当前路径，用于菜单高亮
    campusList: [] // 校区列表
  },
  mutations: {
    changeBreadcrumb(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
    },
    changeCurrPath(state, path) {
      state.currPath = path;
    },
    changeAsideCollapse(state, isCollapse) {
      state.asideIsCollapse = isCollapse;
      sStorage.set("asideIsCollapse", isCollapse);
    },
    changeCampusList(state, campusList) {
      state.campusList = campusList;
    }
  },
  actions: {
    // 获取科目列表
    queryCourseList() {
      return new Promise((resolve, reject) => {
        request({
          url: `/man/subject/querys`,
          method: 'POST',
          data: {}
        }).then(resolve).catch(reject);
      });
    },
    // 获取校区列表
    queryCampusList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        request({
          url: `/man/school/querys`,
          method: 'POST',
        }).then(res => {
          const listData = res.result.map(item => {
            const {
              address,
              contract,
              localCode,
              name,
              id
            } = item;
            return {
              address,
              contract,
              localCode,
              name,
              id
            };
          });
          commit('changeCampusList', listData);
          resolve(listData);
        }).catch(err => {
          window.console.error(err);
          reject(err);
        });
      });
    },
    // 获取学期
    queryTern() {
      return request({
        url: `/man/tern/querys`,
        method: 'POST'
      });
    },
    // 查询学科列表
    querySubject() {
      return request({
        url: `/man/subject/querys`,
        method: 'POST'
      });
    },
    // 查询班级列表
    queryClasses() {
      return request({
        url: `/man/class/querys`,
        method: 'POST',
        data: {
          type: 1
        }
      });
    },
    // 查询寝室列表
    queryDorm() {
      return request({
        url: `/man/room/query`,
        method: 'POST',
        data: {
          type: 2
        }
      });
    },
    // 教师分组
    queryTeacherGroup() {
      return request({
        url: `/man/teacher/group/querys`,
        method: 'POST'
      });
    },
    // 查询考试列表 
    queryExamList() {
      return request({
        url: `/task/exam/exam/query`,
        method: "POST"
      });
    }
  }
};

export default app;