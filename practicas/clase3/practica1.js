
//1º Crear una función calcularAreaRectangulo que reciba el largo y el ancho de un rectángulo 
//y devuelva su área. Luego, llama a la función con diferentes valores y muestra los resultados.
function calcularAreaRectangulo(n1, n2) {
  return n1 * n2;
}
console.log("tarea 1: " + calcularAreaRectangulo(2, 3)+"   " + calcularAreaRectangulo(6, 3));


//2º Crear una función esPar que reciba un número como argumento y devuelva true si el número es par, o false si es impar. Prueba la función con diferentes números.
function esPar (n1){
    const resultado = n1%2;
    if (resultado === 0 ){
        return true
    } else {
        return false
    }
}

console.log("tarea 2: " + esPar(4)+ "  "+ esPar(9));


//3ºCrear una función convertirAfahrenheit que reciba una temperatura en grados Celsius y la convierta a grados Fahrenheit. Usa la fórmula (C * 9/5) + 32.
function convertirAfahrenheit(n1){
    return (n1 * 9/5) + 32;
}

console.log("tarea 3: " + convertirAfahrenheit(25) + " grados fahrenheit ");


//4º Crear una función esMayorDeEdad que reciba la edad de una persona y devuelva true si es mayor de edad (18 años o más) o false en caso contrario.
// Usa esta función dentro de otra llamada verificarAcceso que muestre un mensaje si la persona puede acceder a un sitio web.
function esMayorDeEdad(n1){
    if(n1>=18){
        return true
    } else {
        return false
    }
}

console.log("tarea 4: "+ esMayorDeEdad(25)+"  "+esMayorDeEdad(17))
function verificarAcceso(n1){
    if(esMayorDeEdad(n1)){
        console.log("puedes acceder");
    } else {
        console.log("no puedes acceder");
    }
}
verificarAcceso(25);
verificarAcceso(17);

//5º Crear una función saludarUsuario que reciba un nombre y devuelva un saludo personalizado. Si no se proporciona un nombre, la función debe saludar con "Hola, desconocido".
function saludarUsuario (nombre){
    if (!nombre){
        console.log("tarea 5: hola desconocido ")
    } else {
        console.log("tarea 5: Hola " + nombre )
    }
}

saludarUsuario()
saludarUsuario("Noelia")


//7º Crear una función calcularPromedio que reciba un array de números y devuelva el promedio de los números. Usa la función reduce() para sumar los números.
const arrayNumeros = [20,3,45,1,89,7,5,63,4 ];
let promedio = 0;

function calcularPromedio (){
    const suma = arrayNumeros.reduce((acumulador, valorInicial)=>{
        return acumulador + valorInicial;
    },0);
    promedio = suma / arrayNumeros.length
}
calcularPromedio()
console.log( "tarea 6: " + promedio)

//8 Crear una función filtrarPares que reciba un array de números y devuelva un nuevo array con los números pares. Usa la función filter().

function filtrarPares(array) {
    return array.filter(num => num % 2 === 0);
  }
  

  const numeros = [1, 2, 3, 4, 5, 6];
  const pares = filtrarPares(numeros);
  console.log("tarea 9: " +  pares);