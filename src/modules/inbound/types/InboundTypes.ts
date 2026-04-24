export interface EquipmentScanner {
  barcode: string;
  productId: string;
  name: string;
  quantity: number;
  codeValid: boolean;
}

export interface InboundLightResponse {
  id: string;
  folio: string;
  inboundType: 'TRANSFER' | 'PURCHASE';
  datetime: string;
  invoiceAmount: string;
}

export interface InboundForm extends InboundLightResponse {
  originLocationId?: string;
  supplierId?: string;
  note?: string;
  equipment: EquipmentScanner[];
}

export interface SupplierLightResponse {
  id: string;
  name: string;
}

export interface LocationLightResponse {
  id: string;
  name: string;
}
