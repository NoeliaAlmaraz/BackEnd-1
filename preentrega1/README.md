# Crear un servidor con Node.js y express

## Descripción
En este proyecto se creará un servidor con Node.js y express para gestionar los datos de un producto y usuarios de un ecommerce.

### Funcionalidades
- Conexión a una **base de datos**
- Creación de **productos**
- Creación de **usuarios**
- Lectura de **productos**
- Lectura de **usuarios**
- Actualización de **productos**
- Actualización de **usuarios**
- Borrado de **productos**
- Borrado de **usuarios**

### Instalación
1. Clona el repositorio
   ```bash
   git clone https://github.com/usuario/proyecto.git

2. Creamos la estructura de carpetas 
   # Estructura de Carpetas

        ```bash
        preentrega1/
        │
        ├── server.js
        ├── README.md
        └── src/
            ├── controllers/
            ├── data/
            │   ├── files/
            │   └── managers/
            ├── middlewares/
            ├── routers/
            │   ├── api/
            │   └── views/
            └── utils/

3. Iniciamos **node** con el comando **npm init -y** para que se cree el archivo **package.json**
4. Modificamos el archivo **package.json** 
    - Agregamos la propiedad **type** con el valor **module**
    - Agregamos la propiedad **main** con el valor **server.js**
    - Agregamos las propiedades **scripts** con los valores **start** con  *node server.js* y **dev** con *nodemos server.js*

5. Instalamos la dependencia **express** con el comando **npm install express**
6. Instalamos la dependencia **nodemon** con el comando **npm install -D nodemon** (-D para se instala como dependencia de desarrollo)
7. Agregamos el gitignore y añadimos la carpeta **node_modules** al .gitignore

## Iniciar el servidor
1. Configuramos el servidor con el archivo **server.js**
2. Importamos las dependencias necesarias
3. Configuramos el servidor
4. Iniciamos el servidor en la consola con el comando **npm run dev**



   