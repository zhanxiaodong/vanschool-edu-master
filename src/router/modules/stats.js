/** 统计报表 **/

import Layout from '@/views/layout/Layout'

const statsRouter = {
  path: '/stats',
  component: Layout,
  meta: {
    title: '统计报表',
    icon: 'chart-bar'
  },
  redirect: "/stats/studentsData",
  children: [{
    path: 'studentsData',
    name: 'statsStudents',
    component: () => import('@/views/stats/students'),
    meta: {
      title: '学生数据'
    }
  }, {
    path: 'sources',
    name: 'statsSources',
    component: () => import('@/views/stats/sources'),
    meta: {
      title: '生源统计'
    }
  }, {
    path: 'enrolls',
    name: 'statsEnrolls',
    component: () => import('@/views/tree/index'),
    meta: {
      title: '报读汇总'
    }
  }, {
    path: 'exams',
    name: 'statsExams',
    component: () => import('@/views/tree/index'),
    meta: {
      title: '选考汇总'
    }
  }, {
    path: 'coach',
    name: 'statsTeachers',
    component: () => import('@/views/stats/teachers'),
    meta: {
      title: '教师统计'
    }
  }, {
    path: 'curriculums',
    name: 'statsCurriculums',
    component: () => import('@/views/tree/index'),
    meta: {
      title: '班级简易课表'
    }
  }, {
    path: 'styles',
    name: 'statsStyles',
    component: () => import('@/views/stats/styles'),
    meta: {
      title: '班风统计'
    }
  }, {
    path: 'transfer',
    name: 'statsTransfer',
    component: () => import('@/views/stats/transfer'),
    meta: {
      title: '调换班统计'
    }
  }]
}

export default statsRouter