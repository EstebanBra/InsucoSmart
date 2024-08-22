import '../styles/notifications.css';
import checkButton from '../assets/check-circle.svg';

export function Successful({message}) {
    return (
        <div className='notification-wrapper'>
            <div className='notification'>
                <div className='notification__body'>
                    <img
                        src={checkButton}
                        alt='Success'
                        className='notification__icon'
                        />
                    {message}
                </div>
                <div className='notification__progress'></div>
            </div>
        </div>
    );
}
