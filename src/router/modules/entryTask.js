// 任务录入--教务老师
import Layout from '@/views/layout/Layout';

const entryTaskRouter = {
  path: '/entryTask',
  component: Layout,
  meta: {
    title: '任务模板录入',
    icon: 'tasks'
  },
  children: [{
    path: '',
    name: 'entryTaskMainTask',
    component: () => import('@/views/entryTask/MainTask'),
    meta: {
      title: '教学主线任务'
    }
  }]
}

export default entryTaskRouter