'use client';

import ListMovie from "@/components/movie/ListMovie";
import { useActionSearchContent } from "@/hooks/useActionSearchContent";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SearchResult = () => {

  const { searchQuery } = useParams()
   const decoded = decodeURIComponent(searchQuery || '')
  const hasRun = useRef(false)

  const { searchContentWithTimeStamp, searchLoading, searchError } = useActionSearchContent()
  const [searchData, setSearchData] = useState([])

  const getSearchContent = async () => {
    const data = await searchContentWithTimeStamp(decoded)
    const similarityData = data.filter((item) => item.similarity_score < 0.7)
    setSearchData(similarityData || [])
  }

  useEffect(() => {
    if (!hasRun.current) {
      getSearchContent()
      hasRun.current = true
    }
  }, [searchQuery])

  return (
    <ListMovie
      status="Search Result"
      data={searchData}
      loading={searchLoading}
      error={searchError}
      searchQuery={decoded}
    />
  );
};

export default SearchResult;