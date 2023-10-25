//npm install -g json-server
//json-server --watch db.json

export function getAllTareas(){
    return fetch('http://localhost:3000/tareas')
    .then(res=>res.json())
}

export function getTarea(id){
    return fetch(`http://localhost:3000/tareas/${id}`)
    .then(res=>res.json())
}