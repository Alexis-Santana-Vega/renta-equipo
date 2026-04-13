import type { RouteRecordRaw } from 'vue-router';

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/core/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/modules/auth/views/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/modules/auth/views/SignupPage.vue'),
      },
      {
        path: 'otp-verification',
        name: 'otpVerification',
        component: () => import('@/modules/auth/views/OtpVerificationPage.vue'),
      },
      // Add reset password route here when implemented
    ],
  },
];

export default authRoutes;
