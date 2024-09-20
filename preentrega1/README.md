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

## Creación de los **Managers**
(Se centra en la lógica de negocio y gestión de datos.)

1. En el directorio **src/data/managers** creamos los managers necesarios para la base de datos
2. Se instancía la clase **ProductManager** y **userManager** con su constructor. y definiendo la ruta de guardado.
3. Después del método exists() para comprobar que hay archivo donde poder almacenar los datos, se crea el archivo si no existe.
4. Se crean los métodos **create**, **read**,**readAll**, **update** y **delete** para cada modelo.
5. Por último se exportan los managers para que puedan ser usados en otros archivos.

## Creación de los **controllers**
(Maneja las peticiones HTTP y delega la lógica de negocio a los managers o servicios.)

1. En el directorio **src/controllers** creamos los controllers necesarios para la base de datos.
2. Se crea cada función para controlar los métodos de los managers y los requerimientos necesarios para completarlas.
3. Se gestionan los estados de exito y errores con errorHandler para las peticiones de usuario
4. Se exportan las funciones.

## ErrorHandler

Es el middleware que controla los errores. 
Es el único middleware de express que depende de 4 parámetros: el error que está ocurriendo, el objeto de requerimientos, el objeto de respuesta a enviar al cliente y la función next para dejar pasar.
Como sabemos que el error sucedió, le enviamos al cliente la respuesta correspondiente. En este caso se envía un json con un mensaje que tiene el método, el endpoint y el mensaje de error.






   