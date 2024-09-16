import productsManager from "../data/products.manager.js";

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
async function createGet(req, res) {
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

//esta si es la forma adecuada para crear un producto
async function create(req, res) {
  try {
    //guardo el objeto que envia el front con los datosd que se necesita crear
    const data = req.body;
    const responseManager = await productsManager.create(data);
    return res
      .status(201)
      .json({ mensaje: "Producto creado", responseManager });
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

async function update(req, res) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const responseManager = await productsManager.update(pid, newData);
    if (!responseManager) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    return res
      .status(200)
      .json({ mensaje: "Producto actualizado", responseManager });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

async function destroyProduct(req, res) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.delete(pid);
    return res
      .status(200)
      .json({ mensaje: "Producto eliminado", responseManager });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

export {
  getAllProducts,
  create,
  getOneProduct,
  update,
  destroyProduct,
};
