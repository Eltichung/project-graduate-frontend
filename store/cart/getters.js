export default {
  getCart: (cart) => cart.cart,
  totalCart: (data) =>
    data.cart.reduce((total, item) => (total += item.count * item.price), 0),
  getDiscount: (cart) => cart.discount,
  showDialog: (item) => item.showDialog,
  getPosition: (item) => item.position,
}
