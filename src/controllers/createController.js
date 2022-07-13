import cartService from "../services/cartService.js";
import createService from "../services/createService.js";
import menuService from "../services/menuService.js"
import userService from "../services/userService.js";
import wsb from "whatsapp-web.js";

const { List } = wsb

class CreateController {

    async create(client, msg, ids, type, count) {

        try {
            let product = {
                id: '',
                ingredients: [],
                name: '',
                desc: '',
                type: type,
                price: 0,
            }
    
            const ingredients = await menuService.getGivenIngredients(ids);
    
            const id = createService.generateID(ingredients, type);
    
            const price = createService.calculatrePrice(ingredients);
    
            product = {
                ...product,
                id,
                price,
                ingredients,
            }
    
            switch(type) {
                case 'CREPA':
                    product.name = `Crepa ${ingredients.length} ${ingredients.length > 1 ? 'Ingredientes' : 'Ingrediente'}`
                break;
    
                case 'WAFFLE':
                    product.name = `Lollywaffle ${ingredients.length} ${ingredients.length > 1 ? 'Ingredientes' : 'Ingrediente'}`
                break;
            }
    
            const user = await userService.findUser(msg.from)
    
            await cartService.addProduct(user, product, count)
    
            return msg.reply('Producto Agregado Al Carrito') 
        } catch (error) {
            console.log(error)
            return msg.reply('A Ocurrido Un Error')  
        }
    }

}

export default new CreateController()