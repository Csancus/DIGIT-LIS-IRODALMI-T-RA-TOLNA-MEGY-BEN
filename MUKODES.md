# Működés

Ez a dokumentum leírja, hogyan épül fel az **Irodalmi Séta Szekszárdon** projekt: mit tartalmaz, hogyan készült a tartalom, milyen technikai megoldásokkal működik, és milyen korlátai vannak.

## 1. Mi ez a projekt?

Virtuális irodalmi séta Szekszárdon és környékén, öt szerző köré építve:

- **Babits Mihály** (1883–1941)
- **Garay János** (1812–1853)
- **Baka István** (1948–1995)
- **Mészöly Miklós** (1921–2001)
- **Dienes Valéria** (1879–1978)

Mindannyian Szekszárdon születtek (vagy — mint Baka és Mészöly — ott nőttek fel és iskolába jártak), és mindegyikük életműve valamilyen módon a szekszárdi/tolnai tájhoz kötődik. A projekt két fő oldalból áll:

- **`index.html`** — a séta maga: 10 állomás, térképpel, valós szekszárdi helyszínekkel, rövid kontextussal és egy-egy odaillő idézettel.
- **`versek.html`** — a teljes irodalmi anyag: mind az öt szerzőtől 5–5 mű (vers, novella vagy szövegrészlet), szerzőnként rendezve, életrajzzal és helyszín-listával.

## 2. Hogyan készült a tartalom?

A tartalom **nem kitalált** — minden életrajzi adat, idézet és helyszín tényleges forrásból (Wikipédia, MEK — Magyar Elektronikus Könyvtár, EPA — Elektronikus Periodika Archívum, DIA — Digitális Irodalmi Akadémia, PIM, hivatalos emlékhely-oldalak, helyi újságok) lett összegyűjtve és ellenőrizve. Öt párhuzamos kutatási menet zajlott (egy-egy a szerzőnkénti életrajzhoz, versekhez és helyszínekhez), majd ezek anyagát szintetizáltuk egy koherens sétává.

A versszövegeket a másodlagos (kutatási) forrásokból nem vettük át változtatás nélkül: a köz­kincs szerzőknél (Babits, Garay) az elsődleges digitális archívumokból (EPA Nyugat-archívum, MEK) töltöttük le és ellenőriztük újra a teljes, betűhív szöveget — enélkül ugyanis előfordulhattak volna OCR-hibák vagy kihagyott ékezetes magánhangzók (pl. "ő", "ű") a közbülső feldolgozás során.

### Szerzői jogi megközelítés

Ez a legfontosabb szabály, amit a projekt következetesen betart:

| Szerző | Halálozás éve | Magyarországi közkincs-státusz (70 év pma) | Mit tartalmaz az oldal |
|---|---|---|---|
| Garay János | 1853 | Közkincs | **Teljes versszövegek** |
| Babits Mihály | 1941 | Közkincs (2012 óta) | **Teljes versszövegek** |
| Dienes Valéria | 1978 | Védett kb. 2048-ig | Rövid (2–4 soros) idézet + saját összefoglaló + forráslink |
| Mészöly Miklós | 2001 | Védett kb. 2071-ig | Rövid (2–4 soros) idézet + saját összefoglaló + forráslink |
| Baka István | 1995 | Védett kb. 2065-ig | Rövid (2–4 soros) idézet + saját összefoglaló + forráslink |

A még védett szerzőknél tehát **sehol nem szerepel teljes vers vagy novella szó szerint** — csak rövid, azonosítás/kritika céljából idézhető részlet, saját szavakkal írt kontextussal, és mindenhol pontos link a teljes szöveg jogtiszta forrásához (bakaistvan.hu, a DIA könyvtára, a Szent István Társulat kiadványa stb.).

## 3. A séta útvonala

A 10 állomás egy geográfiailag is bejárható kört ír le a városban:

