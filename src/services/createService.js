class CreateService {
  calculatrePrice(ingredients) {
    let price = 0;

    switch (ingredients.length) {
      case 1:
        price = 45;
        break;
      case 2:
        price = 55;
        break;
      case 3:
        price = 65;
        break;
      case 4:
        price = 75;
        break;
    }

    ingredients.forEach((ingredient) => {
      if (ingredient.extraPrice > 0) {
        price += ingredient.extraPrice;
      }
    });

    return price;
  }

  generateID(ingredients, type) {
    let id = "";

    switch (type) {
      case "CREPA":
        id += "c-";
        break;
      case "WAFFLE":
        id += "w-";
        break;
    }

    ingredients.sort((a, b) => {
        return a.id - b.id;
    })

    ingredients.forEach((ingredient) => {
        id += ingredient.id
    });

    return id
  }
}

export default new CreateService();
