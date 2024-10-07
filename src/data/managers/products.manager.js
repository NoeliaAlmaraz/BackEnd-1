import fs from "fs";
import crypto from "crypto";

class ProductsManager {
    constructor(path){
        this.path = path;
        this.exists;
    }

    exists(){
        const exists = fs.existsSync(this.path);
        if (!exists) {
          fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
          console.log("The file already exists.");
        }
    }

    async create(product){
        try {
            const allProducts = await this.readAllProducts();
            let newId;
            let idExists;
            do {
                newId = crypto.randomBytes(12).toString('hex');
                idExists = allProducts.some(product => product.id === newId);
            } while (idExists);
            product.id = newId;

            allProducts.push(product);
            await fs.writeFileSync(this.path, JSON.stringify(allProducts, null ,2));
            return {product: product, message: "Product created successfully"};
        } catch (error) {
            throw new Error(error);
        }
    }
    async readAllProducts(category) {
        try {
          const products = await fs.promises.readFile(this.path, "utf-8");
          const parseProducts = JSON.parse(products);
          if (category) {
            const fiteredProducts = parseProducts.filter(
              (product) => product.category.toLowerCase() === category.toLowerCase()
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
          const allProducts = await this.readAllProducts();
          const oneProduct = allProducts.find((product) => product.id === id);
          return oneProduct;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

      async updateProducts(id, updatedData) {
        try {
          const allProducts = await this.readAllProducts();
          const index = allProducts.findIndex((product) => product.id === id);
          if (index < 0) {
            return null;
          }
          allProducts[index] = { ...allProducts[index], ...updatedData };
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(allProducts, null, 2)
          );
          return { product: allProducts[index], message: "Product updated successfully" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

      async deleteProduct(id) {
        try {
          const allProducts = await this.readAllProducts();
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
          console.log(`Product ${id} deleted successfully`);
          return {id: id, message: "Product deleted successfully"};
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    


}

const productsManager = new ProductsManager("./src/data/files/products.json");

export default productsManager;