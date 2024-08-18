import '../styles/form.css';
import logo from '../assets/logo.png';

export default function Form({ title, fields, buttonText, onSubmit, footerContent, backgroundColor }) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        onSubmit(data);
    }
    
    return (
        <form className='form' style={{ backgroundColor: backgroundColor }} onSubmit={handleSubmit} autoComplete='off'>
            <img src={logo} alt='logo-insuco' className='logo-insuco'/>
            <h1>{title}</h1>
            {fields.map((field, index) => (
                <div className='container-inputs' key={index}>
                    {field.label && <label className='label-form' htmlFor={field.name}>{field.label}</label>}
                    <input
                        className='input-form'
                        label={field.type || 'text'}
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type || text}
                        value={field.value}
                        required={field.required}
                        disabled={field.disabled}
                        />
                </div>
            ))}
            {buttonText && <button className='button-form' type='submit'>{buttonText}</button>}
            {footerContent && <div>{footerContent}</div>}
        </form>
    );
}