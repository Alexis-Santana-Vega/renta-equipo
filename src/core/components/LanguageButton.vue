<template>
  <v-btn
    id="language-activator"
    :icon="selectedLanguage.icon"
    :title="selectedLanguage.name"
  ></v-btn>
  <v-menu activator="#language-activator">
    <v-list>
      <v-list-item
        v-for="(item, index) in languages"
        :key="index"
        :value="item.value"
        :active="item.value === selectedLanguage.value"
        rounded="0"
        @click="setLanguage(item)"
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
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  interface Language {
    name: string;
    value: string;
    icon: string;
  }
  const languages: Language[] = [
    {
      name: 'Español',
      value: 'es',
      icon: 'mdi-translate',
    },
    {
      name: 'Inglés',
      value: 'en',
      icon: 'mdi-translate',
    },
  ];
  const { locale } = useI18n();
  const selectedLanguage = ref<Language>(languages[0]);
  const setLanguage = (item: Language): void => {
    locale.value = item.value;
    localStorage.setItem('rentaMedicLanguage', item.value);
    selectedLanguage.value = item;
  };
  const initialize = (): void => {
    const savedLanguage = localStorage.getItem('rentaMedicLanguage');
    if (savedLanguage) {
      selectedLanguage.value = languages.find(t => t.value === savedLanguage) || languages[0];
    }
  };
  initialize();
</script>
