"use client"

import { useEffect, useRef } from "react"
import "@/styles/movie-revenue-chart.css"
import { formatVND } from "@/utils/format"

export default function MovieRevenueChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate total revenue
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)

    // Colors for pie slices
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let currentAngle = -Math.PI / 2 // Start from top

    data.forEach((item, index) => {
      const sliceAngle = (item.revenue / totalRevenue) * 2 * Math.PI

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius + 20)
      const labelY = centerY + Math.sin(labelAngle) * (radius + 20)

      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      // Truncate long movie titles
      const movieTitle = item.movie.length > 15 ? item.movie.substring(0, 15) + "..." : item.movie
      ctx.fillText(movieTitle, labelX, labelY)

      // Draw revenue amount
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "#6b7280"
      ctx.fillText(`${formatVND(item.revenue)}`, labelX, labelY + 15)

      currentAngle += sliceAngle
    })
  }, [data])

  return (
    <div className="movie-chart-container">
      <canvas ref={canvasRef} width={400} height={256} className="movie-chart-canvas" />
    </div>
  )
}
