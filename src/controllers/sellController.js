import sellService from "../services/sellService.js";
import userService from "../services/userService.js";
import cartService from "../services/cartService.js";

class SellController {

    async sendSell(client, msg) {
        try {
            const user = userService.findUser(msg.from)
            const cart = user.cart;

            let sell = {
                total: cart.totalPrice,
                products: cart.products,
                phone: sellService.formatPhone(msg.from),
            }

            const { paymentMethod, address } = sellService.getDataFromMsg(msg.body)

            sell = {
                ...sell,
                note: cart.note,
                paymentMethod,
                address,
            }

            await sellService.sendSell(sell).catch((err) => {
                return client.sendMessage(msg.from, 'Hubo Un Error Al Finalizar La Compra, Intentalo Mas Tarde')
            })

            await cartService.deleteCart(user)

            return client.sendMessage(msg.from, 'Tu Compra Ha Sido Exitosa, Tu Pedido Llegara En La Proxima Hora')
        } catch (e) {
            console.log(e)
            return client.sendMessage(msg.from, 'Hubo Un Error Al Finalizar La Compra, Intentalo Mas Tarde')
        }
    }

}

export default new SellController()