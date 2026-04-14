/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import authRoutes from '@/modules/auth/router';
import usersRoutes from '@/modules/users/router';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    {
      path: '/dashboard',
      component: () => import('@/core/layouts/DashboardLayout.vue'),
      children: [...usersRoutes],
    },
    /*
    {
      path: '/dashboard',
      component: () => import('@/core/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'summary',
          component: () => import('@/pages/dashboard/SummaryPage.vue'),
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/pages/dashboard/SearchPage.vue'),
          props: route => ({
            product: (route.query.product as string) || '',
            category: (route.query.category as string) || '',
          }),
        },
        {
          path: 'equipments',
          name: 'equipments',
          component: () => import('@/pages/dashboard/EquipmentsPage.vue'),
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/pages/dashboard/CategoriesPage.vue'),
        },
        {
          path: 'inbound',
          name: 'inbound',
          component: () => import('@/pages/dashboard/InboundPage.vue'),
        },
        {
          path: 'outbound',
          name: 'outbound',
          component: () => import('@/pages/dashboard/OutboundPage.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/pages/dashboard/UsersPage.vue'),
        },
      ],
    },
    */
  ],
});

export default router;
