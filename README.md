# ✈️ Skyline Book: Online Flight Reservation & Airline Ticket Management System Dashboard

> **Streamline your entire travel booking process, manage passenger manifests, and handle real-time ticket reservations efficiently with our advanced web platform.**

---

## 🌟 Executive Overview
**Skyline Book** is an enterprise-grade commercial airline reservation and operations platform modeled after major airline reservation engines (Amadeus, Sabre) and designed according to the modern aviation dashboard visual specification.

It combines an intuitive passenger booking frontend with a high-performance **REST API backend** (`Node.js` + `Express`) to provide real-time aircraft seat locking, digital boarding pass issuance, automated conflict resolution, and airport gate passenger manifest tracking.

---

## 🚀 Key Features

### 1. 📊 Interactive Operations Dashboard
* **Flight Analytics Line Chart:** Real-time Chart.js visualization mapping monthly reservation volume against gate manifest check-ins with 7D, 30D, and 1Y range toggling.
* **Booking Stats KPI Row:**
  * **22,201+** Total Flight Reservations (+52% trend indicator).
  * **3,356+** Active Boarding Passes (-15% volume indicator).
  * **1,770+** Passenger Manifest Records (+5% trend indicator).
  * **Global Fleet Occupancy Rate** with animated progress indicator.
* **Capacity Split Donut Chart:** Dynamic donut chart showing real-time booked, reserved, and available aircraft seat inventory centered with total capacity counter.
* **Live Flight Schedule Table:** Filterable departure/arrival schedule with live flight statuses (*On Time, Boarding, Delayed, Scheduled*), gates, and terminals.

### 2. 💺 Interactive Cabin Seating Chart & Mobile Mockup
* **Realistic Aircraft Fuselage:** Cockpit windshield styling, cabin wings, emergency exit indicators, and cabin divisions (First Class Suite, Business Class, Economy Class).
* **Smart Seat Picker:**
  * **Light Gray:** Open / Available for selection.
  * **Skyline Blue:** Occupied / Locked.
  * **Gold/Amber:** Selected with dynamic fare calculation based on cabin class multipliers.
* **Dual-View Mode:** Instant toggle between desktop fuselage and a **Mobile Smartphone Mockup** with status bar notch (matching the reference system banner).

### 3. 🎫 Digital E-Tickets & Boarding Passes
* **Perforated Boarding Pass Cards:** Dual-stub boarding pass layout with tear notches, flight route codes (`JFK → LHR`), passenger name, PNR code, gate, terminal, and boarding group.
* **High-Density Vector Barcode & QR Code:** Realistic simulated airline barcodes.
* **One-Click Print:** Dedicated `@media print` clean stylesheet that formats passes directly for physical printers or PDF export.

### 4. 📋 Comprehensive Passenger Manifest Management
* **Gate Agent Operations Table:** PNR, passenger name, passport ID, flight number, cabin class, baggage allowance, and check-in status.
* **One-Click Status Advancement:** Transition passengers seamlessly across `Confirmed` ➔ `Checked-In` ➔ `Boarded`.
* **Conflict-Free Reservation Cancellation:** Releasing an active booking automatically restores the seat back to the flight's available seat inventory.
* **Data Export:** Export live manifests in **CSV** and **JSON** formats.

### 5. 🌐 Fleet Radar & Global Route Network
* Live telemetry for commercial aircraft across international hubs:
  * **Airbus A350-900** (`JFK → LHR`, `JFK → CDG`)
  * **Boeing 787-9 Dreamliner** (`LHR → DXB`, `SIN → HND`)
  * **Boeing 777-300ER** (`DXB → SIN`)
  * **Airbus A380-800** (`DEL → LHR`)
* Telemetry tracking cruising altitude (FL380), airspeed (540 kts), distance (NM), and passenger load factors.

### 6. ⚡ Dual-Mode Engine Architecture
* **Full-Stack REST Mode:** Connects automatically to the Node.js Express server running on port `5000`.
* **Zero-Config Standalone Mode:** If opened directly in a browser without Node running, the app automatically fails over to browser LocalStorage without breaking any feature.

---

## 🛠️ Project Structure
```
Micro-Project 2/
├── index.html           # Main SPA layout with dashboard, seat map & modals
├── style.css            # Custom CSS, fuselage geometry, animations & print rules
├── public.js            # Core frontend application logic, charts & REST client
├── server.js            # Express.js REST API server with static asset hosting
├── package.json         # NPM metadata and dependencies (express, cors)
└── README.md            # Complete documentation
```

---

## 🏃 Getting Started & Running

### Option A: Run with Full-Stack Backend (Recommended)
1. Open PowerShell or Terminal in the project root directory:
   ```powershell
   npm install
   npm start
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```
3. The dashboard will show: `⚡ Express API Connected (Port 5000)`.

### Option B: Standalone Client Mode (Offline / Direct Browser)
* Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
* The system automatically activates: `📦 Standalone Engine (Active)` with persistent LocalStorage.

---

## 🔌 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health, uptime & active fleet count |
| `GET` | `/api/analytics` | KPIs, monthly trends, and capacity distribution |
| `GET` | `/api/flights` | Retrieve flights (supports `origin`, `destination`, `status`, `q`) |
| `GET` | `/api/flights/:id/seats` | Live cabin seats and seat availability |
| `GET` | `/api/manifests` | Passenger manifests with flight & query filters |
| `POST` | `/api/reservations` | Create reservation with seat conflict protection |
| `PATCH`| `/api/reservations/:pnr/status` | Advance passenger check-in (`Confirmed` → `Checked-In` → `Boarded`) |
| `DELETE`| `/api/reservations/:pnr` | Cancel reservation and release aircraft seat |
| `GET` | `/api/manifests/export/csv` | Download manifest CSV file directly |
| `POST` | `/api/reset` | Reset demo database to factory seed |

---

## 📄 License
Skyline Aviation Systems Micro-Project. Open source for educational and portfolio presentation.
