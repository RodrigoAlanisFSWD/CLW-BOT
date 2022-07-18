import cartController from "../controllers/cartController.js";
import helpController from "../controllers/helpController.js";

export default function cartHandler(msg, client) {
  switch (true) {
    case /carrito iniciar/g.test(msg.body):
      return cartController.createUserCart(client, msg);

    case /carrito agregar \w+/g.test(msg.body):
      const id = msg.body.split(" ")[2]
      const count = msg.body.split(" ")[3]

      return cartController.addProduct(client, msg, id, count ? count : 1)

    case /carrito mostrar/g.test(msg.body):
      return cartController.getProducts(client, msg);

    case /carrito eliminar \w+/g.test(msg.body):
      return cartController.deleteProduct(client, msg, msg.body.split(" ")[2])

    case /carrito borrar/g.test(msg.body):
      return cartController.deleteCart(client, msg)

    case /carrito nota \w+/g.test(msg.body):
      const note = msg.body.split(" ").slice(2).join(" ")

      return cartController.addNote(client, msg, note)

    default:
      return helpController.cart(client, msg)
        break;
  }
}
