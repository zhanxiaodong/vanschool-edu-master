// 集团领导--预分校区
import Layout from '@/views/layout/Layout';

const presortCampusRouter = {
  path: '/presortCampus',
  component: Layout,
  meta: {
    title: '预分校区',
    icon: 'star-of-life'
  },
  redirect: "/presortCampus/stat",
  children: [{
    path: 'stat',
    name: 'presortCampusStat',
    component: () => import('@/views/presortCampus'),
    meta: {
      title: '统计'
    }
  }, {
    path: "transferApply",
    name: "transferApply",
    component: () => import('@/views/presortCampus/TransferApply'),
    meta: {
      title: '转校区申请'
    }
  }]
}

export default presortCampusRouter