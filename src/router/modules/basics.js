/** 基础管理 **/

import Layout from '@/views/layout/Layout'

const basicsRouter = {
  path: '/basics',
  component: Layout,
  meta: {
    title: '基础管理',
    icon: 'cogs'
  },
  redirect: "/basics/manage",
  children: [{
    path: 'manage',
    name: 'basicsManagement',
    component: () => import('@/views/basics/management'),
    meta: {
      title: '教师组和学科'
    }
  }, {
    path: 'personnel',
    name: 'basicsPersonnel',
    component: () => import('@/views/basics/personnel/index'),
    meta: {
      title: '人员管理'
    }
  }, {
    path: 'schedules',
    name: 'basicsSchedules',
    component: () => import('@/views/basics/schedules'),
    meta: {
      title: '课程时间管理'
    }
  }, {
    path: 'grades',
    name: 'basicsGrades',
    component: () => import('@/views/basics/grades'),
    meta: {
      title: '危分设置'
    }
  }, {
    path: 'campuses',
    name: 'basicsCampuses',
    component: () => import('@/views/basics/campuses'),
    meta: {
      title: '校区管理'
    }
  }, {
    path: 'hygiene',
    name: 'basicsHygiene',
    component: () => import('@/views/basics/hygiene'),
    meta: {
      title: '卫生规则'
    }
  }, {
    path: 'incidents',
    name: 'basicsIncidents',
    component: () => import('@/views/basics/incidents'),
    meta: {
      title: '教学事故规则'
    }
  }, {
    path: 'dorms',
    name: 'basicsDorms',
    component: () => import('@/views/basics/dorms'),
    meta: {
      title: '寝室纪律规则'
    }
  }, {
    path: 'teaching',
    name: 'basicsTeaching',
    component: () => import('@/views/basics/teaching'),
    meta: {
      title: '教学纪律规则'
    }
  }, {
    path: 'scores',
    name: 'basicsScores',
    component: () => import('@/views/basics/scores'),
    meta: {
      title: '纪律扣分要求'
    }
  }, {
    path: 'semesters',
    name: 'basicsSemesters',
    component: () => import('@/views/basics/semesters'),
    meta: {
      title: '学期管理'
    }
  }, {
    path: 'subjects',
    name: 'basicsSubjects',
    component: () => import('@/views/basics/subjects'),
    meta: {
      title: '学科管理'
    }
  }]
}

export default basicsRouter