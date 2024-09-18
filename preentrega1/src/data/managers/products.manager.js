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
      console.log("The file already exists.");
    }
  }

  async createProducts(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const allProducts = await this.readAll();
      allProducts.push(data);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(allProducts, null, 2)
      );
      return data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async readAllProducts(category) {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      const parseProducts = JSON.parse(products);
      if (category) {
        const fiteredProducts = parseProducts.filter(
          (product) => product.category === category
        );
        return fiteredProducts;
      } else {
        return parseProducts;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async readOneProducts(id) {
    try {
      const allProducts = await this.readAll();
      const oneProduct = allProducts.find((product) => product.id === id);
      return oneProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProducts(id, updatedData) {
    try {
      const allProducts = await this.readAll();
      const index = allProducts.findIndex((product) => product.id === id);
      if (index < 0) {
        return null;
      }
      allProducts[index] = { ...allProducts[index], ...updatedData };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(allProducts, null, 2)
      );
      return allProducts[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const allProducts = await this.readAll();
      const filteredProducts = allProducts.filter(
        (product) => product.id !== id
      );
      if (allProducts.length === filteredProducts.length) {
        return null;
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filteredProducts, null, 2)
      );
      console.log(`Producto con id ${id} eliminado.`);
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const productsManager = new ProductsManager("./src/data/files/products.json");

export default productsManager;
