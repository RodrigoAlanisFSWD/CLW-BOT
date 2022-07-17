import wsb from "whatsapp-web.js";
import MenuService from "../services/menuService.js";
const { List } = wsb

class MenuController {
  async showMenu(type, client, msg) {
    const products = await MenuService.getProducts(type);

    switch (type) {
      case "CREPA":
        type = "Crepas";
        break;
      case "WAFFLE":
        type = "Waffles";
        break;
      case "BEBIDA":
        type = "Bebidas";
        break;
      case "BOTANA":
        type = "Botanas";
        break;

      default:
        break;
    }

    const menu = [
      {
        title: type,
        rows: products,
      },
    ];

    const list = new List('Menu De ' + type, 'Productos', menu, '', '')

    msg.reply(list)
  }

  async showIngredients(type, client, msg) {
    const ingredients = await MenuService.getIngredients(type);

    switch (type) {
      case "CREPA":
        type = "Crepas";
        break;
      case "WAFFLE":
        type = "Waffles";
        break;

      default:
        break;
    }

    const menu = [
      {
        title: type,
        rows: ingredients,
      },
    ];

    const list = new List('Ingredientes De ' + type, 'Ingredientes', menu, '', '')
    
    msg.reply(list)
  }

}

export default new MenuController();
