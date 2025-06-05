"use client"

import { useEffect, useRef } from "react"
import "@/styles/year-comparison-chart.css"
import { formatVND } from "@/utils/format"

export default function YearComparisonChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up dimensions with better spacing
    const padding = { top: 100, right: 40, bottom: 30, left: 80 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Find max revenue for scaling
    const maxRevenue = Math.max(...data.map((d) => d.totalRevenue))

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

    // Color scheme for different years
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"]

    // Calculate bar dimensions
    const barWidth = (chartWidth / data.length) * 0.7
    const barSpacing = (chartWidth / data.length) * 0.3

    data.forEach((item, index) => {
      const barHeight = (item.totalRevenue / maxRevenue) * chartHeight
      const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2
      const y = padding.top + chartHeight - barHeight

      // Create gradient for bar only if y and barHeight are finite numbers
      let gradient = colors[index % colors.length];
      if (Number.isFinite(y) && Number.isFinite(barHeight)) {
        gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
        const baseColor = colors[index % colors.length]
        gradient.addColorStop(0, baseColor)
        gradient.addColorStop(1, baseColor + "80")
      }

      // Draw bar shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(x + 2, y + 2, barWidth, barHeight)

      // Draw main bar
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add bar border
      ctx.strokeStyle = colors[index % colors.length]
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

      // Year label
      ctx.fillStyle = "#374151"
      ctx.font = "600 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(item.year, x + barWidth / 2, padding.top + chartHeight + 15)

      // Bookings count
      ctx.fillStyle = "#9ca3af"
      ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(`${item.totalBookings} bookings`, x + barWidth / 2, padding.top + chartHeight + 35)
    })

    // Chart title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Total Revenue by Year", canvas.width / 2, 15)
  }, [data])

  return (
    <div className="year-comparison-chart-container">
      <canvas ref={canvasRef} width={600} height={400} className="year-comparison-chart-canvas" />
    </div>
  )
}
