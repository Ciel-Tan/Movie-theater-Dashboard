"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Film, TrendingUp, Users, Calendar, DollarSign, BarChart3 } from "lucide-react"
import MoviePerformanceChart from "@/components/chart/movie-performance-chart"
import MovieComparisonChart from "@/components/chart/movie-comparison-chart"
import { useGetCinema } from "@/hooks/useGetCinema"
import { useGetBooking } from "@/hooks/useGetBooking"
import "@/styles/movie-statistics.css"
import { formatVND } from "@/utils/format"

export default function MovieStatisticsPage() {
  const [selectedCinema, setSelectedCinema] = useState("all")
  const [selectedMovie, setSelectedMovie] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const { cinemasData } = useGetCinema()
  const { bookingsData } = useGetBooking()

  // Filter bookings by selected cinema and time
  const filteredBookings = useMemo(() => {
    let bookings = bookingsData

    if (selectedCinema !== "all") {
      bookings = bookings.filter((booking) => booking.showtime.cinema.cinema_name === selectedCinema)
    }

    if (timeFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (timeFilter) {
        case "7days":
          filterDate.setDate(now.getDate() - 7)
          break
        case "30days":
          filterDate.setDate(now.getDate() - 30)
          break
        case "90days":
          filterDate.setDate(now.getDate() - 90)
          break
      }

      bookings = bookings.filter((booking) => new Date(booking.booking_datetime) >= filterDate)
    }

    return bookings
  }, [selectedCinema, timeFilter, bookingsData])

  // Get unique movies from filtered bookings
  const availableMovies = useMemo(() => {
    const movieMap = new Map()
    filteredBookings.forEach((booking) => {
      const movie = booking.showtime.movie
      if (!movieMap.has(movie.movie_id)) {
        movieMap.set(movie.movie_id, movie)
      }
    })
    return Array.from(movieMap.values())
  }, [filteredBookings])

  // Calculate movie statistics
  const movieStats = useMemo(() => {
    const stats = new Map()

    filteredBookings.forEach((booking) => {
      const movie = booking.showtime.movie
      const movieId = movie.movie_id

      if (!stats.has(movieId)) {
        stats.set(movieId, {
          movie,
          totalRevenue: 0,
          totalBookings: 0,
          totalTickets: 0,
          totalShows: new Set(),
          bookingsByDate: new Map(),
          cinemas: new Set(),
        })
      }

      const movieStat = stats.get(movieId)
      // Parse total_price as a float to ensure it's a number
      const price = parseFloat(booking.total_price) || 0;
      movieStat.totalRevenue += price
      movieStat.totalBookings += 1
      movieStat.totalTickets += booking.booking_ticket.reduce((sum, ticket) => sum + ticket.ticket_quantity, 0)
      movieStat.totalShows.add(booking.showtime.showtime_id)
      movieStat.cinemas.add(booking.showtime.cinema.cinema_name)

      // Group by date for trend analysis
      const date = new Date(booking.booking_datetime).toLocaleDateString()
      movieStat.bookingsByDate.set(date, (movieStat.bookingsByDate.get(date) || 0) + price)
    })

    // Convert to array and add calculated fields
    return Array.from(stats.values())
      .map((stat) => ({
        ...stat,
        totalShows: stat.totalShows.size,
        averageBookingValue: stat.totalBookings > 0 ? stat.totalRevenue / stat.totalBookings : 0,
        averageTicketsPerBooking: stat.totalBookings > 0 ? stat.totalTickets / stat.totalBookings : 0,
        revenuePerShow: stat.totalShows > 0 ? stat.totalRevenue / stat.totalShows : 0,
        bookingTrend: Array.from(stat.bookingsByDate.entries()).map(([date, revenue]) => ({ date, revenue })),
        cinemas: Array.from(stat.cinemas),
      }))
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
  }, [filteredBookings])

  // Get selected movie details
  const selectedMovieStats = useMemo(() => {
    if (!selectedMovie || selectedMovie === "all") return null
    return movieStats.find((stat) => stat.movie.movie_id.toString() === selectedMovie)
  }, [movieStats, selectedMovie])

  const selectedCinemaName = selectedCinema === "all" ? "All Cinemas" : selectedCinema;

  return (
    <div className="movie-stats-container">
      <div className="movie-stats-header">
        <div className="movie-stats-title-section">
          <h1 className="movie-stats-title">Movie Revenue Statistics</h1>
          <p className="movie-stats-subtitle">Analyze movie performance and revenue trends</p>
        </div>

        <div className="movie-stats-filters">
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

          <div className="filter-group">
            <label className="filter-label">Time Period</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Movie</label>
            <Select value={selectedMovie} onValueChange={setSelectedMovie}>
              <SelectTrigger>
                <SelectValue placeholder="Select Movie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Movies</SelectItem>
                {availableMovies.map((movie) => (
                  <SelectItem key={movie.movie_id} value={movie.movie_id.toString()}>
                    {movie.title}
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

      {/* Movie Performance Overview */}
      <div className="overview-section">
        <h2 className="section-title">Movie Performance Overview</h2>
        <div className="overview-grid">
          {movieStats.slice(0, 6).map((stat) => (
            <Card key={stat.movie.movie_id} className="movie-overview-card">
              <CardHeader>
                <div className="movie-header">
                  <img
                    src={stat.movie.poster_image || "/placeholder.svg"}
                    alt={stat.movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <CardTitle className="movie-title">{stat.movie.title}</CardTitle>
                    <div className="movie-meta">
                      <Badge variant="secondary">{stat.movie.age_rating}+</Badge>
                      <span className="movie-runtime">{stat.movie.run_time}min</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="movie-stats-grid">
                  <div className="stat-item">
                    <DollarSign className="stat-icon" />
                    <div>
                      <div className="stat-value">{formatVND(stat.totalRevenue)}</div>
                      <div className="stat-label">Total Revenue</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Users className="stat-icon" />
                    <div>
                      <div className="stat-value">{stat.totalTickets}</div>
                      <div className="stat-label">Tickets Sold</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Calendar className="stat-icon" />
                    <div>
                      <div className="stat-value">{stat.totalShows}</div>
                      <div className="stat-label">Shows</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <BarChart3 className="stat-icon" />
                    <div>
                      <div className="stat-value">{formatVND(stat.averageBookingValue)}</div>
                      <div className="stat-label">Avg. Booking</div>
                    </div>
                  </div>
                </div>
                <Button className="view-details-btn" onClick={() => setSelectedMovie(stat.movie.movie_id.toString())}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Movie Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Comparison</CardTitle>
          <CardDescription>Compare revenue performance across movies</CardDescription>
        </CardHeader>
        <CardContent>
          <MovieComparisonChart data={movieStats.slice(0, 8)} />
        </CardContent>
      </Card>

      {/* Selected Movie Details */}
      {selectedMovieStats && (
        <div className="selected-movie-section">
          <Card>
            <CardHeader>
              <div className="selected-movie-header">
                <img
                  src={selectedMovieStats.movie.poster_url || "/placeholder.svg"}
                  alt={selectedMovieStats.movie.title}
                  className="selected-movie-poster"
                />
                <div className="selected-movie-info">
                  <CardTitle className="selected-movie-title">{selectedMovieStats.movie.title}</CardTitle>
                  <CardDescription className="selected-movie-description">
                    {selectedMovieStats.movie.description}
                  </CardDescription>
                  <div className="selected-movie-meta">
                    <Badge variant="secondary">{selectedMovieStats.movie.age_rating}+</Badge>
                    <span className="movie-detail">{selectedMovieStats.movie.run_time} minutes</span>
                    <span className="movie-detail">Director: {selectedMovieStats.movie.director.director_name}</span>
                    <span className="movie-detail">Language: {selectedMovieStats.movie.language}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="detailed-stats-grid">
                <div className="detailed-stat">
                  <DollarSign className="detailed-stat-icon" />
                  <div>
                    <div className="detailed-stat-value">${selectedMovieStats.totalRevenue.toLocaleString()}</div>
                    <div className="detailed-stat-label">Total Revenue</div>
                  </div>
                </div>
                <div className="detailed-stat">
                  <Users className="detailed-stat-icon" />
                  <div>
                    <div className="detailed-stat-value">{selectedMovieStats.totalTickets}</div>
                    <div className="detailed-stat-label">Total Tickets</div>
                  </div>
                </div>
                <div className="detailed-stat">
                  <Calendar className="detailed-stat-icon" />
                  <div>
                    <div className="detailed-stat-value">{selectedMovieStats.totalBookings}</div>
                    <div className="detailed-stat-label">Total Bookings</div>
                  </div>
                </div>
                <div className="detailed-stat">
                  <TrendingUp className="detailed-stat-icon" />
                  <div>
                    <div className="detailed-stat-value">${selectedMovieStats.revenuePerShow.toFixed(0)}</div>
                    <div className="detailed-stat-label">Revenue per Show</div>
                  </div>
                </div>
                <div className="detailed-stat">
                  <BarChart3 className="detailed-stat-icon" />
                  <div>
                    <div className="detailed-stat-value">{selectedMovieStats.averageTicketsPerBooking.toFixed(1)}</div>
                    <div className="detailed-stat-label">Avg. Tickets/Booking</div>
                  </div>
                </div>
                <div className="detailed-stat">
                  <Film className="detailed-stat-icon" />
                  <div>
                    <div className="detailed-stat-value">{selectedMovieStats.cinemas.length}</div>
                    <div className="detailed-stat-label">Cinemas Showing</div>
                  </div>
                </div>
              </div>

              <div className="movie-performance-chart">
                <h3 className="chart-title">Revenue Trend</h3>
                <MoviePerformanceChart data={selectedMovieStats.bookingTrend} />
              </div>

              <div className="cinema-list">
                <h3 className="cinema-list-title">Showing at Cinemas:</h3>
                <div className="cinema-badges">
                  {selectedMovieStats.cinemas.map((cinema, index) => (
                    <Badge key={index} variant="outline">
                      {cinema}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {movieStats.length === 0 && (
        <Card>
          <CardContent className="empty-state">
            <Film className="empty-state-icon" />
            <h3 className="empty-state-title">No Movie Data</h3>
            <p className="empty-state-description">
              No movie statistics available for the selected filters. Try adjusting your cinema or time period
              selection. {bookingsData.length === 0 ? "No booking data loaded." : "Booking data is available, but filters might be too restrictive."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
