"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X, Save, User } from "lucide-react"
import "@/styles/account-modal.css"

export default function AccountModal({ isOpen, onClose, onSave, membershipsData, rolesData }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    id_number: "",
    birthday: "",
    gender: 1,
    role: { role_id: 2, role_name: "user" },
    membership_type: { membership_id: 1, membership_name: "bronze", discount_rate: 0 },
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        id_number: "",
        birthday: "",
        gender: 1,
        role: { role_id: 2, role_name: "user" },
        membership_type: { membership_id: 1, membership_name: "bronze", discount_rate: 0 },
    })
    setErrors({})
  }, [isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required"
    }

    if (!formData.id_number.trim()) {
      newErrors.id_number = "ID number is required"
    }

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleRoleChange = (roleName) => {
    const selectedRole = rolesData.find((role) => role.role_name === roleName)
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }))
  }

  const handleMembershipChange = (membershipName) => {
    const selectedMembership = membershipsData.find(
      (membership) => membership.membership_name === membershipName,
    )
    setFormData((prev) => ({
      ...prev,
      membership_type: selectedMembership,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <Card className="modal-card">
          <CardHeader className="modal-header">
            <Button variant="ghost" onClick={onClose} className="close-btn">
              <X className="close-icon" />
            </Button>
            <div className="modal-title-section">
              <User className="modal-icon" />
              <CardTitle>Add New Account</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="account-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    className={`form-input ${errors.full_name ? "form-input-error" : ""}`}
                    placeholder="Enter full name"
                  />
                  {errors.full_name && <span className="error-message">{errors.full_name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`form-input ${errors.email ? "form-input-error" : ""}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    className={`form-input ${errors.phone_number ? "form-input-error" : ""}`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">ID Number *</label>
                  <input
                    type="text"
                    value={formData.id_number}
                    onChange={(e) => handleInputChange("id_number", e.target.value)}
                    className={`form-input ${errors.id_number ? "form-input-error" : ""}`}
                    placeholder="Enter ID number"
                  />
                  {errors.id_number && <span className="error-message">{errors.id_number}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Birthday *</label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => handleInputChange("birthday", e.target.value)}
                    className={`form-input ${errors.birthday ? "form-input-error" : ""}`}
                  />
                  {errors.birthday && <span className="error-message">{errors.birthday}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <Select
                    value={formData.gender === 1 ? "Male" : "Female"}
                    onValueChange={(value) => handleInputChange("gender", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="0">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <Select value={formData.role.role_name} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rolesData.map((role) => (
                        <SelectItem key={role.role_id} value={role.role_name}>
                          {role.role_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label">Membership Type</label>
                  <Select
                    value={formData.membership_type.membership_name}
                    onValueChange={handleMembershipChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipsData.map((membership) => (
                        <SelectItem key={membership.membership_id} value={membership.membership_name}>
                          {membership.membership_name} ({membership.discount_rate}% discount)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="form-actions">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="save-btn">
                  <Save className="btn-icon" />
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
