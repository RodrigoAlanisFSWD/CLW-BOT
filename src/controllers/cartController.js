import { getConnection } from "../db.js";
import userService from "../services/userService.js";
import cartService from "../services/cartService.js";
import menuService from "../services/menuService.js";

class CartController {
  async createUserCart(client, from) {
    const db = getConnection();

    if (userService.existUser(from)) {
      await userService.deleteUser(from);
    }

    await userService.createUser(from);

    const user = userService.findUser(from);

    await cartService.createUserCart(user);

    return client.sendText(from, "Carrito Creado");
  }

  async addProduct(client, from, id, count) {
    try {
      if (!userService.existUser(from)) {
        return client.sendText(
          from,
          `Antes Crea Un Carrito Escribiendo:
    carrito iniciar`
        );
      }

      const db = getConnection();

      const product = await menuService.getProduct(id);

      const user = userService.findUser(from);

      cartService.addProduct(user, product, count);

      return client.sendText(from, `Producto ${id} Agregado Al Carrito`);
    } catch (error) {
      console.log(error);
      return client.sendText(from, "A Ocurrido Un Error");
    }
  }

  async getProducts(client, from) {
    if (!userService.existUser(from)) {
      return client.sendText(
        from,
        `Antes Crea Un Carrito Escribiendo:
carrito iniciar`
      );
    }

    const user = userService.findUser(from) 

    let products = userService.findUser(from).cart.products;

    if (products.length < 1) return client.sendText(from, "El Carrito Esta Vacio");

    products = products.map((product) => ({
      description: product.desc
        ? product.desc
        : menuService.getIngredientsFromProduct(product),
      title:
        (cartService.findProductIndex(product.id, user) + 1) +
        " - " +
        product.name +
        " $" +
        product.price +
        " Cantidad: " +
        product.count,
    }));

    const menu = [
      {
        title: "Carrito",
        rows: products,
      },
    ];

    client
      .sendListMenu(
        from,
        "Carrito",
        "subTitle",
        "Productos Del Carrito",
        "Productos",
        menu
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  async deleteCart(client, from) {
    if (userService.existUser(from)) {
      await userService.deleteUser(from);
    }

    return client.sendText(from, "Carrito Eliminado");
  }

  async deleteProduct(client, from, id) {
    const user = userService.findUser(from);

    cartService.deleteProduct(user, id);

    return client.sendText(from, `Producto ${id} Eliminado Del Carrito`);
  }
}

export default new CartController();
