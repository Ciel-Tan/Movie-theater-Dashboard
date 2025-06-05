"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Film, TrendingUp, Calendar } from "lucide-react"
import YearComparisonChart from "@/components/chart/year-comparison-chart"
import YearTrendChart from "@/components/chart/year-trend-chart"
import { useGetBooking } from "@/hooks/useGetBooking"
import { useGetCinema } from "@/hooks/useGetCinema"
import "@/styles/annual-comparison.css"
import { formatVND } from "@/utils/format"

export default function AnnualComparisonPage() {
  const [selectedCinema, setSelectedCinema] = useState("all")
  const [selectedYears, setSelectedYears] = useState([])

  const { cinemasData } = useGetCinema()
  const { bookingsData } = useGetBooking()

  // Filter bookings by selected cinema
  const filteredBookings = useMemo(() => {
    if (selectedCinema === "all") return bookingsData
    return bookingsData.filter((booking) => booking.showtime.cinema.cinema_name === selectedCinema)
  }, [bookingsData, selectedCinema])

  // Calculate yearly revenue statistics
  const yearlyStats = useMemo(() => {
    const stats = {}

    filteredBookings.forEach((booking) => {
      const year = new Date(booking.booking_datetime).getFullYear().toString()

      if (!stats[year]) {
        stats[year] = {
          year,
          totalRevenue: 0,
          totalBookings: 0,
          totalTickets: 0,
          uniqueMovies: new Set(),
          cinemasData: new Set(),
          monthlyRevenue: {},
          averageBookingValue: 0,
        }
      }

      const yearStat = stats[year]
      const bill = Number(booking.total_price);
      yearStat.totalRevenue += isNaN(bill) ? 0 : bill;
      yearStat.totalBookings += 1
      yearStat.totalTickets += booking.booking_ticket.reduce((sum, ticket) => sum + ticket.ticket_quantity, 0)
      yearStat.uniqueMovies.add(booking.showtime.movie.movie_id)
      yearStat.cinemasData.add(booking.showtime.cinema.cinema_id)

      // Monthly breakdown
      const month = new Date(booking.booking_datetime).getMonth()
      yearStat.monthlyRevenue[month] = (yearStat.monthlyRevenue[month] || 0) + (isNaN(bill) ? 0 : bill)
    })

    // Convert sets to counts and calculate averages
    Object.values(stats).forEach((stat) => {
      stat.uniqueMovies = stat.uniqueMovies.size
      stat.cinemasData = stat.cinemasData.size
      stat.averageBookingValue = stat.totalBookings > 0 ? stat.totalRevenue / stat.totalBookings : 0

      // Convert monthly revenue to array
      stat.monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: i,
        monthName: new Date(2023, i, 1).toLocaleDateString("en-US", { month: "short" }),
        revenue: stat.monthlyRevenue[i] || 0,
      }))
    })

    return stats
  }, [filteredBookings])

  // Get available years
  const availableYears = useMemo(() => {
    const years = new Set();
    bookingsData.forEach(booking => {
      const year = new Date(booking.booking_datetime).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort();
  }, [bookingsData]);

  useEffect(() => {
    if (availableYears.length > 0) {
      setSelectedYears(availableYears.slice(-3));
    }
  }, [availableYears]);

  // Calculate year-over-year growth
  const yearGrowthData = useMemo(() => {
    const sortedYears = availableYears.sort()
    return sortedYears.map((year, index) => {
      const currentYear = yearlyStats[year]
      const previousYear = index > 0 ? yearlyStats[sortedYears[index - 1]] : null

      let growthRate = 0
      if (previousYear && previousYear.totalRevenue > 0) {
        growthRate = ((currentYear.totalRevenue - previousYear.totalRevenue) / previousYear.totalRevenue) * 100
      }

      return {
        year,
        revenue: currentYear.totalRevenue,
        bookings: currentYear.totalBookings,
        growthRate,
        previousYearRevenue: previousYear?.totalRevenue || 0,
      }
    })
  }, [yearlyStats, availableYears])

  // Filter data for selected years
  const selectedYearData = useMemo(() => {
    return selectedYears.map((year) => yearlyStats[year]).filter(Boolean)
  }, [selectedYears, yearlyStats])

  const selectedCinemaName = useMemo(() => {
    return selectedCinema === "all" ? "All Cinemas" : selectedCinema
  }, [selectedCinema])

  const handleYearToggle = (year) => {
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((y) => y !== year)
      }
      else {
        return [...prev, year].sort()
      }
    })
  }

  return (
    <div className="year-comparison-container">
      <div className="year-comparison-header">
        <div className="year-comparison-title-section">
          <h1 className="year-comparison-title">Year Revenue Comparison</h1>
          <p className="year-comparison-subtitle">Compare total revenue performance across different years</p>
        </div>

        <div className="year-comparison-filters">
          <div className="filter-group">
            <label className="filter-label">Cinema</label>
            <Select value={selectedCinema} onValueChange={setSelectedCinema}>
              <SelectTrigger>
                <SelectValue placeholder="All Cinemas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cinemas</SelectItem>
                {cinemasData.map((cinema) => (
                  <SelectItem key={cinema.cinema_id} value={cinema.cinema_name}>
                    {cinema.cinema_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {selectedCinema !== "all" && (
        <div className="selected-cinema-info">
          <Badge variant="outline" className="cinema-badge">
            <Film className="badge-icon" />
            {selectedCinemaName}
          </Badge>
        </div>
      )}

      {/* Year Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Years to Compare</CardTitle>
          <CardDescription>Choose which years you want to include in the comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="year-selection-grid">
            {availableYears.map((year) => (
              <div
                key={year}
                className={`year-card ${selectedYears.includes(year) ? "year-card-selected" : ""}`}
                onClick={() => handleYearToggle(year)}
              >
                <div className="year-card-year">{year}</div>
                <div className="year-card-revenue">{formatVND(yearlyStats[year]?.totalRevenue)}</div>
                <div className="year-card-details">
                  {yearlyStats[year]?.totalBookings} bookings • {yearlyStats[year]?.totalTickets} tickets
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yearly Overview Cards */}
      <div className="yearly-overview-section">
        <h2 className="section-title">
          {selectedCinema === "all" ? "Total Revenue by Year (All Cinemas)" : `Revenue by Year - ${selectedCinemaName}`}
        </h2>
        <div className="yearly-overview-grid">
          {selectedYearData.map((yearData, index) => {
            const growthData = yearGrowthData.find((g) => g.year === yearData.year)
            const isPositiveGrowth = growthData?.growthRate > 0
            const isNegativeGrowth = growthData?.growthRate < 0

            return (
              <Card key={yearData.year} className="yearly-overview-card">
                <CardHeader className="yearly-card-header">
                  <CardTitle className="yearly-title">{yearData.year}</CardTitle>
                  <Calendar className="yearly-icon" />
                </CardHeader>
                <CardContent>
                  <div className="yearly-value">{formatVND(yearData.totalRevenue)}</div>

                  {growthData && growthData.previousYearRevenue > 0 && (
                    <div
                      className={`yearly-growth ${isPositiveGrowth ? "growth-positive" : isNegativeGrowth ? "growth-negative" : "growth-neutral"}`}
                    >
                      <TrendingUp className={`growth-icon ${isNegativeGrowth ? "growth-icon-down" : ""}`} />
                      {isPositiveGrowth ? "+" : ""}
                      {growthData.growthRate.toFixed(1)}% vs {Number.parseInt(yearData.year) - 1}
                    </div>
                  )}

                  <div className="yearly-stats">
                    <span className="yearly-stat">{yearData.totalBookings} bookings</span>
                    <span className="yearly-stat">{yearData.totalTickets} tickets</span>
                    <span className="yearly-stat">{yearData.uniqueMovies} movies</span>
                    {selectedCinema === "all" && <span className="yearly-stat">{yearData.cinemasData} cinemas</span>}
                  </div>

                  <div className="yearly-average">Avg: {formatVND(yearData.averageBookingValue)}/booking</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        <div className="charts-grid">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Comparison</CardTitle>
              <CardDescription>Compare total revenue across selected years</CardDescription>
            </CardHeader>
            <CardContent>
              <YearComparisonChart data={selectedYearData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Trend</CardTitle>
              <CardDescription>Revenue growth trend over time</CardDescription>
            </CardHeader>
            <CardContent>
              <YearTrendChart data={yearGrowthData} />
            </CardContent>
          </Card>
        </div>

        {/* Monthly Breakdown for Selected Years */}
        {selectedYearData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
              <CardDescription>Monthly revenue comparison for selected years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="monthly-breakdown-container">
                <div className="monthly-breakdown-table">
                  <table className="monthly-table">
                    <thead>
                      <tr className="monthly-header-row">
                        <th className="monthly-header">Month</th>
                        {selectedYearData.map((yearData) => (
                          <th key={yearData.year} className="monthly-header monthly-header-right">
                            {yearData.year}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 12 }, (_, monthIndex) => (
                        <tr key={monthIndex} className="monthly-row">
                          <td className="monthly-cell monthly-cell-bold">
                            {new Date(2023, monthIndex, 1).toLocaleDateString("en-US", { month: "long" })}
                          </td>
                          {selectedYearData.map((yearData) => (
                            <td key={yearData.year} className="monthly-cell monthly-cell-right">
                              {formatVND(yearData.monthlyData[monthIndex]?.revenue || 0)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedYearData.length === 0 && (
        <Card>
          <CardContent className="empty-state">
            <Calendar className="empty-state-icon" />
            <h3 className="empty-state-title">No Years Selected</h3>
            <p className="empty-state-description">
              Please select at least one year from the cards above to view revenue comparison data.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
