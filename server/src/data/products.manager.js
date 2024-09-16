import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  exists() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    } else {
      console.log("El archivo ya existe.");
    }
  }

  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      //console.log(parseData);
      //con esto hacemos el filtro por categoria para leer solo los productos con esa categoria
      //tambien condicionamos si no existe la categoria, en ese caso se devuelve todos los productos
      //hay que cambiar en el products.manager tambien la funcion de readAll
      if(category){
        const fiteredData = parseData.filter((product) => product.category === category);
        return fiteredData;
      } else {
        return parseData;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async read(id) {
    try {
      const all = await this.readAll();
      const one = all.find((each) => each.id === id);
      //console.log(one);
      return one;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.readAll();
      all.push(data);
      await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
      return data.id;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para actualizar un producto por su id
  async update(id, updatedData) {
    try {
      const all = await this.read();
      const index = all.findIndex((product) => product.id === id);

      if (index === -1) {
        throw new Error("Producto no encontrado");
      }

      // Actualizar los campos del producto existente
      all[index] = { ...all[index], ...updatedData };
      await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
      return all[index];
    } catch (error) {
      console.log("Error al actualizar el producto:", error);
    }
  }

  // Método para eliminar un producto por su id
  async delete(id) {
    try {
      const all = await this.read();
      const filteredProducts = all.filter((product) => product.id !== id);

      if (all.length === filteredProducts.length) {
        throw new Error("Producto no encontrado");
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filteredProducts, null, 2)
      );
      console.log(`Producto con id ${id} eliminado.`);
      return id;
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
    }
  }
}

const productsManager = new ProductsManager("./src/data/files/products.json");
// manager.read();

export default productsManager;
