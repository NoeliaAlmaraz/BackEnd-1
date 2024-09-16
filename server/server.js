import express from "express";
import productsManager from "./src/data/products.manager.js";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");

  //obliga al servidor a usar la habilidad de urlencoded en express para habilitar
  //  la lectura de datos complejos en la url(parametros y consultas)
  server.use(express.urlencoded({ extended: true }));

  server.listen(port, ready);

  // definir una ruta para leer datos .get
  server.get("/", index);
  server.get("/products", getAllProducts);
  server.get("/products/:title/:price/:stock", create);
  server.get("/products/:pid", getOneProduct);
} catch (error) {
  console.log(error);
}

function index(req, res) {
  try {
    return res.status(200).json({ mensaje: "Hola" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

async function getAllProducts(req, res) {
  try {
    //con esto condicionamos si existe la categoria, en ese caso se devuelve solo los productos con esa categoria
    let { category } = req.query;
    let products;
    if (category) {
      products = await productsManager.readAll(category);
    } else {
      products = await productsManager.readAll();
    }
    if (products.length > 0) {
      return res
        .status(200)
        .json({ mensaje: "Productos operativos", products });
    } else {
      return res
        .status(404)
        .json({ mensaje: "No hay productos con esa categoría" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

//esto no está bien ya que no se suele crear un producto por la url, esto se utiliza para leer y traer datos para consultas
async function create(req, res) {
  try {
    const { title, price, stock } = req.params;
    //en este caso es let porque si no existe, modificamos la variable
    let { category, supplier } = req.query;
    //se condiciona para que si no existe, se cree pero con el valor none ya que es un valor opcional por query
    if (!category) {
      category = "none";
    }
    if (!supplier) {
      supplier = "none";
    }
    const response = await productsManager.create({
      title,
      price,
      stock,
      category,
      supplier,
    });
    return res.status(201).json({ mensaje: "Producto creado", response });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

async function getOneProduct(req, res) {
  try {
    const { pid } = req.params;
    const product = await productsManager.read(pid);
    if (product) {
      return res.status(200).json({ mensaje: "Producto operativo", product });
    } else {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

// para crear .post
//server.post()

// para actualizar .put
//server.put()

// para borrar .delete
//server.delete()
