# Digitális Irodalmi Túra Tolna megyében

Virtuális irodalmi séta Szekszárdon öt szerző nyomában: **Babits Mihály**, **Garay János**, **Baka István**, **Mészöly Miklós** és **Dienes Valéria**. 10 valós szekszárdi helyszín, térkép, és mind az öt szerzőtől 5–5 vers/szövegrészlet — a szerzői jogi státusznak megfelelően (teljes szöveg a közkincs szerzőknél, rövid idézet + forrás a még védetteknél).

**Élő oldal:** https://csancus.github.io/DIGIT-LIS-IRODALMI-T-RA-TOLNA-MEGY-BEN/

A térkép teljesen interaktív (kattintható jelölők mindkét irányban), minden
állomáshoz van "nyisd meg Google Térképen / navigálj" link, illetve egy gomb a
teljes útvonalhoz; opcionálisan bekapcsolható élő GPS-helyzet is séta közben.
A weboldal mobilbarát (hamburger-menü, nagy érintési felületek).

## Oldalak

- [`index.html`](index.html) — a séta: térkép + 10 állomás
- [`versek.html`](versek.html) — teljes irodalmi archívum szerzőnként
- [`mukodes.html`](mukodes.html) — a projekt működésének leírása, weboldalba illesztve

## Működés, tartalom eredete, szerzői jogi megközelítés

Lásd: [`mukodes.html`](mukodes.html) (böngészőben) vagy [`MUKODES.md`](MUKODES.md) (Markdown-forrás)

## Helyben futtatás

```bash
npx serve .
```

Nincs build-lépés — tiszta HTML/CSS/JS, közvetlenül GitHub Pages-re publikálható.
