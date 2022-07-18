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

Para Agregar Una Nota A Tu Carrito:

carrito nota NOTA

NOTA: Escribe algo mas sobre tu pedido, si quieres alguna bola de helado o alguna salsa para tu botana
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

Para mostrar los ingredientes escribe:

menu CATEGORIA

Categorias: Crepas, Waffles
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

    sell(client, msg) {
        return client.sendMessage(msg.from, `
Comandos Para Compras:

Para Finalizar Una Compra Escribe:

finalizar compra METODO-DE-PAGO DIRECCION-DE-ENVIO

Metodos De Pago:
* Efectivo
* Targeta
* Transferencia
`)
    }

}

export default new HelpController