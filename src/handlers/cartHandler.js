import cartController from "../controllers/cartController.js";
import helpController from "../controllers/helpController.js";

export default function cartHandler(msg, client) {
  switch (true) {
    case /carrito iniciar/g.test(msg.body):
      return cartController.createUserCart(client, msg.from);

    case /carrito agregar \w+/g.test(msg.body):
      const id = msg.body.split(" ")[2]
      const count = msg.body.split(" ")[3]

      return cartController.addProduct(client, msg.from, id, count ? count : 1)

    case /carrito mostrar/g.test(msg.body):
      return cartController.getProducts(client, msg.from);

    case /carrito eliminar \w+/g.test(msg.body):
      return cartController.deleteProduct(client, msg.from, msg.body.split(" ")[2])

    case /carrito borrar/g.test(msg.body):
      return cartController.deleteCart(client, msg.from)

    default:
      return helpController.cart(client, msg)
        break;
  }
}
