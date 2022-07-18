import sellController from "../controllers/sellController.js";
import helpController from "../controllers/helpController.js";

export default function sellHandler(msg, client) {
    switch (true) {
        case /finalizar compra \w+ [\w ]+/g.test(msg.body.trim()):
            return sellController.sendSell(client, msg)
        default:
            return helpController.sell(client, msg)
    }
}