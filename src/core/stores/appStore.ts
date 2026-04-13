// Utilities
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Tienda Composition API
/*
ref() son el state de las propiedades
computed() son los getters
funcion() son las actions
*/
export const useAppStore = defineStore('app', () => {
  const role = ref<string>('SYSADMIN');
  const setRole = (newRole: string): string => (role.value = newRole);
  return { role, setRole };
});
