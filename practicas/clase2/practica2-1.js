
const tareas = [ "lavar los platos", "Estudiar JavaScript", "Aprender Git", "Hacer ejercicios" ];



//1º  Añadir al inicio del Array
tareas.unshift("Hacer la cama");

console.log("Tarea 1:" + tareas);


//2º Añadir al final del Array
tareas.push("Preparar la cena");

console.log("Tarea 2:" + tareas);

//3º Eliminar al inicio del Array
const tareaEliminada = tareas.shift();

//imprimir el elemento eliminado
console.log("Tarea 3:" +  tareaEliminada);



//4º Eliminar al final del Array
const tareaEliminada2 = tareas.pop();

//imprimir el elemento eliminado
console.log("Tarea 4:" +  tareaEliminada2);



//5º añade "pera" al final del array y "uva" al inicio. Muestra el array modificado.
const frutas = ["manzana", "banana",  "naranja"];
frutas.push("pera");
frutas.unshift("uva");
console.log("Tarea 5:" + frutas);

//6º Crea un array numeros con los valores 5, 10, 15, 20, 25. Usa map() para crear un nuevo array que contenga los valores del array original multiplicados por 2.
const numeros = [5, 10, 15, 20, 25];
const nuevosNumeros = numeros.map(numero => numero * 2);
console.log("Tarea 6:" + nuevosNumeros);

//7º Crea un array edades con los valores 12, 18, 25, 35, 45, 60. Usa filter() para crear un nuevo array que contenga solo las edades mayores de 20 años.
const edades = [12, 18, 25, 35, 45, 60];

const mayoresDe20 = edades.filter(edad => edad > 20);
console.log("Tarea 7:" + mayoresDe20);

//8º Crea un array nombres con los valores "Ana", "Carlos", "María", "Juan". Usa find() para encontrar el primer nombre que empiece con la letra "M".
const nombres = ["Ana", "Carlos", "María", "Juan"];
const letraABuscar = "m";

const nombreConM = (letraABuscar) => {
    return nombres.find(nombre => nombre.toLowerCase().startsWith(letraABuscar.toLowerCase()));
}

console.log("Tarea 8: " + nombreConM(letraABuscar));











