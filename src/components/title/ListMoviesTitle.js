import Link from "next/link";

const ListMoviesTitle = (props) => {
    const { status } = props;
    return (
        <div className="flex flex-sb w-100 movieTitle">
            <h2>List Of {status} Movies</h2>
            {status === 'Latest' && (
                <Link href='/addMovie'>
                    <button>Add Movie</button>
                </Link>
            )}
        </div>
    );
}
 
export default ListMoviesTitle;