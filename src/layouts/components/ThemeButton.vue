<template>
  <v-btn id="menu-activator" :icon="selectedTheme.icon" :title="selectedTheme.name"></v-btn>
  <v-menu activator="#menu-activator">
    <v-list>
      <v-list-item
        v-for="(item, index) in themes"
        :key="index"
        :value="item.value"
        :active="item.value === selectedTheme.value"
        @click="setTheme(item)"
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
  import { onMounted, ref } from 'vue';
  import { useTheme } from 'vuetify';
  interface Theme {
    name: string;
    value: string;
    icon: string;
  }
  const themes: Theme[] = [
    {
      name: 'Claro',
      value: 'light',
      icon: 'mdi-weather-sunny',
    },
    {
      name: 'Oscuro',
      value: 'dark',
      icon: 'mdi-weather-night',
    },
    {
      name: 'Sistema',
      value: 'system',
      icon: 'mdi-theme-light-dark',
    },
  ];
  const theme = useTheme();
  const selectedTheme = ref<Theme>(themes[0]);
  const setTheme = (item: Theme): void => {
    theme.change(item.value);
    localStorage.setItem('rentaMedicTheme', item.value);
    selectedTheme.value = item;
  };
  onMounted(() => {
    const savedTheme = localStorage.getItem('rentaMedicTheme');
    if (savedTheme) {
      selectedTheme.value = themes.find(t => t.value === savedTheme) || themes[0];
    }
  });
</script>
