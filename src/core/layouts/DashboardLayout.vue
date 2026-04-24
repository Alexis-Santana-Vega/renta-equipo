<template>
  <v-app-bar order="2">
    <template #prepend>
      <v-app-bar-nav-icon @click="openDrawer" />
    </template>
    <v-app-bar-title>Dashboard</v-app-bar-title>
    <v-progress-linear
      :active="state.isLoading"
      indeterminate
      location="bottom"
      absolute
    ></v-progress-linear>
    <template #append>
      <SearchButton />
      <ThemeButton />
      <RoleButton />
      <LanguageButton />
      <v-btn icon="mdi-cart-outline" @click="state.drawerCart = !state.drawerCart"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="state.drawer" :rail="state.rail" order="1">
    <div class="d-flex align-center py-1 ga-2 pl-2">
      <v-img src="@/assets/images/logo.webp" width="48" height="48"></v-img>
      <div class="font-weight-black text-title-large text-medium-emphasis w-100">RentaMedic</div>
    </div>
    <v-list rounded="0">
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :title="item.title"
        :to="item.to"
        :active="item.to.name === router.name"
        rounded="0"
      >
        <template #prepend>
          <v-icon :icon="item.icon" class="ml-1"></v-icon>
        </template>
        <v-tooltip
          v-if="state.rail"
          activator="parent"
          location="end"
          :text="item.title"
        ></v-tooltip>
      </v-list-item>
    </v-list>
    <template #append>
      <div class="d-flex align-center py-1 pr-1 pl-2 ga-3">
        <div>
          <div
            class="rounded-circle font-weight-black bg-tertiary d-flex align-center justify-center"
            style="height: 48px; width: 48px"
          >
            AS
          </div>
        </div>
        <div style="white-space: nowrap">
          <div class="font-weight-bold text-medium-emphasis">Alexis Santana</div>
          <div class="text-label-medium text-medium-emphasis">Admin</div>
        </div>
      </div>
      <v-list rounded="0">
        <v-list-item rounded="0" @click="logout">
          <template #prepend>
            <v-icon icon="mdi-logout" class="ml-1"></v-icon>
          </template>
          <v-list-item-title>{{ t('nav.logout') }}</v-list-item-title>
          <v-tooltip
            v-if="state.rail"
            activator="parent"
            location="end"
            text="Cerrar sesión"
          ></v-tooltip>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
  <router-view v-slot="{ Component, route }" @loading-change="state.isLoading = $event">
    <v-fade-transition mode="out-in">
      <component :is="Component" :key="route.path"></component>
    </v-fade-transition>
  </router-view>
</template>
<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  import ThemeButton from '../components/ThemeButton.vue';
  import SearchButton from '../components/SearchButton.vue';
  import { useRoute } from 'vue-router';
  import RoleButton from '../components/RoleButton.vue';
  import LanguageButton from '../components/LanguageButton.vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  const router = useRoute();
  const { mdAndDown } = useDisplay();
  const state = reactive({
    drawer: true,
    drawerCart: false,
    rail: true,
    isLoading: false,
  });
  const { t } = useTypedLocale();
  const menuItems = computed(() => [
    //{ title: 'Inicio', icon: 'mdi-home-outline', to: { name: 'summary' } },
    //{ title: 'Buscar', icon: 'mdi-magnify', to: { name: 'search' } },
    { title: t('nav.equipment'), icon: 'mdi-desktop-classic', to: { name: 'equipment' } },
    { title: t('nav.category'), icon: 'mdi-tag-outline', to: { name: 'category' } },
    { title: t('nav.supplier'), icon: 'mdi-handshake-outline', to: { name: 'supplier' } },
    { title: t('nav.inbound'), icon: 'mdi-elevator-down', to: { name: 'inbound' } },
    //{ title: t('nav.outbound'), icon: 'mdi-elevator-up', to: { name: 'outbound' } },
    { title: t('nav.user'), icon: 'mdi-account-multiple-outline', to: { name: 'user' } },
  ]);
  const openDrawer = (): void => {
    if (mdAndDown.value) {
      state.drawer = !state.drawer;
      state.rail = false;
    } else {
      state.rail = !state.rail;
    }
  };
  const logout = (): void => {};
  const initialize = () => {
    state.rail = !mdAndDown.value;
    state.drawer = !mdAndDown.value;
  };
  initialize();
</script>
