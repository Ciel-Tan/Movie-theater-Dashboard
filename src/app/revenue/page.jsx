"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, Film, Users } from "lucide-react"
import RevenueChart from "@/components/chart/revenue-chart"
import MovieRevenueChart from "@/components/chart/movie-revenue-chart"
import { useGetCinema } from "@/hooks/useGetCinema"
import { useGetBooking } from "@/hooks/useGetBooking"
import "@/styles/revenue.css"
import { customFormatDate, formatVND } from "@/utils/format"
import { Button } from "@/components/ui/button"

export default function RevenuePage() {
  const [selectedCinema, setSelectedCinema] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")

  const { cinemasData } = useGetCinema()
  const { bookingsData } = useGetBooking()

  const [itemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (cinemasData.length > 0) {
      setSelectedCinema(cinemasData[0].cinema_name)
    }
  }, [cinemasData])

  // Filter bookings by selected cinema
  const filteredBookings = useMemo(() => {
    if (!selectedCinema) return []
    let bookings = bookingsData.filter((booking) => booking.showtime.cinema.cinema_name === selectedCinema)
    
    if (timeFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (timeFilter) {
        case "Last 7 Days":
          filterDate.setDate(now.getDate() - 7)
          break
        case "Last 30 Days":
          filterDate.setDate(now.getDate() - 30)
          break
        case "Last 90 Days":
          filterDate.setDate(now.getDate() - 90)
          break
      }

      bookings = bookings.filter((booking) => new Date(booking.booking_datetime) >= filterDate)
    }
    
    return bookings
  }, [selectedCinema, bookingsData, timeFilter])

  // Calculate revenue metrics
  const revenueMetrics = useMemo(() => {
    const totalRevenue = filteredBookings.reduce((sum, booking) => {
      const price = Number(booking.total_price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    const totalBookings = filteredBookings.length;
    const totalTickets = filteredBookings.reduce(
      (sum, booking) =>
        sum + booking.booking_ticket.reduce((ticketSum, ticket) => ticketSum + ticket.ticket_quantity, 0),
      0,
    );
    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    return {
      totalRevenue,
      totalBookings,
      totalTickets,
      averageBookingValue,
    };
  }, [filteredBookings])

  // Group revenue by date
  const revenueByDate = useMemo(() => {
    const grouped = {}
    filteredBookings.forEach((booking) => {
      const date = new Date(booking.booking_datetime).toLocaleDateString()
      const price = Number(booking.total_price)
      if (!isNaN(price)) {
        grouped[date] = (grouped[date] || 0) + price
      }
    })
    return Object.entries(grouped).map(([date, revenue]) => ({ date, revenue }))
  }, [filteredBookings])

  // Group revenue by movie
  const revenueByMovie = useMemo(() => {
    const grouped = {}
    filteredBookings.forEach((booking) => {
      const movieTitle = booking.showtime.movie.title
      const price = Number(booking.total_price)
      if (!isNaN(price)) {
        grouped[movieTitle] = (grouped[movieTitle] || 0) + price
      }
    })
    return Object.entries(grouped).map(([movie, revenue]) => ({ movie, revenue }))
  }, [filteredBookings])

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredBookings.slice(startIndex, endIndex)
  }, [filteredBookings, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)

  return (
    <div className="revenue-container">
      <div className="revenue-header">
        <div className="revenue-title-section">
          <h1 className="revenue-title">Revenue Management</h1>
          <p className="revenue-subtitle">Monitor and analyze cinema revenue performance</p>
        </div>

        <div className="cinema-select-wrapper">
          <div className="cinema-select-item">
            <label>Cinema</label>
            <Select value={selectedCinema} onValueChange={setSelectedCinema}>
            <SelectTrigger>
              <SelectValue placeholder="Select a cinema" />
            </SelectTrigger>
            <SelectContent>
              {cinemasData.map((cinema) => (
                <SelectItem key={cinema.cinema_id} value={cinema.cinema_name}>
                  <div className="cinema-option">
                    <span className="cinema-name">{cinema.cinema_name}</span>
                  </div>
                </SelectItem>
              ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="cinema-select-item">
            <label>Time</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
              <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
              <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
            </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {selectedCinema && (
        <>
          <div className="selected-cinema-badge">
            <Badge variant="outline" className="cinema-badge">
              <Film className="badge-icon" />
              {selectedCinema}
            </Badge>
          </div>

          {/* Revenue Metrics Cards */}
          <div className="metrics-grid">
            <Card>
              <CardHeader className="metric-card-header">
                <CardTitle className="metric-title">Total Revenue</CardTitle>
                <DollarSign className="metric-icon" />
              </CardHeader>
              <CardContent>
                <div className="metric-value">{formatVND(revenueMetrics.totalRevenue)}</div>
                <p className="metric-description">From {revenueMetrics.totalBookings} bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="metric-card-header">
                <CardTitle className="metric-title">Total Bookings</CardTitle>
                <CalendarDays className="metric-icon" />
              </CardHeader>
              <CardContent>
                <div className="metric-value">{revenueMetrics.totalBookings}</div>
                <p className="metric-description">Booking transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="metric-card-header">
                <CardTitle className="metric-title">Total Tickets</CardTitle>
                <Users className="metric-icon" />
              </CardHeader>
              <CardContent>
                <div className="metric-value">{revenueMetrics.totalTickets}</div>
                <p className="metric-description">Tickets sold</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="metric-card-header">
                <CardTitle className="metric-title">Avg. Booking Value</CardTitle>
                <DollarSign className="metric-icon" />
              </CardHeader>
              <CardContent>
                <div className="metric-value">{formatVND(revenueMetrics.averageBookingValue)}</div>
                <p className="metric-description">Per booking</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Date</CardTitle>
                <CardDescription>Daily revenue trends for {selectedCinema}</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart data={revenueByDate} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Movie</CardTitle>
                <CardDescription>Movie performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <MovieRevenueChart data={revenueByMovie} />
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking transactions for {selectedCinema}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr className="table-header-row">
                      <th className="table-header">Booking ID</th>
                      <th className="table-header">Date</th>
                      <th className="table-header">Movie</th>
                      <th className="table-header">Customer</th>
                      <th className="table-header">Tickets</th>
                      <th className="table-header table-header-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.booking_id} className="table-row">
                        <td className="table-cell table-cell-bold">#{booking.booking_id}</td>
                        <td className="table-cell">{customFormatDate(booking.booking_datetime, "dd/MM/yyyy")}</td>
                        <td className="table-cell">{booking.showtime.movie.title}</td>
                        <td className="table-cell">{booking.account.full_name}</td>
                        <td className="table-cell">
                          {booking.booking_ticket.reduce((sum, ticket) => sum + ticket.ticket_quantity, 0)}
                        </td>
                        <td className="table-cell table-cell-right table-cell-bold">
                          {formatVND(booking.total_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination-info">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length}{" "}
                      bookings
                    </div>
                    <div className="pagination-controls">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                      >
                        Previous
                      </Button>

                      <div className="pagination-pages">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="pagination-page-btn"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
