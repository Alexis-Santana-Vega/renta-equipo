/** Categoría ligera para v-data-table */
export interface CategoryLight {
  id: string;
  name: string;
  description: string;
}

/** Categoría completa para formulario */
export interface CategoryDetail extends CategoryLight {
  features: FeatureWithMeasure[];
}

/** Característica enriquecida con datos del backend (característica con su medida) */
export interface FeatureWithMeasure {
  id: string | null;
  idCategory: string;
  idMeasure: string | null;
  name: string;
  // Campos desnormalizados que la API resuelve desde la unidad de medida
  measureName: string | null;
  measureAbbr: string | null;
  measureIcon: string | null;
  measureColor: string | null;
}

/** Medida completa para autocomplete en el form de características de categoría */
export interface MeasureDetail {
  id: string | null;
  name: string;
  abbr: string | null;
  color: string | null;
  icon: string | null;
}

/** Interfaz para la inicialización de la página de categorías  */
export interface CategoryInitResponse {
  categoryItems: CategoryLight[];
  measureItems: MeasureDetail[];
}

/** Interfaz de objeto, similar a la base de datos */
export interface Feature {
  id: string | null;
  idCategory: string;
  idMeasure: string | null;
  name: string;
}
