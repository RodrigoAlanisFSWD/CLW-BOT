import cartHandler from "./cartHandler.js"
import createHandler from "./createHandler.js"
import helpHandler from "./helpHandler.js"
import menuHandler from "./menuHandler.js"
import sellHandler from "./sellHandler.js";

export default function indexHandler(msg, client) {
    switch (true) {
        case /^menu/g.test(msg.body) || /menu \w+/g.test(msg.body) || /ingredientes/g.test(msg.body) || /ingredientes \w+/g.test(msg.body):
            return menuHandler(msg, client)

        case /^carrito \w+/g.test(msg.body):
            return cartHandler(msg, client)

        case /^crear/g.test(msg.body) || /crear \w+ \w [\d ]+/g.test(msg.body):
            return createHandler(msg, client);

        case /^(hola|hola buenas tardes|hola buenas noches|buenas tardes|buenas noches)/g.test(msg.body.toLowerCase()):
            return msg.reply(`
Bienvenido A El Bot De CrepasLollywaffles!

Mediante Este Chat Podras Ordenar Tus Productos Preferidos Para Que Leguen A Tu Casa.

Para Ayuda Con Los Comandos Escribe:
ayuda 
`)
        case /finalizar compra \w+ [\w ]+/g.test(msg.body):
            return sellHandler(msg, client)

        case /^ayuda/g.test(msg.body):
            return helpHandler(msg, client)

        default:
            return helpHandler(msg, client)
    }
}