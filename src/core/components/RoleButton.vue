<template>
  <v-btn id="role-activator" :icon="selectedRole.icon" :title="selectedRole.name"></v-btn>
  <v-menu activator="#role-activator">
    <v-list>
      <v-list-item
        v-for="(item, index) in roles"
        :key="index"
        :value="item.value"
        :active="item.value === selectedRole.value"
        rounded="0"
        @click="setRole(item)"
      >
        <template #prepend>
          <v-icon :icon="item.icon" end />
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
  import { useAppStore } from '@/core/stores/appStore';
  import { ref } from 'vue';
  interface Role {
    name: string;
    value: string;
    icon: string;
  }
  const roles: Role[] = [
    {
      name: 'Sysadmin',
      value: 'SYSADMIN',
      icon: 'mdi-shield-account-outline',
    },

    {
      name: 'Admin',
      value: 'ADMIN',
      icon: 'mdi-account-hard-hat-outline',
    },
    {
      name: 'Cliente',
      value: 'CLIENT',
      icon: 'mdi-account-outline',
    },
  ];
  const store = useAppStore();
  const selectedRole = ref<Role>(roles[0]);
  const setRole = (item: Role) => {
    selectedRole.value = item;
    store.setRole(item.value);
  };
  const initialize = (): void => {
    const savedRole = store.role;
    if (savedRole) {
      selectedRole.value = roles.find(t => t.value === savedRole) || roles[0];
    }
  };
  initialize();
</script>
