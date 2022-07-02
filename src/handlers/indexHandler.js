import cartHandler from "./cartHandler.js"
import helpHandler from "./helpHandler.js"
import menuHandler from "./menuHandler.js"

export default function indexHandler(msg, client) {
    if (msg.isGroupMsg === false) {

      switch(true) {
        case /menu/g.test(msg.body) || /menu \w+/g.test(msg.body) || /ingredientes/g.test(msg.body) || /ingredientes \w+/g.test(msg.body):
          return menuHandler(msg, client)

        case /carrito \w+/g.test(msg.body):
          return cartHandler(msg, client)

        default:
          return helpHandler(msg, client)
      }
    }
}