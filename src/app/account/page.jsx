"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Search, Edit, Trash2, Crown, Shield, User, Mail, Phone, Calendar, BadgeIcon as IdCard } from "lucide-react"
import AccountModal from "@/components/modal/account-modal"
import { useGetAccount } from "@/hooks/useGetAccount"
import { useGetRole } from "@/hooks/useGetRole"
import { useGetMembership } from "@/hooks/useGetMembership"
import ConfirmDeleteModal from "@/components/modal/confirm-delete-modal"
import { usePostAccount } from "@/hooks/usePostAccount"
import { useToastNotify } from "@/utils/toast"
import "@/styles/account-management.css"

export default function AccountManagementPage() {
  const [accounts, setAccounts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [membershipFilter, setMembershipFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState(null)

  const { account } = useGetAccount()
  const { rolesData } = useGetRole()
  const { membershipsData } = useGetMembership()
  const { Delete_Account, loading, response, error } = usePostAccount()

  useToastNotify(response, error)

  // Update accounts state when data is loaded
  useEffect(() => {
    if (account && account.length > 0) {
      setAccounts(account)
    }
  }, [account])

  // Filter and search accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        account.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.phone_number.includes(searchTerm) ||
        account.id_number.includes(searchTerm)

      const matchesRole = roleFilter === "all" || account.role.role_name === roleFilter
      const matchesMembership =
        membershipFilter === "all" || account.membership_type.membership_name === membershipFilter
      const matchesGender = genderFilter === "all" || account.gender.toString() === genderFilter

      return matchesSearch && matchesRole && matchesMembership && matchesGender
    })
  }, [accounts, searchTerm, roleFilter, membershipFilter, genderFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage)
  const paginatedAccounts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAccounts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAccounts, currentPage, itemsPerPage])

  // Statistics
  const stats = useMemo(() => {
    const totalAccounts = accounts.length
    const adminCount = accounts.filter((acc) => acc.role.role_name === "admin").length
    const userCount = accounts.filter((acc) => acc.role.role_name === "user").length
    const vipCount = accounts.filter((acc) => acc.membership_type.membership_name === "VIP").length

    return { totalAccounts, adminCount, userCount, vipCount }
  }, [accounts])

  const handleDeleteClick = (account) => {
    setAccountToDelete(account)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    await Delete_Account(accountToDelete.account_id)
    setAccounts(accounts.filter((acc) => acc.account_id !== accountToDelete.account_id))
    setDeleteConfirmOpen(false)
    setAccountToDelete(null)
  }

  const handleSaveAccount = (accountData) => {
    // Add new account
    const newAccount = {
      ...accountData,
      account_id: Math.max(...accounts.map((acc) => acc.account_id)) + 1,
    }
    setAccounts([...accounts, newAccount])
      
    setIsModalOpen(false)
  }

  const getMembershipBadgeVariant = (membershipName) => {
    switch (membershipName.toLowerCase()) {
      case "vip":
        return "default"
      case "gold":
        return "secondary"
      case "silver":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleBadgeVariant = (roleName) => {
    return roleName === "admin" ? "destructive" : "secondary"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="account-management-container">
      <div className="account-management-header">
        <div className="account-management-title-section">
          <h1 className="account-management-title">Account Management</h1>
          <p className="account-management-subtitle">Manage user accounts, roles, and memberships</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="add-account-btn">
          <UserPlus className="btn-icon" />
          Add Account
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card>
          <CardHeader className="stat-card-header">
            <CardTitle className="stat-title">Total Accounts</CardTitle>
            <Users className="stat-icon" />
          </CardHeader>
          <CardContent>
            <div className="stat-value">{stats.totalAccounts}</div>
            <p className="stat-description">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="stat-card-header">
            <CardTitle className="stat-title">Administrators</CardTitle>
            <Shield className="stat-icon" />
          </CardHeader>
          <CardContent>
            <div className="stat-value">{stats.adminCount}</div>
            <p className="stat-description">Admin accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="stat-card-header">
            <CardTitle className="stat-title">Regular Users</CardTitle>
            <User className="stat-icon" />
          </CardHeader>
          <CardContent>
            <div className="stat-value">{stats.userCount}</div>
            <p className="stat-description">User accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="stat-card-header">
            <CardTitle className="stat-title">VIP Members</CardTitle>
            <Crown className="stat-icon" />
          </CardHeader>
          <CardContent>
            <div className="stat-value">{stats.vipCount}</div>
            <p className="stat-description">Premium members</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Table */}
      <Card>
        <CardHeader className="accounts-card-header">
          <div className="accounts-header-left">
            <CardTitle>Accounts ({filteredAccounts.length})</CardTitle>
            <CardDescription>
              Showing {paginatedAccounts.length} of {filteredAccounts.length} accounts
            </CardDescription>
          </div>
          
          <div className="accounts-header-right">
            <div className="header-filters">
              <div className="header-search-group">
                <div className="search-input-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="header-search-input"
                  />
                </div>
              </div>

              <div className="header-filter-group">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="header-select">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {rolesData.map((role) => (
                      <SelectItem key={role.role_id} value={role.role_name}>
                        {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="header-filter-group">
                <Select value={membershipFilter} onValueChange={setMembershipFilter}>
                  <SelectTrigger className="header-select">
                    <SelectValue placeholder="Membership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Memberships</SelectItem>
                    {membershipsData.map((membership) => (
                      <SelectItem key={membership.membership_id} value={membership.membership_name}>
                        {membership.membership_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="header-filter-group">
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger className="header-select">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="0">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="accounts-table-wrapper">
            <table className="accounts-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header">ID</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Contact</th>
                  <th className="table-header">Personal Info</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Membership</th>
                  <th className="table-header table-header-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAccounts.map((account) => (
                  <tr key={account.account_id} className="table-row">
                    <td className="table-cell table-cell-bold">#{account.account_id}</td>
                    <td className="table-cell">
                      <div className="account-name-cell">
                        <div className="account-name">{account.full_name}</div>
                        <div className="account-email">{account.email}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="contact-info">
                        <div className="contact-item">
                          <Phone className="contact-icon" />
                          {account.phone_number}
                        </div>
                        <div className="contact-item">
                          <Mail className="contact-icon" />
                          {account.email}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="personal-info">
                        <div className="personal-item">
                          <IdCard className="personal-icon" />
                          {account.id_number}
                        </div>
                        <div className="personal-item">
                          <Calendar className="personal-icon" />
                          {formatDate(account.birthday)}
                        </div>
                        <div className="personal-item">
                          <User className="personal-icon" />
                          {account.gender === 1 ? "Male" : "Female"}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <Badge variant={getRoleBadgeVariant(account.role.role_name)}>
                        {account.role.role_name === "admin" && <Shield className="badge-icon" />}
                        {account.role.role_name === "user" && <User className="badge-icon" />}
                        {account.role.role_name}
                      </Badge>
                    </td>
                    <td className="table-cell">
                      <div className="membership-cell">
                        <Badge variant={getMembershipBadgeVariant(account.membership_type.membership_name)}>
                          {account.membership_type.membership_name === "VIP" && <Crown className="badge-icon" />}
                          {account.membership_type.membership_name}
                        </Badge>
                        <div className="discount-rate">{account.membership_type.discount_rate}% discount</div>
                      </div>
                    </td>
                    <td className="table-cell table-cell-center">
                      <div className="action-buttons">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(account)}
                          className="action-btn"
                        >
                          <Trash2 className="action-icon" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Modal */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAccount}
        membershipsData={membershipsData}
        rolesData={rolesData}
      />

      <ConfirmDeleteModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        accountName={accountToDelete?.full_name}
        loading={loading}
        error={error}
      />
    </div>
  )
}
