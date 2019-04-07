/** 班级排课 **/

import Layout from '@/views/layout/Layout'
import RouterView from "@/views/layout/RouterView";

const classesRouter = {
  path: '/classes',
  component: Layout,
  meta: {
    title: '班级排课',
    icon: 'grip-horizontal'
  },
  redirect: "/classes/manage",
  children: [{
    path: 'manage',
    component: RouterView,
    meta: {
      title: '班级管理'
    },
    children: [{
      path: '',
      name: 'classesManagement',
      hidden: true,
      component: () => import('@/views/classes/management/index'),
    }, {
      path: 'details',
      component: RouterView,
      hidden: true,
      meta: {
        title: '班级详情'
      },
      children: [{
        path: '',
        name: 'classesManagementDetails',
        hidden: true,
        component: () => import('@/views/classes/management/ClassDetails'),
      }, {
        path: 'studentScore',
        name: 'classStudentScore',
        hidden: true,
        component: () => import('@/views/classes/management/StudentScore'),
        meta: {
          title: '个人成绩'
        },
      }]
    }]
  }, {
    path: 'dorms',
    name: 'classesDorms',
    component: () => import('@/views/classes/dorms'),
    meta: {
      title: '寝室管理'
    }
  }, {
    path: 'attendance',
    name: 'classesAttendance',
    component: () => import('@/views/classes/attendance'),
    meta: {
      title: '点名纪录'
    }
  }, {
    path: 'attendanceTeacher',
    name: 'classesAttendanceTeacher',
    component: () => import('@/views/classes/attendance-teacher'),
    meta: {
      title: '教师点名纪录'
    }
  }, {
    path: 'discipline',
    name: 'classesDiscipline',
    component: () => import('@/views/classes/discipline'),
    meta: {
      title: '纪律扣分'
    }
  }, {
    path: 'hygiene',
    component: RouterView,
    meta: {
      title: '卫生情况'
    },
    children: [{
      path: '',
      name: 'classesHygiene',
      component: () => import('@/views/classes/hygiene'),
      hidden: true
    }, {
      path: 'inspection',
      name: 'classesHygieneInspection',
      component: () => import('@/views/classes/hygiene/HygieneInspection'),
      meta: {
        title: '卫生检查'
      }
    }]
  }, {
    path: 'leaves',
    name: 'classesLeaves',
    component: () => import('@/views/classes/leaves'),
    meta: {
      title: '学生请假管理'
    }
  }, {
    path: 'absences',
    name: 'classesAbsences',
    component: () => import('@/views/classes/absences'),
    meta: {
      title: '缺课纪录'
    }
  }, {
    path: 'homework',
    name: 'classesHomework',
    component: () => import('@/views/classes/homework'),
    meta: {
      title: '作业检查'
    }
  }, {
    path: 'grades',
    name: 'classesGrades',
    component: () => import('@/views/classes/grades'),
    meta: {
      title: '成绩查看'
    }
  }, {
    path: 'analysis',
    name: 'classesAnalysis',
    component: () => import('@/views/classes/analysis'),
    meta: {
      title: '成绩分析'
    }
  }, {
    path: 'notifications',
    name: 'classesNotifications',
    component: () => import('@/views/classes/notifications'),
    meta: {
      title: '通知'
    }
  }]
}

export default classesRouter