import '../styles/notifications.css';
import checkButton from '../assets/check-circle.svg';

export function SesionExitosa() {
    return (
        <div className='notification-wrapper'>
            <div className='notification'>
                <div className='notification__body'>
                    <img
                        src={checkButton}
                        alt='Success'
                        className='notification__icon'
                        />
                    ¡Inicio de sesión exitoso!
                </div>
                <div className='notification__progress'></div>
            </div>
        </div>
    );
}
