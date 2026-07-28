// Irodalmi Séta Szekszárdon — fő oldal logika:
// térkép + állomás-render + Google Térkép linkek + élő helyzet + téma váltó + mobil nav

(function themeInit() {
  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);
})();

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

function toggleMobileNav() {
  document.querySelector(".topnav")?.classList.toggle("nav-open");
}

/* ---------- Google Maps helper linkek ---------- */

function googleMapsStopUrl(s) {
  const label = encodeURIComponent(`${s.title}, Szekszárd`);
  return `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lon}&query_place_id=${label}`;
}

function googleMapsRouteUrl(stops) {
  const pts = stops.map((s) => `${s.lat},${s.lon}`);
  const origin = pts[0];
  const destination = pts[pts.length - 1];
  const waypoints = pts.slice(1, -1).slice(0, 8).join("|"); // Google URL API: max ~9 útvonalpont
  const params = new URLSearchParams({
    api: "1",
    travelmode: "walking",
    origin,
    destination,
  });
  let url = `https://www.google.com/maps/dir/?${params.toString()}`;
  if (waypoints) url += `&waypoints=${encodeURIComponent(waypoints)}`;
  return url;
}

/* ---------- Haversine távolság (méterben) ---------- */

function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function formatDistance(m) {
  if (m < 950) return `${Math.round(m / 10) * 10} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

/* ---------- Ikonok ---------- */

const svgPin = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 11 15 25 15 25s15-14 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
    <circle cx="15" cy="15" r="6.5" fill="#fff"/>
  </svg>`;

const svgPinTarget = "#2e7dd6";

/* ---------- Állomások renderelése ---------- */

function renderStops() {
  const wrap = document.getElementById("stops-wrap");
  if (!wrap) return;
  wrap.innerHTML = WALK_STOPS.map((s) => {
    const tags = s.authors
      .map((a) => `<span class="tag" style="background:${AUTHORS[a].color}33">${AUTHORS[a].name}</span>`)
      .join("");
    const quote = s.quote
      ? `<div class="quote-block">${escapeHtml(s.quote.text).replace(/\n/g, "<br>")}<span class="quote-cite">${s.quote.cite}</span></div>`
      : "";
    return `
      <div class="stop" id="${s.id}" data-stop-id="${s.id}">
        <div class="stop-marker">
          <button class="stop-num" data-jump="${s.id}" aria-label="${s.num}. állomás megjelölése a térképen">${s.num}</button>
          <div class="stop-line"></div>
        </div>
        <div class="stop-card">
          <div class="stop-eyebrow">${s.num}. állomás <span class="stop-distance" data-distance-for="${s.id}"></span></div>
          <h3>${s.title}</h3>
          <div class="stop-loc-row">
            <div class="stop-loc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              ${s.loc}
            </div>
            <a class="gmaps-link" href="${googleMapsStopUrl(s)}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l-5 2V6l5-2 6 2 5-2v14l-5 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>
              Google Térkép &amp; navigálás
            </a>
          </div>
          ${s.body}
          ${quote}
          <div class="stop-authors">${tags}</div>
          <div class="stop-links"><a href="versek.html#${s.authors[0]}" data-author="${s.authors[0]}" data-modal-trigger>Versek és forrás olvasása</a></div>
        </div>
      </div>`;
  }).join("");

  wrap.querySelectorAll("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const stop = WALK_STOPS.find((s) => s.id === btn.dataset.jump);
      if (stop && window.__walkMap) {
        window.__walkMap.panTo([stop.lat, stop.lon]);
        window.__walkMarkers[stop.id].openPopup();
      }
    });
  });

  wrap.querySelectorAll("[data-modal-trigger]").forEach((a) => {
    a.addEventListener("click", (e) => {
      // Ctrl/Cmd/középső kattintásnál hagyjuk az alap "új lapon megnyitás" működést
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      openPoemsModal(a.dataset.author);
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Térkép ---------- */

function initMap() {
  const el = document.getElementById("walk-map");
  if (!el || typeof L === "undefined") return;

  const map = L.map("walk-map", {
    scrollWheelZoom: false,
    tap: true,
  });
  window.__walkMap = map;
  window.__walkMarkers = {};

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> közreműködői',
  }).addTo(map);

  // "Klikkelj az aktiváláshoz" gesztuskezelés — hogy a lapgörgetés
  // ne akadjon fenn a térkép egérgörgős zoomolásán (asztali nézetben),
  // de a térkép mégis teljesen interaktív legyen egy kattintás után.
  const hint = L.control({ position: "bottomleft" });
  hint.onAdd = () => {
    const div = L.DomUtil.create("div", "map-scroll-hint");
    div.innerHTML = "Kattints a térképre a görgős nagyításhoz";
    return div;
  };
  hint.addTo(map);
  map.once("click focus", () => {
    map.scrollWheelZoom.enable();
    hint.remove();
  });
  el.addEventListener(
    "touchstart",
    () => {
      map.scrollWheelZoom.enable();
      hint.remove();
    },
    { once: true, passive: true }
  );

  const latlngs = [];
  WALK_STOPS.forEach((s) => {
    const primaryAuthor = s.authors[0];
    const color = AUTHORS[primaryAuthor].color;
    const icon = L.divIcon({
      className: "",
      html: svgPin(color),
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -36],
    });
    const marker = L.marker([s.lat, s.lon], { icon, keyboard: true, alt: `${s.num}. ${s.title}` }).addTo(map);
    marker.bindPopup(
      `<div class="popup-title">${s.num}. ${s.title}</div>
       <div class="popup-desc">${s.teaser}</div>
       <a class="popup-gmaps" href="${googleMapsStopUrl(s)}" target="_blank" rel="noopener">Megnyitás Google Térképen →</a>`
    );
    marker.on("click", () => {
      const target = document.getElementById(s.id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      wrap_highlight(s.id);
    });
    window.__walkMarkers[s.id] = marker;
    latlngs.push([s.lat, s.lon]);
  });

  L.polyline(latlngs, {
    color: "#c8963e",
    weight: 3,
    dashArray: "6 8",
    opacity: 0.85,
  }).addTo(map);

  map.fitBounds(latlngs, { padding: [30, 30] });

  // Kattintás/érintés a séta-kártyán -> térkép középre + popup nyit
  document.querySelectorAll(".stop-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a") || e.target.closest("button")) return;
      const id = card.closest(".stop").dataset.stopId;
      const stop = WALK_STOPS.find((s) => s.id === id);
      if (stop) {
        map.panTo([stop.lat, stop.lon]);
        window.__walkMarkers[id].openPopup();
      }
    });
  });

  initGeolocation(map);
}

