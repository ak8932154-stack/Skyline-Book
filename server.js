const express = require('express');
const cors = require('cors');
const path = require('path');
const store = require('./store');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files directly from current directory
app.use(express.static(__dirname));

// 1. Healthcheck / System Status
app.get('/api/health', (req, res) => {
  const flights = store.getFlights();
  const manifests = store.getManifests();
  res.json({
    status: 'online',
    version: '2.0.0',
    platform: 'Skyline Book Aviation Core Engine',
    uptime: process.uptime(),
    activeFlights: flights.length,
    activeManifests: manifests.length,
    dataStore: 'JSON File Persistence Active (data/skyline_db.json)',
    timestamp: new Date().toISOString()
  });
});

// 2. GET Dashboard Analytics & KPIs
app.get('/api/analytics', (req, res) => {
  res.json(store.getAnalytics());
});

// 3. GET All Flights
app.get('/api/flights', (req, res) => {
  res.json(store.getFlights(req.query));
});

// 4. GET Single Flight Details
app.get('/api/flights/:id', (req, res) => {
  const flight = store.getFlightById(req.params.id);
  if (!flight) return res.status(404).json({ error: 'Flight not found' });
  res.json(flight);
});

// 5. GET Single Flight Live Cabin Seats
app.get('/api/flights/:id/seats', (req, res) => {
  const flight = store.getFlightById(req.params.id);
  if (!flight) return res.status(404).json({ error: 'Flight not found' });

  res.json({
    flightId: flight.id,
    route: flight.route,
    aircraft: flight.aircraft,
    capacity: flight.capacity,
    occupiedSeats: flight.occupiedSeats,
    basePrice: flight.basePrice,
    availableSeatsCount: flight.capacity - flight.occupiedSeats.length
  });
});

// 6. POST Add a New Flight Schedule
app.post('/api/flights', (req, res) => {
  const { id, origin, destination, departureTime, arrivalTime, aircraft, basePrice, gate, terminal } = req.body;
  if (!id || !origin || !destination) {
    return res.status(400).json({ error: 'Missing required flight fields: id, origin, destination' });
  }

  try {
    const newFlight = store.addFlight({
      id: id.toUpperCase(),
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      route: `${origin.toUpperCase()} → ${destination.toUpperCase()}`,
      departureTime: departureTime || '10:00 AM',
      arrivalTime: arrivalTime || '02:00 PM',
      duration: '4h 00m',
      aircraft: aircraft || 'Boeing 787-9 Dreamliner',
      gate: gate || 'A01',
      terminal: terminal || 'T1',
      capacity: 28,
      basePrice: Number(basePrice) || 350,
      status: 'Scheduled',
      occupiedSeats: [],
      distance: '2,500 NM',
      amenities: ['Skyline Wi-Fi', 'Audio & Video In-Seat']
    });
    res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

// 7. GET Passenger Manifests
app.get('/api/manifests', (req, res) => {
  res.json(store.getManifests(req.query));
});

// 8. GET Single Reservation by PNR
app.get('/api/reservations/:pnr', (req, res) => {
  const record = store.getManifestByPnr(req.params.pnr);
  if (!record) return res.status(404).json({ error: 'PNR record not found' });
  res.json(record);
});

// 9. POST Create Real-Time Reservation (Conflict Protection & PNR Issuance)
app.post('/api/reservations', (req, res) => {
  const { passengerName, passportNumber, flightId, seat } = req.body;
  if (!passengerName || !passportNumber || !flightId || !seat) {
    return res.status(400).json({ error: 'Missing required booking fields: passengerName, passportNumber, flightId, seat' });
  }

  try {
    const { ticket, flight } = store.createReservation(req.body);
    res.status(201).json({
      message: 'Flight reservation confirmed and e-ticket generated',
      ticket,
      flight
    });
  } catch (err) {
    res.status(err.code || 500).json({ error: err.message });
  }
});

// 10. PATCH Advance / Update Passenger Check-In Status
app.patch('/api/reservations/:pnr/status', (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Status is required' });

  const record = store.updateStatus(req.params.pnr, status);
  if (!record) return res.status(404).json({ error: 'PNR record not found' });

  res.json({ message: 'Passenger status updated successfully', record });
});

// 11. DELETE Cancel Reservation & Release Seat
app.delete('/api/reservations/:pnr', (req, res) => {
  const result = store.cancelReservation(req.params.pnr);
  if (!result) return res.status(404).json({ error: 'Reservation with this PNR not found' });

  res.json({
    message: `Reservation ${result.removed.pnr} successfully cancelled. Seat ${result.removed.seat} released on flight ${result.removed.flightId}.`,
    releasedSeat: result.removed.seat,
    flightId: result.removed.flightId
  });
});

// 12. GET Export Manifest as CSV
app.get('/api/manifests/export/csv', (req, res) => {
  const manifests = store.getManifests();
  const headers = ['PNR,Passenger Name,Passport,Flight,Seat,Cabin,Baggage,Status,BookedAt'];
  const rows = manifests.map(m =>
    `${m.pnr},"${m.passengerName}",${m.passportNumber},${m.flightId},${m.seat},${m.cabinClass},"${m.baggage || ''}",${m.status},${m.bookedAt}`
  );
  const csv = [headers, ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="skyline_passenger_manifest.csv"');
  res.send(csv);
});

// 13. POST Reset to Demo Data
app.post('/api/reset', (req, res) => {
  store.resetDb();
  res.json({ message: 'Skyline demo database reset to default seed successfully' });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`✈️  SKYLINE BOOK - AVIATION CORE RESERVATION ENGINE RUNNING`);
  console.log(`📍 Web Dashboard URL: http://localhost:${PORT}`);
  console.log(`🔌 REST API Base URL:  http://localhost:${PORT}/api`);
  console.log(`💾 Persistent DB File: data/skyline_db.json`);
  console.log(`================================================================`);
});