import fs from "fs";
import crypto from 'crypto';
import path from "path";

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

  async read() {
    try {
      const data = await fs.promises.readFile(this.path, "utf8");
      const parseData = JSON.parse(data);
      console.log(parseData);
      return parseData;
    } catch (error) {
      console.log("Error al leer el archivo:", error);
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.read();
      all.push(data);
      await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
      return data.id;
    } catch (error) {
      console.log(error);
    }
  }
}

const productsManager = new ProductsManager("./files/products.json");
// manager.read();

export default productsManager;
