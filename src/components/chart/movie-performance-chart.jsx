"use client"

import { useEffect, useRef } from "react"
import "@/styles/movie-performance-chart.css"
import { formatVND } from "@/utils/format"

export default function MoviePerformanceChart({ data }) {
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
    const padding = { top: 100, right: 40, bottom: 50, left: 80 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Find max revenue for scaling
    const maxRevenue = Math.max(...data.map((d) => d.revenue))
    const minRevenue = Math.min(...data.map((d) => d.revenue))
    const revenueRange = maxRevenue - minRevenue
    // Handle case when all revenues are the same to prevent division by zero
    const adjustedRange = revenueRange === 0 ? 1 : revenueRange

    // Draw background grid
    ctx.strokeStyle = "#f3f4f6"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Y-axis labels
      const value = maxRevenue - (i / 5) * revenueRange
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${formatVND(value)}`, padding.left - 10, y)
    }

    // Vertical grid lines
    sortedData.forEach((item, index) => {
      const x = padding.left + (index / (sortedData.length - 1)) * chartWidth
      ctx.strokeStyle = "#f3f4f6"
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, padding.top + chartHeight)
      ctx.stroke()
    })

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

    if (sortedData.length === 0) return

    // Create gradient for line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight)
    gradient.addColorStop(0, "#3b82f6")
    gradient.addColorStop(1, "#1d4ed8")

    // Draw area under the line
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top + chartHeight)

    sortedData.forEach((item, index) => {
      const x = padding.left + (index / (sortedData.length - 1)) * chartWidth
      const y = padding.top + chartHeight - ((item.revenue - minRevenue) / adjustedRange) * chartHeight

      if (index === 0) {
        ctx.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
    ctx.closePath()
    ctx.fill()

    // Draw main line
    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()

    sortedData.forEach((item, index) => {
      const x = padding.left + (index / (sortedData.length - 1)) * chartWidth
      const y = padding.top + chartHeight - ((item.revenue - minRevenue) / adjustedRange) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw data points with better styling
    sortedData.forEach((item, index) => {
      const x = padding.left + (index / (sortedData.length - 1)) * chartWidth
      const y = padding.top + chartHeight - ((item.revenue - minRevenue) / adjustedRange) * chartHeight

      // Outer circle (shadow)
      ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fill()

      // Inner circle
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fill()

      // White center
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, 2 * Math.PI)
      ctx.fill()

      // Value labels with background
      const labelText = `${formatVND(item.revenue)}`
      ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      const textMetrics = ctx.measureText(labelText)
      const labelPadding = 6
      const labelY = y - 15

      // Label background
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(
        x - textMetrics.width / 2 - labelPadding,
        labelY - 12 - labelPadding,
        textMetrics.width + labelPadding * 2,
        12 + labelPadding * 2,
        4,
      )
      ctx.fill()
      ctx.stroke()

      // Label text
      ctx.fillStyle = "#1f2937"
      ctx.fillText(labelText, x, labelY)
    })

    // X-axis labels with better positioning
    sortedData.forEach((item, index) => {
      const x = padding.left + (index / (sortedData.length - 1)) * chartWidth

      ctx.fillStyle = "#6b7280"
      ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      // Format date nicely
      const date = new Date(item.date)
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })

      ctx.fillText(formattedDate, x, padding.top + chartHeight + 15)
    })

    // Chart title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Daily Revenue Trend", canvas.width / 2, 10)
  }, [data])

  return (
    <div className="performance-chart-container">
      <canvas ref={canvasRef} width={800} height={350} className="performance-chart-canvas" />
    </div>
  )
}
