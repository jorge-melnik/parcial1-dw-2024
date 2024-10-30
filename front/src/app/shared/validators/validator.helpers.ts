import { FormControl } from "@angular/forms";

const clean_ci = (ci: string): string => {
    return ci.replace(/\D/g, '');
}

const cedulaPattern = (cedula: string) => {
    const cedulaRegex = /^[1-9]{1}\.[0-9]{3}\.[0-9]{3}-[0-9]{1}$/;
    return cedulaRegex.test(cedula);
}

const validation_digit = (ci: string) => {
    let a: number = 0;
    let i: number = 0;
    if (ci.length <= 6) {
        for (i = ci.length; i < 7; i++) {
            ci = '0' + ci;
        }
    }
    for (i = 0; i < 7; i++) {
        a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
    }
    if (a % 10 === 0) {
        return 0;
    } else {
        return 10 - a % 10;
    }
}

export const isCedulaValida = (ci: string) => {
    if (!ci) return false;
    // Fuente: https://github.com/picandocodigo/ci_js
    if (!cedulaPattern(ci)) return false;

    if (ci) {
        ci = clean_ci(ci);
        const dig: number = parseInt(ci[ci.length - 1]);
        ci = ci.replace(/[0-9]$/, '');
        return (dig == validation_digit(ci));
    } else {
        return false;
    }

}

export const validateRut = (rut: string): boolean => {
    // Basado en: https://es.stackoverflow.com/questions/182303/d%C3%ADgito-verificador-de-rut-con-vectores
    if (!rut) return false;

    // 0 - Precondiciones
    // Largo = 12
    if (rut.length != 12) {
        return false;
    }
    // Todos dígitos
    if (!/^([0-9])*$/.test(rut)) {  //Si no es todo número
        return false;
    }
    
    //Debe controlarse que las dos primeras posiciones estén en el rango 01 a 21. 
    const dosPrimeros = parseInt(rut.substring(0,2));
    if (dosPrimeros <= 0 || dosPrimeros> 21){
        return false;
    }
    
    //De la 3a a 8a posición debe ser distinto de 0. 
    const terceraAOctava = parseInt(rut.substring(2,8));
    if (terceraAOctava === 0) {
        return false;
    }

    //Las posiciones 9 y 10 deben ser 0. 
    const nueveDiez = parseInt(rut.substring(8,10));
    if (nueveDiez !== 0) {
        return false;
    }
    
    // 1 - Se toma el número de RUT hasta la penúltima posición, o sea, los 11 primeros dígitos.
    const rutArray = ([...rut.substring(0,11)]).map( caracter => parseInt(caracter));

    // 2 - Se multiplica cada dígito por los siguientes factores: 4,3,2,9,8,7,6,5,4,3,2.
    const vectorMultiplicador = [4,3,2,9,8,7,6,5,4,3,2];
    const rutMultiplicado = rutArray.map( (numero:number, indice:number) => numero * vectorMultiplicador[indice]);

    // 3 - Se suman los productos obtenidos.
    const sumaProductos = rutMultiplicado.reduce( (anterior:number,current:number) => anterior + current,0);

    // 4 - El probable dígito verificador es lo que falta para llegar a la suma obtenida. Para eso, se divide el resultado de la suma entre 11. Le resto 11 menos el resto obtenido.
    const digitoVerificadorRecibido: number = parseInt(rut.charAt(11));
    const digitoVerificadorCalculado = 11 - (sumaProductos % 11);

    // 5 - Si el dígito es menor que 10, es el verdadero dígito verificador. 
    
    if (digitoVerificadorCalculado < 10) {
        return digitoVerificadorRecibido === digitoVerificadorCalculado;
    } 
    // Si es 11, el dígito calculado es 0. 
    if (digitoVerificadorCalculado == 11) {
        return digitoVerificadorRecibido === 0;
    }
    // Si es 10, no es válido el RUT
    if (digitoVerificadorCalculado === 10) {
        return false;
    }

    //Se supone que nunca llegaría acá.
    return false;
}