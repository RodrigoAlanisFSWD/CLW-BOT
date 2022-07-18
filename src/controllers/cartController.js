import { getConnection } from "../db.js";
import userService from "../services/userService.js";
import cartService from "../services/cartService.js";
import menuService from "../services/menuService.js";
import wsb from "whatsapp-web.js";

const { List } = wsb

class CartController {
  async createUserCart(client, msg) {
    const db = getConnection();

    if (userService.existUser(msg.from)) {
      await userService.deleteUser(msg.from);
    }

    await userService.createUser(msg.from);

    const user = userService.findUser(msg.from);

    await cartService.createUserCart(user);

    return client.sendMessage(msg.from, "Carrito Creado");
  }

  async addProduct(client, msg, id, count) {
    try {
      if (!userService.existUser(msg.from)) {
        return client.sendMessage(
          from,
          `Antes Crea Un Carrito Escribiendo:
    carrito iniciar`
        );
      }

      const product = await menuService.getProduct(id);

      const user = userService.findUser(msg.from);

      cartService.addProduct(user, product, count);

      return client.sendMessage(msg.from, `Producto ${id} Agregado Al Carrito`);
    } catch (error) {
      console.log(error);
      return client.sendMessage(msg.from, "A Ocurrido Un Error");
    }
  }

  async getProducts(client, msg) {
    if (!userService.existUser(msg.from)) {
      return client.sendMessage(
        from,
        `Antes Crea Un Carrito Escribiendo:
carrito iniciar`
      );
    }

    const user = userService.findUser(msg.from) 

    let products = userService.findUser(msg.from).cart.products;

    if (products.length < 1) return client.sendMessage(msg.from, "El Carrito Esta Vacio");

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

    const list = new List('Carrito', 'Productos En El Carrito', menu, '', '')

    msg.reply(list)
  }

  async deleteCart(client, msg) {
    if (userService.existUser(msg.from)) {
      await userService.deleteUser(msg.from);
    }

    return client.sendMessage(msg.from, "Carrito Eliminado");
  }

  async deleteProduct(client, msg, id) {
    const user = userService.findUser(msg.from);

    cartService.deleteProduct(user, id);

    return client.sendMessage(msg.from, `Producto ${id} Eliminado Del Carrito`);
  }

  async addNote(client, msg, note) {
    const db = getConnection()

    const user = userService.findUser(msg.from)
    const userIndex = userService.getUserIndex(user)

    db.data.users[userIndex].cart.note = note;

    await db.write()

    return client.sendMessage(msg.from, 'Nota Agregada Al Carrito')
  }
}

export default new CartController();
