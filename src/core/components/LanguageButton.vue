<template>
  <v-btn id="language-activator" :icon="selectedLanguage.icon" />
  <v-menu activator="#language-activator">
    <v-list>
      <v-list-item
        v-for="item in languages"
        :key="item.value"
        :value="item.value"
        :active="item.value === locale"
        rounded="0"
        @click="setLocale(item.value)"
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

  const { t, locale, setLocale } = useTypedLocale();

  const languages = computed(() => [
    { value: 'es', icon: 'mdi-translate', name: t('language.es') },
    { value: 'en', icon: 'mdi-translate', name: t('language.en') },
  ]);

  const selectedLanguage = computed(
    () => languages.value.find(l => l.value === locale.value) ?? languages.value[0]
  );
</script>
