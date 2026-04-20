
function TaskScript (){
    const input = document.getElementById("taskInput");
    const list = document.getElementById("tasklist");
    const button = document.getElementById("addTaskBtn");

    const taskText = input.value.trim(); // trim() elimina los espacios
    // para evitar
    if(taskText === ""){
        return (alert("Escribe una tarea"));
    }

    const li = document.createElement("li");

    li.textContent = taskText;

    li.addEventListener("click", function(){
        li.remove();
    });

    list.appendChild(li);

    input.value = "";

    
    
}

export default TaskScript
