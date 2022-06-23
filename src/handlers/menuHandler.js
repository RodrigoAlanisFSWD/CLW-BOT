import MenuController from "../controllers/menuController.js"

export default function menuHandler(msg, client) {
    switch(true) {
        case /ayuda menu/g.test(msg.body):
          return client.sendText(msg.from,       
`
Comandos Del Menu:

Para mostrar los menus escribe:

menu CATEGORIA

Categorias: Crepas, Waffles, Bebidas, Botana
`
)

        case /menu \w+/g.test(msg.body):
          if (msg.body.includes('Crepas')) return MenuController.showMenu('CREPA', client, msg.from)
          if (msg.body.includes('Waffles')) return MenuController.showMenu('WAFFLE', client, msg.from)
          if (msg.body.includes('Bebidas')) return MenuController.showMenu('BEBIDA', client, msg.from)
          if (msg.body.includes('Botana')) return MenuController.showMenu('BOTANA', client, msg.from)
          
          return client.sendText(msg.from, 'El Menu No Existe')

        case /menu/g.test(msg.body):
          return client.sendText(msg.from, 'El Menu No Existe')

        case /ingredientes \w+/g.test(msg.body):
          if (msg.body.includes('Crepas')) return MenuController.showIngredients('CREPA', client, msg.from)
          if (msg.body.includes('Waffles')) return MenuController.showIngredients('WAFFLE', client, msg.from)
          
          return client.sendText(msg.from, 'La Categoria No Existe')
          
        case /ingredientes/g.test(msg.body):
          return client.sendText(msg.from, 'La Categoria No Existe')

        default:
          break;
      }
}