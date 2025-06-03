"use client"

import { useEffect, useRef } from "react"
import "@/styles/movie-comparison-chart.css"
import { formatVND } from "@/utils/format"

export default function MovieComparisonChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up dimensions with better spacing
    const padding = { top: 100, right: 40, bottom: 50, left: 80 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Find max revenue for scaling
    const maxRevenue = Math.max(...data.map((d) => d.totalRevenue))
    // Handle case when maxRevenue is 0 to prevent division by zero
    const adjustedMaxRevenue = maxRevenue === 0 ? 1 : maxRevenue

    // Draw background grid
    ctx.strokeStyle = "#f9fafb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Y-axis labels
      const value = maxRevenue - (i / 5) * maxRevenue
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${formatVND(value)}`, padding.left - 10, y)
    }

    // Draw axes
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 2

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.stroke()

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top + chartHeight)
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
    ctx.stroke()

    // Modern color palette
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

    // Calculate bar dimensions
    const barWidth = (chartWidth / data.length) * 0.7
    const barSpacing = (chartWidth / data.length) * 0.3

    data.forEach((item, index) => {
      const barHeight = (item.totalRevenue / adjustedMaxRevenue) * chartHeight
      const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2
      const y = padding.top + chartHeight - barHeight

      // Create gradient for each bar only if y and barHeight are finite
      let gradient;
      const baseColor = colors[index % colors.length]
      if (isFinite(y) && isFinite(barHeight)) {
        gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
        gradient.addColorStop(0, baseColor)
        gradient.addColorStop(1, baseColor + "80") // Add transparency
      } else {
        gradient = baseColor; // Fallback to solid color if values are not finite
      }

      // Draw bar shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(x + 2, y + 2, barWidth, barHeight)

      // Draw main bar
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add bar border
      ctx.strokeStyle = baseColor
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, barWidth, barHeight)

      // Value label with background
      const valueText = `${formatVND(item.totalRevenue)}`
      ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      const textMetrics = ctx.measureText(valueText)
      const labelPadding = 8
      const labelY = y - 10

      // Label background
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(
        x + barWidth / 2 - textMetrics.width / 2 - labelPadding,
        labelY - 14 - labelPadding,
        textMetrics.width + labelPadding * 2,
        14 + labelPadding * 2,
        6,
      )
      ctx.fill()
      ctx.stroke()

      // Value text
      ctx.fillStyle = "#1f2937"
      ctx.fillText(valueText, x + barWidth / 2, labelY)

      // Movie title with better formatting
      const title = item.movie.title
      const maxTitleLength = 12
      const displayTitle = title.length > maxTitleLength ? title.substring(0, maxTitleLength) + "..." : title

      // Title background
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1

      const titleMetrics = ctx.measureText(displayTitle)
      const titlePadding = 6
      const titleY = padding.top + chartHeight + 25

      ctx.beginPath()
      ctx.roundRect(
        x + barWidth / 2 - titleMetrics.width / 2 - titlePadding,
        titleY - titlePadding,
        titleMetrics.width + titlePadding * 2,
        16 + titlePadding * 2,
        4,
      )
      ctx.fill()
      ctx.stroke()

      // Movie title text
      ctx.fillStyle = "#374151"
      ctx.font = "600 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(displayTitle, x + barWidth / 2, titleY + 8)

      // Additional stats below title
      const statsText = `${item.totalTickets} tickets • ${item.totalShows} shows`
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(statsText, x + barWidth / 2, titleY + 25)
    })

    // Chart title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Movie Revenue Comparison", canvas.width / 2, 15)

    // Y-axis label
    // ctx.fillStyle = "#6b7280"
    // ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    // ctx.textAlign = "center"
    // ctx.textBaseline = "middle"
    // ctx.save()
    // ctx.translate(20, canvas.height / 2)
    // ctx.rotate(-Math.PI / 2)
    // ctx.fillText("Revenue (VND)", 0, 0)
    // ctx.restore()
  }, [data])

  return (
    <div className="comparison-chart-container">
      <canvas ref={canvasRef} width={900} height={450} className="comparison-chart-canvas" />
    </div>
  )
}
