import cartController from "../controllers/cartController.js";
import helpController from "../controllers/helpController.js";
import userService from "../services/userService.js";

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

    default:
      return helpController.cart(client, msg)
        break;
  }
}
