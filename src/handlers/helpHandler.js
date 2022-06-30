import helpController from "../controllers/helpController.js";
import MenuController from "../controllers/menuController.js"

export default function helpHandler(msg, client) {
    switch(true) {
        case /ayuda menu/g.test(msg.body):
          return helpController.menu()

        case /ayuda menu/g.test(msg.body):
          return helpController.cart()

        default:
            return client.sendText(msg.from,       
`
Comandos De Ayuda:

Para Ayuda De Menus Escribe:

ayuda menu

Para Ayuda Del Carrito Escribe:

ayuda carrito
`
                )
          break;
      }
}