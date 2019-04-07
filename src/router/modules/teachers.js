/** 教师管理 **/
import Layout from '@/views/layout/Layout'
import RouterView from "@/views/layout/RouterView";

const teachersRouter = {
  path: '/teachers',
  component: Layout,
  meta: {
    title: '教师管理',
    icon: 'chalkboard-teacher'
  },
  redirect: "/teachers/contacts",
  children: [{
    path: 'contacts',
    name: 'teachersContacts',
    component: () => import('@/views/teachers/contacts'),
    meta: {
      title: '通讯录'
    }
  }, {
    path: 'list',
    component: RouterView,
    meta: {
      title: '教师列表'
    },
    children: [{
      path: '',
      name: 'teachersList',
      component: () => import('@/views/teachers/management'),
    }, {
      path: 'details',
      name: 'teachersDetails',
      hidden: true,
      component: () => import('@/views/teachers/management/TeachersDetails'),
      meta: {
        title: '教师详情'
      }
    }]
  }, {
    path: 'goals',
    name: 'teachersGoals',
    component: () => import('@/views/teachers/goals'),
    meta: {
      title: '教师目标完成率'
    }
  }, {
    path: 'incidents',
    name: 'teachersIncidents',
    component: () => import('@/views/teachers/incidents'),
    meta: {
      title: '教学事故'
    }
  }]
}

export default teachersRouter