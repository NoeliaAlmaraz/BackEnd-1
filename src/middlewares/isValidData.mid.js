function validProducts(req, res, next) {
  try {
    const { title } = req.body;
    let { price, stock, category, photo } = req.body;

    if (!title) {
      const error = new Error("the title parameter is mandatory");
      error.statusCode = 400;
      throw error;
    }

    price = price !== undefined ? price : 1;
    stock = stock !== undefined ? stock : 1;
    category = category !== undefined ? category : "general";
    photo = photo !== undefined ? photo : "no-photo.jpg";

    req.body = { ...req.body, price, stock, category, photo };

    return next();
  } catch (error) {
    return next(error);
  }
}

function validUsers(req, res, next) {
  try {
    const { email, password } = req.body;
    let { photo, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      const error = new Error(
        "the email and password parameters are mandatory"
      );
      error.statusCode = 400;
      throw error;
    }
    if (!emailRegex.test(email)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      throw error;
    }

    role = role !== undefined ? role : 0;
    photo = photo !== undefined ? photo : "no-photo.jpg";
    req.body = { ...req.body, photo, role };

    return next();
  } catch (error) {
    return next(error);
  }
}

export default { validProducts, validUsers };
