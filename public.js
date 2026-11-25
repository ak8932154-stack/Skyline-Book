/**
 * SKYLINE BOOK - ONLINE FLIGHT RESERVATION & MANAGEMENT PLATFORM
 * Core Frontend Application Logic & REST API Client
 */

// --- INITIAL SEED DATA FOR OFFLINE / STANDALONE FALLBACK ---
const initialFlightsData = [
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
    amenities: ['Wi-Fi High-Speed', 'Lie-Flat Beds', 'Gourmet Dining']
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
    amenities: ['Skyline Bar Lounge', 'USB-C Charging', 'Chef Menu']
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
    amenities: ['Changi Express Luggage', 'High-Speed Wi-Fi']
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
    amenities: ['Upper Deck Suite', 'Shower Spa', 'Multi-Course Dining']
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
    amenities: ['Noise-Cancelling Audio', 'Bento Gourmet Option']
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
    amenities: ['French Patisserie Breakfast', 'Ultra-Quiet Cabin']
  }
];

const initialManifestsData = [
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
];

// --- APP STATE & API CONFIGURATION ---
const API_BASE = window.location.origin.includes('5000') 
  ? '/api' 
  : 'http://localhost:5000/api';

let isBackendAvailable = false;
let flights = [];
let manifests = [];
let currentFlight = null;
let currentSelectedSeat = null;
let currentTab = 'dashboard';
let isMobileViewMockup = false;

// Chart Instances
let flightAnalyticsChartInstance = null;
let bookingDonutChartInstance = null;

// --- DUAL-MODE API CLIENT WITH AUTOMATIC LOCALSTORAGE FALLBACK ---
async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1800) });
    if (res.ok) {
      const data = await res.json();
      isBackendAvailable = true;
      updateBackendBadge(true, `⚡ Express API Connected (Port 5000)`);
      return true;
    }
  } catch (err) {
    // API not responding, fallback to local storage
  }
  isBackendAvailable = false;
  updateBackendBadge(false, `📦 Standalone Engine (Active)`);
  return false;
}

function updateBackendBadge(isLive, labelText) {
  const badge = document.getElementById('backendStatusBadge');
  if (!badge) return;
  if (isLive) {
    badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold';
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>${labelText}</span>`;
  } else {
    badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold';
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-400"></span><span>${labelText}</span>`;
  }
}

// Data Loaders
async function loadAllData() {
  await checkBackendHealth();

  if (isBackendAvailable) {
    try {
      const [flightsRes, manifestsRes] = await Promise.all([
        fetch(`${API_BASE}/flights`),
        fetch(`${API_BASE}/manifests`)
      ]);
      if (flightsRes.ok && manifestsRes.ok) {
        flights = await flightsRes.json();
        manifests = await manifestsRes.json();
        saveToLocalStorage(flights, manifests);
      } else {
        fallbackToLocalStorage();
      }
    } catch (e) {
      fallbackToLocalStorage();
    }
  } else {
    fallbackToLocalStorage();
  }

  if (!currentFlight && flights.length > 0) {
    currentFlight = flights[0];
  }

  refreshAppViews();
}

function fallbackToLocalStorage() {
  const storedFlights = localStorage.getItem('skyline_flights');
  const storedManifests = localStorage.getItem('skyline_manifests');

  flights = storedFlights ? JSON.parse(storedFlights) : JSON.parse(JSON.stringify(initialFlightsData));
  manifests = storedManifests ? JSON.parse(storedManifests) : JSON.parse(JSON.stringify(initialManifestsData));
  saveToLocalStorage(flights, manifests);
}

function saveToLocalStorage(f, m) {
  localStorage.setItem('skyline_flights', JSON.stringify(f));
  localStorage.setItem('skyline_manifests', JSON.stringify(m));
}

function refreshAppViews() {
  updateKPIs();
  renderFlightSchedule();
  renderSeatMap();
  updateChartData();

  if (currentTab === 'reservations') renderAllFlightsCatalogue();
  if (currentTab === 'tickets') renderTickets();
  if (currentTab === 'manifests') renderManifestTable();
  if (currentTab === 'radar') renderFleetRadar();
}

