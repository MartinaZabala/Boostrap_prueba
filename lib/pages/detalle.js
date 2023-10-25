import { getTarea } from "../service/tickets.js";

const id = new URLSearchParams(window.location.search).get("id");

const tarea_image = document.getElementById("tarea-image");
const tarea_title = document.getElementById("tarea-title");
const tarea_time = document.getElementById("tarea-time");
const tarea_responsable = document.getElementById("tarea-responsable");
const tarea_description = document.getElementById("tarea-description");
const tarea_state = document.getElementById("tarea-selected-state");
const tarea_dropdown = document.getElementById("tarea-dropdown");

const findTarea= async () => {
  return await getTarea(id);
};

const fillDetailTarea = async () => {
  const tarea = await findTarea();
  if (tarea) {
    tarea_image.src = tarea.imagen;
    tarea_title.innerText = tarea.titulo;
    tarea_time.innerText += ` ${tarea.tiempo} ${
      tarea.tiempo == 1 ? " día" : "días"
    }`;
    tarea_responsable.innerText += " " + tarea.responsable;
    tarea_description.innerText = tarea.descripcion;
    tarea_state.innerText = tarea.estado;

    if (tarea.estado == "Por Hacer") {
      tarea_state.className = "btn btn-primary";
      tarea_dropdown.className =
        "btn btn-primary dropdown-toggle dropdown-toggle-split";
    } else if (tarea.estado == "En Proceso") {
      tarea_state.className = "btn btn-danger";
      tarea_dropdown.className =
        "btn btn-danger dropdown-toggle dropdown-toggle-split";
    } else if (tarea.estado == "Por Testear") {
      tarea_state.className = "btn btn-secondary";
      tarea_dropdown.className =
        "btn btn-secondary dropdown-toggle dropdown-toggle-split";
    } else if (tarea.estado == "Completada") {
      tarea_state.className = "btn btn-success";
      tarea_dropdown.className =
        "btn btn-success dropdown-toggle dropdown-toggle-split";
    }
  }
};

const updateSelectedState = async (button) => {
  const selectedState = button.textContent;

  fetch(`http://localhost:3000/tareas/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la tarea existente");
      }
    })
    .then((tarea) => {
      const updatedTarea = { ...tarea, estado: selectedState };

      return fetch(`http://localhost:3000/tareas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTarea),
      });
    })
    .then((response) => {
      if (response.ok) {
        console.log("Tarea actualizada correctamente.");
        // Realiza cualquier acción adicional que necesites después de la actualización.
      } else {
        console.error("Error al actualizar la tarea.");
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
};

fillDetailTarea();
window.updateSelectedState = updateSelectedState;