1. **Garay tér** — a Garay-szobor, a séta kapuja
2. **Wosinsky Mór Megyei Múzeum** — mind az öt szerző hagyatékának egy-egy darabja
3. **Garay János Gimnázium** — Baka és Mészöly egykori iskolája
4. **Babits Mihály Kulturális Központ / Mészöly-szobor** — Agora sétány
5. **Babits Mihály Emlékház** — szülőház, benne Dienes és Baka emlékszobájával is
6. **Mészöly Miklós Emlékház (Irodalom Háza)** — a Séd-patak kanyarulatában
7. **Dienes Valéria Általános Iskola**
8. **A Csörge-tó egykori helye** — "szellem-helyszín" Baka egyik verséhez
9. **Alsóvárosi temető** — Baka István sírja
10. **Kálvária-kilátó (Szőlő-kilátó), Bartina-hegy** — záró, panorámás állomás

### Koordináták pontossága

A helyszínek nagy része OpenStreetMap/Nominatim nyílt geokódoló szolgáltatással lett ellenőrizve (pontos cím → GPS-koordináta). Néhány helyszínnél (Mészöly Miklós Emlékház, a Babits Kulturális Központ pontos épülete, a Csörge-tó egykori helye) a forrásokban csak leíró jellegű helymeghatározás állt rendelkezésre (pl. "a Babits-ház szomszédságában", "a város nyugati határában") — ezeknél a térképi pont **közelítő, illusztrációs célú**, a `js/stops-data.js` fájlban `approx: true` jelöléssel. Egy esetleges pontosításhoz a Szekszárdi Városházával vagy a Wosinsky Mór Múzeummal érdemes egyeztetni.

## 4. Technikai felépítés

A projekt egy egyszerű, build-lépés nélküli statikus weboldal — pontosan azért, hogy változtatás nélkül, közvetlenül működjön GitHub Pages-en.

```
├── index.html          # a séta (hero, térkép, 10 állomás)
├── versek.html         # teljes irodalmi archívum szerzőnként
├── css/style.css       # közös design rendszer (bordó–arany szőlőhegy-paletta)
├── js/stops-data.js    # az állomások adatai (cím, koordináta, szöveg, idézet)
├── js/main.js          # térkép-inicializálás (Leaflet) + állomás-render + sötét/világos téma
├── README.md
└── MUKODES.md          # ez a dokumentum
```

- **Térkép**: [Leaflet.js](https://leafletjs.com/) + OpenStreetMap csempék, CDN-ről betöltve — nincs szükség API-kulcsra.
- **Állomások renderelése**: az `index.html` egy üres `#stops-wrap` konténert tartalmaz, amelyet a `main.js` a `stops-data.js`-ben tárolt adatokból generál le kattintható térkép-jelölőkkel összekötve — így az állomások szövege és a térkép egyetlen adatforrásból (`WALK_STOPS` tömb) táplálkozik, nem kell két helyen karbantartani.
- **Design**: a paletta a szekszárdi borvidékre (bordó, arany, krém) és az esti szőlőhegyi hangulatra épül; a `versek.html` és `index.html` egyaránt támogatja a sötét/világos módot (rendszerbeállítás alapján, illetve kézi kapcsolóval, `localStorage`-ban megjegyezve).
- **Betűtípus**: Playfair Display (Google Fonts, CDN) a címekhez/versszövegekhez, rendszer sans-serif a UI-elemekhez.

Nincs backend, adatbázis vagy build-folyamat — a repó gyökeréből common GitHub Pages be tudja szolgálni közvetlenül.

## 5. Hogyan futtasd / fejleszd tovább helyben?

Nincs szükség telepítésre — bármelyik statikus fájlszerver megfelel, pl.:

```bash
npx serve .
# vagy
python -m http.server 8000
```

majd nyisd meg a `http://localhost:8000` címet.

## 6. GitHub Pages

A projekt a `main` ágról, a repó gyökeréből publikálódik GitHub Pages-en keresztül (Settings → Pages → Source: `main` / `/ (root)`). Miután a Pages build lefut, az oldal elérhető a repó GitHub Pages URL-jén.

## 7. Továbbfejlesztési ötletek

- Fotók/illusztrációk hozzáadása az egyes állomásokhoz (jelenleg tisztán tipográfia- és CSS-alapú a design, hogy ne legyen szükség képi jogtisztázásra).
- Hangos, felolvasott verzió (a közkincs Babits/Garay-versekhez ez jogilag is egyszerű).
- Több nyelvű (angol) verzió a nemzetközi látogatóknak.
- Offline/PWA támogatás mobilos, helyszíni bejfestéshez.
