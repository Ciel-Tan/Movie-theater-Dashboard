import Movie from "@/components/layout/Movie";
import HeaderTitle from "@/components/title/HeaderTitle";

export default function AddMovie() {
  return (
    <div className="addBlogPage">
      <div className="blogsAdd">
        <HeaderTitle status="Add" />

        <Movie />
      </div>
    </div>
  )
}