import type { RouteRecordRaw } from 'vue-router';

const categoryRoutes: RouteRecordRaw[] = [
  {
    path: 'category',
    name: 'category',
    component: () => import('@/modules/category/views/CategoryPage.vue'),
  },
];

export default categoryRoutes;
