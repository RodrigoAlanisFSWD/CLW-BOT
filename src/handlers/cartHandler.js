import cartController from "../controllers/cartController.js";
import userService from "../services/userService.js";

export default function cartHandler(msg, client) {
  switch (true) {
    case /ayuda carrito/g.test(msg.body):
      return client.sendText(
        msg.from,
        `
Comandos Del Menu:

Para Crear Un Carrito:

carrito iniciar

Para Agregar Un Producto

carrito agregar NUMERO CANTIDAD

El numero se refiere a el numero antes de el nombre de el producto, para mas sobre el menu escribe: ayuda menu
`
      );

    case /carrito iniciar/g.test(msg.body):
      return cartController.createUserCart(client, msg.from);

    case /carrito agregar \w+/g.test(msg.body):
      const id = msg.body.split(" ")[2]
      const count = msg.body.split(" ")[3]

      return cartController.addProduct(client, msg.from, id, count)

    default:
        return client.sendText(msg.from, 'Comandos De El Bot:').then((res) => {
            console.log('Result: ', res)
          }).catch(err => console.error(err))
  }
}
