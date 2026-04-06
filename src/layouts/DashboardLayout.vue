<template>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon @click="openDrawer" />
    </template>
    <v-app-bar-title>Dashboard</v-app-bar-title>
    <template #append>
      <v-btn icon="mdi-magnify" @click="openDialogSearch"></v-btn>
      <ThemeButton />
      <v-btn icon="mdi-cart-outline" @click="state.drawerCart = !state.drawerCart"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="state.drawer" :rail="state.rail"></v-navigation-drawer>
  <router-view />
</template>
<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  import ThemeButton from './components/ThemeButton.vue';
  const { mdAndDown, smAndDown } = useDisplay();
  const state = reactive({
    drawer: false,
    drawerCart: false,
    rail: false,
  });
  const openDrawer = (): void => {
    console.log('open drawer');
  };
  const openDialogSearch = (): void => {
    console.log('open dialog search');
  };
  onMounted(() => {
    state.rail = !mdAndDown.value;
  });
</script>
