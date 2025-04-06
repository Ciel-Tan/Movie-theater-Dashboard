import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export const TablePaginate = (props) => {
    const { totalPages, currentPage, pageNumbers, onPageChange } = props;
    return ( 
        <div className="tablePagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <GrFormPrevious size={18} />
                Prev
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={currentPage === number ? 'active' : ''}
                    disabled={number === '...'}
                    style={{ padding: "0.5rem" }}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <GrFormNext size={18} />
            </button>
        </div>
    );
}