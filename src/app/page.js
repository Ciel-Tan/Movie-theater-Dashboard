'use client'

import Banner from "@/components/dashboard/Banner";
import Statistic from "@/components/dashboard/Statistic";
import Loading from "@/components/layout/Loading";
import Spinner from "@/components/layout/Spinner";
import RenderItemMovie from "@/components/render/RenderItemMovie";
import ListMoviesTitle from "@/components/title/ListMoviesTitle";
import { useGetAccount } from "@/hooks/useGetAccount";
import { useGetGenre } from "@/hooks/useGetGenre";
import { useGetMovie } from "@/hooks/useGetMovie";
import { useGetRoom } from "@/hooks/useGetRoom";
import Link from "next/link";
import { BiSolidMoviePlay } from "react-icons/bi";

export default function Home() {
  const { moviesData, loading } = useGetMovie()
  const { roomsData } = useGetRoom()
  const { genresData } = useGetGenre()
  const { account } = useGetAccount()

  const statisticCardInfo = [
    {title: 'Total Movies', value: moviesData.length, icon: <BiSolidMoviePlay />, img: '/chartOne.svg'},
    {title: 'Genres', value: genresData.length, icon: <BiSolidMoviePlay />, img: '/chartTwo.svg'},
    {title: 'Rooms', value: roomsData.length, icon: <BiSolidMoviePlay />, img: '/chartThree.svg'},
    {title: 'Total user', value: account.length, icon: <BiSolidMoviePlay />, img: '/chartFour.svg'},
  ]

  return (
    loading ? <Loading/> : (
      <div>
        <Banner />

        <Statistic data={statisticCardInfo} />

        <div className="movieCards flex flex-col flex-left gap-2 w-100">
          <ListMoviesTitle status="Latest" />

          {loading ? <Spinner /> : (
            <RenderItemMovie
              status="Latest"
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
