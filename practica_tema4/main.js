const tab = document.getElementById("tab");
const resetear = document.getElementById("resetear");

document.addEventListener("DOMContentLoaded", () =>{
    const guardarDatos =localStorage.getItem("tablero");

    if(guardarDatos){
        initTablero(JSON.parse(guardarDatos));
    }else{
        mostrarFormulario();
    }
});

function guardar(datos){
    localStorage.setItem("tablero", JSON.stringify(datos));
}

function mostrarFormulario(){
    const contenedor =document.getElementById("tab");
    contenedor.textContent = "";

    
}