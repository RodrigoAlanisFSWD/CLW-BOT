class HelpController {

    cart(client, msg) {
        return client.sendText(
    msg.from,
`
Comandos Del Carrito:

Para Crear Un Carrito:

carrito iniciar

Para Agregar Un Producto:

carrito agregar NUMERO CANTIDAD

Para Eliminar Un Producto:

carrito eliminar NUMERO

Para Eliminar El Carrito:

carrito borrar

El numero se refiere a el numero antes de el nombre de el producto, para mas sobre el menu escribe: ayuda menu
`
  );
    }

    menu(client, msg) {
        return client.sendText(msg.from,       
            `
Comandos Del Menu:

Para mostrar los menus escribe:

menu CATEGORIA

Categorias: Crepas, Waffles, Bebidas, Botana, Salsas
            `
            )
    }

}

export default new HelpController