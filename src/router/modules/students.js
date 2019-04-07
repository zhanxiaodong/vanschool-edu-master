/** 学生档案 **/
import Layout from "@/views/layout/Layout";
import RouterView from "@/views/layout/RouterView";

const studentsRouter = {
  path: "/students",
  component: Layout,
  meta: {
    title: "学生档案",
    icon: "file-archive"
  },
  redirect: "/students/audit",
  children: [{
      path: "audit",
      component: RouterView,
      meta: {
        title: "学生审核"
      },
      children: [{
          path: "",
          name: "studentsReview",
          component: () => import("@/views/students/review/index")
        },
        {
          path: "create",
          name: "studentsCreate",
          component: () => import("@/views/students/review/CreateInfo"),
          meta: {
            title: "录入学生"
          },
          hidden: true
        }
      ]
    },
    {
      path: "arrangements",
      component: RouterView,
      meta: {
        title: "分班走读分寝"
      },
      children: [{
        path: "",
        name: "studentsArrangements",
        component: () => import("@/views/students/arrangements/index")
      }, {
        path: "timetable",
        name: "studentsTimetable",
        component: () => import("@/views/students/arrangements/Timetable"),
        meta: {
          title: "班级简易课表"
        },
      }, {
        path: "courseAndStudents",
        name: "studentsAndCourse",
        component: () => import("@/views/students/arrangements/CourseAndStudents"),
        meta: {
          title: "班级科目人数"
        },
      }]
    },
    {
      path: "list",
      component: RouterView,
      meta: {
        title: "学生列表"
      },
      children: [{
          path: "",
          name: "studentsList",
          component: () => import("@/views/students/list"),
        },
        {
          path: "student",
          component: RouterView,
          hidden: true,
          meta: {
            title: "学生详情"
          },
          children: [{
            path: "",
            name: "studentDetails",
            hidden: true,
            component: () => import("@/views/students/student/index"),
          },{
            path:"modify",
            name:"studentModify",
            hidden:true,
            component: () => import("@/views/students/review/CreateInfo"),
            meta:{
              title:"编辑资料"
            }
          }],
        }
      ]
    }
  ]
};

export default studentsRouter;