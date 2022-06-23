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
      description: product.desc,
      title: product.id + " - " + product.name + " $" + products.price,
    }));

    return products;
  }

  async getProduct(id) {
    let {
      data: { product },
    } = await api({
      method: "GET",
      url: "/product/get/" + id,
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
}

export default new MenuService();
