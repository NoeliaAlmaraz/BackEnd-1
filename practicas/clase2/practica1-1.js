//1º Crea un objeto coche con propiedades marca, modelo, y año. Añade un método llamado detalles que imprima en la consola un mensaje con las propiedades del coche.

class Coches {
    constructor() {
        // Define coche como una propiedad de instancia
        this.coche = [];
    }

    // Método para crear un coche
    create(data) {
        this.coche.push(data);
    }

    // Método para obtener los detalles de todos los coches
    detalles() {
        return this.coche;
    }

    addProperty(propiedad, valor) {
        this.coche.forEach(coche => {
            coche[propiedad] = valor;
        });
    }
}

const newCar = new Coches();
newCar.create({marca:"Audi", modelo:"A4", año:2020});

const readCar = newCar.detalles();

console.log("Tarea 1:" + JSON.stringify(readCar));

//2º Modifica el objeto coche del ejercicio anterior para añadir una propiedad color. Luego, cambia el valor de color y vuelve a ejecutar el método detalles.
newCar.addProperty("color", "azul");

console.log("Tarea 2:" + JSON.stringify(readCar));

//3º Crea una clase Animal con un constructor que reciba el nombre y la especie del animal. Añade un método hablar que imprima un mensaje en la consola diciendo el nombre y la especie del animal.
class Animal {

    constructor(nombre, especie) {
        this.nombre = nombre;
        this.especie = especie;
    }

    hablar() {
        console.log("tarea 3:" + this.nombre + " y " + this.especie);
    }
}
const animal = new Animal("Pedro", "Perro");
animal.hablar();

//4º .	Crea un objeto libro que tenga propiedades titulo, autor, y numeroPaginas. Añade un método llamado resumen que imprima un resumen del libro con estas propiedades.

class Libro {
    constructor(titulo, autor, numeroPaginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.numeroPaginas = numeroPaginas;
    }
    resumen() {
        console.log("tarea 4:" + this.titulo + " de " + this.autor + " con " + this.numeroPaginas + " paginas");
    }
}
const libro = new Libro("El libro de la vida", "Juan Perez", 100);
libro.resumen();


//5º

class CuentaBancaria{
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar(cantidad) {
        this.saldo += cantidad;
    }

    sacar(cantidad) {
        if (cantidad > this.saldo) {
            console.log("No puedes sacar esa cantidad");
            return;
        } else {
            this.saldo -= cantidad;
        }

    }

    contenidoTotal() {
        return this.saldo;
    }

}
const cuenta = new CuentaBancaria("Pedro", 1000);
cuenta.depositar(500);
cuenta.sacar(200);
console.log("tarea 5: tu saldo es de " + cuenta.contenidoTotal() + "$");

//6º Crea un objeto calculadora con métodos sumar, restar, multiplicar, y dividir. Cada método debe tomar dos números como argumentos y devolver el resultado de la operación correspondiente.

class Calculator {
    constructor(number1, number2) {
        this.number1 = number1;
        this.number2 = number2;
    }
    add() {
        return this.number1 + this.number2;
    }
    subtract() {
        return this.number1 - this.number2;
    }
    multiply() {
        return this.number1 * this.number2;
    }
    divide() {
        return this.number1 / this.number2;
    }

}
const calculator = new Calculator(10, 5);
console.log("tarea 6:" + calculator.add()+","+calculator.subtract()+","+calculator.multiply()+","+calculator.divide());

