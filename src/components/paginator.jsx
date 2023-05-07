export default ({ pages, currentPage }) => {
    return <>
        <nav aria-label="Navegacion">
            <ul className="pagination pagination-fluid">
                <li className="page-item">
                    <a className="page-link" href="#">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </>
}
