# Működés

Ez a dokumentum leírja, hogyan épül fel az **Irodalmi Séta Szekszárdon** projekt: mit tartalmaz, hogyan készült a tartalom, milyen technikai megoldásokkal működik, és milyen korlátai vannak.

> Ez a leírás [mukodes.html](mukodes.html) néven a weboldal része is — stílusban a séta többi oldalával egyező, böngészőben olvasható aloldal. Ez a `.md` fájl a repóban közvetlenül olvasható forrásváltozat.

## 1. Mi ez a projekt?

Virtuális irodalmi séta Szekszárdon és környékén, öt szerző köré építve:

- **Babits Mihály** (1883–1941)
- **Garay János** (1812–1853)
- **Baka István** (1948–1995)
- **Mészöly Miklós** (1921–2001)
- **Dienes Valéria** (1879–1978)

Mindannyian Szekszárdon születtek (vagy — mint Baka és Mészöly — ott nőttek fel és iskolába jártak), és mindegyikük életműve valamilyen módon a szekszárdi/tolnai tájhoz kötődik. A projekt két fő oldalból áll:

- **`index.html`** — a séta maga: 10 állomás, térképpel, valós szekszárdi helyszínekkel, rövid kontextussal és egy-egy odaillő idézettel.
- **`versek.html`** — a teljes irodalmi anyag: mind az öt szerzőtől 5–5 mű (vers, novella vagy szövegrészlet), szerzőnként rendezve, életrajzzal és helyszín-listával. A séta oldalról ez felugró ablakban (popup) is elérhető, anélkül hogy el kellene navigálni a térképtől.
- **`mukodes.html`** — ez a dokumentum, weboldalba illesztve.

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

## 4. Térkép, navigálás és élő helyzet

A térkép [Leaflet.js](https://leafletjs.com/) + OpenStreetMap csempékkel épült, teljesen interaktív: a jelölők kattinthatók (megnyitják a hozzá tartozó állomást), és fordítva — egy állomás-kártyára kattintva a térkép odaugrik és megnyitja a popupot.

- **Google Térkép linkek** — minden állomásnál van egy "Google Térkép & navigálás" gomb, ami az adott pontot nyitja meg a Google Térképen (mobilon a telepített Google Maps appban), valamint egy "Teljes útvonal Google Térképen" gomb, ami az összes állomást bejárható gyalogos útvonalként nyitja meg (Google Maps Directions URL, `travelmode=walking`).
- **"Hol vagyok?" élő helyzet** — a böngésző helymeghatározását (Geolocation API) használva, opt-in gombbal bekapcsolható egy kék pötty, ami séta közben mutatja a felhasználó valós pozícióját a térképen, és automatikusan kiszámolja és kijelzi a legközelebbi állomást és a hozzá vezető távolságot. A helyzet csak a böngészőben, kliensoldalon dolgozódik fel, sehova nem kerül elküldésre vagy elmentésre.

## 5. Technikai felépítés

A projekt egy egyszerű, build-lépés nélküli statikus weboldal — pontosan azért, hogy változtatás nélkül, közvetlenül működjön GitHub Pages-en.

```
├── index.html          # a séta (hero, térkép, 10 állomás, versek-popup)
├── versek.html         # teljes irodalmi archívum szerzőnként
├── mukodes.html        # ez a dokumentum, weboldalba illesztve
├── css/style.css       # közös design rendszer (bordó–arany szőlőhegy-paletta)
├── js/stops-data.js    # az állomások adatai (cím, koordináta, szöveg, idézet)
├── js/main.js          # térkép, Google Térkép linkek, élő helyzet, popup, mobil nav, téma
├── README.md
└── MUKODES.md          # ez a dokumentum, Markdown-forrás
```

- **Állomások renderelése**: az `index.html` egy üres `#stops-wrap` konténert tartalmaz, amelyet a `main.js` a `stops-data.js`-ben tárolt adatokból generál le kattintható térkép-jelölőkkel összekötve — így az állomások szövege és a térkép egyetlen adatforrásból (`WALK_STOPS` tömb) táplálkozik, nem kell két helyen karbantartani.
- **Versek popup**: a "Versek és forrás olvasása" gomb nem navigál el az oldalról — helyette JavaScript-tel lekéri a `versek.html` megfelelő szerző-szekcióját (`fetch` + `DOMParser`), és egy felugró ablakban jeleníti meg. Így a versanyagnak egyetlen igazságforrása marad (`versek.html`), nincs duplikált tartalom. Ha a JavaScript nem elérhető, vagy a `fetch` meghiúsul (pl. `file://` protokollról nyitva), a gomb sima linkként viselkedik, és megnyitja a `versek.html` oldalt közvetlenül.
- **Design**: a paletta a szekszárdi borvidékre (bordó, arany, krém) és az esti szőlőhegyi hangulatra épül; minden oldal támogatja a sötét/világos módot (rendszerbeállítás alapján, illetve kézi kapcsolóval, `localStorage`-ban megjegyezve).
- **Betűtípus**: Playfair Display (Google Fonts, CDN) a címekhez/versszövegekhez, rendszer sans-serif a UI-elemekhez.
- **Mobilbarát felépítés**: reszponzív rács, hamburger-menü kis képernyőn, legalább 40–44 px-es érintési felületek, a térkép "kattints az aktiváláshoz" gesztuskezeléssel (hogy a lapgörgetés ne akadjon fenn az egérgörgős zoomoláson asztali nézetben, mobilon pedig az érintéses pöccintés/nagyítás alapból működik).

Nincs backend, adatbázis vagy build-folyamat — a repó gyökeréből a GitHub Pages közvetlenül ki tudja szolgálni.

## 6. Hogyan futtasd / fejleszd tovább helyben?

Nincs szükség telepítésre — bármelyik statikus fájlszerver megfelel, pl.:

```bash
npx serve .
# vagy
python -m http.server 8000
```

majd nyisd meg a `http://localhost:8000` címet. (A versek-popuphoz szükséges `fetch()` csak http(s) protokollon működik, a fájlrendszerről közvetlenül megnyitott, `file://` előtaggal induló oldalon nem — ott a gomb a teljes `versek.html` oldalra navigál.)

## 7. GitHub Pages

A projekt a `main` ágról, a repó gyökeréből publikálódik GitHub Pages-en keresztül (Settings → Pages → Source: `main` / `/ (root)`). Miután a Pages build lefut, az oldal elérhető a repó GitHub Pages URL-jén.

## 8. Továbbfejlesztési ötletek

- Fotók/illusztrációk hozzáadása az egyes állomásokhoz (jelenleg tisztán tipográfia- és CSS-alapú a design, hogy ne legyen szükség képi jogtisztázásra).
- Hangos, felolvasott verzió (a közkincs Babits/Garay-versekhez ez jogilag is egyszerű).
- Több nyelvű (angol) verzió a nemzetközi látogatóknak.
- Offline/PWA támogatás mobilos, helyszíni bejáráshoz.