function wrap_highlight(id) {
  document.querySelectorAll(".stop-card.nearest").forEach((c) => c.classList.remove("nearest"));
  const el = document.querySelector(`#${id} .stop-card`);
  if (el) el.classList.add("nearest");
}

/* ---------- Élő helyzet ("Hol vagyok?") ---------- */

let geoWatchId = null;
let userMarker = null;
let userAccuracyCircle = null;

function initGeolocation(map) {
  const btn = document.getElementById("locate-btn");
  const status = document.getElementById("locate-status");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (geoWatchId !== null) {
      stopGeolocation(map);
      btn.textContent = "📍 Hol vagyok?";
      btn.setAttribute("aria-pressed", "false");
      if (status) status.textContent = "";
      return;
    }

    if (!("geolocation" in navigator)) {
      if (status) status.textContent = "A böngésződ nem támogatja a helymeghatározást.";
      return;
    }

    btn.textContent = "◉ Élő nyomkövetés — kikapcsol";
    btn.setAttribute("aria-pressed", "true");
    if (status) status.textContent = "Helyzet lekérése…";

    geoWatchId = navigator.geolocation.watchPosition(
      (pos) => onLocationUpdate(map, pos, status),
      (err) => {
        if (status) {
          status.textContent =
            err.code === err.PERMISSION_DENIED
              ? "A helymeghatározás nincs engedélyezve a böngészőben."
              : "Nem sikerült lekérni a helyzetet.";
        }
        stopGeolocation(map);
        btn.textContent = "📍 Hol vagyok?";
        btn.setAttribute("aria-pressed", "false");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 12000 }
    );
  });
}

function stopGeolocation(map) {
  if (geoWatchId !== null) {
    navigator.geolocation.clearWatch(geoWatchId);
    geoWatchId = null;
  }
  if (userMarker) {
    map.removeLayer(userMarker);
    userMarker = null;
  }
  if (userAccuracyCircle) {
    map.removeLayer(userAccuracyCircle);
    userAccuracyCircle = null;
  }
  document.querySelectorAll("[data-distance-for]").forEach((el) => (el.textContent = ""));
  document.querySelectorAll(".stop-card.nearest").forEach((c) => c.classList.remove("nearest"));
}

