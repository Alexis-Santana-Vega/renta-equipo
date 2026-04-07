<template>
  <v-app-bar order="2">
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
  <v-navigation-drawer v-model="state.drawer" :rail="state.rail" order="1"></v-navigation-drawer>
  <router-view />
</template>
<script setup lang="ts">
  import { reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  import ThemeButton from './components/ThemeButton.vue';
  const { mdAndDown, smAndDown } = useDisplay();
  const state = reactive({
    drawer: true,
    drawerCart: false,
    rail: true,
  });
  const openDialogSearch = (): void => {
    console.log('open dialog search');
  };
  const openDrawer = (): void => {
    if (mdAndDown.value) {
      state.drawer = !state.drawer;
      state.rail = false;
    } else {
      state.rail = !state.rail;
    }
  };
  const initialize = () => {
    state.rail = !mdAndDown.value;
    state.drawer = !mdAndDown.value;
  };
  initialize();
</script>
