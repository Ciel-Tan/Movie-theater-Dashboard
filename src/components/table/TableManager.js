import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PrePaginate } from "../pagination/PrePaginate";
import { TablePaginate } from "../pagination/TablePaginate";

const TableManager = ({ data }) => {
    if (!data || !data.length) {
        return <p>No data available</p>;
    }

    const [activeRowId, setActiveRowId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const menuRef = useRef(null);

    const { currentItems, totalPages, pageNumbers } = PrePaginate(data, currentPage, itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const centerData = ["Gender", "Age", "Actions"];

    useEffect(() => {
        if (activeRowId !== null) {
            document.body.classList.add("menu-open");
        }
        else {
            document.body.classList.remove("menu-open");
        }
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveRowId(null);
            }
        };

        if (activeRowId !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeRowId]);

    const handleActionClick = (event, id) => {
        event.stopPropagation();
        setActiveRowId(activeRowId === id ? null : id);
    };

    const headers = Object.keys(currentItems[0]);
    const rows = currentItems.map((item) => (
        <tr key={item.Id} className="tableRow">
            {headers.map((header) => (
                <td
                    key={header}
                    className={`
                        ${header === "Id" ? "hide" : ""}
                        ${header === "Actions" ? "actionCell" : ""}
                        ${centerData.includes(header) ? "textCenter" : ""}
                    `}
                >
                    {header === "Gender" ? (
                        <input
                            type="checkbox"
                            checked={item[header]}
                            className="genderCheckbox"
                        />
                    ) : header === "Actions" ? (<>
                            <button
                                className="actionButton"
                                onClick={(e) => handleActionClick(e, item.Id)}
                            >
                                <BsThreeDots size={20}/>
                            </button>
                            {activeRowId === item.Id && (
                                <div ref={menuRef} className="menu">
                                    <p
                                        className="menu-item"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm("Are you sure you want to delete this video?")) {
                                                handleDelete();
                                            }
                                        }}
                                    >
                                        Delete this video
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        item[header]
                    )}
                </td>
            ))}
        </tr>
    ));

    return (
        <div>
            <table className="tableManager">
                <thead>
                    <tr className="tableHeader">
                        {headers.map((header) => (
                            <th
                                key={header}
                                className={`
                                    ${header === "Id" ? "hide" : ""}
                                    ${centerData.includes(header) ? "textCenter" : ""}
                                `}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tableBody">
                    {rows}
                </tbody>
            </table>

            {data.length > 0 && (
                <section className="paginationSection">
                    <TablePaginate
                        totalPages={totalPages}
                        currentPage={currentPage}
                        pageNumbers={pageNumbers}
                        onPageChange={handlePageChange}
                    />
                </section>
            )}
        </div>
    );
}
 
export default TableManager;