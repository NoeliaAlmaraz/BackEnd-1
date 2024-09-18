function isValidData(req, res, next) {
  try {
    //desectructuramos data para tener los parametros que crean el producto
    const { title, price, stock, category, supplier } = req.body;
    //verificamos que no exista ningun parametro
    if (!title || !price || !stock || !category || !supplier) {
      const error = new Error("Faltan parametros requeridos");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default isValidData;
