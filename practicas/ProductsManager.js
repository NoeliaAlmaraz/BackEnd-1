 class ProductsManager {
    static #all = [];
    static #id = 0;

    constructor() {};
    create(data) {
        data.id = ProductsManager.#id;
        ProductsManager.#id++;
        ProductsManager.#all.push(data);
    }

    readAll() {
        return ProductsManager.#all;
    }

    readByName(text) {
        return ProductsManager.#all.find(each => each.name.toLowerCase().includes(text.toLowerCase()));

}
}
const productsManager = new ProductsManager();

productsManager.create({

    name: 'iPhone',
    price: 1000,
    stock: 10
});

productsManager.create({

    name: 'Macbook',
    price: 500,
    stock: 5
});



productsManager.create({

    name: 'Mouse',
    price: 10,
    stock: 5
});


const allProducts = productsManager.readAll();

console.log(allProducts);

//console.log(productsManager.readByName('iPhone'));
//console.log(productsManager.readByName('a'));


