class HelpController {

    cart(client, msg) {
        return client.sendMessage(
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
        return client.sendMessage(msg.from,       
            `
Comandos Del Menu:

Para mostrar los menus escribe:

menu CATEGORIA

Categorias: Crepas, Waffles, Bebidas, Botana, Salsas
            `
            )
    }

    create(client, msg) {
        return client.sendMessage(msg.from,
`
Comandos Para Crear Productos:

Para Crear Una Crepa:

crear Crepa CANTIDAD INGREDIENTES

Para Crear Un Lollywaffle:

crear Waffle CANTIDAD INGREDIENTES

Los Ingredientes Deben Ser Ingresados separados por un espacio (ingresar solo el numero de ingrediente).

La Cantidad Se Refiere A La Cantidad De Productos Que Desee Agregar Al Carrito
`
)
    }

}

export default new HelpController