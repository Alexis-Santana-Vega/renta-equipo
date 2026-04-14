import type { RouteRecordRaw } from 'vue-router';

const usersRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users',
    component: () => import('@/modules/users/views/UsersPage.vue'),
  },
];

export default usersRoutes;
