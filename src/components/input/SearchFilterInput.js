import { useState } from "react";
import "@/styles/searchInput.css"
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";

const SearchFilterInput = (props) => {
    const { data, selectedData, attribute, onChange, onAdd, onRemove } = props;

    const [searchQuery, setSearchQuery] = useState('')

    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filteredData = trimmedQuery === "check"
        ? data.filter((item) => selectedData.includes(item.actor_name))
        : trimmedQuery === ""
            ? data
            : data.filter((item) => item.actor_name.toLowerCase().includes(trimmedQuery));

    const handleClickRemove = (e, item) => {
        e.stopPropagation();
        onRemove(item)
    }

    return (
        <div className="search-input">
            <section className="search-input-bar">
                <input
                    type="text"
                    placeholder={attribute.placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {trimmedQuery != "" && trimmedQuery != "check" && (
                    <MdAddCircleOutline
                        size={22}
                        color="blue"
                        className="icon"
                        onClick={() => onAdd({ actor_id: 0, actor_name: trimmedQuery })}
                    />
                )}
            </section>

            {searchQuery && (
                <div className="search-input-results">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <div
                                key={index}
                                className="search-card"
                                onClick={() => onChange(item)}
                            >
                                {item.actor_name}
                                {selectedData.some((selected) => selected === item.actor_name) && (
                                    <span className="search-card-icon">
                                        <FaRegCheckCircle
                                            size={20}
                                            color="green"
                                        />

                                        <IoMdRemoveCircleOutline
                                            size={22}
                                            color="red"
                                            onClick={(e) => handleClickRemove(e, item)}
                                        />
                                    </span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="search-card">No Actor Found</div>
                    )}
                </div>
            )}
        </div>
    );
}
 
export default SearchFilterInput;