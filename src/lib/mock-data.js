// Mock cinema data
export const mockCinemas = [
  {
    cinema_id: 1,
    cinema_name: "Grand Cinema Downtown",
    address: {
      address_id: 1,
      address_name: "123 Main Street, Downtown",
    },
  },
  {
    cinema_id: 2,
    cinema_name: "Sunset Mall Cinema",
    address: {
      address_id: 2,
      address_name: "456 Sunset Boulevard, West Side",
    },
  },
  {
    cinema_id: 3,
    cinema_name: "Metro Plaza Theater",
    address: {
      address_id: 3,
      address_name: "789 Metro Plaza, City Center",
    },
  },
]

// Mock booking data with total_bill calculated
export const mockBookings = [
  {
    booking_id: 1,
    booking_datetime: "2025-05-25T19:30:00.000Z",
    booking_fee: 5.0,
    total_bill: 47.0, // booking_fee + (2 * 18.00) + (1 * 8.00)
    account: {
      account_id: 1,
      full_name: "John Smith",
      email: "john.smith@example.com",
      gender: true,
      birthday: "1990-03-15",
      id_number: "ID123456789",
      phone_number: "+1234567890",
      role: {
        role_id: 1,
        role_name: "Customer",
      },
      membership_type: {
        membership_id: 1,
        membership_name: "Gold",
        discount_rate: 0.1,
      },
    },
    showtime: {
      showtime_id: 1,
      movie: {
        movie_id: 1,
        title: "Avatar: The Way of Water",
        poster_image: "avatar_poster.jpg",
        poster_url: "/placeholder.svg?height=300&width=200",
        description: "Jake Sully lives with his newfound family formed on the planet of Pandora.",
        age_rating: 13,
        run_time: 192,
        release_date: "2022-12-16",
        trailer_link: "https://youtube.com/watch?v=example",
        language: "English",
        director: {
          director_id: 1,
          director_name: "James Cameron",
        },
      },
      cinema: {
        cinema_id: 1,
        cinema_name: "Grand Cinema Downtown",
        address: {
          address_id: 1,
          address_name: "123 Main Street, Downtown",
        },
      },
      room: {
        room_id: 1,
        room_name: "Theater 1",
      },
      show_datetime: "2025-05-25T20:00:00.000Z",
    },
    booking_ticket: [
      {
        ticket_quantity: 2,
        ticket: {
          ticket_id: 1,
          ticket_name: "Adult",
          ticket_price: 18.0,
        },
      },
      {
        ticket_quantity: 1,
        ticket: {
          ticket_id: 2,
          ticket_name: "Child",
          ticket_price: 8.0,
        },
      },
    ],
    booking_seat: [
      {
        seat_id: 1,
        seat_location: "A1",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
      {
        seat_id: 2,
        seat_location: "A2",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
    ],
  },
  {
    booking_id: 2,
    booking_datetime: "2025-05-24T18:15:00.000Z",
    booking_fee: 5.0,
    total_bill: 41.0, // booking_fee + (2 * 18.00)
    account: {
      account_id: 2,
      full_name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      gender: false,
      birthday: "1985-07-22",
      id_number: "ID987654321",
      phone_number: "+1987654321",
      role: {
        role_id: 1,
        role_name: "Customer",
      },
      membership_type: {
        membership_id: 2,
        membership_name: "Silver",
        discount_rate: 0.05,
      },
    },
    showtime: {
      showtime_id: 2,
      movie: {
        movie_id: 2,
        title: "Top Gun: Maverick",
        poster_image: "topgun_poster.jpg",
        poster_url: "/placeholder.svg?height=300&width=200",
        description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
        age_rating: 13,
        run_time: 130,
        release_date: "2022-05-27",
        trailer_link: "https://youtube.com/watch?v=example2",
        language: "English",
        director: {
          director_id: 2,
          director_name: "Joseph Kosinski",
        },
      },
      cinema: {
        cinema_id: 1,
        cinema_name: "Grand Cinema Downtown",
        address: {
          address_id: 1,
          address_name: "123 Main Street, Downtown",
        },
      },
      room: {
        room_id: 2,
        room_name: "Theater 2",
      },
      show_datetime: "2025-05-24T19:00:00.000Z",
    },
    booking_ticket: [
      {
        ticket_quantity: 2,
        ticket: {
          ticket_id: 1,
          ticket_name: "Adult",
          ticket_price: 18.0,
        },
      },
    ],
    booking_seat: [
      {
        seat_id: 3,
        seat_location: "B5",
        seat_type: {
          seat_type_id: 2,
          seat_type_name: "Premium",
        },
      },
      {
        seat_id: 4,
        seat_location: "B6",
        seat_type: {
          seat_type_id: 2,
          seat_type_name: "Premium",
        },
      },
    ],
  },
  {
    booking_id: 3,
    booking_datetime: "2025-05-23T16:45:00.000Z",
    booking_fee: 5.0,
    total_bill: 59.0, // booking_fee + (3 * 18.00)
    account: {
      account_id: 3,
      full_name: "Michael Brown",
      email: "michael.brown@example.com",
      gender: true,
      birthday: "1992-11-08",
      id_number: "ID456789123",
      phone_number: "+1456789123",
      role: {
        role_id: 1,
        role_name: "Customer",
      },
      membership_type: {
        membership_id: 3,
        membership_name: "Bronze",
        discount_rate: 0,
      },
    },
    showtime: {
      showtime_id: 3,
      movie: {
        movie_id: 3,
        title: "Spider-Man: No Way Home",
        poster_image: "spiderman_poster.jpg",
        poster_url: "/placeholder.svg?height=300&width=200",
        description: "Spider-Man's identity is revealed and he asks Doctor Strange for help.",
        age_rating: 13,
        run_time: 148,
        release_date: "2021-12-17",
        trailer_link: "https://youtube.com/watch?v=example3",
        language: "English",
        director: {
          director_id: 3,
          director_name: "Jon Watts",
        },
      },
      cinema: {
        cinema_id: 2,
        cinema_name: "Sunset Mall Cinema",
        address: {
          address_id: 2,
          address_name: "456 Sunset Boulevard, West Side",
        },
      },
      room: {
        room_id: 3,
        room_name: "Theater 1",
      },
      show_datetime: "2025-05-23T17:30:00.000Z",
    },
    booking_ticket: [
      {
        ticket_quantity: 3,
        ticket: {
          ticket_id: 1,
          ticket_name: "Adult",
          ticket_price: 18.0,
        },
      },
    ],
    booking_seat: [
      {
        seat_id: 5,
        seat_location: "C1",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
      {
        seat_id: 6,
        seat_location: "C2",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
      {
        seat_id: 7,
        seat_location: "C3",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
    ],
  },
  {
    booking_id: 4,
    booking_datetime: "2025-05-22T20:30:00.000Z",
    booking_fee: 5.0,
    total_bill: 23.0, // booking_fee + (1 * 18.00)
    account: {
      account_id: 4,
      full_name: "Emily Davis",
      email: "emily.davis@example.com",
      gender: false,
      birthday: "1988-04-12",
      id_number: "ID789123456",
      phone_number: "+1789123456",
      role: {
        role_id: 1,
        role_name: "Customer",
      },
      membership_type: {
        membership_id: 1,
        membership_name: "Gold",
        discount_rate: 0.1,
      },
    },
    showtime: {
      showtime_id: 4,
      movie: {
        movie_id: 4,
        title: "The Batman",
        poster_image: "batman_poster.jpg",
        poster_url: "/placeholder.svg?height=300&width=200",
        description:
          "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
        age_rating: 13,
        run_time: 176,
        release_date: "2022-03-04",
        trailer_link: "https://youtube.com/watch?v=example4",
        language: "English",
        director: {
          director_id: 4,
          director_name: "Matt Reeves",
        },
      },
      cinema: {
        cinema_id: 3,
        cinema_name: "Metro Plaza Theater",
        address: {
          address_id: 3,
          address_name: "789 Metro Plaza, City Center",
        },
      },
      room: {
        room_id: 4,
        room_name: "Theater 1",
      },
      show_datetime: "2025-05-22T21:00:00.000Z",
    },
    booking_ticket: [
      {
        ticket_quantity: 1,
        ticket: {
          ticket_id: 1,
          ticket_name: "Adult",
          ticket_price: 18.0,
        },
      },
    ],
    booking_seat: [
      {
        seat_id: 8,
        seat_location: "D10",
        seat_type: {
          seat_type_id: 2,
          seat_type_name: "Premium",
        },
      },
    ],
  },
  {
    booking_id: 5,
    booking_datetime: "2025-05-21T15:20:00.000Z",
    booking_fee: 5.0,
    total_bill: 77.0, // booking_fee + (4 * 18.00)
    account: {
      account_id: 5,
      full_name: "David Wilson",
      email: "david.wilson@example.com",
      gender: true,
      birthday: "1995-09-30",
      id_number: "ID321654987",
      phone_number: "+1321654987",
      role: {
        role_id: 1,
        role_name: "Customer",
      },
      membership_type: {
        membership_id: 2,
        membership_name: "Silver",
        discount_rate: 0.05,
      },
    },
    showtime: {
      showtime_id: 5,
      movie: {
        movie_id: 1,
        title: "Avatar: The Way of Water",
        poster_image: "avatar_poster.jpg",
        poster_url: "/placeholder.svg?height=300&width=200",
        description: "Jake Sully lives with his newfound family formed on the planet of Pandora.",
        age_rating: 13,
        run_time: 192,
        release_date: "2022-12-16",
        trailer_link: "https://youtube.com/watch?v=example",
        language: "English",
        director: {
          director_id: 1,
          director_name: "James Cameron",
        },
      },
      cinema: {
        cinema_id: 1,
        cinema_name: "Grand Cinema Downtown",
        address: {
          address_id: 1,
          address_name: "123 Main Street, Downtown",
        },
      },
      room: {
        room_id: 1,
        room_name: "Theater 1",
      },
      show_datetime: "2025-05-21T16:00:00.000Z",
    },
    booking_ticket: [
      {
        ticket_quantity: 4,
        ticket: {
          ticket_id: 1,
          ticket_name: "Adult",
          ticket_price: 18.0,
        },
      },
    ],
    booking_seat: [
      {
        seat_id: 9,
        seat_location: "E1",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
      {
        seat_id: 10,
        seat_location: "E2",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
      {
        seat_id: 11,
        seat_location: "E3",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
      {
        seat_id: 12,
        seat_location: "E4",
        seat_type: {
          seat_type_id: 1,
          seat_type_name: "Standard",
        },
      },
    ],
  },
]

// Generate extended booking data for multiple years
export function generateYearlyData() {
  const extendedBookings = [...mockBookings]
  let bookingIdCounter = 6

  // Generate data for 2023, 2024, and additional 2025 data
  const years = [2023, 2024, 2025]
  const movies = [
    {
      movie_id: 1,
      title: "Avatar: The Way of Water",
      poster_url: "/placeholder.svg?height=300&width=200",
      description: "Jake Sully lives with his newfound family formed on the planet of Pandora.",
      age_rating: 13,
      run_time: 192,
      release_date: "2022-12-16",
      language: "English",
      director: { director_id: 1, director_name: "James Cameron" },
    },
    {
      movie_id: 2,
      title: "Top Gun: Maverick",
      poster_url: "/placeholder.svg?height=300&width=200",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
      age_rating: 13,
      run_time: 130,
      release_date: "2022-05-27",
      language: "English",
      director: { director_id: 2, director_name: "Joseph Kosinski" },
    },
    {
      movie_id: 3,
      title: "Spider-Man: No Way Home",
      poster_url: "/placeholder.svg?height=300&width=200",
      description: "Spider-Man's identity is revealed and he asks Doctor Strange for help.",
      age_rating: 13,
      run_time: 148,
      release_date: "2021-12-17",
      language: "English",
      director: { director_id: 3, director_name: "Jon Watts" },
    },
    {
      movie_id: 4,
      title: "The Batman",
      poster_url: "/placeholder.svg?height=300&width=200",
      description:
        "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
      age_rating: 13,
      run_time: 176,
      release_date: "2022-03-04",
      language: "English",
      director: { director_id: 4, director_name: "Matt Reeves" },
    },
  ]

  const customers = [
    { account_id: 1, full_name: "John Smith", email: "john.smith@example.com" },
    { account_id: 2, full_name: "Sarah Johnson", email: "sarah.johnson@example.com" },
    { account_id: 3, full_name: "Michael Brown", email: "michael.brown@example.com" },
    { account_id: 4, full_name: "Emily Davis", email: "emily.davis@example.com" },
    { account_id: 5, full_name: "David Wilson", email: "david.wilson@example.com" },
    { account_id: 6, full_name: "Lisa Anderson", email: "lisa.anderson@example.com" },
    { account_id: 7, full_name: "Robert Taylor", email: "robert.taylor@example.com" },
    { account_id: 8, full_name: "Jennifer White", email: "jennifer.white@example.com" },
  ]

  years.forEach((year) => {
    // Generate different amounts of data per year to show growth/decline
    let bookingsPerYear
    if (year === 2023) bookingsPerYear = 80
    else if (year === 2024) bookingsPerYear = 120
    else bookingsPerYear = 60 // 2025 (partial year)

    for (let i = 0; i < bookingsPerYear; i++) {
      const randomMonth = Math.floor(Math.random() * 12)
      const randomDay = Math.floor(Math.random() * 28) + 1
      const randomHour = Math.floor(Math.random() * 12) + 10 // 10 AM to 10 PM

      const bookingDate = new Date(year, randomMonth, randomDay, randomHour, 0, 0)

      const randomMovie = movies[Math.floor(Math.random() * movies.length)]
      const randomCinema = mockCinemas[Math.floor(Math.random() * mockCinemas.length)]
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)]

      const ticketQuantity = Math.floor(Math.random() * 4) + 1
      const ticketPrice = 18.0
      const bookingFee = 5.0
      const totalBill = bookingFee + ticketQuantity * ticketPrice

      const booking = {
        booking_id: bookingIdCounter++,
        booking_datetime: bookingDate.toISOString(),
        booking_fee: bookingFee,
        total_bill: totalBill,
        account: {
          ...randomCustomer,
          gender: Math.random() > 0.5,
          birthday: "1990-01-01",
          id_number: `ID${randomCustomer.account_id}${year}`,
          phone_number: `+1${randomCustomer.account_id}23456789`,
          role: { role_id: 1, role_name: "Customer" },
          membership_type: { membership_id: 1, membership_name: "Gold", discount_rate: 0.1 },
        },
        showtime: {
          showtime_id: bookingIdCounter,
          movie: randomMovie,
          cinema: randomCinema,
          room: { room_id: 1, room_name: "Theater 1" },
          show_datetime: bookingDate.toISOString(),
        },
        booking_ticket: [
          {
            ticket_quantity: ticketQuantity,
            ticket: { ticket_id: 1, ticket_name: "Adult", ticket_price: ticketPrice },
          },
        ],
        booking_seat: Array.from({ length: ticketQuantity }, (_, seatIndex) => ({
          seat_id: bookingIdCounter * 10 + seatIndex,
          seat_location: `${String.fromCharCode(65 + Math.floor(seatIndex / 10))}${(seatIndex % 10) + 1}`,
          seat_type: { seat_type_id: 1, seat_type_name: "Standard" },
        })),
      }

      extendedBookings.push(booking)
    }
  })

  return extendedBookings
}
