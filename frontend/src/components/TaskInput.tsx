import './TaskInput.css'
import { useState } from "react";

type TaskInputProps = {
    onAddTask: (taskText: string) => void
}

function TaskInput({ onAddTask }: TaskInputProps) {
    const [taskText, setTaskText] = useState("");

    // El formulario maneja el click del boton y tambien la tecla Enter.
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddTask(taskText);
        setTaskText("");
    };

    return (
        <section className="task-input-panel">
            <div className="task-input-panel__copy">
                <h2>Nueva tarea</h2>
                
            </div>

            <form className="task-input-form" onSubmit={handleSubmit}>
                <input
                    className="task-input"
                    type="text"
                    id="taskInput"
                    placeholder="Escribe una nueva tarea"
                    value={taskText}
                    onChange={(event) => setTaskText(event.target.value)}
                />
                <button className="task-input-button" type="submit" id="addTaskBtn">
                    Agregar tarea
                </button>
            </form>
        </section>
    );
}

export default TaskInput
