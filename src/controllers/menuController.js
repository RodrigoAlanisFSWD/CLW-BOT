import MenuService from "../services/menuService.js";

class MenuController {
  async showMenu(type, client, from) {
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

    client
      .sendListMenu(
        from,
        "Menu",
        "subTitle",
        "Menu De " + type,
        "Productos",
        menu
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  async showIngredients(type, client, from) {
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

    client
      .sendListMenu(
        from,
        "Menu",
        "subTitle",
        "Ingredientes De " + type,
        "Ingredientes",
        menu
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

}

export default new MenuController();
