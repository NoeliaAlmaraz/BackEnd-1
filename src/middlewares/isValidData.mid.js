



function validProducts(req, res, next) {
  try {
    const { title } = req.body;
    let { price, stock, category, photo,author } = req.body;

    if (!title) {
      const error = new Error("the title parameter is mandatory");
      error.statusCode = 400;
      throw error;
    }

    price = price !== undefined  ? price : 1;
    stock = stock !==  undefined  ? stock : 1;
    category = category !== undefined  ? category : "general";
    photo = photo !== undefined  ? photo : "/public/assets/photo.jpg";
    author = author !== undefined  ? author : "";

    req.body = { ...req.body, price, stock, category, photo, author };

    return next();
  } catch (error) {
    return res.render('dashboard',{error})
    
  }
}





function validUsers(req, res, next) {
  // Solo validar si es una solicitud POST
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      let { photo, role, phone } = req.body;

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

      
      role = role !== undefined ? role : "user";
      photo = photo !== "" ? photo : "https://cdn-icons-png.flaticon.com/512/219/219969.png";
      phone = phone !== "" ? phone : "Not phone";
      req.body = { ...req.body, photo, role, phone };


      return next();
    } catch (error) {
      return next(error); 
    }
  } else {
    return next();
  }
}


function validateUserData(usersdata) {
  const { email, password } = usersdata;
  let { photo, role } = usersdata;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    throw new Error("the email and password parameters are mandatory");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Asignar valores por defecto
  role = role !==  undefined  ? role : "user";
  photo = photo !== ""  ? photo : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";

  return { ...usersdata, photo, role }; 
}






export default { validProducts, validUsers,validateUserData

 };


