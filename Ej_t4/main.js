function añadir() {
            const input = document.getElementById("entradaTexto");
            const valor = input.value;

            if (valor !== "") {
               
                localStorage.setItem(valor, valor);
                input.value = ""; 
            }
        }

        function mostrar() {
            const list = document.getElementById("lista");
            list.innerHTML = ""; 

            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i);
                let contenido = localStorage.getItem(clave);

                let li = document.createElement("li");
                li.textContent = contenido;

                li.ondblclick = function() {
                    localStorage.removeItem(clave); 
                    mostrar();
                };

                list.appendChild(li);
            }
        }

        function limpiar() {
            localStorage.clear(); 
            document.getElementById("lista").innerHTML = ""; 
        }