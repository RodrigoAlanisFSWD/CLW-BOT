import { getConnection } from "../db.js"
import userService from "../services/userService.js"
import cartService from "../services/cartService.js"
import menuService from "../services/menuService.js"

class CartController {

    async createUserCart(client, from) {
        const db = getConnection()

        if (userService.existUser(from)) {
            await userService.deleteUser(from)
        }

        await userService.createUser(from)

        const user = userService.findUser(from)

        await cartService.createUserCart(user)

        return client.sendText(from, "Carrito Creado")
    }

    async addProduct(client, from, id, count) {
        if (!userService.existUser(from)) {
            return client.sendText(from, `Antes Crea Un Carrito Escribiendo:
carrito iniciar`)
        }

        const db = getConnection()

        const product = menuService.getProduct(id)

        cartService.addProduct(user, product, count)

        return client.sendText(from, "Producto ${id} Agregado Al Carrito")
    }

    async getProducts() {
        
    }

    async deleteCart() {
        
    }

    async deleteProduct() {
        
    }

}

export default new CartController()