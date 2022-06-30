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

    async calculatePrice(cart) {
        let price = 0

        cart.products.forEach((product) => {
            price += product.price
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

    async deleteProduct(user, product) {
        const db = getConnection()

        const index = userService.getUserIndex(user)

        const cart = user.cart

        const productIndex = cart.products.findIndex((p) => p.id === product.id)

        cart.products = cart.products.filter((p) => p.id !== cart.products[productIndex].id)

        cart.totalPrice = this.calculatePrice(cart)

        db.data.users[index].cart = cart

        await db.write()
    }

    async decreaseProduct(user, product, count) {
        const db = getConnection()

        const index = userService.getUserIndex(user)

        const cart = user.cart

        const productIndex = cart.products.findIndex((p) => p.id === product.id)

        if (cart.products[productIndex].count < count) this.deleteProduct(user, product)

        cart.products[productIndex].count -= count

        cart.totalPrice = this.calculatePrice(cart)

        db.data.users[index].cart = cart

        await db.write()
    }

}

export default new CartService()