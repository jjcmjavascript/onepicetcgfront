import react from "react"

export default ({children, className, type, onClick}) => {
    className = 'btn btn-outline-'.concat(className || 'default'); 
    type = type || 'button';

    return <>
        <button className={className} type={type} onClick={onClick}>
            {children}
        </button>
    </>
}