import Link from "next/link";

const RenderItemAside = (props) => {
    const { data, activeLink, onClick } = props;
    
    return (
        <ul className="mt-2">
            {data.map(({ linkEndpoint, icon, title }, index) => (
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
            ))}
        </ul>
    );
}
 
export default RenderItemAside;