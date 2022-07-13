import MenuController from "../controllers/menuController.js"

export default function menuHandler(msg, client) {
    switch(true) {
        case /menu \w+/g.test(msg.body):
          if (msg.body.includes('Crepas')) return MenuController.showMenu('CREPA', client, msg)
          if (msg.body.includes('Waffles')) return MenuController.showMenu('WAFFLE', client, msg)
          if (msg.body.includes('Bebidas')) return MenuController.showMenu('BEBIDA', client, msg)
          if (msg.body.includes('Botana')) return MenuController.showMenu('BOTANA', client, msg)
          if (msg.body.includes('Salsas')) return MenuController.showIngredients('DALSAS', client, msg)
          
          return msg.reply('El Menu No Existe')

        case /menu/g.test(msg.body):
          return msg.reply('El Menu No Existe')

        case /ingredientes \w+/g.test(msg.body):
          if (msg.body.includes('Crepas')) return MenuController.showIngredients('CREPA', client, msg)
          if (msg.body.includes('Waffles')) return MenuController.showIngredients('WAFFLE', client, msg)
          
          return msg.reply('La Categoria No Existe')
          
        case /ingredientes/g.test(msg.body):
          return msg.reply('La Categoria No Existe')

        default:
          return helpController.menu(client, msg)
          break;
      }
}