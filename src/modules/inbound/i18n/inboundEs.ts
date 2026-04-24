export const inboundEs = {
  inbound: {
    page: {
      title: 'Entrada de Equipos',
      subtitle: 'Registra y gestiona la entrada de equipos al inventario',
    },
    search: 'Buscar',
    headers: {
      folio: 'Folio',
      inboundType: 'Tipo de Entrada',
      datetime: 'Fecha y Hora',
      invoiceAmount: 'Monto de Factura',
      actions: 'Acciones',
    },
    actions: {
      add: 'Nueva Entrada',
      edit: 'Editar Entrada',
      delete: 'Eliminar Entrada',
      expand: 'Expandir Detalles',
    },
    dialog: {
      titleNew: 'Nueva Entrada',
      titleEdit: 'Editar Entrada',
      deleteTitle: 'Eliminar {name}',
      deleteMessage: '¿Desea eliminar esta entrada?',
    },
    form: {
      folio: 'Folio',
      datetime: 'Día Recepción',
      inboundType: 'Tipo de Entrada *',
      originLocation: 'Ubicación de Origen *',
      supplier: 'Proveedor *',
      note: 'Nota',
      invoiceAmount: 'Monto de Factura *',
      headers: {
        barcode: 'Código de Barras',
        name: 'Nombre del Equipo',
        quantity: 'Cantidad',
        actions: 'Acciones',
      },
    },
    notifications: {
      inboundCreated: 'Entrada creada con éxito',
      inboundUpdated: 'Entrada editada con éxito',
      inboundDeleted: 'Entrada eliminada con éxito',
      inboundDeletedError: 'Error al eliminar la entrada',
    },
    type: {
      transfer: 'Transferencia',
      purchase: 'Compra',
    },
  },
};

export type InboundI18nSchema = typeof inboundEs;
