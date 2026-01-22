let datosTablero = { columnas: []};

document.addEventListener("DOMContentLoaded", () =>{
    const guardarDatos =localStorage.getItem("tablero");

    if(guardarDatos){
        datosTablero = JSON.parse(guardarDatos);
        gestionTablero();
    }else{
        mostrarFormulario();
    }
});

function guardar(){
    localStorage.setItem("tablero", JSON.stringify(datos));
}

function mostrarFormulario(){
    const contenedor =document.getElementById("tab");
    contenedor.textContent = "";

    const divConfiguracion = document.createElement("div");
    divConfiguracion.className = "configContenedor";

    const h2 = document.createElement("h2");
    h2.textContent = "Configuracion del tablero";

    const p = document.createElement("p")
    p.textContent = "Introduce el numero de columnas que quieres";

    const inputNumero = document.createElement("input");
    inputNumero.type = "number";
    inputNumero.min = 1;
    inputNumero.max = 6;
    inputNumero.value = 3;

    const crearColumnas = document.createElement("div");

    const generarColumnas = () =>{
        crearColumnas.textContent = " ";
        for(let i = 0; i < inputNumero.value; i++){
            const columns = document.createElement("div");
            columns.className = "configColumnas";

            const nombreColumnas = document.createElement("input");
            nombreColumnas.className = "nombreColumna";
            nombreColumnas.placeholder = `Nombre columna ${i + 1}`;

            const limiteColumnas = document.createElement("input");
            limiteColumnas.type = "number";
            limiteColumnas.className = "limiteColumns"
            limiteColumnas.placeholder = "Limite de tareas";
            limiteColumnas.value = 5;

            columns.append(nombreColumnas, limiteColumnas);
            crearColumnas.appendChild(columns);
        }
    };
    inputNumero.addEventListener("change" , generarColumnas);
    generarColumnas();

    const botonEnviar = document.createElement("boton");
    botonEnviar.textContent = "Crear tablero";
    botonEnviar.onclick = () =>{
        const nombres = document.querySelectorAll(".nombreColumna");
        const limite = document.querySelectorAll(".limeteColumns");

        datosTablero.columnas = Array.from(nombres).map((inp, i) =>({
            id: 1,
            titulo: inp.value || `Columna ${i + 1}`,
            limit: parseInt(limite[i].value) || 5,
            tareas: []
            
        }));
        guardar();
        mostrarFormulario();
    };

    columns.append(h2, p, inputNumero, crearColumnas, botonEnviar);
    contenedor.appendChild(columns);
}

function gestionTablero(){
    
}