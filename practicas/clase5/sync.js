

import fs from 'fs';

// Defino la ruta del archivo que se va a crear
const path1 = "./clase5/files/products.json";
const path2 = "./clase5/files/users.json";

// Guardo en la variable exists si el archivo existe en boolean
const exists1 = fs.existsSync(path1);
const exists2 = fs.existsSync(path2);

// Compruebo si el archivo NO existe y si no lo creo

const data = JSON.stringify([]); // Crear un array vacío y convertirlo a JSON

if (!exists1) {
    fs.writeFileSync(path1, data); // Escribir el archivo JSON
}

if (!exists2) {
    fs.writeFileSync(path2, data); // Escribir el archivo JSON
}
// Leer el archivo JSON
const dataProducts = JSON.parse(fs.readFileSync(path1, "utf8"));
//creo el producto
const product1 = {
    name: "Producto 1",
    price: 100,
    stock: 1000,
    photo: "photo.png",
};
//guardo el producto en el array
dataProducts.push(product1);
//escribo o sobreescribo el archivo cargando el nuevo objeto 
//los dos parametros de mas en el stringify: el primero es un filtro y el segundo es el formato(orden)(cuanto mas alto el numero, mas indentacion )
fs.writeFileSync(path1, JSON.stringify(dataProducts, null ,1));
console.log(dataProducts);

//para borrar el archivo primero compruebo si existe 
//if (exists1) {
//    fs.unlinkSync(path1);
//}


// Leer el archivo JSON
const dataUsers = JSON.parse(fs.readFileSync(path2, "utf8")); 
console.log(dataUsers);