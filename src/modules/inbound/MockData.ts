import type {
  EquipmentScanner,
  InboundForm,
  LocationLightResponse,
  SupplierLightResponse,
} from './types/InboundTypes';

export const mockInbounds: InboundForm[] = [
  {
    id: 'i1111111-1111-4111-8111-111111111111',
    folio: 'INB-0001',
    inboundType: 'PURCHASE',
    datetime: '2026-04-24T10:00:00',
    invoiceAmount: '45000.00',
    supplierId: 'e1111111-1111-4111-8111-111111111111',
    note: 'Compra inicial de equipos de laboratorio',
    equipment: [
      {
        barcode: 'RM-0010-SV',
        productId: 'c1111111-1111-4111-8111-111111111111',
        name: 'Centrimax 12K',
        quantity: 2,
        codeValid: true,
      },
      {
        barcode: 'RM-0030-SV',
        productId: 'c3333333-3333-4333-8333-333333333333',
        name: 'AutoPipette X3',
        quantity: 5,
        codeValid: true,
      },
      {
        barcode: 'RM-0060-SV',
        productId: 'c6666666-6666-4666-8666-666666666666',
        name: 'NeoMonitor V3',
        quantity: 1,
        codeValid: true,
      },
    ],
  },

  {
    id: 'i2222222-2222-4222-8222-222222222222',
    folio: 'INB-0002',
    inboundType: 'TRANSFER',
    datetime: '2026-04-24T12:30:00',
    invoiceAmount: '0.00',
    originLocationId: 'a2222222-2222-4222-8222-222222222222',
    supplierId: 'e2222222-2222-4222-8222-222222222222',
    note: 'Transferencia desde sucursal Guadalajara',
    equipment: [
      {
        barcode: 'RM-0040-SV',
        productId: 'c4444444-4444-4444-8444-444444444444',
        name: 'NebulaCare Mini',
        quantity: 3,
        codeValid: true,
      },
      {
        barcode: 'RM-0050-SV',
        productId: 'c5555555-5555-4555-8555-555555555555',
        name: 'SuctionMed V2',
        quantity: 2,
        codeValid: true,
      },
    ],
  },

  {
    id: 'i3333333-3333-4333-8333-333333333333',
    folio: 'INB-0003',
    inboundType: 'PURCHASE',
    datetime: '2026-04-23T09:15:00',
    invoiceAmount: '30000.00',
    supplierId: 'e5555555-5555-4555-8555-555555555555',
    equipment: [
      {
        barcode: 'RM-0020-SV',
        productId: 'c2222222-2222-4222-8222-222222222222',
        name: 'PhotoCare LED',
        quantity: 1,
        codeValid: true,
      },
      {
        barcode: 'RM-0040-SV',
        productId: 'c4444444-4444-4444-8444-444444444444',
        name: 'NebulaCare Mini',
        quantity: 2,
        codeValid: true,
      },
    ],
  },

  {
    id: 'i4444444-4444-4444-8444-444444444444',
    folio: 'INB-0004',
    inboundType: 'PURCHASE',
    datetime: '2026-04-22T16:45:00',
    invoiceAmount: '12000.00',
    supplierId: 'e3333333-3333-4333-8333-333333333333',
    note: 'Equipos respiratorios',
    equipment: [
      {
        barcode: 'RM-0050-SV',
        productId: 'c5555555-5555-4555-8555-555555555555',
        name: 'SuctionMed V2',
        quantity: 2,
        codeValid: true,
      },
      {
        barcode: 'RM-0040-SV',
        productId: 'c4444444-4444-4444-8444-444444444444',
        name: 'NebulaCare Mini',
        quantity: 1,
        codeValid: true,
      },
    ],
  },

  {
    id: 'i5555555-5555-4555-8555-555555555555',
    folio: 'INB-0005',
    inboundType: 'PURCHASE',
    datetime: '2026-04-21T11:20:00',
    invoiceAmount: '18000.00',
    supplierId: 'e2222222-2222-4222-8222-222222222222',
    equipment: [
      {
        barcode: 'RM-0010-SV',
        productId: 'c1111111-1111-4111-8111-111111111111',
        name: 'Centrimax 12K',
        quantity: 1,
        codeValid: true,
      },
      {
        barcode: 'RM-0020-SV',
        productId: 'c2222222-2222-4222-8222-222222222222',
        name: 'PhotoCare LED',
        quantity: 1,
        codeValid: true,
      },
    ],
  },
];

export const mockEquipmentProducts: EquipmentScanner[] = [
  {
    barcode: 'RM-0010-SV',
    productId: 'c1111111-1111-4111-8111-111111111111',
    name: 'Centrimax 12K',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0020-SV',
    productId: 'c2222222-2222-4222-8222-222222222222',
    name: 'PhotoCare LED',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0030-SV',
    productId: 'c3333333-3333-4333-8333-333333333333',
    name: 'AutoPipette X3',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0040-SV',
    productId: 'c4444444-4444-4444-8444-444444444444',
    name: 'NebulaCare Mini',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0050-SV',
    productId: 'c5555555-5555-4555-8555-555555555555',
    name: 'SuctionMed V2',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0060-SV',
    productId: 'c6666666-6666-4666-8666-666666666666',
    name: 'NeoMonitor V3',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0070-SV',
    productId: 'c7777777-7777-4777-8777-777777777777',
    name: 'MicroSpin Pro 3000',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0080-SV',
    productId: 'c8888888-8888-4888-8888-888888888888',
    name: 'NeoWarm Incubator X1',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0090-SV',
    productId: 'c9999999-9999-4999-8999-999999999999',
    name: 'OxyFlow 500',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0100-SV',
    productId: 'caaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    name: 'LabAnalyzer Smart',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0110-SV',
    productId: 'cbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    name: 'NeoPulse Monitor 2.0',
    quantity: 0,
    codeValid: true,
  },
];

export const mockSuppliersLight: SupplierLightResponse[] = [
  {
    id: 'e1111111-1111-4111-8111-111111111111',
    name: 'MedSupply MX',
  },
  {
    id: 'e2222222-2222-4222-8222-222222222222',
    name: 'NeoTech México',
  },
  {
    id: 'e3333333-3333-4333-8333-333333333333',
    name: 'RespiraMed',
  },
  {
    id: 'e4444444-4444-4444-8444-444444444444',
    name: 'LabTech Solutions',
  },
  {
    id: 'e5555555-5555-4555-8555-555555555555',
    name: 'GlobalMed Distribución',
  },
];

export const mockLocationsLight: LocationLightResponse[] = [
  {
    id: 'a1111111-1111-4111-8111-111111111111',
    name: 'Ciudad de México',
  },
  {
    id: 'a2222222-2222-4222-8222-222222222222',
    name: 'Guadalajara',
  },
  {
    id: 'a3333333-3333-4333-8333-333333333333',
    name: 'Monterrey',
  },
  {
    id: 'a4444444-4444-4444-8444-444444444444',
    name: 'Puebla',
  },
  {
    id: 'a5555555-5555-4555-8555-555555555555',
    name: 'Mérida',
  },
];
