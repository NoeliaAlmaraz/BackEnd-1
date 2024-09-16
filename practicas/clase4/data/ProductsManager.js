import crypto from "crypto";

class ProductsManager {
  static #all = [
    {

      category: "shoes",
      title: "ladystork",
      price: 100,
      stock: 1000,
      photo: "photo.png",
      id: crypto.randomBytes(12).toString("hex"),
    },
    {
      
      category: "shoes",
      title: "mentarget",
      price: 150,
      stock: 1502,
      photo: "photo.png",
      id: crypto.randomBytes(12).toString("hex"),
    },
  ];

  // Método de creación sin necesidad de promesa manual
  create(data) {
    try {
      // el id va a ser hexadecimal para que sea compatible con mongodb que los autogenera y para ello vamos a usar crypto
      data.id = crypto.randomBytes(12).toString("hex");
      ProductsManager.#all.push(data);

      console.log("EXITO AL CREAR: ID-" + data.id);
      return Promise.resolve(data); // Resolviendo la promesa
    } catch (error) {
      return Promise.reject(error); // Enviando error si ocurre
    }
  }

  // Método para leer todos los productos
  readAll() {
    if (ProductsManager.#all.length > 0) {
      return Promise.resolve(ProductsManager.#all);
    } else {
      return Promise.reject("ERROR AL LEER TODOS");
    }
  }
}

// Función de prueba para verificar el comportamiento
async function test() {
  try {
    const manager = new ProductsManager();

    // Leer antes de crear (debería fallar)
    await manager.readAll(); // Esto lanzará un error porque no hay productos

    // Crear productos (ahora usando await)
    await manager.create({
      category: "shoes",
      title: "ladystork",
      price: 100,
      stock: 1000,
      photo: "photo.png",
    });

    await manager.create({
      category: "shoes",
      title: "nike",
      price: 120,
      stock: 500,
      photo: "photo2.jpg",
    });

    // Leer todos los productos después de crearlos
    const productos = await manager.readAll();
    console.log("Todos los productos:", productos);
  } catch (error) {
    console.log("Error:", error);
  }
}

test();

const productsManager = new ProductsManager();
export default productsManager;
