import productsManager from "../managers/products.manager.js";

async function router(req, res) {
  const url = req.url;
  const opts = { "Content-Type": "text/plain" };

  switch (url) {
    case "/":
      //a la respuesta
      res
        //le estoy configurando los encazamientos con el codigo de estado y las opciones de configuracion de la solicitud
        .writeHead(200, opts)
        //y el envio de la data solicitada (que es en este caso es la "landing" de mi servidor)
        .end("CODE API CONNECTED");
      break;
    case "/products":
      const products = await productsManager.read();
      res.writeHead(200, opts).end(JSON.stringify(products));
      break;
    case "/products/create":
      const one = {
        title: "Producto 1",
        price: 100,
        stock: 1000,
        photo: "photo.png",
      };
      const id = await productsManager.create(one);
      return res.writeHead(200, opts).end(JSON.stringify(id));

    default:
      res.writeHead(404, opts).end("endpoint not found");

      break;
  }
}

export default router;
