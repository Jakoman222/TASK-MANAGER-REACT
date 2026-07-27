import './Footer.css';

type FooterProps = {
    pendingCount: number;
    completedCount: number;
};

function Footer({ pendingCount, completedCount }: FooterProps) {
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
                <span className="task-footer__pill">
                    {pendingCount + completedCount} Total
                </span>
            </div>
        </footer>
    );
}

export default Footer;
