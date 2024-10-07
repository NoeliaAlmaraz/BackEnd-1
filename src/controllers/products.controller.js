import productsManager from "../data/managers/products.manager.js";

async function createProduct(req, res, next) {
  try {
    const product = req.body;
    const responseManager = await productsManager.create(product);
    const readAllProducts = await productsManager.readAllProducts();

    return res.status(201).json({
      successMessage: responseManager.message,
      product: responseManager.product,
      allProducts: readAllProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function readAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let products;
    if (category) {
      products = await productsManager.readAllProducts(category);
    } else {
      products = await productsManager.readAllProducts();
    }

    if (products.length > 0) {
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

    /*
            res.render('dashboard', {
            successMessage: responseManager.message,
            data: responseManager,
             });
        */
    return res.status(201).json({
      successMessage: responseManager.message,
      product: responseManager.product,
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.deleteProduct(pid);

    /*
            res.render('dashboard', {
            successMessage: responseManager.message,
            data: responseManager,
             });
        */
    return res
      .status(200)
      .json({
        successMessage: responseManager.message,
        id: responseManager.id,
      });
  } catch (error) {
    return next(error);
  }
}

async function showProducts(req, res, next) {
  try {
    let { category } = req.query;
    let products;
    if (category) {
      products = await productsManager.readAllProducts(category);
    } else {
      products = await productsManager.readAllProducts();
    }

    if (products.length > 0) {
      return res.render("allproducts", {
        data: products,
      });
    } else {
      return res
        .status(404)
        .json({ message: "There are no products with that category" });
    }
  } catch (error) {
    return next(error);
  }
}

async function showProductsAdmin(req, res, next) {
  try {
    let { category } = req.query;
    let products;
    if (category) {
      products = await productsManager.readAllProducts(category);
    } else {
      products = await productsManager.readAllProducts();
    }

    if (products.length > 0) {
      return res.render("dashboard", { data: products });
    } else {
      return next(new Error("There are no products with that category"));
    }
  } catch (error) {
    return next(error);
  }
}

async function showOneProducts(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOneProducts(pid);
    if (product) {
      return res.render("oneproduct", { data: product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return next(error);
  }
}

async function createProductViews(req, res, next) {
  try {
    const product = req.body;
    const responseManager = await productsManager.create(product);
    const readAllProducts = await productsManager.readAllProducts();

    return res.render("dashboard", {
      successMessage: responseManager.message,
      allProducts: readAllProducts,
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteProductViews(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.deleteProduct(pid);

    return res.status(200).json({ message: responseManager.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



export {
  createProduct,
  readAllProducts,
  readOneProducts,
  updateProducts,
  deleteProduct,
  showProducts,
  showOneProducts,
  showProductsAdmin,
  createProductViews,
  deleteProductViews,
};