// --- TAB ROUTING ---
function switchTab(tabName) {
  currentTab = tabName;
  const tabs = ['dashboard', 'reservations', 'tickets', 'manifests', 'radar', 'settings'];

  tabs.forEach(t => {
    const section = document.getElementById(`tab-${t}`);
    const navBtn = document.getElementById(`nav-${t}`);
    if (section) section.classList.add('hidden');
    if (navBtn) {
      navBtn.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/30');
      navBtn.classList.add('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
    }
  });

  const activeSection = document.getElementById(`tab-${tabName}`);
  const activeNav = document.getElementById(`nav-${tabName}`);
  if (activeSection) activeSection.classList.remove('hidden');
  if (activeNav) {
    activeNav.classList.remove('text-slate-400', 'hover:bg-slate-800');
    activeNav.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/30');
  }

  const titles = {
    dashboard: { title: 'Dashboard', desc: 'Real-time flight analytics, load metrics, live cabin seat map & operations' },
    reservations: { title: 'Online Flight Reservations', desc: 'Explore global destinations, search direct flights & issue instant PNR' },
    tickets: { title: 'Digital Boarding Passes & Tickets', desc: 'High-density airline barcodes, passenger passes & instant printing' },
    manifests: { title: 'Passenger Manifest Management', desc: 'Monitor check-in status, gate baggage, seat allocations & passenger data' },
    radar: { title: 'Fleet Radar & Global Network', desc: 'Active aircraft fleet telemetry, international routes & route analytics' },
    settings: { title: 'Aviation Engine Settings', desc: 'System preferences, PNR seat lock timers & database controls' }
  };

  const meta = titles[tabName] || titles.dashboard;
  const titleEl = document.getElementById('page-title');
  const descEl = document.getElementById('page-desc');
  if (titleEl) titleEl.innerText = meta.title;
  if (descEl) descEl.innerText = meta.desc;

  if (tabName === 'reservations') renderAllFlightsCatalogue();
  if (tabName === 'tickets') renderTickets();
  if (tabName === 'manifests') renderManifestTable();
  if (tabName === 'radar') renderFleetRadar();
}

// --- KPI & ANALYTICS UPDATES ---
function updateKPIs() {
  const totalSeats = flights.reduce((acc, f) => acc + (f.capacity || 28), 0);
  const occupiedSeats = flights.reduce((acc, f) => acc + (f.occupiedSeats ? f.occupiedSeats.length : 0), 0);
  const availableSeats = Math.max(0, totalSeats - occupiedSeats);
  const loadFactor = totalSeats > 0 ? Math.round((occupiedSeats / totalSeats) * 100) : 78;

  const totalBookingsEl = document.getElementById('stat-total-bookings');
  const activeTicketsEl = document.getElementById('stat-active-tickets');
  const manifestsCountEl = document.getElementById('stat-manifests');
  const loadFactorEl = document.getElementById('stat-load-factor');
  const donutTotalEl = document.getElementById('donut-total');

  if (totalBookingsEl) totalBookingsEl.innerText = (22201 + manifests.length).toLocaleString();
  if (activeTicketsEl) activeTicketsEl.innerText = (3356 + manifests.length).toLocaleString();
  if (manifestsCountEl) manifestsCountEl.innerText = (1770 + manifests.length).toLocaleString();
  if (loadFactorEl) loadFactorEl.innerText = `${loadFactor}%`;
  if (donutTotalEl) donutTotalEl.innerText = `${totalSeats}`;

  const availableEl = document.getElementById('stat-available-seats-sub');
  if (availableEl) availableEl.innerText = `${availableSeats} Seats Available`;
}

// --- FLIGHT SCHEDULE TABLE (DASHBOARD) ---
function renderFlightSchedule() {
  const tbody = document.getElementById('flightScheduleBody');
  if (!tbody) return;

  if (!flights || flights.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-400 text-xs">No active flights available</td></tr>`;
    return;
  }

  tbody.innerHTML = flights.map(f => {
    const isSelected = currentFlight && currentFlight.id === f.id;
    const occupiedCount = f.occupiedSeats ? f.occupiedSeats.length : 0;
    const capacity = f.capacity || 28;
    const availableCount = capacity - occupiedCount;

    let statusBadge = 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    if (f.status === 'Boarding') statusBadge = 'bg-amber-100 text-amber-700 border border-amber-200 animate-pulse';
    if (f.status === 'Delayed') statusBadge = 'bg-rose-100 text-rose-700 border border-rose-200';
    if (f.status === 'Scheduled') statusBadge = 'bg-blue-100 text-blue-700 border border-blue-200';

    return `
      <tr onclick="selectFlightForSeatMap('${f.id}')" 
          class="group hover:bg-blue-50/70 cursor-pointer transition border-b border-slate-100 ${isSelected ? 'bg-blue-50/90 font-medium' : ''}">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'} flex items-center justify-center shrink-0 transition shadow-sm">
              <i class="fa-solid fa-plane text-xs"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-800 text-xs">${f.id}</span>
                <span class="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">${f.gate || 'Gate A1'}</span>
              </div>
              <p class="text-xs text-slate-600 font-medium">${f.route}</p>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 text-xs text-slate-600 font-semibold">
          <div class="flex items-center gap-1.5">
            <i class="fa-regular fa-clock text-slate-400 text-[10px]"></i>
            <span>${f.departureTime}</span>
          </div>
        </td>
        <td class="py-3 px-3 text-xs text-slate-600 font-semibold">
          <div class="flex items-center gap-1.5">
            <i class="fa-solid fa-plane-arrival text-slate-400 text-[10px]"></i>
            <span>${f.arrivalTime}</span>
          </div>
        </td>
        <td class="py-3 px-3 text-xs text-slate-500">
          <div>
            <span class="font-medium text-slate-700 block">${f.aircraft}</span>
            <span class="text-[10px] text-slate-400">${availableCount} seats open</span>
          </div>
        </td>
        <td class="py-3 px-3 text-right">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${statusBadge}">
            ${f.status}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// --- INTERACTIVE CABIN SEATING CHART ---
function selectFlightForSeatMap(flightId) {
  const target = flights.find(f => f.id === flightId);
  if (target) {
    currentFlight = target;
    currentSelectedSeat = null;

    const label = document.getElementById('selectedFlightLabel');
    const badge = document.getElementById('selectedSeatBadge');
    const priceDisplay = document.getElementById('seatPriceDisplay');

    if (label) label.innerText = `Flight ${currentFlight.id} (${currentFlight.route})`;
    if (badge) badge.innerText = `Seat: None`;
    if (priceDisplay) priceDisplay.innerText = `$0.00`;

    renderFlightSchedule();
    renderSeatMap();
  }
}

function renderSeatMap() {
  const container = document.getElementById('seatMapGrid');
  if (!container || !currentFlight) return;

  const rows = [1, 2, 3, 4, 5, 6, 7];
  const cols = ['A', 'B', 'AISLE', 'C', 'D'];
  const occupied = currentFlight.occupiedSeats || [];

  container.innerHTML = rows.map(r => {
    // Cabin class division indicator
    let classBanner = '';
    if (r === 1) {
      classBanner = `<div class="text-[9px] uppercase tracking-wider font-extrabold text-amber-600 bg-amber-50/80 py-0.5 px-2 rounded text-center mb-1">First Class Cabin (1A - 2D)</div>`;
    } else if (r === 3) {
      classBanner = `<div class="text-[9px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50/80 py-0.5 px-2 rounded text-center my-1">Business Class Cabin (3A - 4D)</div>`;
    } else if (r === 5) {
      classBanner = `<div class="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-100 py-0.5 px-2 rounded text-center my-1">Economy Class Cabin (5A - 7D)</div>`;
    }

    return `
      ${classBanner}
      <div class="flex items-center justify-between gap-1.5 my-1">
        ${cols.map(c => {
          if (c === 'AISLE') {
            return `<span class="w-6 text-center text-[10px] font-bold text-slate-400 select-none">${r}</span>`;
          }

          const seatCode = `${r}${c}`;
          const isOccupied = occupied.includes(seatCode);
          const isSelected = currentSelectedSeat === seatCode;

          let seatStyle = 'bg-slate-200 text-slate-700 hover:bg-blue-100 hover:text-blue-700 border border-slate-300/80';
          let titleText = `Seat ${seatCode}: Available`;

          if (isOccupied) {
            seatStyle = 'occupied bg-blue-600 text-white cursor-not-allowed border-blue-700 shadow-sm';
            titleText = `Seat ${seatCode}: Occupied`;
          } else if (isSelected) {
            seatStyle = 'selected bg-amber-400 text-slate-900 font-bold border-amber-500 ring-2 ring-amber-400';
            titleText = `Seat ${seatCode}: Selected by You`;
          }

          return `
            <button 
              type="button"
              onclick="toggleSeatSelection('${seatCode}')"
              title="${titleText}"
              ${isOccupied ? 'disabled' : ''}
              class="aircraft-seat w-9 h-8 rounded-lg text-[11px] font-bold flex items-center justify-center ${seatStyle}">
              ${seatCode}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }).join('');
}

function toggleSeatSelection(seatCode) {
  if (!currentFlight || (currentFlight.occupiedSeats && currentFlight.occupiedSeats.includes(seatCode))) {
    return;
  }

  if (currentSelectedSeat === seatCode) {
    currentSelectedSeat = null;
  } else {
    currentSelectedSeat = seatCode;
  }

  const badge = document.getElementById('selectedSeatBadge');
  const priceDisplay = document.getElementById('seatPriceDisplay');

  if (currentSelectedSeat) {
    const row = parseInt(currentSelectedSeat.charAt(0), 10);
    let multiplier = 1.0;
    let className = 'Economy';
    if (row <= 2) { multiplier = 2.4; className = 'First Class'; }
    else if (row <= 4) { multiplier = 1.5; className = 'Business'; }

    const finalPrice = Math.round(currentFlight.basePrice * multiplier);

    if (badge) badge.innerText = `Seat: ${currentSelectedSeat} (${className})`;
    if (priceDisplay) priceDisplay.innerText = `$${finalPrice}.00`;
  } else {
    if (badge) badge.innerText = `Seat: None`;
    if (priceDisplay) priceDisplay.innerText = `$0.00`;
  }

  renderSeatMap();
}

function toggleMobileMockupView() {
  const container = document.getElementById('fuselageWrapper');
  const btn = document.getElementById('mobileToggleBtn');
  if (!container) return;

  isMobileViewMockup = !isMobileViewMockup;

  if (isMobileViewMockup) {
    container.className = 'mobile-device-frame mx-auto my-2';
    container.innerHTML = `
      <div class="mobile-notch"></div>
      <div class="mobile-screen p-4 pt-7">
        <div class="flex items-center justify-between mb-3 border-b pb-2">
          <div class="flex items-center gap-1.5">
            <i class="fa-solid fa-plane-up text-blue-600 text-xs"></i>
            <span class="text-[11px] font-bold text-slate-800">Skyline Mobile</span>
          </div>
          <span class="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">5G Live</span>
        </div>
        <div class="cockpit-windows">
          <div class="cockpit-window"></div>
          <div class="cockpit-window"></div>
        </div>
        <div id="seatMapGridMobile" class="space-y-1"></div>
      </div>
    `;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-desktop mr-1"></i> Desktop View`;
    // Populate mobile grid
    renderSeatMapMobile();
  } else {
    if (btn) btn.innerHTML = `<i class="fa-solid fa-mobile-screen mr-1"></i> Mobile View`;
    restoreDesktopFuselage();
  }
}

function restoreDesktopFuselage() {
  const container = document.getElementById('fuselageWrapper');
  if (!container) return;

  container.className = 'relative mx-auto w-64 plane-fuselage pt-8 pb-6 px-5 border-2 border-slate-200';
  container.innerHTML = `
    <div class="fuselage-wing-left"></div>
    <div class="fuselage-wing-right"></div>
    <div class="cockpit-windows">
      <div class="cockpit-window"></div>
      <div class="cockpit-window"></div>
    </div>
    <div class="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 pb-1.5 border-b border-slate-200">
      Flight Deck / Cockpit
    </div>
    <div id="seatMapGrid" class="space-y-1"></div>
  `;
  renderSeatMap();
}

function renderSeatMapMobile() {
  const container = document.getElementById('seatMapGridMobile');
  if (!container || !currentFlight) return;
  const rows = [1, 2, 3, 4, 5, 6, 7];
  const cols = ['A', 'B', 'AISLE', 'C', 'D'];
  const occupied = currentFlight.occupiedSeats || [];

  container.innerHTML = rows.map(r => `
    <div class="flex items-center justify-between gap-1 my-1">
      ${cols.map(c => {
        if (c === 'AISLE') return `<span class="w-5 text-center text-[9px] font-bold text-slate-400">${r}</span>`;
        const seatCode = `${r}${c}`;
        const isOccupied = occupied.includes(seatCode);
        const isSelected = currentSelectedSeat === seatCode;

        let style = 'bg-slate-200 text-slate-700';
        if (isOccupied) style = 'occupied bg-blue-600 text-white';
        if (isSelected) style = 'selected bg-amber-400 text-slate-900 font-bold';

        return `
          <button 
            type="button" 
            onclick="toggleSeatSelection('${seatCode}')"
            ${isOccupied ? 'disabled' : ''}
            class="w-7 h-7 rounded text-[10px] font-semibold flex items-center justify-center ${style}">
            ${seatCode}
          </button>
        `;
      }).join('')}
    </div>
  `).join('');
}

// --- TAB 2: ONLINE FLIGHT RESERVATIONS (FLIGHT FINDER) ---
function renderAllFlightsCatalogue() {
  const origin = document.getElementById('filterOrigin')?.value || 'ALL';
  const dest = document.getElementById('filterDest')?.value || 'ALL';
  const container = document.getElementById('flightsCatalogueGrid');
  if (!container) return;

  const filtered = flights.filter(f =>
    (origin === 'ALL' || f.origin === origin) &&
    (dest === 'ALL' || f.destination === dest)
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
        <i class="fa-solid fa-plane-slash text-4xl text-slate-300 mb-3 block"></i>
        <p class="font-bold text-slate-700 text-base">No Direct Flights Matching Filters</p>
        <p class="text-xs text-slate-400 mt-1">Try resetting Origin and Destination filters to 'All'</p>
        <button onclick="resetFlightFilters()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Show All Routes</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(f => {
    const occupiedCount = f.occupiedSeats ? f.occupiedSeats.length : 0;
    const capacity = f.capacity || 28;
    const openSeats = capacity - occupiedCount;

    return `
      <div class="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
        <div>
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <span class="inline-block text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-xl mb-1.5 border border-blue-100">
                ${f.id} &bull; ${f.aircraft}
              </span>
              <h3 class="font-bold text-slate-800 text-base group-hover:text-blue-600 transition">${f.route}</h3>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-slate-900">$${f.basePrice}</span>
              <span class="block text-[10px] text-slate-400 uppercase font-semibold">Starting Fare</span>
            </div>
          </div>

          <!-- Schedule Times Banner -->
          <div class="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-xs my-4 border border-slate-100">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Departure</span>
              <strong class="text-slate-800 text-sm">${f.departureTime}</strong>
              <span class="text-[10px] text-slate-500 block">${f.origin}</span>
            </div>
            <div class="flex flex-col items-center px-2">
              <span class="text-[10px] font-semibold text-slate-400">${f.duration || '7h 15m'}</span>
              <div class="w-16 h-0.5 bg-slate-300 relative my-1">
                <i class="fa-solid fa-plane text-[10px] text-blue-600 absolute -top-1.5 left-1/2 -translate-x-1/2"></i>
              </div>
              <span class="text-[9px] text-emerald-600 font-semibold">Non-stop</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Arrival</span>
              <strong class="text-slate-800 text-sm">${f.arrivalTime}</strong>
              <span class="text-[10px] text-slate-500 block">${f.destination}</span>
            </div>
          </div>

          <!-- Amenities Pills -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${(f.amenities || ['Fast Wi-Fi', 'Complimentary Dining']).map(a => `
              <span class="text-[10px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                <i class="fa-solid fa-check text-blue-600 text-[8px] mr-1"></i>${a}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <span class="text-xs text-slate-500">
            <strong class="${openSeats < 6 ? 'text-rose-600 font-bold' : 'text-slate-700'}">${openSeats}</strong> seats left
          </span>
          <button onclick="quickBookFlight('${f.id}')" class="bg-slate-900 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-2">
            <span>Select & Book</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function resetFlightFilters() {
  const originEl = document.getElementById('filterOrigin');
  const destEl = document.getElementById('filterDest');
  if (originEl) originEl.value = 'ALL';
  if (destEl) destEl.value = 'ALL';
  renderAllFlightsCatalogue();
}

// --- TAB 3: DIGITAL BOARDING PASSES & TICKETS ---
function renderTickets() {
  const container = document.getElementById('ticketsContainer');
  if (!container) return;

  if (manifests.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
        <i class="fa-solid fa-ticket-simple text-4xl text-slate-300 mb-3 block"></i>
        <p class="font-bold text-slate-700 text-base">No Boarding Passes Issued Yet</p>
        <p class="text-xs text-slate-400 mt-1">Make a reservation to automatically issue a digital boarding pass.</p>
        <button onclick="openBookingModal()" class="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-md">+ Book a Flight Now</button>
      </div>
    `;
    return;
  }

  container.innerHTML = manifests.map((m, idx) => {
    const flight = flights.find(f => f.id === m.flightId) || flights[0] || {};
    
    let statusPill = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    if (m.status === 'Boarded') statusPill = 'bg-blue-100 text-blue-800 border border-blue-200';
    if (m.status === 'Confirmed') statusPill = 'bg-amber-100 text-amber-800 border border-amber-200';

    return `
      <div class="boarding-pass-card border border-slate-200 flex flex-col md:flex-row group">
        <!-- Notches for perforated appearance -->
        <div class="pass-notch-top left-1/3 -translate-x-1/2 hidden md:block"></div>
        <div class="pass-notch-bottom left-1/3 -translate-x-1/2 hidden md:block"></div>

        <!-- Left Stub: Flight Summary -->
        <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-6 md:w-2/5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-700/60 relative">
          <div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-xs">
                  <i class="fa-solid fa-plane"></i>
                </div>
                <span class="text-xs font-extrabold tracking-widest text-cyan-300 uppercase">SKYLINE BOARDING</span>
              </div>
              <span class="text-[10px] font-mono uppercase bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">${m.cabinClass || 'Economy'}</span>
            </div>

            <div class="mt-4">
              <p class="text-3xl font-black tracking-tight text-white">${flight.origin || 'JFK'} <i class="fa-solid fa-arrow-right text-xs text-cyan-400 mx-1"></i> ${flight.destination || 'LHR'}</p>
              <p class="text-xs text-slate-300 mt-1">${flight.route || 'International Flight'}</p>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Flight No.</span>
              <strong class="text-white text-sm font-mono">${m.flightId}</strong>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Assigned Seat</span>
              <strong class="text-amber-400 text-base font-black font-mono">${m.seat}</strong>
            </div>
          </div>
        </div>

        <!-- Right Main: Passenger & Flight Details -->
        <div class="p-6 md:w-3/5 flex flex-col justify-between bg-white">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Passenger Name</span>
                <h4 class="text-base font-bold text-slate-800 leading-tight">${m.passengerName || m.name}</h4>
                <p class="text-xs text-slate-500 font-mono mt-0.5">PNR: <strong class="text-blue-600">${m.pnr}</strong> &bull; ID: ${m.passportNumber || m.passport || 'N/A'}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-[11px] font-bold ${statusPill}">
                ${m.status}
              </span>
            </div>

            <!-- Gate, Terminal, Dep Time -->
            <div class="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl my-4 border border-slate-100 text-xs text-center">
              <div>
                <span class="text-[9px] font-bold text-slate-400 uppercase block">Terminal</span>
                <strong class="text-slate-800 font-bold">${flight.terminal || 'T4'}</strong>
              </div>
              <div>
                <span class="text-[9px] font-bold text-slate-400 uppercase block">Gate</span>
                <strong class="text-blue-600 font-bold">${flight.gate || 'B14'}</strong>
              </div>
              <div>
                <span class="text-[9px] font-bold text-slate-400 uppercase block">Boarding</span>
                <strong class="text-slate-800 font-bold">${flight.departureTime || '06:00 AM'}</strong>
              </div>
              <div>
                <span class="text-[9px] font-bold text-slate-400 uppercase block">Group</span>
                <strong class="text-slate-800 font-bold">GRP 1</strong>
              </div>
            </div>
          </div>

          <!-- Barcode, QR Code & Actions -->
          <div class="pt-3 border-t border-dashed border-slate-200">
            <div class="flex items-center justify-between">
              <!-- High-density simulated Barcode -->
              <div class="flex flex-col">
                <div class="h-8 flex items-center gap-[2px] opacity-80 overflow-hidden">
                  ${Array.from({length: 42}).map((_, i) => `
                    <span class="inline-block h-full bg-slate-900" style="width: ${(i % 3 === 0 ? 3 : (i % 2 === 0 ? 1 : 2))}px"></span>
                  `).join('')}
                </div>
                <span class="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-widest">${m.pnr} • ETKT 9482014829</span>
              </div>

              <!-- Quick Action Buttons -->
              <div class="flex items-center gap-2 no-print">
                <button onclick="printTicket('${m.pnr}')" title="Print Boarding Pass" class="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition text-xs font-semibold flex items-center gap-1">
                  <i class="fa-solid fa-print"></i>
                  <span class="hidden sm:inline">Print</span>
                </button>
                <button onclick="cyclePassengerStatus('${m.pnr}')" title="Advance Check-In Status" class="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition text-xs font-semibold flex items-center gap-1">
                  <i class="fa-solid fa-arrows-rotate"></i>
                  <span class="hidden sm:inline">Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function printTicket(pnr) {
  window.print();
}

// --- TAB 4: PASSENGER MANIFEST MANAGEMENT ---
function renderManifestTable() {
  const query = (document.getElementById('manifestSearchInput')?.value || '').toLowerCase();
  const filterFlight = document.getElementById('manifestFlightFilter')?.value || 'ALL';
  const filterStatus = document.getElementById('manifestStatusFilter')?.value || 'ALL';
  const tbody = document.getElementById('manifestTableBody');
  if (!tbody) return;

  const filtered = manifests.filter(m => {
    const name = (m.passengerName || m.name || '').toLowerCase();
    const pnr = (m.pnr || '').toLowerCase();
    const flightId = (m.flightId || '').toLowerCase();
    const passport = (m.passportNumber || m.passport || '').toLowerCase();
    const seat = (m.seat || '').toLowerCase();

    const matchesQuery = !query || (
      name.includes(query) ||
      pnr.includes(query) ||
      flightId.includes(query) ||
      passport.includes(query) ||
      seat.includes(query)
    );

    const matchesFlight = (filterFlight === 'ALL' || m.flightId === filterFlight);
    const matchesStatus = (filterStatus === 'ALL' || m.status === filterStatus);

    return matchesQuery && matchesFlight && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-slate-400 text-xs">
          <i class="fa-solid fa-clipboard-question text-3xl mb-2 text-slate-300 block"></i>
          No passenger records matching current manifest filters
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(m => {
    let statusClass = 'bg-amber-100 text-amber-800 border-amber-200';
    if (m.status === 'Checked-In') statusClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (m.status === 'Boarded') statusClass = 'bg-blue-100 text-blue-800 border-blue-200';

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="py-3 px-4 font-mono font-bold text-xs text-blue-600">
          ${m.pnr}
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-slate-800 text-xs">${m.passengerName || m.name}</div>
          <span class="text-[10px] text-slate-400">${m.email || 'passenger@skyline.aero'}</span>
        </td>
        <td class="py-3 px-4 text-xs font-mono text-slate-600">
          ${m.passportNumber || m.passport || 'P-98402'}
        </td>
        <td class="py-3 px-4">
          <span class="font-bold text-xs text-slate-800 block">${m.flightId}</span>
          <span class="text-[10px] text-slate-400">${m.cabinClass || 'Economy'}</span>
        </td>
        <td class="py-3 px-4">
          <span class="font-bold text-slate-800 text-xs px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">${m.seat}</span>
        </td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusClass}">
            <span class="w-1.5 h-1.5 rounded-full ${m.status === 'Boarded' ? 'bg-blue-600' : (m.status === 'Checked-In' ? 'bg-emerald-600' : 'bg-amber-600')}"></span>
            ${m.status}
          </span>
        </td>
        <td class="py-3 px-4 text-right space-x-2">
          <button onclick="cyclePassengerStatus('${m.pnr}')" title="Advance Check-In Status" class="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition">
            <i class="fa-solid fa-arrows-rotate mr-1"></i>Advance
          </button>
          <button onclick="cancelReservation('${m.pnr}')" title="Cancel Reservation" class="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition">
            <i class="fa-solid fa-trash mr-1"></i>Cancel
          </button>
        </td>
      </tr>
    `;
  }).join('');

  populateManifestFlightFilterOptions();
}

function populateManifestFlightFilterOptions() {
  const select = document.getElementById('manifestFlightFilter');
  if (!select) return;
  const currentVal = select.value;
  const flightIds = flights.map(f => f.id);

  select.innerHTML = `<option value="ALL">All Flight Routes</option>` +
    flightIds.map(id => `<option value="${id}" ${id === currentVal ? 'selected' : ''}>${id}</option>`).join('');
}

// Check-In Status Progression: Confirmed -> Checked-In -> Boarded
async function cyclePassengerStatus(pnr) {
  const order = ['Confirmed', 'Checked-In', 'Boarded'];
  const pax = manifests.find(m => m.pnr === pnr);
  if (!pax) return;

  const nextStatus = order[(order.indexOf(pax.status) + 1) % order.length];

  if (isBackendAvailable) {
    try {
      const res = await fetch(`${API_BASE}/reservations/${pnr}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        const data = await res.json();
        pax.status = nextStatus;
      }
    } catch (e) {
      pax.status = nextStatus;
    }
  } else {
    pax.status = nextStatus;
  }

  saveToLocalStorage(flights, manifests);
  showToast(`Passenger ${pax.passengerName || pax.name} status updated to '${nextStatus}'`, 'info');
  refreshAppViews();
}

// Cancel Booking & Release Aircraft Seat
async function cancelReservation(pnr) {
  const idx = manifests.findIndex(m => m.pnr === pnr);
  if (idx === -1) return;

  const pax = manifests[idx];
  const confirmMsg = `Are you sure you want to cancel reservation ${pnr} for ${pax.passengerName || pax.name}? The seat (${pax.seat}) will be immediately released.`;
  if (!confirm(confirmMsg)) return;

  if (isBackendAvailable) {
    try {
      await fetch(`${API_BASE}/reservations/${pnr}`, { method: 'DELETE' });
    } catch (e) {
      // Offline fallback
    }
  }

  // Release seat locally
  const targetFlight = flights.find(f => f.id === pax.flightId);
  if (targetFlight && targetFlight.occupiedSeats) {
    targetFlight.occupiedSeats = targetFlight.occupiedSeats.filter(s => s !== pax.seat);
  }

  manifests.splice(idx, 1);
  saveToLocalStorage(flights, manifests);

  showToast(`Reservation ${pnr} cancelled. Seat ${pax.seat} released on flight ${pax.flightId}.`, 'warning');
  refreshAppViews();
}

// Manifest CSV & JSON Export
function exportManifestCSV() {
  if (isBackendAvailable) {
    window.open(`${API_BASE}/manifests/export/csv`, '_blank');
    showToast('Manifest CSV downloaded from Skyline Aviation API', 'success');
    return;
  }

  const headers = ['PNR,Passenger Name,Passport,Flight,Seat,Cabin,Status,BookedAt'];
  const rows = manifests.map(m =>
    `${m.pnr},"${m.passengerName || m.name}",${m.passportNumber || m.passport || ''},${m.flightId},${m.seat},${m.cabinClass || 'Economy'},${m.status},${m.bookedAt || new Date().toISOString()}`
  );
  const csv = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', `skyline_manifest_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Manifest CSV exported successfully', 'success');
}

function exportManifestJSON() {
  const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifests, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', jsonStr);
  link.setAttribute('download', `skyline_manifest_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Manifest JSON exported successfully', 'success');
}

// --- TAB 5: FLEET RADAR & GLOBAL NETWORK ---
function renderFleetRadar() {
  const container = document.getElementById('fleetRadarGrid');
  if (!container) return;

  container.innerHTML = flights.map(f => {
    const occupiedCount = f.occupiedSeats ? f.occupiedSeats.length : 0;
    const capacity = f.capacity || 28;
    const loadPercentage = Math.round((occupiedCount / capacity) * 100);

    return `
      <div class="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold font-mono px-2.5 py-1 bg-slate-900 text-white rounded-lg">${f.id}</span>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${
              f.status === 'Boarding' ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-emerald-100 text-emerald-700'
            }">${f.status}</span>
          </div>

          <h3 class="text-base font-bold text-slate-800">${f.route}</h3>
          <p class="text-xs text-slate-400 mb-4">${f.aircraft} &bull; Distance: ${f.distance || '3,200 NM'}</p>

          <!-- Telemetry Specs -->
          <div class="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center text-xs mb-4">
            <div>
              <span class="text-[9px] text-slate-400 uppercase font-bold block">Cruise Alt</span>
              <strong class="text-slate-700">38,000 ft</strong>
            </div>
            <div>
              <span class="text-[9px] text-slate-400 uppercase font-bold block">Airspeed</span>
              <strong class="text-slate-700">540 kts</strong>
            </div>
            <div>
              <span class="text-[9px] text-slate-400 uppercase font-bold block">Terminal</span>
              <strong class="text-slate-700">${f.terminal || 'T1'}</strong>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="text-slate-500 font-medium">Passenger Load Factor</span>
              <span class="font-bold text-slate-800">${loadPercentage}% (${occupiedCount}/${capacity})</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="bg-blue-600 h-full rounded-full transition-all duration-500" style="width: ${loadPercentage}%"></div>
            </div>
          </div>
        </div>

        <button onclick="selectFlightAndOpenMap('${f.id}')" class="mt-5 w-full py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-chair"></i>
          <span>View Aircraft Cabin</span>
        </button>
      </div>
    `;
  }).join('');
}

function selectFlightAndOpenMap(flightId) {
  selectFlightForSeatMap(flightId);
  switchTab('dashboard');
  showToast(`Loaded cabin seating chart for flight ${flightId}`, 'info');
}

// --- BOOKING MODAL & SUBMISSION ENGINE ---
function openBookingModal(preselectedFlightId) {
  populateModalFlights(preselectedFlightId || (currentFlight ? currentFlight.id : flights[0]?.id));
  
  const seatInput = document.getElementById('modalSeatInput');
  if (seatInput) {
    seatInput.value = currentSelectedSeat || getFirstAvailableSeat();
  }

  updateModalPricePreview();

  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function openBookingModalWithSeat() {
  if (!currentSelectedSeat) {
    showToast('Please select an available seat from the cabin layout first', 'warning');
    return;
  }
  openBookingModal(currentFlight?.id);
}

function quickBookFlight(flightId) {
  selectFlightForSeatMap(flightId);
  openBookingModal(flightId);
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function populateModalFlights(selectedId) {
  const sel = document.getElementById('modalFlightSelect');
  if (!sel) return;

  sel.innerHTML = flights.map(f => `
    <option value="${f.id}" ${f.id === selectedId ? 'selected' : ''}>
      ${f.id} — ${f.route} ($${f.basePrice})
    </option>
  `).join('');
}

function getFirstAvailableSeat() {
  if (!currentFlight) return '1C';
  const occupied = currentFlight.occupiedSeats || [];
  const rows = [1, 2, 3, 4, 5, 6, 7];
  const cols = ['A', 'B', 'C', 'D'];

  for (let r of rows) {
    for (let c of cols) {
      const code = `${r}${c}`;
      if (!occupied.includes(code)) return code;
    }
  }
  return '2D';
}

function updateModalPricePreview() {
  const flightId = document.getElementById('modalFlightSelect')?.value;
  const cabinClass = document.getElementById('modalCabinSelect')?.value || 'Economy';
  const targetFlight = flights.find(f => f.id === flightId);
  if (!targetFlight) return;

  let multiplier = 1.0;
  if (cabinClass === 'Business') multiplier = 1.6;
  if (cabinClass === 'First Class') multiplier = 2.5;

  const total = Math.round(targetFlight.basePrice * multiplier);
  const display = document.getElementById('modalTotalPriceDisplay');
  if (display) display.innerText = `$${total}.00`;
}

// Handle Reservation Form Submit
async function submitReservation(e) {
  e.preventDefault();

  const name = document.getElementById('paxName').value.trim();
  const passport = document.getElementById('paxPassport').value.trim().toUpperCase();
  const email = document.getElementById('paxEmail')?.value.trim();
  const phone = document.getElementById('paxPhone')?.value.trim();
  const flightId = document.getElementById('modalFlightSelect').value;
  const cabinClass = document.getElementById('modalCabinSelect').value;
  const seat = document.getElementById('modalSeatInput').value.trim().toUpperCase();
  const baggage = document.getElementById('modalBaggageSelect')?.value || '1 Checked (23 kg)';
  const status = document.getElementById('modalStatusSelect')?.value || 'Confirmed';

  // Conflict validation: is seat occupied?
  const targetFlight = flights.find(f => f.id === flightId);
  if (targetFlight && targetFlight.occupiedSeats && targetFlight.occupiedSeats.includes(seat)) {
    showToast(`Conflict: Seat ${seat} on flight ${flightId} is already occupied! Please choose another.`, 'error');
    return;
  }

  const payload = {
    passengerName: name,
    passportNumber: passport,
    email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@skyline.aero`,
    phone: phone || '+1 555-0100',
    flightId,
    cabinClass,
    seat,
    baggage,
    status
  };

  let newTicket = null;

  if (isBackendAvailable) {
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        newTicket = data.ticket;
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to submit reservation', 'error');
        return;
      }
    } catch (e) {
      // Use local creation
    }
  }

  if (!newTicket) {
    const pnr = 'SKY' + Math.floor(1000 + Math.random() * 9000);
    newTicket = {
      pnr,
      passengerName: name,
      passportNumber: passport,
      email: payload.email,
      phone: payload.phone,
      flightId,
      seat,
      cabinClass,
      baggage,
      status,
      bookedAt: new Date().toISOString()
    };
    manifests.unshift(newTicket);

    if (targetFlight) {
      if (!targetFlight.occupiedSeats) targetFlight.occupiedSeats = [];
      targetFlight.occupiedSeats.push(seat);
    }
    saveToLocalStorage(flights, manifests);
  } else {
    // If backend provided new ticket, also reflect in current in-memory manifests & target flight
    manifests.unshift(newTicket);
    if (targetFlight && !targetFlight.occupiedSeats.includes(seat)) {
      targetFlight.occupiedSeats.push(seat);
    }
    saveToLocalStorage(flights, manifests);
  }

  currentSelectedSeat = null;
  closeBookingModal();
  document.getElementById('bookingForm')?.reset();

  showToast(`Booking Confirmed! E-Ticket issued with PNR: ${newTicket.pnr}`, 'success');
  refreshAppViews();
  switchTab('tickets');
}

// Reset Demo Data
async function resetDemoData() {
  if (!confirm('Reset Skyline database to original factory defaults? This clears custom bookings.')) {
    return;
  }

  if (isBackendAvailable) {
    try {
      await fetch(`${API_BASE}/reset`, { method: 'POST' });
    } catch (e) {}
  }

  localStorage.removeItem('skyline_flights');
  localStorage.removeItem('skyline_manifests');
  showToast('Database reset to default seed', 'info');
  setTimeout(() => location.reload(), 600);
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  let bg = 'bg-slate-900 text-white border-slate-700';
  let icon = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';

  if (type === 'error') {
    bg = 'bg-rose-950 text-rose-100 border-rose-800';
    icon = '<i class="fa-solid fa-triangle-exclamation text-rose-400"></i>';
  } else if (type === 'warning') {
    bg = 'bg-amber-950 text-amber-100 border-amber-800';
    icon = '<i class="fa-solid fa-circle-exclamation text-amber-400"></i>';
  } else if (type === 'info') {
    bg = 'bg-blue-950 text-blue-100 border-blue-800';
    icon = '<i class="fa-solid fa-circle-info text-cyan-400"></i>';
  }

  toast.className = `toast-msg flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-semibold ${bg}`;
  toast.innerHTML = `${icon}<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- CHART.JS VISUALIZATIONS ---
function initCharts() {
  // 1. Line Chart: Flight Analytics
  const canvasLine = document.getElementById('flightAnalyticsChart');
  if (canvasLine) {
    const ctx = canvasLine.getContext('2d');
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(2, 132, 199, 0.28)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0.0)');

    flightAnalyticsChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total Flight Reservations',
            data: [65, 85, 78, 125, 118, 165, 190, 182, 210, 235, 245, 290],
            borderColor: '#0284c7',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            borderWidth: 2.5,
            pointBackgroundColor: '#0284c7',
            pointRadius: 3,
            pointHoverRadius: 6
          },
          {
            label: 'Manifest Check-Ins',
            data: [50, 68, 65, 95, 102, 140, 172, 160, 190, 210, 222, 265],
            borderColor: '#06b6d4',
            borderDash: [4, 4],
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 11 },
            padding: 10,
            cornerRadius: 10
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9', drawBorder: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 10 }, color: '#94a3b8' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 10 }, color: '#94a3b8' }
          }
        }
      }
    });
  }

  // 2. Doughnut Chart: Capacity Split
  const canvasDonut = document.getElementById('bookingDonutChart');
  if (canvasDonut) {
    const ctx = canvasDonut.getContext('2d');
    bookingDonutChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Booked Seats', 'Pending Reservations', 'Available Seats'],
        datasets: [{
          data: [195, 65, 100],
          backgroundColor: ['#0284c7', '#f59e0b', '#e2e8f0'],
          hoverBackgroundColor: ['#0369a1', '#d97706', '#cbd5e1'],
          borderWidth: 0,
          cutout: '76%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${context.raw} Seats`;
              }
            }
          }
        }
      }
    });
  }
}

