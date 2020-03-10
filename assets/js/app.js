//Variables
const listaTareas = document.getElementById('lista');
//Eventos
EventsListeners();
function EventsListeners(){
    //Cuando se envia el formulario
    document.getElementById("formulario").addEventListener('submit', agregarTarea);
    //Cuando se elimna una tarea
    listaTareas.addEventListener('click', borrarTarea);
 
    //Cargando contenido
    document.addEventListener('DOMContentLoaded',cargarLS);
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

    //Eliminos la tarea que este dentro del text area y hacemos focus
    document.getElementById("caja").value = "";

    //Añadir a Local Storage
    agregarTareaLS(tarea);
}
//Agrega una tarea a Local storage
function agregarTareaLS(tarea){
    let tareas;
    tareas = obtenerTareaLS();

    tareas.push(tarea);

    localStorage.setItem("tarea", JSON.stringify(tareas));
}

//Comprueba que haya elementos en Local storage retorna un arrgelo
function obtenerTareaLS(){
    let tareas;

    if(localStorage.getItem('tarea') == null){
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem("tarea"));
    }

    return tareas;
}

function cargarLS(){
    let tareas;

    tareas = obtenerTareaLS();

    tareas.forEach(function(tareas){
     const nuevaTarea = document.createElement("li");
    //Añadimos la clase tareas a la nueva tarea
    nuevaTarea.classList= "tareas";
    //Creamos el boton eliminar
    const btnEliminar = document.createElement("i");
    btnEliminar.classList = "btnEliminar fas fa-minus-circle";

    //A nuestro nuevo elemento le asignamos contenido
    nuevaTarea.innerHTML = tareas;
    //Agregamos el boton eliminar a nuestra tarea
    nuevaTarea.appendChild(btnEliminar);
    //Agregamos nuestra nueva tarea al dom
    listaTareas.appendChild(nuevaTarea);
    });
}

//Elimnia tarea
function borrarTarea(e){
    e.preventDefault();

    if (e.target.classList.contains("btnEliminar")){
        e.target.parentElement.remove();
        borrarTareaLS(e.target.parentElement.textContent);
    }
}
//Eliminar tarea de Local storage
function borrarTareaLS(tarea){
    tareas = obtenerTareaLS();
    tareaBorrar = tarea;

    tareas.forEach(function(t, index){
        if(tareaBorrar == t){
            tareas.splice(index, 1);
            console.log("se borro");
        }
    });

    localStorage.setItem("tarea", JSON.stringify(tareas));
}