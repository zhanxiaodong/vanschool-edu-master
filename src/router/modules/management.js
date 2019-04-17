/** 教务管理 **/
import Layout from '@/views/layout/Layout';
import RouterView from "@/views/layout/RouterView";

const managementRouter = {
  path: '/management',
  component: Layout,
  meta: {
    title: '教务管理',
    icon: 'layer-group'
  },
  redirect: "/management/courses",
  children: [{
    path: 'courses',
    component: RouterView,
    meta: {
      title: '排班排课'
    },
    children: [{
        path: '',
        name: 'managementCourses',
        component: () => import('@/views/management/courses/index'),
      },
      {
        path: 'templates',
        name: 'managementTemplates',
        component: () => import('@/views/management/courses/Templates'),
        hidden: true,
        meta: {
          title: '排课模板'
        }
      },{
        path : 'scheduling',
        name : "managementScheduling",
        component: () => import('@/views/management/courses/Scheduling'),
        hidden: true,
        meta: {
          title: '排课'
        }
      },{
        path : "editClass",
        name:"managementEditClass",
        component: () => import('@/views/management/courses/EditClass'),
        hidden: true,
        meta: {
          title: '编辑班级'
        }
      }
    ]
  }, {
    path: 'schedules',
    component: RouterView,
    meta: {
      title: '学生课时管理'
    },
    children: [{
      path: "",
      name: 'managementSchedules',
      component: () => import('@/views/management/schedules/index'),
    }, {
      path: "solo",
      name: "managementSoloSchedules",
      component: () => import('@/views/management/schedules/SoloSchedules'),
      meta: {
        title: '一人一课表'
      },
    }]
  }, {
    path: 'vip',
    name: 'managementVip',
    component: () => import('@/views/management/vip'),
    meta: {
      title: 'VIP课课消管理'
    }
  }, 
  //考务安排
  {
    path: 'exams',
    component: RouterView,
    meta: {
      title: '考务安排'
    },
    children: [{
        path: "",
        name: 'managementExams',
        component: () => import('@/views/management/exams'),
      },
      {
        path: 'details',
        component: RouterView,
        meta: {
          title: '考试详情'
        },
        children: [{
          path: "",
          name: 'managementDetails',
          component: () => import('@/views/management/exam')
        },{
          path: "seatPlan",
          name: 'managementSeatPlan',
          component: () => import('@/views/management/exam/SeatPlan'),
          meta: {
            title: '考场座位表'
          }
        },{
          path: "verifyList",
          name: 'managementVerifyList',
          component: () => import('@/views/management/exam/VerifyList'),
          meta: {
            title: '核对表'
          }
        },{
          path : "admissionTicket",
          name: 'AdmissionTicket',
          component: () => import('@/views/management/exam/AdmissionTicket'),
          meta: {
            title: '生成准考证'
          }
        }]
      }
    ]
  }, {
    path: 'exchanges',
    name: 'managementExchanges',
    component: () => import('@/views/management/exchanges/index'),
    meta: {
      title: '换班换课'
    }
  }, {
    path: 'closed',
    name: 'managementClosed',
    component: () => import('@/views/management/closed/index'),
    meta: {
      title: '结课纪录'
    }, 
  }, 
  //任务模版录入
  {
    path: 'entryTask',
    component: () => import('@/views/management/entryTask/MainTask'),
    meta: {
      title: '任务模版录入'
    },
  },
]
}

export default managementRouter