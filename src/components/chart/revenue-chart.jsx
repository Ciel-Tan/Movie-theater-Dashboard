"use client"

import { useEffect, useRef } from "react"
import "@/styles/revenue-chart.css"
import { formatVND } from "@/utils/format"

export default function RevenueChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sort data by date in ascending order
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Set up dimensions with better spacing
    const padding = { top: 80, right: 40, bottom: 30, left: 80 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Find max revenue for scaling
    const maxRevenue = Math.max(...data.map((d) => d.revenue))

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

    // Calculate bar dimensions
    const barWidth = (chartWidth / sortedData.length) * 0.8
    const barSpacing = (chartWidth / sortedData.length) * 0.2

    sortedData.forEach((item, index) => {
      const barHeight = (item.revenue / maxRevenue) * chartHeight
      const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2
      const y = padding.top + chartHeight - barHeight

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#1e40af")

      // Draw bar shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(x + 2, y + 2, barWidth, barHeight)

      // Draw main bar
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add bar border
      ctx.strokeStyle = "#2563eb"
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, barWidth, barHeight)

      // Value label with background
      const valueText = `${formatVND(item.revenue)}`
      ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      const textMetrics = ctx.measureText(valueText)
      const labelPadding = 6
      const labelY = y - 10

      // Label background
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(
        x + barWidth / 2 - textMetrics.width / 2 - labelPadding,
        labelY - 12 - labelPadding,
        textMetrics.width + labelPadding * 2,
        12 + labelPadding * 2,
        4,
      )
      ctx.fill()
      ctx.stroke()

      // Value text
      ctx.fillStyle = "#1f2937"
      ctx.fillText(valueText, x + barWidth / 2, labelY)

      // Date label with better formatting
      ctx.fillStyle = "#6b7280"
      ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      // Format date nicely
      const date = new Date(item.date)
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })

      ctx.fillText(formattedDate, x + barWidth / 2, padding.top + chartHeight + 15)
    })

    // Chart title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Daily Revenue", canvas.width / 2, 10)
  }, [data])

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} width={600} height={300} className="chart-canvas" />
    </div>
  )
}
