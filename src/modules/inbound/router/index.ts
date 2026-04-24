import type { RouteRecordRaw } from 'vue-router';

const inboundRoutes: RouteRecordRaw[] = [
  {
    path: 'inbound',
    name: 'inbound',
    component: () => import('@/modules/inbound/views/InboundPage.vue'),
  },
];

export default inboundRoutes;
