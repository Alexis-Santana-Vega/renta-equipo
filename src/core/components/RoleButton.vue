<template>
  <v-btn id="role-activator" :icon="selectedRole.icon" />
  <v-menu activator="#role-activator">
    <v-list>
      <v-list-item
        v-for="item in roles"
        :key="item.value"
        :value="item.value"
        :active="item.value === store.role"
        rounded="0"
        @click="store.setRole(item.value)"
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
  import { computed } from 'vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { useAppStore } from '@/core/stores/appStore';

  const { t } = useTypedLocale();
  const store = useAppStore();

  const roles = computed(() => [
    { value: 'SYSADMIN', icon: 'mdi-shield-account-outline', name: t('roles.SYSADMIN') },
    { value: 'ADMIN', icon: 'mdi-account-hard-hat-outline', name: t('roles.ADMIN') },
    { value: 'CLIENT', icon: 'mdi-account-outline', name: t('roles.CLIENT') },
  ]);

  const selectedRole = computed(
    () => roles.value.find(r => r.value === store.role) ?? roles.value[0]
  );
</script>
