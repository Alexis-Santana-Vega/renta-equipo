<!-- El componente queda limpio -->
<template>
  <v-btn id="menu-activator" :icon="selectedTheme.icon" />
  <v-menu activator="#menu-activator">
    <v-list>
      <v-list-item
        v-for="item in themes"
        :key="item.value"
        :value="item.value"
        :active="item.value === savedValue"
        rounded="0"
        @click="setTheme(item.value)"
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
  import { computed, ref } from 'vue';
  import { useTheme } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';

  const { t } = useTypedLocale();
  const theme = useTheme();

  const themes = computed(() => [
    { value: 'light', icon: 'mdi-weather-sunny', name: t('colorTheme.light') },
    { value: 'dark', icon: 'mdi-weather-night', name: t('colorTheme.dark') },
    { value: 'system', icon: 'mdi-theme-light-dark', name: t('colorTheme.system') },
  ]);

  const savedValue = ref(localStorage.getItem('rentaMedicTheme') ?? 'light');

  const selectedTheme = computed(
    () => themes.value.find(x => x.value === savedValue.value) ?? themes.value[0]
  );

  function setTheme(value: string) {
    savedValue.value = value;
    localStorage.setItem('rentaMedicTheme', value);
    theme.change(value);
  }
</script>
