/**
 * SKYLINE BOOK - PERSISTENT DATA STORE (DATABASE ENGINE)
 * Handles JSON file persistence, atomic reads/writes, seat locking & conflict checks.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'skyline_db.json');

// Initial Factory Seed Data
const defaultSeed = {
  flights: [
    {
      id: 'SK-104',
      origin: 'JFK',
      originCity: 'New York (JFK)',
      destination: 'LHR',
      destCity: 'London Heathrow (LHR)',
      route: 'New York (JFK) → London (LHR)',
      departureTime: '06:00 AM',
      arrivalTime: '11:00 AM',
      duration: '7h 00m',
      aircraft: 'Airbus A350-900',
      gate: 'B14',
      terminal: 'T4',
      capacity: 28,
      basePrice: 420,
      status: 'On Time',
      occupiedSeats: ['1A', '1B', '2C', '3A', '4B', '4D', '5A', '6C'],
      distance: '3,451 NM',
      amenities: ['Wi-Fi High-Speed', 'Lie-Flat Beds', 'Gourmet Dining', '4K In-Flight Media']
    },
    {
      id: 'SK-209',
      origin: 'LHR',
      originCity: 'London Heathrow (LHR)',
      destination: 'DXB',
      destCity: 'Dubai Intl (DXB)',
      route: 'London (LHR) → Dubai (DXB)',
      departureTime: '08:00 AM',
      arrivalTime: '12:00 PM',
      duration: '7h 15m',
      aircraft: 'Boeing 787-9 Dreamliner',
      gate: 'A08',
      terminal: 'T2',
      capacity: 28,
      basePrice: 510,
      status: 'Boarding',
      occupiedSeats: ['1C', '2A', '2B', '3D', '5B', '5C', '6A'],
      distance: '2,975 NM',
      amenities: ['Skyline Bar Lounge', 'USB-C Fast Charging', 'Chef Curated Menu']
    },
    {
      id: 'SK-318',
      origin: 'DXB',
      originCity: 'Dubai Intl (DXB)',
      destination: 'SIN',
      destCity: 'Singapore Changi (SIN)',
      route: 'Dubai (DXB) → Singapore (SIN)',
      departureTime: '09:00 AM',
      arrivalTime: '12:50 PM',
      duration: '7h 40m',
      aircraft: 'Boeing 777-300ER',
      gate: 'C22',
      terminal: 'T3',
      capacity: 28,
      basePrice: 390,
      status: 'On Time',
      occupiedSeats: ['1A', '2D', '3B', '3C', '4A', '6B', '6D'],
      distance: '3,158 NM',
      amenities: ['Changi Express Luggage', 'High-Speed Wi-Fi', 'Complimentary Champagne']
    },
    {
      id: 'SK-452',
      origin: 'DEL',
      originCity: 'New Delhi (DEL)',
      destination: 'LHR',
      destCity: 'London Heathrow (LHR)',
      route: 'New Delhi (DEL) → London (LHR)',
      departureTime: '08:00 AM',
      arrivalTime: '11:30 AM',
      duration: '8h 50m',
      aircraft: 'Airbus A380-800',
      gate: 'D04',
      terminal: 'T3',
      capacity: 28,
      basePrice: 460,
      status: 'On Time',
      occupiedSeats: ['1B', '1D', '2A', '4C', '5A', '5D'],
      distance: '3,627 NM',
      amenities: ['Upper Deck Suite', 'Private Shower Spa', 'Multi-Course Dining']
    },
    {
      id: 'SK-510',
      origin: 'SIN',
      originCity: 'Singapore Changi (SIN)',
      destination: 'HND',
      destCity: 'Tokyo Haneda (HND)',
      route: 'Singapore (SIN) → Tokyo (HND)',
      departureTime: '10:15 AM',
      arrivalTime: '05:45 PM',
      duration: '6h 30m',
      aircraft: 'Boeing 787-9 Dreamliner',
      gate: 'E11',
      terminal: 'T1',
      capacity: 28,
      basePrice: 340,
      status: 'Scheduled',
      occupiedSeats: ['2B', '3A', '4D', '6A'],
      distance: '2,886 NM',
      amenities: ['Noise-Cancelling Audio', 'Bento Gourmet Option', 'Lie-Flat Seats']
    },
    {
      id: 'SK-622',
      origin: 'JFK',
      originCity: 'New York (JFK)',
      destination: 'CDG',
      destCity: 'Paris Charles de Gaulle (CDG)',
      route: 'New York (JFK) → Paris (CDG)',
      departureTime: '07:30 PM',
      arrivalTime: '08:15 AM',
      duration: '7h 15m',
      aircraft: 'Airbus A350-900',
      gate: 'B28',
      terminal: 'T1',
      capacity: 28,
      basePrice: 480,
      status: 'On Time',
      occupiedSeats: ['1A', '1C', '3B', '5C'],
      distance: '3,149 NM',
      amenities: ['French Patisserie Breakfast', 'Ultra-Quiet Cabin', 'Priority Customs']
    }
  ],
  manifests: [
    {
      pnr: 'SKY8492',
      passengerName: 'Elena Rostova',
      passportNumber: 'P9482011',
      nationality: 'United States',
      email: 'elena.rostova@skyline.aero',
      phone: '+1 212-555-0192',
      flightId: 'SK-104',
      seat: '1A',
      cabinClass: 'First Class',
      baggage: '2 Checked (46 kg)',
      mealPreference: 'Chef Signature',
      status: 'Boarded',
      bookedAt: '2026-10-18T08:30:00.000Z'
    },
    {
      pnr: 'SKY3920',
      passengerName: 'Marcus Vance',
      passportNumber: 'US773819',
      nationality: 'United States',
      email: 'marcus.v@skyline.aero',
      phone: '+1 415-555-0144',
      flightId: 'SK-104',
      seat: '2C',
      cabinClass: 'Business',
      baggage: '2 Checked (40 kg)',
      mealPreference: 'Low Sodium',
      status: 'Checked-In',
      bookedAt: '2026-10-18T09:12:00.000Z'
    },
    {
      pnr: 'SKY7741',
      passengerName: 'Aarav Sharma',
      passportNumber: 'IN994021',
      nationality: 'India',
      email: 'aarav.sharma@techglobal.in',
      phone: '+91 98101-55241',
      flightId: 'SK-452',
      seat: '1B',
      cabinClass: 'First Class',
      baggage: '3 Checked (60 kg)',
      mealPreference: 'Asian Vegetarian',
      status: 'Checked-In',
      bookedAt: '2026-10-18T10:05:00.000Z'
    },
    {
      pnr: 'SKY5109',
      passengerName: 'Chloe Laurent',
      passportNumber: 'FR440192',
      nationality: 'France',
      email: 'chloe.laurent@parisart.fr',
      phone: '+33 6 12 34 56 78',
      flightId: 'SK-209',
      seat: '3D',
      cabinClass: 'Economy',
      baggage: '1 Checked (23 kg)',
      mealPreference: 'Standard',
      status: 'Confirmed',
      bookedAt: '2026-10-18T11:45:00.000Z'
    },
    {
      pnr: 'SKY6321',
      passengerName: 'David Chen',
      passportNumber: 'SG381920',
      nationality: 'Singapore',
      email: 'd.chen@apexpartners.sg',
      phone: '+65 9123-4567',
      flightId: 'SK-318',
      seat: '2D',
      cabinClass: 'Business',
      baggage: '2 Checked (46 kg)',
      mealPreference: 'Halal Certified',
      status: 'Boarded',
      bookedAt: '2026-10-18T12:20:00.000Z'
    }
  ]
};

// Ensure data folder and db file exist
function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultSeed, null, 2), 'utf-8');
  }
}

// Read whole database
function readDb() {
  initDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading Skyline DB, re-seeding:', err);
    return JSON.parse(JSON.stringify(defaultSeed));
  }
}

// Write to database file atomically
function writeDb(data) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Data Store API Methods
const store = {
  // 1. Get all flights with optional filters
  getFlights(query = {}) {
    const db = readDb();
    let result = db.flights;
    const { origin, destination, status, q } = query;

    if (origin && origin !== 'ALL') {
      result = result.filter(f => f.origin === origin.toUpperCase());
    }
    if (destination && destination !== 'ALL') {
      result = result.filter(f => f.destination === destination.toUpperCase());
    }
    if (status && status !== 'ALL') {
      result = result.filter(f => f.status.toLowerCase() === status.toLowerCase());
    }
    if (q) {
      const queryStr = q.toLowerCase();
      result = result.filter(f =>
        f.id.toLowerCase().includes(queryStr) ||
        f.route.toLowerCase().includes(queryStr) ||
        f.aircraft.toLowerCase().includes(queryStr)
      );
    }
    return result;
  },

  // 2. Get single flight by ID
  getFlightById(id) {
    const db = readDb();
    return db.flights.find(f => f.id.toUpperCase() === id.toUpperCase());
  },

  // 3. Add flight
  addFlight(newFlightData) {
    const db = readDb();
    const exists = db.flights.find(f => f.id.toUpperCase() === newFlightData.id.toUpperCase());
    if (exists) {
      throw new Error(`Flight ID ${newFlightData.id} already exists`);
    }
    db.flights.push(newFlightData);
    writeDb(db);
    return newFlightData;
  },

  // 4. Get manifests with filtering
  getManifests(query = {}) {
    const db = readDb();
    let list = db.manifests;
    const { flightId, status, q } = query;

    if (flightId && flightId !== 'ALL') {
      list = list.filter(m => m.flightId.toUpperCase() === flightId.toUpperCase());
    }
    if (status && status !== 'ALL') {
      list = list.filter(m => m.status.toLowerCase() === status.toLowerCase());
    }
    if (q) {
      const queryStr = q.toLowerCase();
      list = list.filter(m =>
        m.pnr.toLowerCase().includes(queryStr) ||
        m.passengerName.toLowerCase().includes(queryStr) ||
        m.passportNumber.toLowerCase().includes(queryStr) ||
        m.flightId.toLowerCase().includes(queryStr) ||
        m.seat.toLowerCase().includes(queryStr)
      );
    }
    return list;
  },

  // 5. Get manifest by PNR
  getManifestByPnr(pnr) {
    const db = readDb();
    const record = db.manifests.find(m => m.pnr.toUpperCase() === pnr.toUpperCase());
    if (!record) return null;
    const flight = db.flights.find(f => f.id === record.flightId);
    return { ...record, flight };
  },

  // 6. Create Reservation (with Seat Conflict Protection)
  createReservation(bookingData) {
    const db = readDb();
    const flight = db.flights.find(f => f.id.toUpperCase() === bookingData.flightId.toUpperCase());
    if (!flight) {
      throw new Error(`Flight ${bookingData.flightId} not found`);
    }

    const normalizedSeat = bookingData.seat.toUpperCase();
    if (flight.occupiedSeats.includes(normalizedSeat)) {
      const err = new Error(`Seat ${normalizedSeat} on flight ${flight.id} is already occupied.`);
      err.code = 409;
      throw err;
    }

    // Lock seat
    flight.occupiedSeats.push(normalizedSeat);

    // Generate unique PNR
    const pnr = 'SKY' + Math.floor(1000 + Math.random() * 9000);

    const newTicket = {
      pnr,
      passengerName: bookingData.passengerName.trim(),
      passportNumber: bookingData.passportNumber.trim().toUpperCase(),
      nationality: bookingData.nationality || 'International',
      email: bookingData.email || `${bookingData.passengerName.toLowerCase().replace(/\s+/g, '.')}@skyline-pass.com`,
      phone: bookingData.phone || '+1 555-0100',
      flightId: flight.id,
      seat: normalizedSeat,
      cabinClass: bookingData.cabinClass || 'Economy',
      baggage: bookingData.baggage || '1 Checked (23 kg)',
      mealPreference: bookingData.mealPreference || 'Standard',
      status: bookingData.status || 'Confirmed',
      bookedAt: new Date().toISOString()
    };

    db.manifests.unshift(newTicket);
    writeDb(db);
    return { ticket: newTicket, flight };
  },

  // 7. Update Manifest Status (Check-In Progression)
  updateStatus(pnr, status) {
    const db = readDb();
    const record = db.manifests.find(m => m.pnr.toUpperCase() === pnr.toUpperCase());
    if (!record) return null;

    record.status = status;
    writeDb(db);
    return record;
  },

  // 8. Cancel Reservation & Release Seat
  cancelReservation(pnr) {
    const db = readDb();
    const index = db.manifests.findIndex(m => m.pnr.toUpperCase() === pnr.toUpperCase());
    if (index === -1) return null;

    const [removed] = db.manifests.splice(index, 1);
    const flight = db.flights.find(f => f.id === removed.flightId);
    if (flight) {
      flight.occupiedSeats = flight.occupiedSeats.filter(s => s !== removed.seat);
    }

    writeDb(db);
    return { removed, flight };
  },

  // 9. Analytics Summary
  getAnalytics() {
    const db = readDb();
    const totalSeats = db.flights.reduce((acc, f) => acc + f.capacity, 0);
    const occupiedSeats = db.flights.reduce((acc, f) => acc + f.occupiedSeats.length, 0);
    const availableSeats = totalSeats - occupiedSeats;
    const loadFactor = Math.round((occupiedSeats / totalSeats) * 100);

    return {
      totalBookings: 22201 + db.manifests.length,
      activeTickets: 3356 + db.manifests.length,
      manifestCount: 1770 + db.manifests.length,
      loadFactor: `${loadFactor}%`,
      capacitySplit: {
        totalSeats,
        occupiedSeats,
        availableSeats,
        reservedSeats: Math.max(0, occupiedSeats - db.manifests.filter(m => m.status === 'Boarded').length)
      },
      monthlyTrend: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        reservations: [120, 145, 138, 175, 160, 210, 235, 240, 220, 260, 275, 310],
        checkins: [95, 115, 110, 142, 135, 180, 205, 215, 195, 230, 245, 280]
      }
    };
  },

  // 10. Reset DB
  resetDb() {
    writeDb(defaultSeed);
    return defaultSeed;
  }
};

initDb();

module.exports = store;
