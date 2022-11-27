import react from "react"

export default ({children, className, type}) => {
    className = 'btn btn-'.concat(className || 'default'); 
    type = type || 'button';

    return <>
        <button className={className} type={type}>
            {children}
        </button>
    </>
}