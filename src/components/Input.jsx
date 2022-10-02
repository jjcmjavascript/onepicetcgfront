import react from "react"

export default ({ type , placeholder, ariaLabel }) => {
    type = type || 'text'; 

    return <>
        <input className="form-control" type="search" placeholder={placeholder} aria-label={ariaLabel} />
    </>
}