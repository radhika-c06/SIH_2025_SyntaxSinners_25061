const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { v4: uuidv4 } = require("uuid")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Bookings database file
const bookingsFile = path.join(__dirname, "bookings.json")

// Initialize bookings file if it doesn't exist
if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, JSON.stringify([]))
}

// Helper to read bookings
const readBookings = () => {
  try {
    return JSON.parse(fs.readFileSync(bookingsFile, "utf-8"))
  } catch (err) {
    return []
  }
}

// Helper to write bookings
const writeBookings = (bookings) => {
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2))
}

// Endpoint to create a payment order
app.post("/api/create-order", (req, res) => {
  try {
    const { guideName, guideId, date, time, amount, userEmail, userName } = req.body

    if (!guideName || !date || !time || !amount) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Create booking immediately (simulating instant payment success)
    const bookingId = `BOOK_${uuidv4().substring(0, 10).toUpperCase()}`
    const orderId = `ORDER_${uuidv4().substring(0, 8).toUpperCase()}`
    
    const booking = {
      id: bookingId,
      orderId,
      guideName,
      date: new Date().toISOString(),
      status: "confirmed",
      amount,
    }

    // Save booking
    const bookings = readBookings()
    bookings.push(booking)
    writeBookings(bookings)

    res.json({
      success: true,
      orderId,
      bookingId,
      amount,
      message: "Order created and payment confirmed.",
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Endpoint to get booking details
app.get("/api/booking/:bookingId", (req, res) => {
  try {
    const { bookingId } = req.params
    const bookings = readBookings()
    const booking = bookings.find((b) => b.id === bookingId)

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" })
    }

    res.json({ success: true, booking })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Endpoint to list all bookings (admin)
app.get("/api/bookings", (req, res) => {
  try {
    const bookings = readBookings()
    res.json({ success: true, bookings, total: bookings.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Mount authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend running on port " + PORT })
})

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`)
  console.log(`📝 Bookings stored in: ${bookingsFile}`)
  console.log(`🔐 Auth API available at /api/auth/*`)
})
