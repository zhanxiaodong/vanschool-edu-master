// 任务配置管理--科目老师
import Layout from '@/views/layout/Layout';

const taskConfRouter = {
  path: '/taskConf',
  component: Layout,
  meta: {
    title: '任务状态管理',
    icon: 'sliders-h'
  },
  children: [{
    path: '',
    name: 'taskConfIndex',
    component: () => import('@/views/taskConf/TaskConfIndex'),
    meta: {
      title: '主线任务显示'
    }
  }]
}

export default taskConfRouter