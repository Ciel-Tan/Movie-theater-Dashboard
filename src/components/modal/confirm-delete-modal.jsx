"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"
import "@/styles/confirm-delete-modal.css"
import Loader from "../loading/Loader"

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, accountName, loading, error }) {
  if (!isOpen) return null

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-container">
        <Card className="confirm-modal-card">
          <CardHeader className="confirm-modal-header">
            <Button variant="ghost" onClick={onClose} className="close-btn">
              <X className="close-icon" />
            </Button>
            <div className="confirm-modal-title-section">
              <AlertTriangle className="confirm-modal-icon" />
              <CardTitle>Confirm Delete</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="confirm-modal-content">
              <p className="confirm-modal-message">
                Are you sure you want to delete the account <span className="account-name">{accountName}</span>?
              </p>
              <p className="confirm-modal-warning">This action cannot be undone.</p>

              <div className="confirm-modal-actions">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm} disabled={loading}>
                  {loading ? <Loader /> : "Delete Account"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
