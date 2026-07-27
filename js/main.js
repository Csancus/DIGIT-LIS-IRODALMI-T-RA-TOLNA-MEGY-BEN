// Irodalmi Séta Szekszárdon — fő oldal logika: térkép + állomás-render + téma váltó

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

const svgPin = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 11 15 25 15 25s15-14 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
    <circle cx="15" cy="15" r="6.5" fill="#fff"/>
  </svg>`;

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
      <div class="stop" id="${s.id}">
        <div class="stop-marker">
          <div class="stop-num">${s.num}</div>
          <div class="stop-line"></div>
        </div>
        <div class="stop-card">
          <div class="stop-eyebrow">${s.num}. állomás</div>
          <h3>${s.title}</h3>
          <div class="stop-loc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            ${s.loc}
          </div>
          ${s.body}
          ${quote}
          <div class="stop-authors">${tags}</div>
          <div class="stop-links"><a href="versek.html#${s.authors[0]}">Versek és forrás olvasása</a></div>
        </div>
      </div>`;
  }).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function initMap() {
  const el = document.getElementById("walk-map");
  if (!el || typeof L === "undefined") return;

  const map = L.map("walk-map", { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> közreműködői',
  }).addTo(map);

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
    const marker = L.marker([s.lat, s.lon], { icon }).addTo(map);
    marker.bindPopup(
      `<div class="popup-title">${s.num}. ${s.title}</div><div class="popup-desc">${s.teaser}</div>`
    );
    marker.on("click", () => {
      document.getElementById(s.id).scrollIntoView({ behavior: "smooth", block: "center" });
    });
    latlngs.push([s.lat, s.lon]);
  });

  L.polyline(latlngs, {
    color: "#c8963e",
    weight: 3,
    dashArray: "6 8",
    opacity: 0.85,
  }).addTo(map);

  map.fitBounds(latlngs, { padding: [30, 30] });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStops();
  initMap();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = "2026";
});
