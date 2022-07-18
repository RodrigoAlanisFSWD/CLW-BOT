import helpController from "../controllers/helpController.js";
import MenuController from "../controllers/menuController.js"

export default function helpHandler(msg, client) {
    switch(true) {
        case /ayuda menu/g.test(msg.body):
          return helpController.menu(client, msg)

        case /ayuda carrito/g.test(msg.body):
          return helpController.cart(client, msg)

        case /ayuda crear/g.test(msg.body):
            return helpController.create(client, msg)

        case /ayuda compra/g.test(msg.body):
            return helpController.sell(client, msg)

        default:
            return client.sendMessage(msg.from,
`
Comandos De Ayuda:

Para Mostrar Los Comandos Del Menu Escribe:

ayuda menu

Para Mostrar Los Comandos Del Carrito Escribe:

ayuda carrito

Para Mostrar Los Comandos Para Crear Crepas/Waffles Escribe:

ayuda crear

Para Mostrar Los Comandos De Compra Escribe:

ayuda compra
`
                )
          break;
      }
}