function updateChartData() {
  if (bookingDonutChartInstance) {
    const total = flights.reduce((acc, f) => acc + (f.capacity || 28), 0);
    const occupied = flights.reduce((acc, f) => acc + (f.occupiedSeats ? f.occupiedSeats.length : 0), 0);
    const available = Math.max(0, total - occupied);
    const reserved = Math.round(occupied * 0.3);
    const confirmed = occupied - reserved;

    bookingDonutChartInstance.data.datasets[0].data = [confirmed, reserved, available];
    bookingDonutChartInstance.update();
  }
}

// Chart timeframe switcher
function setAnalyticsTimeframe(range) {
  if (!flightAnalyticsChartInstance) return;

  const buttons = document.querySelectorAll('.chart-range-btn');
  buttons.forEach(b => {
    b.classList.remove('bg-blue-600', 'text-white');
    b.classList.add('bg-slate-100', 'text-slate-600');
  });

  const activeBtn = document.getElementById(`btn-range-${range}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-600');
    activeBtn.classList.add('bg-blue-600', 'text-white');
  }

  if (range === '7D') {
    flightAnalyticsChartInstance.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    flightAnalyticsChartInstance.data.datasets[0].data = [42, 58, 65, 84, 91, 110, 125];
    flightAnalyticsChartInstance.data.datasets[1].data = [35, 48, 55, 70, 80, 95, 108];
  } else if (range === '30D') {
    flightAnalyticsChartInstance.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    flightAnalyticsChartInstance.data.datasets[0].data = [310, 420, 480, 560];
    flightAnalyticsChartInstance.data.datasets[1].data = [270, 360, 410, 490];
  } else {
    flightAnalyticsChartInstance.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    flightAnalyticsChartInstance.data.datasets[0].data = [65, 85, 78, 125, 118, 165, 190, 182, 210, 235, 245, 290];
    flightAnalyticsChartInstance.data.datasets[1].data = [50, 68, 65, 95, 102, 140, 172, 160, 190, 210, 222, 265];
  }
  flightAnalyticsChartInstance.update();
}

// Global Search across table
function handleGlobalSearch() {
  const query = document.getElementById('globalSearch')?.value;
  if (!query) return;

  const manifestInput = document.getElementById('manifestSearchInput');
  if (manifestInput) manifestInput.value = query;

  switchTab('manifests');
  renderManifestTable();
}

// Notification Dropdown Toggle
function toggleNotificationDropdown() {
  const dd = document.getElementById('notificationDropdown');
  if (dd) dd.classList.toggle('hidden');
}

// System Time Clock
function startClock() {
  const clockEl = document.getElementById('systemUtcClock');
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    clockEl.innerText = now.toUTCString().replace('GMT', 'UTC');
  };
  update();
  setInterval(update, 1000);
}

// --- BOOTSTRAP INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  initCharts();
  startClock();
  loadAllData();

  // Close notifications when clicked outside
  document.addEventListener('click', (e) => {
    const notifBtn = document.getElementById('notificationBtn');
    const notifDd = document.getElementById('notificationDropdown');
    if (notifDd && notifBtn && !notifBtn.contains(e.target) && !notifDd.contains(e.target)) {
      notifDd.classList.add('hidden');
    }
  });
});
