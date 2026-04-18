import type { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users',
    component: () => import('@/modules/user/views/UserPage.vue'),
  },
];

export default userRoutes;
