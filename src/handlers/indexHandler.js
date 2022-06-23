import cartHandler from "./cartHandler.js"
import menuHandler from "./menuHandler.js"

export default function indexHandler(msg, client) {
    if (msg.isGroupMsg === false) {
        
        menuHandler(msg, client)
        cartHandler(msg, client)

        // switch(msg.body) {
        //   default:
        //     client.sendText(msg.from, 'Comandos De El Bot:').then((res) => {
        //       console.log('Result: ', res)
        //     }).catch(err => console.error(err))
        // }
      }
}