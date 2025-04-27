import Link from "next/link";

const ListMoviesTitle = (props) => {
    const { status, searchQuery } = props;
    return (
        <div className="flex flex-sb w-100 movieTitle">
            <h2>
                {status === 'Latest' ? `List Of ${status} Movies` : `Search Result For "${searchQuery}"`}
            </h2>
            {status === 'Latest' && (
                <Link href='/addMovie'>
                    <button>Add Movie</button>
                </Link>
            )}
        </div>
    );
}
 
export default ListMoviesTitle;