function onLocationUpdate(map, pos, status) {
  const { latitude, longitude, accuracy } = pos.coords;

  const dotIcon = L.divIcon({
    className: "",
    html: '<div class="you-are-here"><div class="pulse"></div><div class="dot"></div></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

  if (!userMarker) {
    userMarker = L.marker([latitude, longitude], { icon: dotIcon, zIndexOffset: 1000 }).addTo(map);
    userAccuracyCircle = L.circle([latitude, longitude], {
      radius: accuracy,
      color: "#2e7dd6",
      weight: 1,
      fillOpacity: 0.08,
    }).addTo(map);
    map.panTo([latitude, longitude]);
  } else {
    userMarker.setLatLng([latitude, longitude]);
    userAccuracyCircle.setLatLng([latitude, longitude]);
    userAccuracyCircle.setRadius(accuracy);
  }

  // Legközelebbi állomás kiszámítása
  let nearest = null;
  let nearestDist = Infinity;
  WALK_STOPS.forEach((s) => {
    const d = distanceMeters(latitude, longitude, s.lat, s.lon);
    const badge = document.querySelector(`[data-distance-for="${s.id}"]`);
    if (badge) badge.textContent = `· ${formatDistance(d)}`;
    if (d < nearestDist) {
      nearestDist = d;
      nearest = s;
    }
  });

  if (nearest) {
    wrap_highlight(nearest.id);
    if (status) {
      status.textContent = `Élő helyzet aktív — legközelebbi állomás: ${nearest.num}. ${nearest.title} (${formatDistance(nearestDist)})`;
    }
  }
}

/* ---------- Versek popup (modal) ---------- */
/* A versek.html oldal az egyetlen "igazságforrás" a szerzők versanyagára —
   a popup csak lekéri annak megfelelő #author szekcióját (fetch + DOMParser),
   így nincs duplikált tartalom karbantartva két helyen. */

let versekDocCache = null;

async function openPoemsModal(authorKey) {
  const overlay = document.getElementById("poems-modal");
  if (!overlay) {
    window.location.href = `versek.html#${authorKey}`;
    return;
  }
  const titleEl = overlay.querySelector(".modal-head h3");
  const body = overlay.querySelector(".modal-body");
  const footerLink = overlay.querySelector("[data-modal-fulllink]");
  const meta = (typeof AUTHORS !== "undefined" && AUTHORS[authorKey]) || null;

  titleEl.textContent = meta ? `${meta.name} · ${meta.years}` : "Versek és szerzők";
  if (footerLink) footerLink.href = `versek.html#${authorKey}`;
  body.innerHTML = '<p class="modal-loading">Betöltés…</p>';
  showModal(overlay);

  try {
    if (!versekDocCache) {
      const res = await fetch("versek.html");
      if (!res.ok) throw new Error("network");
      const html = await res.text();
      versekDocCache = new DOMParser().parseFromString(html, "text/html");
    }
    const section = versekDocCache.getElementById(authorKey);
    if (!section) throw new Error("no-section");
    body.innerHTML = section.innerHTML;
  } catch (err) {
    body.innerHTML = `<p class="modal-error">Nem sikerült betölteni a tartalmat itt a helyszínen.
      <a href="versek.html#${authorKey}">Megnyitás önálló oldalon →</a></p>`;
  }
}

function showModal(overlay) {
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  overlay.setAttribute("aria-hidden", "false");
}

function closePoemsModal() {
  const overlay = document.getElementById("poems-modal");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  overlay.setAttribute("aria-hidden", "true");
}

function initModal() {
  const overlay = document.getElementById("poems-modal");
  if (!overlay) return;
  overlay.querySelectorAll("[data-modal-close]").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (e.target === el) closePoemsModal();
    })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closePoemsModal();
  });
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderStops();
  initMap();
  initModal();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = "2026";

  const routeBtn = document.getElementById("gmaps-route-btn");
  if (routeBtn) routeBtn.href = googleMapsRouteUrl(WALK_STOPS);

  document.querySelectorAll("[data-nav-toggle]").forEach((b) =>
    b.addEventListener("click", () => {
      toggleMobileNav();
      const open = document.querySelector(".topnav")?.classList.contains("nav-open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
    })
  );
});
