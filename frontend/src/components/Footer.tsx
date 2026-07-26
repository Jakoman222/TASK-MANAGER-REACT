import './Footer.css';

type FooterProps = {
    pendingCount: number;
    completedCount: number;
    onClearCompleted: () => void;
};

function Footer({
    pendingCount,
    completedCount,
    onClearCompleted,
}: FooterProps) {
    const hasCompletedTasks = completedCount > 0;

    return (
        <footer className="task-footer">
            {/* <p className="task-footer__text">Task Manager</p> */}

            <div className="task-footer__stats">
                <span className="task-footer__pill">
                    {pendingCount} pendientes
                </span>
                <span className="task-footer__pill">
                    {completedCount} completadas
                </span>
            </div>
            <button
                type="button"
                className="task-footer__button"
                onClick={onClearCompleted}
                disabled={!hasCompletedTasks}
            >
                Limpiar completadas
            </button>
        </footer>
    );
}

export default Footer;
