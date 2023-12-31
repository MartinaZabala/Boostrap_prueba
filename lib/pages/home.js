import { getAllTareas, getAllTareas } from "../service/tickets.js";

const contenedor_por_hacer = document.getElementById("contenedor-por-hacer");
const contenedor_en_proceso = document.getElementById("contenedor-en-proceso");
const contenedor_por_testear = document.getElementById("contenedor-por-testear");
const contenedor_completada = document.getElementById("contenedor-completada");

const fillTareas = async () => {
    const tareas = await getAllTareas();

    tareas.forEach((tarea) => {
        const estado = tarea.estado;

        let container;
        if (estado === "Por Hacer"){
            container = contenedor_por_hacer
        }else if(estado === "En Proceso"){
            container = contenedor_en_proceso
        }else if(estado === "Por Testear"){
            container = contenedor_por_testear
        }else if(estado === "Completada"){
            container = contenedor_completada
        }

        container.innerHTML += 
            `<div class="col">
                <div class="card h-100">
                    <img 
                        class="card-img-top" 
                        src="${tarea.imagen}" 
                        alt="" 
                    />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${tarea.titulo}</h5>
                            <span>Tiempo: ${tarea.tiempo} ${tarea.tiempo == 1 ? "día" : "días"}</span>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <a href="/detalle.html?id=${tarea.id}" class="btn btn-outline-primary mt-auto">
                            Ver Tarea
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `
    });
}

fillTareas();
