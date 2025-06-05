// Mock account data
export const mockAccounts = [
  {
    account_id: 1,
    full_name: "admin",
    gender: 1,
    birthday: "2025-02-24",
    id_number: "048203001868",
    phone_number: "0795049420",
    email: "admin@gmail.com",
    role: {
      role_id: 1,
      role_name: "admin",
    },
    membership_type: {
      discount_rate: 20,
      membership_id: 4,
      membership_name: "VIP",
    },
  },
  {
    account_id: 2,
    full_name: "Ngo Duy Tan",
    gender: 1,
    birthday: "2003-07-21",
    id_number: "048203001868",
    phone_number: "0795049420",
    email: "ngoduytan21072003@gmail.com",
    role: {
      role_id: 2,
      role_name: "user",
    },
    membership_type: {
      discount_rate: 0,
      membership_id: 1,
      membership_name: "bronze",
    },
  },
  {
    account_id: 11,
    full_name: "sieutest",
    gender: 1,
    birthday: "2025-05-29",
    id_number: "0123456789",
    phone_number: "0767011659",
    email: "sieutest@gmail.com",
    role: {
      role_id: 2,
      role_name: "user",
    },
    membership_type: {
      discount_rate: 0,
      membership_id: 1,
      membership_name: "bronze",
    },
  },
  {
    account_id: 12,
    full_name: "tan",
    gender: 1,
    birthday: "2003-07-21",
    id_number: "0123456789",
    phone_number: "0767011659",
    email: "tan@gmail.com",
    role: {
      role_id: 2,
      role_name: "user",
    },
    membership_type: {
      discount_rate: 0,
      membership_id: 1,
      membership_name: "bronze",
    },
  },
  {
    account_id: 13,
    full_name: "tan2",
    gender: 0,
    birthday: "2003-07-21",
    id_number: "0123456789",
    phone_number: "0767011659",
    email: "tan2@gmail.com",
    role: {
      role_id: 2,
      role_name: "user",
    },
    membership_type: {
      discount_rate: 0,
      membership_id: 1,
      membership_name: "bronze",
    },
  },
  {
    account_id: 14,
    full_name: "tan3",
    gender: 0,
    birthday: "2003-07-21",
    id_number: "0123456789",
    phone_number: "0767011659",
    email: "tan3@gmail.com",
    role: {
      role_id: 2,
      role_name: "user",
    },
    membership_type: {
      discount_rate: 0,
      membership_id: 1,
      membership_name: "bronze",
    },
  },
]

// Mock membership types
export const membershipTypes = [
  { membership_id: 1, membership_name: "bronze", discount_rate: 0 },
  { membership_id: 2, membership_name: "silver", discount_rate: 5 },
  { membership_id: 3, membership_name: "gold", discount_rate: 10 },
  { membership_id: 4, membership_name: "VIP", discount_rate: 20 },
]

// Mock roles
export const roles = [
  { role_id: 1, role_name: "admin" },
  { role_id: 2, role_name: "user" },
]
