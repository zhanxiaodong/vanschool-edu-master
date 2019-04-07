import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

import statsRouter from './modules/stats'
import studentsRouter from './modules/students'
import managementRouter from './modules/management'
import classesRouter from './modules/classes'
import teachersRouter from './modules/teachers'
import basicsRouter from './modules/basics';
import entryTaskRouter from './modules/entryTask';
import taskConfRouter from './modules/taskConf';
import presortCampusRouter from './modules/presortCampus';

import Layout from '@/views/layout/Layout';

export const authRouterMap = [{
    path: '/',
    component: Layout,
    meta: {
      title: '仪表盘',
      icon: 'tachometer-alt'
    },
    children: [{
      path: '',
      name: "dashboard",
      component: () => import('@/views/dashboard/index')
    }]
  },
  statsRouter,
  presortCampusRouter,
  studentsRouter,
  managementRouter,
  classesRouter,
  teachersRouter,
  basicsRouter,
  entryTaskRouter,
  taskConfRouter,
];

export const constantRouterMap = [{
    path: '/login',
    name: "login",
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      title: "登录",

    }
  },
  ...authRouterMap,
  {
    path: '*',
    name: "notFound",
    component: () => import('@/views/404'),
    hidden: true,
    meta: {
      title: "404"
    }
  }
];

// 根据路由表生成面包屑
function createBreadcrumb(routerMap, path) {
  let breadcrumbArr = [];
  const pathArr = path.split('/').filter(item => item);
  let breadcrumbCurrPathArr = [];

  function loopRouter(route) {
    // 去掉路径里面的“/” 
    const path = route.path.replace(/\//g, '');
    if (pathArr.includes(path)) {
      breadcrumbCurrPathArr.push(route.path);
      breadcrumbArr.push({
        path: breadcrumbCurrPathArr.join('/'),
        lable: route.meta.title
      });
      if (route.children && route.children.length > 0) {
        route.children.forEach(loopRouter);
      }
    }
  }
  constantRouterMap.forEach(loopRouter);
  return breadcrumbArr;
}

// 实例化路由对象
const appRouter = new Router({
  routes: constantRouterMap
});

// 注册全局导航守卫
appRouter.beforeEach((to, from, next) => {
  const breadcrumbArr = createBreadcrumb(constantRouterMap, to.path);
  store.commit("changeBreadcrumb", breadcrumbArr);
  store.commit("changeCurrPath", to.path);

  // 判断是否登录
  const publicPathList = ['/login']; // 无需登录访问路径
  const token = store.state.user.token;
  if (!publicPathList.includes(to.path)) {
    // 有token，直接继续，无token转回首页；
    token ? next() : next({
      path: '/login'
    });
  } else if (to.path === '/login') {
    // 有token访问登录页时，将其调转到首页，无时将停留在登录页
    token ? next({
      path: '/'
    }) : next();
  } else {
    // 其它情况，则不做处理
    next();
  }
});

export default appRouter;