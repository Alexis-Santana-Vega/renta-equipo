import type { InboundI18nSchema } from './inboundEs';

export const inboundEn: InboundI18nSchema = {
  inbound: {
    page: {
      title: 'Equipment Inbound',
      subtitle: 'Register and manage equipment inventory entry',
    },
    search: 'Search',
    headers: {
      folio: 'Folio',
      inboundType: 'Inbound Type',
      datetime: 'Date & Time',
      invoiceAmount: 'Invoice Amount',
      actions: 'Actions',
    },
    actions: {
      add: 'New Inbound',
      edit: 'Edit Inbound',
      delete: 'Delete Inbound',
      expand: 'Expand Details',
      discardEquipment: 'Discard Inbound',
      generateInbound: 'Generate Inbound',
      scanEquipment: 'Scan Equipment',
      addEquipmentManually: 'Add Equipment Manually',
    },
    dialog: {
      titleNew: 'New Inbound',
      titleEdit: 'Edit Inbound',
      deleteTitle: 'Delete {name}',
      deleteMessage: 'Are you sure you want to delete this inbound entry?',
    },
    form: {
      folio: 'Folio',
      datetime: 'Reception Date',
      inboundType: 'Inbound Type *',
      originLocation: 'Origin Location *',
      supplier: 'Supplier *',
      note: 'Note',
      invoiceAmount: 'Invoice Amount *',
      equipmentTitle: 'Equipment Reception',
      headers: {
        barcode: 'Barcode',
        name: 'Equipment Name',
        quantity: 'Quantity',
        actions: 'Actions',
      },
    },
    notifications: {
      inboundCreated: 'Inbound entry successfully created',
      inboundUpdated: 'Inbound entry successfully updated',
      inboundDeleted: 'Inbound entry successfully deleted',
      inboundDeletedError: 'Error deleting inbound entry',
      equipmentNotFound: 'Equipment not found',
      entryDiscarded: 'Inbound entry discarded',
    },
    type: {
      transfer: 'Transfer',
      purchase: 'Purchase',
    },
  },
};
