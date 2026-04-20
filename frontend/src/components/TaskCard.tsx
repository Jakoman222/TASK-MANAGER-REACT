import "./TaskCard.css";

type TaskCardProps = {
    text: string
    completed: boolean
    onToggle: () => void
    onRemove: () => void
}

function TaskCard({ text, completed, onToggle, onRemove }: TaskCardProps) {
    return (
        <li className={`task-card${completed ? " task-card--completed" : ""}`}>
            <button
                className={`task-card__status${completed ? " task-card__status--completed" : ""}`}
                type="button"
                onClick={onToggle}
                aria-label={completed ? "Marcar tarea como pendiente" : "Marcar tarea como completada"}
            >
                {completed ? "✓" : ""}
            </button>
            <div className="task-card__content">
                <p className="task-card__text">{text}</p>
                <button
                    className="task-card__delete"
                    type="button"
                    onClick={onRemove}
                    aria-label="Eliminar tarea"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="task-card__delete-icon"
                    >
                        <path
                            d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v8h-2V9Zm4 0h2v8h-2V9ZM7 9h2v8H7V9Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        </li>
    );
}

export default TaskCard;
