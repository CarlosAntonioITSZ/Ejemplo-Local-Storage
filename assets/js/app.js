//Variables
const listaTareas = document.getElementById('lista');

//Eventos
EventsListeners();
function EventsListeners(){
    //Cuando se envia el formulario
    document.getElementById("formulario").addEventListener('submit', agregarTarea);
    //Cuando se elimna una tarea
    listaTareas.addEventListener('click', borrarTarea);
}

//Funciones
function agregarTarea(e){
    e.preventDefault();
    
    //Obtenemos el valor que estan dentro del text area
    const tarea = document.getElementById("caja").value;

    //Creamos un nuevo elemento li
    const nuevaTarea = document.createElement("li");
    //Añadimos la clase tareas a la nueva tarea
    nuevaTarea.classList= "tareas";
    //Creamos el boton eliminar
    const btnEliminar = document.createElement("i");
    btnEliminar.classList = "btnEliminar fas fa-minus-circle";

    //A nuestro nuevo elemento le asignamos contenido
    nuevaTarea.innerHTML = tarea;
    //Agregamos el boton eliminar a nuestra tarea
    nuevaTarea.appendChild(btnEliminar);
    //Agregamos nuestra nueva tarea al dom
    listaTareas.appendChild(nuevaTarea);


    //Añadir a Local Storage
    agregarTareaLS(tarea);
}

function agregarTareaLS(tarea){
    let tareas;
    tareas = obtenerTareaLS();

    tareas.push(tarea);

    localStorage.setItem("tarea", JSON.stringify(tareas));

}

function obtenerTareaLS(){
    let tareas;

    if(localStorage.getItem('tarea') == null){
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem("tarea"));
    }

    return tareas;
}

function borrarTarea(e){
    e.preventDefault();

    if (e.target.classList.contains("btnEliminar")){
        e.target.parentElement.remove();
    }
}