/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/pages/auth/LoginPage.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/pages/auth/SignupPage.vue'),
        },
        {
          path: 'otp-verification',
          name: 'otpVerification',
          component: () => import('@/pages/auth/OtpVerificationPage.vue'),
        },
        // Add reset password route here when implemented
      ],
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'summary',
          component: () => import('@/pages/dashboard/SummaryPage.vue'),
        },
      ],
    },
  ],
});

export default router;
