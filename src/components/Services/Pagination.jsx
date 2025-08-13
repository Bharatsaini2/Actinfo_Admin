import React from 'react'

const Pagination = ({ page, pages, onPageChange }) => {
    if (pages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <ul className="pagination pagination-primary mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(page - 1)}>Previous</button>
                </li>

                {pageNumbers.map((p) => (
                    <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(p)}>{p}</button>
                    </li>
                ))}

                <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(page + 1)}>Next</button>
                </li>
            </ul>
        </>
    )
}

export default Pagination;
