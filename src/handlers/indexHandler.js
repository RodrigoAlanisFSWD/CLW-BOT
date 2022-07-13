import cartHandler from "./cartHandler.js"
import createHandler from "./createHandler.js"
import helpHandler from "./helpHandler.js"
import menuHandler from "./menuHandler.js"

export default function indexHandler(msg, client) {
      switch(true) {
        case /menu/g.test(msg.body) || /menu \w+/g.test(msg.body) || /ingredientes/g.test(msg.body) || /ingredientes \w+/g.test(msg.body):
          return menuHandler(msg, client)

        case /carrito \w+/g.test(msg.body):
          return cartHandler(msg, client)

        case /crear/g.test(msg.body) || /crear \w+ \w [\d ]+/g.test(msg.body):
          return createHandler(msg, client);

        default:
          return helpHandler(msg, client)
      }
}