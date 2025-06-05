"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import "@/styles/select.css"

export function Select({ children, value, onValueChange, ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  const selectRef = useRef(null)

  useEffect(() => {
    setSelectedValue(value || "")
  }, [value])

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (newValue) => {
    setSelectedValue(newValue)
    setIsOpen(false)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  // Find the display text for the selected value
  const getDisplayText = () => {
    if (!selectedValue) {
      // Find SelectValue component for placeholder
      const findSelectValue = (children) => {
        if (Array.isArray(children)) {
          for (const child of children) {
            if (child?.type === SelectValue) {
              return child.props.placeholder || "Select an option"
            }
            if (child?.props?.children) {
              const result = findSelectValue(child.props.children)
              if (result) return result
            }
          }
        } else if (children?.type === SelectValue) {
          return children.props.placeholder || "Select an option"
        } else if (children?.props?.children) {
          return findSelectValue(children.props.children)
        }
        return "Select an option"
      }
      return findSelectValue(children)
    }

    // Find the text for the selected value
    const findSelectedText = (children) => {
      if (Array.isArray(children)) {
        for (const child of children) {
          if (child?.type === SelectItem && child.props.value === selectedValue) {
            return child.props.children
          }
          if (child?.props?.children) {
            const result = findSelectedText(child.props.children)
            if (result) return result
          }
        }
      } else if (children?.type === SelectItem && children.props.value === selectedValue) {
        return children.props.children
      } else if (children?.props?.children) {
        return findSelectedText(children.props.children)
      }
      return selectedValue
    }
    return findSelectedText(children)
  }

  return (
    <div className="select-container" ref={selectRef} {...props}>
      <button
        type="button"
        className={`select-trigger ${isOpen ? "select-trigger-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select-trigger-content">{getDisplayText()}</span>
        <ChevronDown className={`select-trigger-icon ${isOpen ? "select-trigger-icon-open" : ""}`} />
      </button>

      {isOpen && (
        <div className="select-content">
          {React.Children.map(children, (child) => {
            if (child?.type === SelectContent) {
              return React.Children.map(child.props.children, (item) => {
                if (item?.type === SelectItem) {
                  return (
                    <div
                      key={item.props.value}
                      className={`select-item ${item.props.value === selectedValue ? "select-item-selected" : ""}`}
                      onClick={() => handleSelect(item.props.value)}
                    >
                      {item.props.children}
                    </div>
                  )
                }
                return item
              })
            }
            return null
          })}
        </div>
      )}
    </div>
  )
}

export function SelectTrigger({ children, className = "", ...props }) {
  // This component is now handled internally by Select
  return null
}

export function SelectContent({ children, className = "", ...props }) {
  // This component is now handled internally by Select
  return children
}

export function SelectItem({ children, value, className = "", ...props }) {
  // This component is now handled internally by Select
  return children
}

export function SelectValue({ placeholder, className = "", ...props }) {
  // This component is now handled internally by Select
  return null
}
