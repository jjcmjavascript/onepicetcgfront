export default ({children, className})=>{
    return <>
        <select className={className || 'form-select'}>
            {children}
        </select>
    </>
}