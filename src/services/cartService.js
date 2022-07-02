import { getConnection } from "../db.js"
import userService from "./userService.js"

class CartService {

    async createUserCart(user) {
        const db = getConnection()

        const index = userService.getUserIndex(user)
        
        db.data.users[index].cart = {
            products: [],
            totalPrice: 0,
        }

        await db.write()
    }

    async addProduct(user, product, count) {
        const db = getConnection()

        const index = userService.getUserIndex(user)

        const cart = user.cart

        const productIndex = cart.products.findIndex((p) => p.id === product.id)

        console.log(product)

        if (productIndex != -1) {
            cart.products[productIndex].count = parseInt(cart.products[productIndex].count) + count
        } else {
            cart.products.push({
                ...product,
                count: parseInt(count)
            })
        }


        cart.totalPrice = this.calculatePrice(cart)

        db.data.users[index].cart = cart

        await db.write()
    }

    calculatePrice(cart) {
        let price = 0

        cart.products.forEach((product) => {
            price += product.price * product.count
        })

        return price
    }

    async deleteCart(user) {
        const db = getConnection()

        const index = userService.getUserIndex(user)

        db.data.users[index].cart = {
            products: [],
            totalPrice: 0,
        }

        await db.write()
    }

    async deleteProduct(user, index) {
        const db = getConnection()

        const userIndex = userService.getUserIndex(user)

        const cart = user.cart

        const id = cart.products[index - 1].id

        cart.products = cart.products.filter((p) => p.id !== id)

        cart.totalPrice = this.calculatePrice(cart)

        db.data.users[userIndex].cart = cart

        await db.write()
    }

    findProductIndex(id, user) {
        const cart = user.cart

        return cart.products.findIndex((p) => p.id === id)
    }

}

export default new CartService()