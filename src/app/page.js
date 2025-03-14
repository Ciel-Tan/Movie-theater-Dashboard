'use client'

import Banner from "@/components/dashboard/Banner";
import Statistic from "@/components/dashboard/Statistic";
import Loading from "@/components/layout/Loading";
import Spinner from "@/components/layout/Spinner";
import RenderItemMovie from "@/components/render/RenderItemMovie";
import ListMoviesTitle from "@/components/title/ListMoviesTitle";
import { useGetMovie } from "@/hooks/useGetMovie";
import Link from "next/link";
import { BiSolidMoviePlay } from "react-icons/bi";

export default function Home() {
  const { moviesData, loading, error } = useGetMovie()

  const statisticCardInfo = [
    {title: 'Total Movies', value: moviesData.length, icon: <BiSolidMoviePlay />, img: '/image/chartOne.svg'},
    // {title: 'Draft Movies', value: draftMovies.length, icon: <BiSolidMoviePlay />, img: '/image/chartTwo.svg'},
    {title: 'Category', value: 7, icon: <BiSolidMoviePlay />, img: '/image/chartThree.svg'},
    {title: 'Genre', value: 15, icon: <BiSolidMoviePlay />, img: '/image/chartFour.svg'},
  ]

  return (
    loading ? <Loading/> : (
      <div className="container">
        <Banner />

        <Statistic data={statisticCardInfo} />

        <div className="movieCards flex flex-col flex-left gap-2 w-100">
          <ListMoviesTitle status="Latest" />

          {loading ? <Spinner /> : (
            <RenderItemMovie
              data={moviesData}
              numberItems={3}
            />
          )}
          
          <Link href='/movies' className="loadMoreHomeBtn w-100 flex flex-center mt-2">
            <button>Load more</button>
          </Link>
        </div>
      </div>
    )
  );
}
