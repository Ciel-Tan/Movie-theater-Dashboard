'use client';

import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PrePaginate } from "../pagination/PrePaginate";
import { TablePaginate } from "../pagination/TablePaginate";
import Modal from "../modal/Modal";
import Image from "next/image";
import Loader from "../loading/Loader";
import { usePostAccount } from "@/hooks/usePostAccount";
import { useToastNotify } from "@/utils/toast";

const TableManager = ({ data }) => {
    const [activeRowId, setActiveRowId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const menuRef = useRef(null);

    const { Delete_Account, loading, response, error } = usePostAccount();

    const { currentItems, totalPages, pageNumbers } = PrePaginate(data, currentPage, itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useToastNotify(response, error, "/account");

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

    const confirmDelete = async () => {
        await Delete_Account(activeRowId);
        setIsDeleteOpen(false);
    };

    if (!data || !data.length) {
        return <p>No data available</p>;
    }

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
                            readOnly
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
                                    <span
                                        type="button"
                                        className="menu-item"
                                        onClick={(e) => {
                                            //e.stopPropagation();
                                            console.log("🗑️  Delete span clicked!");
                                            setIsDeleteOpen(true);
                                        }}
                                    >
                                        Delete this account
                                    </span>
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

            {isDeleteOpen && (
                <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                    <div className="delete-image">
                        <Image src="/image/trash-can.png" alt="trash-can" width={100} height={100} />
                    </div>
                    <div className="delete-content">
                        <p className="delete-text">Are you sure you want to delete this account?</p>
                    </div>
                    <div className="delete-actions">
                        <button onClick={() => setIsDeleteOpen(false)} className="delete-button cancel">
                            Cancel
                        </button>
                        <button onClick={confirmDelete} className="delete-button confirm">
                            {loading ? <Loader /> : 'Delete'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
 
export default TableManager;