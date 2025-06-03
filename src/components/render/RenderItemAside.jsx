'use client';

import Link from "next/link";
import { useState } from "react";

const RenderItemAside = (props) => {
    const { data, activeLink, onClick } = props;
    const [openDropdown, setOpenDropdown] = useState(null);
    
    const handleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };
    
    return (
        <ul className="mt-2">
            {data.map(({ linkEndpoint, icon, title, children }, index) => (
                children ? (
                    <li key={index} className="has-dropdown">
                        <nav
                            className={`dropdown-parent ${openDropdown === index ? 'open' : ''}`}
                            onClick={() => handleDropdown(index)}
                        >
                            <li>
                                <div>{icon}</div>
                                {title}
                            </li>
                            <span>{openDropdown === index ? '▲' : '▼'}</span>
                        </nav>
                        {openDropdown === index && (
                            <ul className="dropdown-menu">
                                {children.map((child, childIdx) => (
                                    <Link
                                        key={childIdx}
                                        href={child.linkEndpoint}
                                        className={activeLink === child.linkEndpoint ? 'active' : ''}
                                        onClick={() => onClick(child.linkEndpoint)}
                                    >
                                        <li>{child.title}</li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </li>
                ) : (
                    <Link
                        key={index}
                        href={linkEndpoint}
                        className={activeLink === linkEndpoint ? 'active' : ''}
                        onClick={() => onClick(linkEndpoint)}
                    >
                        <li>
                            <div>{icon}</div>
                            {title}
                        </li>
                    </Link>
                )
            ))}
        </ul>
    );
}
 
export default RenderItemAside;