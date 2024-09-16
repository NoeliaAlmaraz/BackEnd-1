import fs from "fs";

const path1 = "./clase5/files/products.json";

//para virificar si el archivo existe, aunque estemos en asincrono, se utiliza el mismo metodo existsSync

const exists1 = fs.existsSync(path1);
// Definimos el nuevo producto a agregar
const newData = {
  name: "Producto 1",
  price: 100,
  stock: 1000,
  photo: "photo.png",
};
const initialData = [newData];

if (!exists1) {
    // Si el archivo no existe, crea el archivo y escribe el array inicial con el nuevo producto
  fs.writeFile(path1, JSON.stringify(initialData, null, 2), (error) => {
    // Maneja el resultado de la operación de escritura
    if (error) {
      console.log(error);
    } else {
      console.log("Archivo creado exitosamente.");
    }
  });
} else {
  // Si el archivo existe, lee el contenido del archivo JSON
  fs.readFile(path1, "utf8", (error, content) => {
    // Maneja el resultado de la operación de lectura
    if (error) {
      console.log("Error al leer el archivo:", error);
    } else {
      console.log("Contenido del archivo:", content);
      // Convierte el contenido del archivo JSON (cadena) en un array de JavaScript
      const parseData = JSON.parse(content);
      // Añade el nuevo producto al array leído del archivo
      parseData.push(newData);

      // Convierte el array actualizado a una cadena JSON con una indentación de 2 espacios
      const stringData = JSON.stringify(parseData, null, 2);
      // Escribe el array actualizado de nuevo en el archivo JSON
      fs.writeFile(path1, stringData, (error) => {
        if (error) {
          console.log("Error al escribir en el archivo:", error);
        } else {
          console.log("Producto añadido exitosamente.");
        }
      });
    }
  });
}
