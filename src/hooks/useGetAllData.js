'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetAllData(apiEndpoint) {
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: res} = await axios.get(apiEndpoint)
                setAllData(res)
            }
            catch (error) {
                console.error("Error fetching movie data:", error)
            }
            finally {
                setLoading(false)
            }
        }

        if (apiEndpoint){
            fetchData()
        }
    }, [apiEndpoint])

    return {allData, loading}
}