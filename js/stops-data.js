/*
 * Az irodalmi séta állomásai.
 * A koordináták nagy része OpenStreetMap (Nominatim) alapján ellenőrzött.
 * Ahol a pontos cím nem volt geokódolható (l. jelölve "approx: true"),
 * a koordináta a forrásokban leírt elhelyezkedés (pl. "a Babits-ház szomszédságában")
 * alapján becsült, illusztrációs célú pont — a MUKODES.md ezt részletezi.
 */
const WALK_STOPS = [
  {
    id: "garay-ter",
    num: 1,
    title: "Garay tér — a séta kapuja",
    loc: "Garay tér, Szekszárd",
    lat: 46.3486775,
    lon: 18.7011426,
    authors: ["garay"],
    teaser: "Szárnovszky Ferenc 1898-as Garay-szobra a főtéren — innen indul a séta.",
    body: `
      <p>A séta a város főterén, a <strong>Garay János-szobornál</strong> kezdődik.
      Szárnovszky Ferenc alkotását 1898. június 5-én avatták fel — a talapzat egyik
      oldalán a Költészet géniusza, a másikon Köllő Miklós domborműve <em>Az obsitos</em>
      egy jelenetét ábrázolja. Garay 1812-ben itt, néhány saroknyira született;
      szülőháza mára eltűnt, helyén ma emeletes palota áll, de a tér a nevét és
      az emlékét a mai napig őrzi.</p>
      <p>Innen indulunk el — a XIX. század reformkori hazafiságától a XX. század
      négy nagy szekszárdi hangjáig.</p>
    `,
    quote: {
      text: "Légy üdvözölve, Tolna büszkesége!\nS engedd, hogy én is, Tolna hű fia…",
      cite: "Garay János: Bezerédi Istvánhoz (1845)",
    },
  },
  {
    id: "wosinsky",
    num: 2,
    title: "Wosinsky Mór Megyei Múzeum",
    loc: "Szent István tér 26., Szekszárd",
    lat: 46.3482432,
    lon: 18.7072282,
    authors: ["garay", "babits", "baka", "meszoly", "dienes"],
    teaser: "A megyei múzeum, amely mind az öt szerző hagyatékának egy-egy darabját őrzi.",
    body: `
      <p>A Wosinsky Mór Megyei Múzeum 1920 óta ad otthont a város irodalmi
      emlékezetének: első irodalmi gyűjteményi anyaga éppen <strong>Garay János</strong>
      hagyatéka volt, amelyet lánya, Garay Gizella adományozott 1917-ben. Ma a múzeum
      és a hozzá tartozó Babits-ház gondozza mind az öt szerző — Babits, Garay, Baka,
      Mészöly és Dienes — emlékét, kéziratait és relikviáit.</p>
      <p>Gondold el ezt a stációt úgy, mint a séta "előszobáját": itt fut össze
      az öt életút, mielőtt szétválnak a város különböző pontjain.</p>
    `,
  },
  {
    id: "garay-gimnazium",
    num: 3,
    title: "Garay János Gimnázium",
    loc: "Szent István tér 7–9., Szekszárd",
    lat: 46.3477594,
    lon: 18.7039518,
    authors: ["garay", "baka", "meszoly"],
    teaser: "Az iskola, ahol Baka István és Mészöly Miklós is diákoskodott.",
    body: `
      <p>A ma is működő gimnázium 1923-ban vette fel Garay János nevét, bejáratánál
      1971 óta ott áll Buza Barna mellszobra. De az épület két másik szekszárdi
      írót is egybefog: itt érettségizett <strong>Mészöly Miklós</strong>, és itt
      végezte középiskoláit <strong>Baka István</strong> is (1966-ban) — halálának
      20. évfordulóján, 2015-ben emléktáblát avattak számára az első emeleti
      lépcsőfordulóban, és egy tantermet is elneveztek róla.</p>
      <p>Egy iskola padjaiban tehát három nemzedék irodalmi indulása találkozik:
      a reformkori Garay neve, s alatta két XX. századi diák, akikből országos
      rangú író, illetve költő lett.</p>
    `,
  },
  {
    id: "mezoly-kultura",
    num: 4,
    title: "Babits Mihály Kulturális Központ és a Mészöly-szobor",
    loc: "Agora sétány / Szent István tér, Szekszárd",
    lat: 46.348,
    lon: 18.7065,
    approx: true,
    authors: ["babits", "meszoly"],
    teaser: "Adorjáni Endre Mészöly-mellszobra, 2022-ben, a centenáriumon avatva.",
    body: `
      <p>A város legnagyobb közművelődési intézménye 1970 óta viseli
      <strong>Babits Mihály</strong> nevét — ma az Agora Mozi és a Művészetek Háza
      működik benne. A közeli sétányon áll <strong>Mészöly Miklós</strong>
      bronz mellszobra, Adorjáni Endre alkotása, amelyet 2022. január 19-én,
      az író születésének 100. évfordulóján avattak fel.</p>
      <p>Így néz egymással szembe a "Nyugat" nemzedékének Babitsa és a
      második világháború utáni magyar próza egyik legnagyobb megújítója,
      Mészöly — mindketten Szekszárdon születtek, egymástól bő négy évtizeddel
      elválasztva.</p>
    `,
    quote: {
      text: "…ahol a rómaiak alapítanak, s csak később lesz Szegzárd a neve.",
      cite: "Mészöly Miklós: Térkép Aliscáról",
    },
  },
  {
    id: "babits-haz",
    num: 5,
    title: "Babits Mihály Emlékház",
    loc: "Babits Mihály utca 13., Szekszárd",
    lat: 46.3504626,
    lon: 18.6955477,
    authors: ["babits", "dienes", "baka"],
    teaser: "Egy házban három életmű: Babits szülőháza, Dienes és Baka emlékszobájával.",
    body: `
      <p>Ez a séta érzelmi középpontja. Az kb. 1780 körül épült copf-stílusú ház
      <strong>Babits Mihály szülőháza</strong> — itt született 1883. november 26-án,
      s itt élt élete első éveiben, majd 1898-tól ismét, amikor a család
      visszaköltözött Pécsről. 1983 óta, a költő születésének századik
      évfordulóján teljes egészében emlékmúzeummá vált; megtekinthető
      szülőszobája és egykori könyvtára, az udvaron pedig Farkas Pál
      1982-es, ülő Babits-szobra áll.</p>
      <p>De a ház nem csak Babitsé. Ugyanitt kapott helyet 2005 óta a
      <strong>Baka István Emlékszoba</strong> — özvegye adományából berendezve,
      a költő szegedi dolgozószobájának hangulatával, íróasztalával,
      írógépével és kb. 1500 kötetes könyvtárával. És itt található a
      <strong>Dienes Valéria emlékszoba</strong> is, amely négy szenvedélyét
      (zene, matematika, filozófia, mozdulatművészet) mutatja be — Dienes
      Valéria, aki 1975-ös visszaemlékezésében így fogalmazott:</p>
    `,
    quote: {
      text: "Én 1879-ben, Szekszárdon születtem, mint Babits Mihály, és még ugyanabban az utcában is, mint Babits Mihály.",
      cite: "Dienes Valéria, televíziós visszaemlékezés (1975)",
    },
  },
  {
    id: "meszoly-haz",
    num: 6,
    title: "Mészöly Miklós Emlékház — Irodalom Háza",
    loc: "Séd-patak kanyarulata, a Babits-ház szomszédságában, Szekszárd",
    lat: 46.3508,
    lon: 18.696,
    approx: true,
    authors: ["meszoly"],
    teaser: "Polcz Alaine adományából berendezett szecessziós villa, tőszomszédságban.",
    body: `
      <p>Néhány lépésre a Babits-háztól, a Séd-patak kanyarulatában áll az a
      szecessziós villa, amelyben ma az <strong>Irodalom Háza — Mészöly Miklós
      Emlékház</strong> működik. Az özvegy, Polcz Alaine 2003-as adományából
      ide került a budapesti lakás teljes berendezése: 3500 kötetes könyvtára,
      íróasztala és írógépe.</p>
      <p>Mészöly kései, úgynevezett "pannon prózájában" tudatosan tért vissza
      szülővárosa és a Sárköz–Dél-Dunántúl tájához — novellái szinte térképként
      rajzolják újra Szekszárd utcáit, dombjait és a Duna menti holtágakat.</p>
    `,
    quote: {
      text: "A holtág itt szélesedik ki annyira, hogy alkonyatkor lilás-vörös homoksivataggá mélyül.",
      cite: "Mészöly Miklós: Térkép, repedésekkel",
    },
  },
  {
    id: "dienes-iskola",
    num: 7,
    title: "Dienes Valéria Általános Iskola",
    loc: "Szent-Györgyi Albert utca 6., Szekszárd",
    lat: 46.3424917,
    lon: 18.7056882,
    authors: ["dienes"],
    teaser: "1992 óta viseli a mozdulatművészet szekszárdi megalapítójának nevét.",
    body: `
      <p><strong>Dienes Valéria</strong> — filozófus, matematikus, műfordító és a
      magyar mozdulatművészet (orkesztika) megteremtője — 1879-ben született
      Szekszárdon, Babits Mihály másod-unokatestvéreként, gyerekkori barátjaként.
      Párizsban Bergson tanítványa volt, megismerte Isadora Duncan mozgásművészetét,
      és ebből az élményből építette fel saját rendszerét: a testet mint
      élő "műtárgyat" értelmező orkesztikát.</p>
      <p>A róla elnevezett iskola és a Dienes Valéria utca ma is őrzi nevét
      abban a városban, ahol — saját szavai szerint — gyerekkorában "Szekszárd
      volt Magyarország, Tolna pedig Németország".</p>
    `,
    quote: {
      text: "…ha az emberi test műtárgy vagy legalább is annak kellene lennie…",
      cite: "Dienes Valéria: Művészet és testedzés (1915)",
    },
  },
  {
    id: "csorge-to",
    num: 8,
    title: "A Csörge-tó egykori helye",
    loc: "Szekszárd nyugati határa (a tó mára kiszáradt)",
    lat: 46.351,
    lon: 18.689,
    approx: true,
    authors: ["baka"],
    teaser: "Egy \"szellem-helyszín\": a ma már nem létező tó Baka István versében él tovább.",
    body: `
      <p>Ez a séta legkülönösebb állomása, mert fizikai valójában már nincs
      ott, amit keresünk. A Csörge-tó a városi vízkivétel miatt az 1960-as
      évektől fokozatosan kiszáradt — de <strong>Baka István</strong> egyik
      legszebb versében, gyerekkori emlékként, újra megtelik vízzel és
      megelevenedik benne a város irodalmi-zenei múltja is: Liszt Ferenc és
      az Augusz család legendás szekszárdi barátsága.</p>
      <p>Baka 1948-ban született Szekszárdon, s bár felnőtt élete Szegedhez
      kötötte, verseiben újra és újra visszatér gyerekkora tája — sokszor,
      mint itt is, egy már eltűnt hely emlékén keresztül.</p>
    `,
    quote: {
      text: "…újra tó a Csörge-tó\nhalott vizének jégkérge alatt,\na régi házban verset ír Babits,\nLiszt zongorázik Augusznál…",
      cite: "Baka István: Képeslap 1965-ből (1990)",
    },
  },
  {
    id: "alsovarosi-temeto",
    num: 9,
    title: "Alsóvárosi temető — Baka István sírja",
    loc: "Alsóvárosi temető, Szekszárd",
    lat: 46.3360733,
    lon: 18.7019987,
    authors: ["baka"],
    teaser: "A költő 1995-ben itt tért nyugalomra, az Augusz család kriptája mellett.",
    body: `
      <p>Baka István 1995. szeptember 20-án, Szegeden hunyt el, de szülővárosába,
      az Alsóvárosi temetőbe temették — jelképes módon éppen az Augusz-család
      kriptája mellé, ugyanazon Auguszok mellé, akikkel Liszt Ferenc egykor
      baráti kapcsolatban állt, s akik a <em>Képeslap 1965-ből</em> versben is
      felbukkannak. Síremlékét Farkas Pál szobrászművész készítette.</p>
      <p>2015-ben Szekszárd posztumusz díszpolgárává, s a Digitális Irodalmi
      Akadémia posztumusz tagjává választották — a sírnál azóta is rendszeresek
      a megemlékezések.</p>
    `,
  },
  {
    id: "kalvaria-kilato",
    num: 10,
    title: "Kálvária-kilátó (Szőlő-kilátó), Bartina-hegy",
    loc: "Kurta utca, Bartina-hegy, Szekszárd",
    lat: 46.346138,
    lon: 18.6938035,
    authors: ["babits", "meszoly"],
    teaser: "A séta záró, panorámás állomása — a szekszárdi szőlőhegyek fölött.",
    body: `
      <p>A séta a Bartina-hegy tetején, a Kálvária-kilátónál ér véget — 1983-ban
      avatták fel, tetején Kiss István Kossuth-díjas szobrász rozsdamentes
      acélból és bronzból készült szőlő-szoborkompozíciójával. Innen, a három
      kereszt és a szőlőhegyek fölött, pontosan az a táj tárul fel, amelyet
      <strong>Babits Mihály</strong> "Szőllőhegy télen" és "Szekszárd, 1915
      nyarán" című versei is megörökítenek — utóbbiban maga a domb, "három
      kereszt a Bartinán", szó szerint feltűnik.</p>
      <p><strong>Mészöly Miklós</strong> egyik novellájának főszereplője,
      "Bartinai Bartina", szintén erről a dombról kapta a nevét. Itt, a
      szőlők és a lemenő nap fényében ér véget az öt szerző szekszárdi
      irodalmi térképe — ott, ahol Babits egykor, gyerekként, a családi
      présház fölött "csüggött a mély egen".</p>
    `,
    quote: {
      text: "Jaj, minden úgy mint hajdanán\ns három kereszt a Bartinán\na régi sziluett…",
      cite: "Babits Mihály: Szekszárd, 1915 nyarán",
    },
  },
];

const AUTHORS = {
  babits: { name: "Babits Mihály", years: "1883–1941", color: "#8a3247" },
  garay: { name: "Garay János", years: "1812–1853", color: "#c8963e" },
  baka: { name: "Baka István", years: "1948–1995", color: "#4a6b6d" },
  meszoly: { name: "Mészöly Miklós", years: "1921–2001", color: "#6d5a2c" },
  dienes: { name: "Dienes Valéria", years: "1879–1978", color: "#7a4a8a" },
};
