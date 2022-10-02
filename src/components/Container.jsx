import react from "react"

export default ({children, className})=>{
    className = className || 'container-fluid';
    return <>
        <div className={className}>
            <div className="row">
                {children}
            </div>
        </div>
    </>
}