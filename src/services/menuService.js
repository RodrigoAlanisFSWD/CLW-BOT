import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

class MenuService {
  async getProducts(type) {
    let {
      data: { products },
    } = await api({
      method: "GET",
      url: "/products/all/" + type,
    });

    products = products.map((product) => ({
      description: product.desc.length > 1 ? product.desc : this.getIngredientsFromProduct(product),
      title: product.id + " - " + product.name + " $" + product.price,
    }));

    return products;
  }

  async getProduct(id) {
    let {
      data: { product },
    } = await api({
      method: "GET",
      url: "/products/get/" + id,
    });

    return product;
  }

  async getIngredients(type) {
    let {
      data: { ingredients },
    } = await api({
      method: "GET",
      url: "/ingredients/all/" + type,
    });

    ingredients = ingredients.map((ingredient) => ({
      description: ingredient.desc,
      title:
        ingredient.id +
        " - " +
        ingredient.name +
        (ingredient.extraPrice != 0 ? ` $${ingredient.extraPrice}` : ""),
    }));

    return ingredients;
  }

  getIngredientsFromProduct(product) {
    return product.ingredients.reduce((acc, cur) => acc += cur.name + " ", "")
  }

  async getGivenIngredients(ids) {
    try {
        const { data: { ingredients } } = await api({
          url: "/ingredients/get-many",
          method: "POST",
          data: {
            ids,
          }
        })

        console.log(ingredients)

        return ingredients
    } catch (error) {
        return new Error("Error In GETTING DATA")
    }
}
}

export default new MenuService();
