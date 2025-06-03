"use client"

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

  // Convert children to array if it's not already
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className="select-container" ref={selectRef} {...props}>
      {childrenArray.map((child, index) => {
        if (child.type === SelectTrigger) {
          return {
            ...child,
            key: index,
            props: {
              ...child.props,
              onClick: () => setIsOpen(!isOpen),
              isOpen,
              selectedValue,
            },
          }
        }
        if (child.type === SelectContent) {
          return {
            ...child,
            key: index,
            props: {
              ...child.props,
              isOpen,
              onSelect: handleSelect,
              selectedValue,
            },
          }
        }
        return child
      })}
    </div>
  )
}

export function SelectTrigger({ children, onClick, isOpen, selectedValue, className = "", ...props }) {
  // Convert children to array and find SelectValue
  const childrenArray = Array.isArray(children) ? children : [children]
  const selectValueChild = childrenArray.find((child) => child?.type === SelectValue)
  const placeholder = selectValueChild?.props?.placeholder || "Select an option"

  return (
    <button
      type="button"
      className={`select-trigger ${isOpen ? "select-trigger-open" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="select-trigger-content">{selectedValue || placeholder}</span>
      <ChevronDown className={`select-trigger-icon ${isOpen ? "select-trigger-icon-open" : ""}`} />
    </button>
  )
}

export function SelectContent({ children, isOpen, onSelect, selectedValue, className = "", ...props }) {
  if (!isOpen) return null

  // Convert children to array
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className={`select-content ${className}`} {...props}>
      {childrenArray.map((child, index) => {
        if (child?.type === SelectItem) {
          return {
            ...child,
            key: child.props?.value || index,
            props: {
              ...child.props,
              onSelect,
              isSelected: child.props?.value === selectedValue,
            },
          }
        }
        return child
      })}
    </div>
  )
}

export function SelectItem({ children, value, onSelect, isSelected, className = "", ...props }) {
  return (
    <div
      className={`select-item ${isSelected ? "select-item-selected" : ""} ${className}`}
      onClick={() => onSelect && onSelect(value)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectValue({ placeholder, className = "", ...props }) {
  return <span className={`select-value ${className}`} {...props}></span>
}
