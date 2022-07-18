import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/sells/",
});

class SellService {

    async sendSell(sell) {
        try {
            await api({
                method: "POST",
                data: sell,
            })
        } catch (e) {
            console.error(e)
            return e
        }
    }

    getDataFromMsg(body) {
        const array = body.split(" ")

        const paymentMethod = array[3]
        const address = array.slice(4).join(" ")

        return { paymentMethod, address }
    }

    formatPhone(from) {
        const country = from.charAt(0) + from.charAt(1)

        const area = '55'

        const number = from.split('55')[1].split('@')[0]

        return `+${country} ${area} ${number}`
    }

}

export default new SellService()