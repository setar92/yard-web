enum ParcelStatuses {
  awaitin = 'awaiting',
  senderConfirmed = 'sender_confirmed',
  registered = 'shipment_registered',
  put = 'sender_put',
  accepted = 'mover_accepted',
  moverConfirmed = 'mover_confirmed',
  shipping = 'shipping',
  delivery = 'delivery',
  completed = 'completed',
}

export { ParcelStatuses };
