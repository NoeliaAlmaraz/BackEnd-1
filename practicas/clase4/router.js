import productsManager from "./data/ProductsManager.js";
import usersManager from "./data/UsersManager.js";

async function router(requerimientos, respuesta) {
  const url = requerimientos.url;
  const opts = { "Content-Type": "text/plain" };

  switch (url) {
    case "/":
      //a la respuesta
      respuesta
        //le estoy configurando los encazamientos con el codigo de estado y las opciones de configuracion de la solicitud
        .writeHead(200, opts)
        //y el envio de la data solicitada (que es en este caso es la "landing" de mi servidor)
        .end("CODE API CONNECTED");
      break;

    case "/api/products":
      try {
        const products = await productsManager.readAll();
        respuesta
          .writeHead(200, opts)
          // convertimos el array de productos a JSON
          .end(JSON.stringify(products));
      } catch (error) {
        // Verificamos si ya se enviaron los encabezados
        if (!respuesta.headersSent) {
          respuesta.writeHead(404, opts).end("No se encontraron productos");
        }
      }
      break;
      case "/api/users":
        try {
          const users = await usersManager.readAll();
          respuesta
            .writeHead(200, opts)
            // convertimos el array de productos a JSON
            .end(JSON.stringify(users));
        } catch (error) {
          // Verificamos si ya se enviaron los encabezados
          if (!respuesta.headersSent) {
            respuesta.writeHead(404, opts).end("No se encontraron usuarios");
          }
        }
        break;

    default:
      if (!respuesta.headersSent) {
        // Aseguramos que no se hayan enviado encabezados antes de responder
        respuesta.writeHead(404, opts).end("endpoint not found");
      }
      break;
  }
}

export default router;
