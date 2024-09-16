import crypto from 'crypto';

class UsersManager {
    static #all = [
        {

            name: 'Juan',
            lastname: 'Perez',
            email: 'juanperez@gmail.com',
            password: '12345678',
            role: 'admin',
            id: crypto.randomBytes(12).toString('hex'),
        },
        {

            name: 'Maria',
            lastname: 'Perez',
            email: 'mariaperez@gmail.com',
            password: '12345678',
            role: 'user',
            id: crypto.randomBytes(12).toString('hex'),
        }
    ]

    // Método de creación sin necesidad de promesa manual
    create(data) {
        try {
            // el id va a ser hexadecimal para que sea compatible con mongodb que los autogenera y para ello vamos a usar crypto
            data.id = crypto.randomBytes(12).toString('hex');
            UsersManager.#all.push(data);

            console.log('EXITO AL CREAR: ID-' + data.id);
            return Promise.resolve(data); // Resolviendo la promesa
        } catch (error) {
            return Promise.reject(error); // Enviando error si ocurre
        }
    }

    readAll() {
        if (UsersManager.#all.length > 0) {
            return Promise.resolve(UsersManager.#all);
        } else {
            return Promise.reject('ERROR AL LEER TODOS');
        }
    }
}

// Función de prueba para verificar el comportamiento
async function test() {
    try {
        const manager = new UsersManager();

        // Leer antes de crear (debería fallar)
        await manager.readAll(); // Esto lanzará un error porque no hay productos

        // Crear productos (ahora usando await)
        await manager.create({
            name: 'Luis',
            lastname: 'Gomez',
            email: 'luisgomez@gmail.com',
            password: 'asdfghjjk',
            role: 'user'
        });

        await manager.create({
            name: 'Ana',
            lastname: 'Tellez',
            email: 'anatellez@gmail.com',
            password: 'hsdgavcfkjsd',
            role: 'user'
        });

        // Leer todos los productos después de crearlos
        const productos = await manager.readAll();
        console.log('Todos los productos:', productos);
    } catch (error) {
        console.log('Error:', error);
    }
}

test();

const usersManager = new UsersManager();
export default usersManager;