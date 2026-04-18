import type { CategoryDetail, MeasureDetail } from './types/categoryTypes';

export const categoriesMockData: CategoryDetail[] = [
  {
    id: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000001',
    name: 'Monitoreo de signos vitales',
    description: 'Equipos utilizados para medir y monitorear signos vitales del paciente.',
    features: [
      {
        id: 'f1',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000001',
        idMeasure: '550e8400-e29b-41d4-a716-446655440007', // °C (ejemplo temperatura base)
        name: 'Temperatura corporal',
        measureName: 'Celsius',
        measureAbbr: '°C',
        measureIcon: 'mdi-thermometer',
        measureColor: '#F44336',
      },
      {
        id: 'f2',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000001',
        idMeasure: null,
        name: 'Frecuencia cardiaca',
        measureName: null,
        measureAbbr: 'bpm',
        measureIcon: 'mdi-heart-pulse',
        measureColor: '#E91E63',
      },
      {
        id: 'f3',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000001',
        idMeasure: null,
        name: 'Presión arterial',
        measureName: null,
        measureAbbr: 'mmHg',
        measureIcon: 'mdi-gauge',
        measureColor: '#FF5722',
      },
    ],
  },

  {
    id: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000002',
    name: 'Equipos de diagnóstico por imagen',
    description: 'Dispositivos para obtención de imágenes médicas internas.',
    features: [
      {
        id: 'f4',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000002',
        idMeasure: null,
        name: 'Resolución de imagen',
        measureName: null,
        measureAbbr: 'px',
        measureIcon: 'mdi-image',
        measureColor: '#3F51B5',
      },
      {
        id: 'f5',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000002',
        idMeasure: '550e8400-e29b-41d4-a716-446655440012', // m²
        name: 'Área de escaneo',
        measureName: 'Metro cuadrado',
        measureAbbr: 'm²',
        measureIcon: 'mdi-radar',
        measureColor: '#FF9800',
      },
    ],
  },

  {
    id: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000003',
    name: 'Soporte vital y emergencias',
    description: 'Equipos críticos para soporte de vida en emergencias médicas.',
    features: [
      {
        id: 'f6',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000003',
        idMeasure: null,
        name: 'Flujo de oxígeno',
        measureName: null,
        measureAbbr: 'L/min',
        measureIcon: 'mdi-air-filter',
        measureColor: '#4CAF50',
      },
      {
        id: 'f7',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000003',
        idMeasure: null,
        name: 'Energía de descarga',
        measureName: null,
        measureAbbr: 'J',
        measureIcon: 'mdi-lightning-bolt',
        measureColor: '#FFC107',
      },
    ],
  },

  {
    id: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000004',
    name: 'Laboratorio clínico',
    description: 'Equipos para análisis clínicos y pruebas de laboratorio.',
    features: [
      {
        id: 'f8',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000004',
        idMeasure: '550e8400-e29b-41d4-a716-446655440010', // L
        name: 'Volumen de muestra',
        measureName: 'Litro',
        measureAbbr: 'L',
        measureIcon: 'mdi-test-tube',
        measureColor: '#9C27B0',
      },
      {
        id: 'f9',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000004',
        idMeasure: null,
        name: 'Tiempo de análisis',
        measureName: null,
        measureAbbr: 'min',
        measureIcon: 'mdi-clock-outline',
        measureColor: '#607D8B',
      },
    ],
  },

  {
    id: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000005',
    name: 'Movilización de pacientes',
    description: 'Equipos para traslado, soporte y movilidad de pacientes.',
    features: [
      {
        id: 'f10',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000005',
        idMeasure: '550e8400-e29b-41d4-a716-446655440004', // kg
        name: 'Capacidad de carga',
        measureName: 'Kilogramo',
        measureAbbr: 'kg',
        measureIcon: 'mdi-weight-kilogram',
        measureColor: '#2196F3',
      },
      {
        id: 'f11',
        idCategory: 'c1f3a1a0-1a2b-4c5d-8e9f-000000000005',
        idMeasure: '550e8400-e29b-41d4-a716-446655440001', // m
        name: 'Altura ajustable',
        measureName: 'Metro',
        measureAbbr: 'm',
        measureIcon: 'mdi-arrow-up-down',
        measureColor: '#00BCD4',
      },
    ],
  },
];

export const measuresMockData: MeasureDetail[] = [
  { id: null, name: 'No aplica unidad', abbr: null, color: null, icon: null },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Metro',
    abbr: 'm',
    color: '#4CAF50',
    icon: 'mdi-ruler',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Kilómetro',
    abbr: 'km',
    color: '#2E7D32',
    icon: 'mdi-map-marker-distance',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Centímetro',
    abbr: 'cm',
    color: '#81C784',
    icon: 'mdi-ruler-square',
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Kilogramo',
    abbr: 'kg',
    color: '#2196F3',
    icon: 'mdi-weight-kilogram',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Gramo',
    abbr: 'g',
    color: '#64B5F6',
    icon: 'mdi-scale',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Libra',
    abbr: 'lb',
    color: '#1976D2',
    icon: 'mdi-weight-pound',
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Celsius',
    abbr: '°C',
    color: '#F44336',
    icon: 'mdi-thermometer',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Fahrenheit',
    abbr: '°F',
    color: '#E53935',
    icon: 'mdi-thermometer-lines',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    name: 'Kelvin',
    abbr: 'K',
    color: '#FF7043',
    icon: 'mdi-thermometer-plus',
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    name: 'Litro',
    abbr: 'L',
    color: '#9C27B0',
    icon: 'mdi-beaker',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    name: 'Mililitro',
    abbr: 'mL',
    color: '#BA68C8',
    icon: 'mdi-water',
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    name: 'Metro cuadrado',
    abbr: 'm²',
    color: '#FF9800',
    icon: 'mdi-shape-square-plus',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    name: 'Kilómetro cuadrado',
    abbr: 'km²',
    color: '#FB8C00',
    icon: 'mdi-vector-square',
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    name: 'Kilómetro por hora',
    abbr: 'km/h',
    color: '#00BCD4',
    icon: 'mdi-speedometer',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440015',
    name: 'Metro por segundo',
    abbr: 'm/s',
    color: '#26C6DA',
    icon: 'mdi-tachometer',
  },
];
