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
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: () => import('@/modules/auth/views/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'resetPassword',
        component: () => import('@/modules/auth/views/ResetPasswordPage.vue'),
      },
      // Add reset password route here when implemented
    ],
  },
];

export default authRoutes;
