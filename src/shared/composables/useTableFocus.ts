import { ref, nextTick } from 'vue';
import type { VTextField } from 'vuetify/components';

type VTextFieldInstance = InstanceType<typeof VTextField>;
type TableInputRefs = Record<number, Record<string, VTextFieldInstance>>;

export function useTableFocus() {
  const inputRefs = ref<TableInputRefs>({});

  // Guardar refs por fila y campo
  const setInputRef = (index: number, field: string, el: unknown) => {
    if (el) {
      if (!inputRefs.value[index]) {
        inputRefs.value[index] = {};
      }
      // Forzamos el tipo solo aquí, sabiendo que v-text-field siempre será esa instancia
      inputRefs.value[index][field] = el as VTextFieldInstance;
    } else {
      // Limpieza cuando el componente se destruye
      if (inputRefs.value[index]) {
        delete inputRefs.value[index][field];
      }
    }
  };

  const focusInput = async (index: number, field: string): Promise<void> => {
    await nextTick();
    const row = inputRefs.value[index];

    if (row && row[field]) {
      // Aquí tienes autocompletado total de los métodos de Vuetify
      row[field].focus();
    }
  };

  const clearAllRefs = () => {
    inputRefs.value = {};
  };

  return {
    inputRefs,
    setInputRef,
    focusInput,
    clearAllRefs,
  };
}
