
let dataTablero = { columnas: [] };

document.addEventListener('DOMContentLoaded', () => {
    const backup = localStorage.getItem('kanban_storage');
    if (backup) {
        dataTablero = JSON.parse(backup);
        mostrarTablero();
    } else {
        formulario();
    }
});

function guardarCambios() {
    localStorage.setItem('kanban_storage', JSON.stringify(dataTablero));
}


function formulario() {
    const container = document.getElementById('app');
    container.textContent = ''; 

    const divConfig = document.createElement('div');
    divConfig.className = 'configuracionContainer';

    const h2 = document.createElement('h2');
    h2.textContent = 'Configuración del Tablero';

    const p = document.createElement('p');
    p.textContent = 'Indica el número de columnas:';

    const numeroCol = document.createElement('input');
    numeroCol.type = 'number';
    numeroCol.min = 1;
    numeroCol.max = 6;
    numeroCol.value = 3;

    const wrapperColumnas = document.createElement('div');


    const generarInputsColumnas = () => {
        wrapperColumnas.textContent = '';
        for (let i = 0; i < numeroCol.value; i++) {
            const grupoCol = document.createElement('div');
            grupoCol.className = 'configuracionGrupo';

            const nombre = document.createElement('input');
            nombre.className = 'nombreCol';
            nombre.placeholder = `Nombre Columna ${i + 1}`;
            
            const limite = document.createElement('input');
            limite.type = 'number';
            limite.className = 'limiteCol';
            limite.placeholder = 'Límite tareas';
            limite.value = 5;

            grupoCol.append(nombre, limite);
            wrapperColumnas.appendChild(grupoCol);
        }
    };

    numeroCol.addEventListener('change', generarInputsColumnas);
    generarInputsColumnas();

    const btnEnviar = document.createElement('button');
    btnEnviar.textContent = 'Crear Tablero';
    btnEnviar.onclick = () => {
        const nombres = document.querySelectorAll('.nombreCol');
        const limites = document.querySelectorAll('.limiteCol');
        
        dataTablero.columnas = Array.from(nombres).map((inp, i) => ({
            id: i,
            titulo: inp.value || `Columna ${i + 1}`,
            limite: parseInt(limites[i].value) || 5,
            tareas: []
        }));

        guardarCambios();
        mostrarTablero();
    };

    divConfig.append(h2, p, numeroCol, wrapperColumnas, btnEnviar);
    container.appendChild(divConfig);
}


function mostrarTablero() {
    const container = document.getElementById('app');
    container.textContent = '';

    const tab = document.createElement('div');
    tab.className = 'tablero-Kangan';

    dataTablero.columnas.forEach((col, indexCol) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'column';
        
        const titulo = document.createElement('h3');
        titulo.textContent = `${col.titulo} (${col.tareas.length}/${col.limite})`;

        const listaTareas = document.createElement('div');
        listaTareas.className = 'lista';
        listaTareas.style.minHeight = '50px';


        col.tareas.forEach((tarea, tareaIndex) => {
            const divTarea = document.createElement('div');
            divTarea.className = 'task';
            divTarea.draggable = true;
            divTarea.textContent = tarea;

            const boton = document.createElement('button');
            boton.textContent = 'X';
            boton.className = 'eliminar';
            boton.onclick = () => {
                dataTablero.columnas[indexCol].tareas.splice(tareaIndex, 1);
                guardarCambios();
                mostrarTablero();
            };


            divTarea.ondragstart = (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ indexCol, tareaIndex }));
            };

            divTarea.appendChild(boton);
            listaTareas.appendChild(divTarea);
        });

        colDiv.ondragover = (e) => { e.preventDefault(); colDiv.classList.add('drag-over'); };
        colDiv.ondragleave = () => colDiv.classList.remove('drag-over');
        colDiv.ondrop = (e) => {
            e.preventDefault();
            colDiv.classList.remove('drag-over');
            const info = JSON.parse(e.dataTransfer.getData('text/plain'));
            
            if (indexCol !== info.indexCol && col.tareas.length < col.limite) {
                const tareaMovida = dataTablero.columnas[info.indexCol].tareas.splice(info.tareaIndex, 1)[0];
                col.tareas.push(tareaMovida);
                guardarCambios();
                mostrarTablero();
            }
        };

 
        const nuevaTarea = document.createElement('input');
        nuevaTarea.placeholder = 'Nueva tarea...';
        const botonAñadir = document.createElement('button');
        botonAñadir.textContent = '+';
        botonAñadir.onclick = () => {
            if (nuevaTarea.value.trim() && col.tareas.length < col.limite) {
                col.tareas.push(nuevaTarea.value.trim());
                guardarCambios();
                mostrarTablero();
            }
        };

        colDiv.append(titulo, listaTareas, nuevaTarea, botonAñadir);
        tab.appendChild(colDiv);
    });

 
    const botonReset = document.createElement('button');
    botonReset.textContent = 'Reiniciar todo';
    botonReset.style.backgroundColor = '#6c757d';
    botonReset.onclick = () => {
        if(confirm("¿Seguro?")) {
            localStorage.clear();
            location.reload();
        }
    };

    container.append(tab, botonReset);
}