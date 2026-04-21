import type { RouteRecordRaw } from 'vue-router';

const equipmentRoutes: RouteRecordRaw[] = [
  {
    path: 'equipment',
    name: 'equipment',
    component: () => import('@/modules/equipment/views/EquipmentsPage.vue'),
  },
];

export default equipmentRoutes;
