// importamos http

import { createServer } from "http";
import router from "./router.js";

//con el metodo de crearteServer se crea el servidor
const server = createServer(router);

//definimos en que puertode mi ordenador o ip va a funcionar el servidor(en este caso estamos en local por eso el puerto)
const port = 8080;

//definir callback (es una funcion que se pasa como argumento de otra funcion) que se va a ejecutar cuando se inicia el servidor
const ready = () => console.log("server ready on port: " + port);

// inicio/levantar el servidor
server.listen(port, ready);
//escucho el puerto de la variable port para levantar el servidor y luego ejecuto la callback que meva a informar en la consola quie elk servidor está funcionando
