import productsManager from "../data/managers/products.manager.js";

async function readAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let products;
    if (category) {
      products = await productsManager.readAllProducts(category);
    } else {
      products = await productsManager.readAllProducts();
    }

    if (products.legth > 0) {
      return res
        .status(200)
        .json({ message: "Operational products", products });
    } else {
      return res
        .status(404)
        .json({ message: "There are no products with that category" });
    }
  } catch (error) {
    return next(error);
  }
}

async function readOneProducts(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOneProducts(pid);
    if (product) {
      return res.status(200).json({ message: "Product found", product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return next(error);
  }
}

async function createProducts(req, res, next) {
  try {
    const products = req.body;
    const responseManager = await productsManager.createProducts(products);
    return res
      .status(201)
      .json({ message: "Product created", responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateProducts(req, res, next) {
  try {
    const { pid } = req.params;
    const upProducts = req.body;
    const responseManager = await productsManager.updateProducts(
      pid,
      upProducts
    );
    if (!responseManager) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Updated product", responseManager });
  } catch (error) {
    return next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.deleteProduct(pid);
    return res
      .status(200)
      .json({ message: "Removed product", responseManager });
  } catch (error) {
    return next(error);
  }
}

export {
  readAllProducts,
  readOneProducts,
  createProducts,
  updateProducts,
  destroyProduct,
};
