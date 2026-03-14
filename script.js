let inicio = 0;
let tiempo = 0;
let intervalo;

let corriendo = false;

let competidores = [];

function actualizarTiempo(){

    tiempo = Date.now() - inicio;

    let segundos = Math.floor((tiempo/1000)%60);
    let minutos = Math.floor((tiempo/60000)%60);
    let horas = Math.floor((tiempo/3600000));

    document.getElementById("display").innerText =
        String(horas).padStart(2,"0")+":"+
        String(minutos).padStart(2,"0")+":"+
        String(segundos).padStart(2,"0");
}

function iniciar(){

    if(!corriendo){

        inicio = Date.now() - tiempo;

        intervalo = setInterval(actualizarTiempo,1000);

        corriendo = true;
    }
}

function pausar(){

    clearInterval(intervalo);

    corriendo = false;
}

function reiniciar(){

    clearInterval(intervalo);

    tiempo = 0;

    competidores = [];

    document.getElementById("display").innerText = "00:00:00";

    document.getElementById("tablaCompetidores").innerHTML = "";

    corriendo = false;
}

function registrar(){

    let tiempoActual = tiempo;

    let id = competidores.length + 1;

    let diferencia = 0;

    if(competidores.length > 0){

        diferencia = tiempoActual - competidores[0].tiempo;

    }

    let competidor = {
        id:id,
        tiempo:tiempoActual,
        diferencia:diferencia
    };

    competidores.push(competidor);

    mostrarTabla();
}

function formatoTiempo(ms){

    let s = Math.floor((ms/1000)%60);
    let m = Math.floor((ms/60000)%60);
    let h = Math.floor((ms/3600000));

    return String(h).padStart(2,"0")+":"+
           String(m).padStart(2,"0")+":"+
           String(s).padStart(2,"0");
}

function mostrarTabla(){

    let tabla = document.getElementById("tablaCompetidores");

    tabla.innerHTML = "";

    competidores.forEach(c => {

        let fila = `<tr>
        <td>${c.id}</td>
        <td>${formatoTiempo(c.tiempo)}</td>
        <td>${formatoTiempo(c.diferencia)}</td>
        </tr>`;

        tabla.innerHTML += fila;
    });
}