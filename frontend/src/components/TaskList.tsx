import "./TaskList.css";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

type TaskListProps = {
    tasks: Task[]
    onToggleTask: (taskId: number) => void
    onRemoveTask: (taskId: number) => void
}

function TaskList({ tasks, onToggleTask, onRemoveTask }: TaskListProps) {
    const pendingTasks = tasks.filter((task) => !task.completed).length;

    return (
        <section className="task-list-section">
            <div className="task-list-header">
                <h2>Lista de tareas</h2>
                <span className="task-list-count">{pendingTasks} pendientes</span>
            </div>
            {/* En caso de que tasks este vacio aaparecera el texto: Aun no hay tareas. Escribe una y presiona &quot;Agregar tarea&quot; */}
            {tasks.length === 0 ? (
                <p className="task-list-empty">
                    Aun no hay tareas. Escribe una y presiona &quot;Agregar tarea&quot;.
                </p>
            ) : (
                <ul className="task-list">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            text={task.text}
                            completed={task.completed}
                            onToggle={() => onToggleTask(task.id)}
                            onRemove={() => onRemoveTask(task.id)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default TaskList;
