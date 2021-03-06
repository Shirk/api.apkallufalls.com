const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;

const expansions = {
  Unknown: 'X',
  Legacy: 1,
  ARR: 2,
  HW: 3,
  SB: 4
};

const gilImage = 'gil';
const companySealsImage = 'cs';
const wolfMarksImage = 'wm';
const mgpImage = 'mgp';
const poeticsImage = 'poetics';
const achievementCertificate = 'ac';
const fateImage = 'fate';
const eurekaAnemosFateImage = 'fate2';
const locationImage = 'loc';
const dutyImage = 'duty';
const pvpImage = 'pvp';
const trialImage = 'trial';
const raidImage = 'raid';
const timewornImage = 'map';
const elixirImage = '4559';
const hiElixirImage = '4560';
const alliedSealsImage = 'as';
const centurioSealsImage = 'cnts';
const seedImage = 'seed';
const questImage = 'quest';
const msqImage = 'msq';
const brassSkyPirateSpoilsImage = 'bsps';
const gelmorranPotsherdImage = 'gp';
const empyreanPotsherdImage = 'ep';
const wondrousTailsImage = 'wt';
const sasshoSekiFragmentImage = 'ssf';
const ventureImage = 'v';
const kojinSangoImage = 'ks';
const ixionHornImage = 'ih';
const anantaDreamstaffImage = 'ad';
const namazuKobanImage = 'nk';
const rathalosScalePlusImage = 'rs+';

const rank = {
  sworn: ['Sworn', 'Solidarisch', 'Assermenté', '誓約'],
  trusted: ['Trusted', 'Vertraut', 'Estimé', '信頼'],
  allied: ['Allied', 'Verbündet', 'Allié', '盟友'],
  respected: ['Respected', 'Respektierte', 'Respecté', '尊敬する']
}

const beastTribe = {
  amaljaa: ['Amalj\'aa', true, true, 'アマルジャ'],
  ixal: ['Ixal', true, true, 'イクサル'],
  kobold: ['Kobold', true, 'Kobolde', 'コボルド'],
  sahagin: ['Sahagin', true, 'Sahuagin', 'サハギン'],
  sylph: ['Sylph', 'Sylphen', 'Sylphe', 'シルフ'],
  vanuVanu: ['Vanu Vanu', true, true, 'バヌバヌ'],
  vath: ['Vath', true, 'Vathe', 'ヴァス'],
  moogle: ["Moogle", "Mogry", "Mog", "モーグリ"],
  kojin: ["Kojin", true, true, "コウジン"],
  ananta: ["Ananta", true, true, "アナンタ"],
  namazu: ["Namazu", "Namazuo", true, "ナマズオ"]
}

const item = {
  anemosLockbox: ["Anemos Lockbox", "Anemos-Schließkassette", "Coffre verrouillé d'Anemos", "アネモス帯のロックボックス"],
  pagosLockbox: ["Pagos Lockbox", "Pagos-Schließkassette", "Coffre verrouillé de Pagos", "パゴス帯のロックボックス"],
  bronzeTrimmedSack: ['Bronze-trimmed Sack', 'Gefundener Schatz I', 'Trésor mystérieux de grade I', '埋もれた財宝G1'],
  elixir: ['Elixir', 'Elixier', 'Élixir', 'エリクサー'],
  goldHaloedSack: ["Gold-haloed Sack", "Gülden strahlender Schatzbeutel", "Trésor énigmatique de grade II", "埋もれた財宝【弐】"],
  hiElixir: ['Hi-Elixir', 'Super-Elixier', 'Super élixir', 'ハイエリクサー'],
  ironTrimmedSack: ["Iron-trimmed Sack", "Gefundener Schatz II", "Trésor mystérieux de grade II", "埋もれた財宝G2"],
  pieceOfAccursedHoard: ['piece of the Accursed Hoard', 'verborgenen Schatz', 'trésor caché', '埋もれた財宝'],
  silverHaloedSack: ["Silver-haloed Sack", "Silbrig strahlender Schatzbeutel", "Trésor énigmatique de grade I", "埋もれた財宝【壱】"],
  bait: {
    bruteLeech: ["Brute Leech", "Grobegel", "Sangsue bestiale", "ブルートリーチ"],
    lugworm: ["Lugworm", "Wattwurm", "Ver de vase", "ラグワーム"],
    northernKrill: ['Northern Krill', 'Nordkrill', 'Krill polaire', 'ポーラークリル'],
    topwaterFrog: ['Topwater Frog', 'Schwimmfrosch', 'Grenouille sèche', 'トップウォーターフロッグ']
  },
  fish: {
    assassinBetta: ["Assassin Betta", "Kampffisch", "Betta assassin", "アサシンベタ"],
    bashfulBatfish: ["Bashful Batfish", "Fledermausfisch", "Platax ombré", "アカククリ"],
    merlthorGoby: ["Merlthor Goby", "Merlthor-Grundel", "Gobie de Merlthor", "メルトールゴビー"],
    ninjaBetta: ["Ninja Betta", "Ninja-Kampffisch", "Betta ninja", "ニンジャベタ"],
    wahoo: ["Wahoo", "Räubermakrele", "Thazard noir", "ワフー"]
  },
  seeds: {
    eggplantKnight: ['Eggplant Knight Seeds', 'Ritter-Aubergine-Samen', 'Graines du Chevalier aubergine', 'エッグナイトの種'],
    garlicJester: ['Garlic Jester Seeds', 'Sir-Knoblauch-Samen', 'Graines du Baron ail', 'ガーリックスターの種'],
    mandragoraQueen: ['Mandragora Queen Seeds', 'Königin-Mandragora-Samen', 'Graines de la Reine mandragore', 'マンドラクイーンの種'],
    onionPrince: ['Onion Prince Seeds', 'Prinz-Zwiebel-Samen', 'Graines du Prince oignon', 'オニオンプリンスの種'],
    tomatoKing: ['Tomato King Seeds', 'König-Tomate-Samen', 'Graines du Roi tomate', 'キングトマトの種']
  }
}

const craftItem = {
  allaganCatalyst: {
    icon: 9376,
    name: ["Allagan Catalyst", "Allagischer Katalysator", "Catalyseur allagois", "アラグの魔触媒"]
  },
  ancientLumber: {
    icon: 7606,
    name: ['Ancient Lumber', 'Götterholz', 'Madrier de morta', '神代木']
  },
  apkalluDown: {
    icon: 5348,
    name: ['Apkallu Down', 'Apkallu-Daunen', 'Duvet d\'apkallu', 'アプカルの綿毛']
  },
  arachneWeb: {
    icon: 9367,
    name: ['Arachne Web', 'Arachne-Netz', 'Toile d\'Arachne', 'アラクネウェブ']
  },
  astralRock: {
    icon: 5158,
    name: ['Astral Rock', 'Astralgestein', 'Roche astrale', '星性岩']
  },
  atomosCorpulence: {
    icon: 12647,
    name: ["Atomos Corpulence", "Atomos-Fett", "Chair d'Atomos", "アトモスの肉片"]
  },
  birchLumber: {
    icon: 12583,
    name: ["Birch Lumber", "Birken-Bauholz", "Madrier de bouleau", "バーチ材"]
  },
  bladeOfRevelry: {
    icon: 19123,
    name: ["Blade of Revelry", "Verspielte Klinge", "Lame de Susano", "豪神スサノオの刃"]
  },
  blissfulShroud: {
    icon: 19124,
    name: ["Blissful Shroud", "Gepflegtes Tuch", "Étole de Lakshmi", "美神ラクシュミの羽衣"]
  },
  bloodPepper: {
    icon: 13754,
    name: ["Blood Pepper", "Blutpfeffer", "Piment sanglant", "ブラッドペッパー"]
  },
  broombush: {
    icon: 7776,
    name: ['Broombush', 'Ginsterstrauch', 'Genêt', 'ホウキグサ']
  },
  byakkosMane: {
    icon: 22307,
    name: ["Byakko's Mane", "Byakko-Mäne", "Crinière du Tigre blanc", "白虎のタテガミ"]
  },
  cashmereCloth: {
    icon: 7609,
    name: ['Cashmere Cloth', 'Kaschmir', 'Étoffe de cachemire', 'カシミヤ織物']
  },
  chimericalFelt: {
    icon: 12592,
    name: ["Chimerical Felt", "Chimärenfilz", "Étoffe de feutre chimérique", "キマイラフェルト"]
  },
  chocoboFeather: {
    icon: 5359,
    name: ['Chocobo Feather', 'Chocobo-Feder', 'Plume de chocobo', 'チョコボの羽根']
  },
  chromiteIngot: {
    icon: 19949,
    name: ["Chromite Ingot", "Chromeisen-Barren", "Lingot de chromite", "クロマイトインゴット"]
  },
  colossusSlab: {
    icon: 22442,
    name: ["Colossus Slab", "Kolossus-Platte", "Fragment de statue colossale", "巨像の欠片"]
  },
  cottonBoll: {
    icon: 5343,
    name: ['Cotton Boll', 'Baumwoll-Samenkapsel', 'Fleur de coton', '草綿']
  },
  crawlerSilk: {
    icon: 12596,
    name: ["Crawler Silk", "Kriecher-Seidengarn", "Fil de soie de chenille", "クロウラーの絹糸"]
  },
  darksteelNugget: {
    icon: 5061,
    name: ['Darksteel Nugget', 'Dunkelstahl-Nugget', 'Pépite de sombracier', 'ダークスチールナゲット']
  },
  dawnborneAethersand: {
    icon: 12937,
    name: ["Dawnborne Aethersand", "Morgengrauen-Seelensand", "Sable éthéréen de l'aurore", "暁光の霊砂"]
  },
  dotharliCloth: {
    icon: 23372,
    name: ["Dotharli Cloth", "Dotharl-Tuch", "Étoffe dotharl", "ドタール族の生地"]
  },
  dragonBlood: {
    icon: 12630,
    name: ["Dragon Blood", "Drachenblut", "Sang de dragon", "竜族の血"]
  },
  earthCrystal: {
    icon: 11,
    name: ["Earth Crystal", "Erdkristall", "Cristal de terre", "アースクリスタル"]
  },
  earthShard: {
    icon: 5,
    name: ["Earth Shard", "Erdscherbe", "Éclat de terre", "アースシャード"]
  },
  expanseBaleen: {
    icon: 12257,
    name: ["Expanse Baleen", "Himmels-Barte", "Corne du Migrateur des brumes", "雲神ビスマルクの角"]
  },
  fireCrystal: {
    icon: 8,
    name: ["Fire Crystal", "Feuerkristall", "Cristal de feu", "ファイアクリスタル"]
  },
  fireShard: {
    icon: 2,
    name: ['Fire Shard', 'Feuerscherbe', 'Éclat de feu', 'ファイアシャード']
  },
  garleanFiber: {
    icon: 5340,
    name: ['Garlean Fiber', 'Garleischer Faserstoff', 'Fibre impériale', '帝国製強化繊維']
  },
  garleanRubber: {
    icon: 5533,
    name: ['Garlean Rubber', 'Garleischer Gummi', 'Caoutchouc impérial', '帝国製ラバー材']
  },
  garleanSteelJoint: {
    icon: 5104,
    name: ['Garlean Steel Joint', 'Garleisches Leichtmetall-Verbindungsstück', 'Morceau d\'acier léger impérial', '帝国製軽金属片']
  },
  garleanSteelPlate: {
    icon: 5105,
    name: ['Garlean Steel Plate', 'Garleische Leichtmetall-Platte', 'Plaque d\'acier léger impérial', '帝国製軽金属板']
  },
  garudasFeather: {
    icon: 6160,
    name: ["Garuda's Feather", "Garuda-Feder", "Plume de Garuda", "ガルーダの羽根"]
  },
  gelatoFlesh: {
    icon: 12635,
    name: ["Gelato Flesh", "Gelato-Fleisch", "Viande de gelato", "ジェラートの肉"]
  },
  glazenut: {
    icon: 7775,
    name: ['Glazenut', 'Glanznuss', 'Noix luisante', 'グレイズナッツ']
  },
  gobwalkerShielding: {
    icon: 12652,
    name: ["Gobwalker Shielding", "Stampfer-Rüstungsteil", "Blindage de gobtank G-VII", "VII号ゴブリ鋼板"]
  },
  growthFormulaZeta: {
    icon: 12608,
    name: ["Growth Formula Zeta", "Wachstumsformel Zeta", "Formule de croissance zêta", "グロースフォーミュラ・ゼータ"]
  },
  hiveForewing: {
    icon: 12259,
    name: ["Hive Forewing", "Kolonie-Schwinge", "Aile du Maître des lames", "武神ラーヴァナの翅"]
  },
  iceShard: {
    icon: 3,
    name: ['Ice Shard', 'Eisscherbe', 'Éclat de glace', 'アイスシャード']
  },
  iceTear: {
    icon: 9377,
    name: ["Ice Tear", "Eisträne", "Larme de Shiva", "シヴァの涙"]
  },
  ifritsHorn: {
    icon: 6158,
    name: ["Ifrit's Horn", "Ifrit-Horn", "Corne d'Ifrit", "イフリートの角"]
  },
  ironGiantCore: {
    icon: 13003,
    name: ["Iron Giant Core", "Eisengiganten-Kern", "Cœur de géant d'acier", "鉄巨人のコア"]
  },
  ironGiantScrap: {
    icon: 12651,
    name: ["Iron Giant Scrap", "Eisengiganten-Überreste", "Débris de colosse", "鉄巨人の残骸"]
  },
  juteYarn: {
    icon: 7777,
    name: ['Jute Yarn', 'Jutegarn', 'Toile de jute', 'ジュート繊維']
  },
  kyanite: {
    icon: 19963,
    name: ["Kyanite", "Kyanit", "Disthène", "カイヤナイト"]
  },
  leviathansBarb: {
    icon: 7159,
    name: ["Leviathan's Barb", "Bartel Leviathans", "Barbillon de Léviathan", "リヴァイアサンの棘"]
  },
  levinOrb: {
    icon: 8019,
    name: ["Levin Orb", "Ramuh-Kugel", "Orbe de Ramuh", "ラムウのオーブ"]
  },
  lightningCrystal: {
    icon: 12,
    name: ["Lightning Crystal", "Blitzkristall", "Cristal de foudre", "ライトニングクリスタル"]
  },
  lightningShard: {
    icon: 6,
    name: ['Lightning Shard', 'Blitzscherbe', 'Éclat de foudre', 'ライトニングシャード']
  },
  oroniriCloth: {
    icon: 23371,
    name: ["Oroniri Cloth", "Oronir-Tuch", "Étoffe oronir", "オロニル族の生地"]
  },
  palladiumNugget: {
    icon: 19946,
    name: ["Palladium Nugget", "Palladium-Nugget", "Pépite de palladium", "パラースナゲット"]
  },
  rosewoodBranch: {
    icon: 5414,
    name: ['Rosewood Branch', 'Palisanderast', 'Branche de palissandre', 'ローズウッドの枝']
  },
  royalFern: {
    icon: 20793,
    name: ["Royal Fern", "Königsfarn", "Fougère royale", "マナゼンマイ"]
  },
  sewingThread: {
    icon: 14188,
    name: ["Sewing Thread", "Nähfaden", "Fil à coudre", "刺繍糸"]
  },
  shinryusScales: {
    icon: 21090,
    name: ["Shinryu's Scales", "Shinryu-Schuppe", "Écaille de Shinryu", "神龍の鱗"]
  },
  steelMainspring: {
    icon: 12648,
    name: ["Steel Mainspring", "Stahl-Triebfeder", "Ressort moteur en acier", "ゼンマイバネ"]
  },
  steelWheelBearing: {
    icon: 12649,
    name: ["Steel Wheel Bearing", "Stahl-Radlager", "Roulement de roue en acier", "ホイールベアリング"]
  },
  steppeSerge: {
    icon: 19983,
    name: ["Steppe Serge", "Steppen-Serge", "Étoffe de serge des steppes", "ステップサージ"]
  },
  stuffedGoblin: {
    icon: 7966,
    name: ["Stuffed Goblin", "Stoff-Goblin", "Gobelin en peluche", "ゴブリンのぬいぐるみ"]
  },
  titaniumIngot: {
    icon: 12525,
    name: ["Titanium Ingot", "Titan-Barren", "Lingot de titane", "チタンインゴット"]
  },
  titansHeart: {
    icon: 6162,
    name: ["Titan's Heart", "Herz des Titan", "Roc de Titan", "タイタンの岩塊"]
  },
  twinsilk: {
    icon: 19987,
    name: ["Twinsilk", "Doppelseide", "Étoffe de doublesoie", "玉糸紬"]
  },
  twinthread: {
    icon: 5330,
    name: ['Twinthread', 'Doppelfaden', 'Fil de doublesoie', '玉糸']
  },
  undyedCottonCloth: {
    icon: 5325,
    name: ['Undyed Cotton Cloth', 'Naturbelassene Baumwolle', 'Étoffe de coton', '綿布']
  },
  vanyaSilk: {
    icon: 19988,
    name: ['Vanya Silk', 'Vanya-Seidenstoff', 'Étoffe de soie vanya', '山繭絹布']
  },
  waterShard: {
    icon: 7,
    name: ["Water Shard", "Wasserscherbe", "Éclat d'eau", "ウォーターシャード"]
  },
  windCrystal: {
    icon: 10,
    name: ["Wind Crystal", "Windkristall", "Cristal de vent", "ウィンドクリスタル"]
  },
  windShard: {
    icon: 4,
    name: ['Wind Shard', 'Windscherbe', 'Éclat de vent', 'ウィンドシャード']
  },
  wootzIngot: {
    icon: 9358,
    name: ['Wootz Ingot', 'Wootz-Barren', 'Lingot de wootz', 'ウーツインゴット']
  },
  worstedYarn: {
    icon: 19984,
    name: ["Worsted Yarn", "Kammgarn", "Laine peignée", "梳毛糸"]
  }
}

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  azysLla: ["Azys Lla", true, true, "アジス・ラー"],
  chamber5: ['5th Chamber', 'Fünfte Kammer', 'Cinquième Salle', '第五区画'],
  coerthasCentralHighlands: ['Coerthas Central Highlands', 'Zentrales Hochland Von Coerthas', 'Hautes Terres Du Coerthas Central', 'クルザス中央高地'],
  coerthasWesternHighlands: ["Coerthas Western Highlands", "Westliches Hochland Von Coerthas", "Hautes Terres Du Coerthas Occidental", "クルザス西部高地"],
  commandRoom: ['Command Room', 'Admiralsbrücke', 'Salon De L\'Amiral', 'アドミラルブリッジ：提督室'],
  dhoroIloh: ["Dhoro Iloh", true, true, "ドーロ・イロー"],
  easternLaNoscea: ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  easternThanalan: ['Eastern Thanalan', 'Östliches Thanalan', 'Thanalan Oriental', '東ザナラーン'],
  eastShroud: ['East Shroud', 'Ostwald', 'Forêt De L\'est', '黒衣森：東部森林'],
  eurekaAnemos: ["Eureka Anemos", "Eureka Anemos", "Eurêka Anemos", "エウレカ：アネモス帯"],
  eurekaPagos: ["Eureka Pagos", "Pagos", "Eurêka Pagos", "エウレカ：パゴス帯"],
  fogfens: ["Fogfens", "Nebelmoor", "Fangebrume", "迷霧湿原"],
  foundation: ["Foundation", "Fundamente", "Ishgard - L'Assise", "イシュガルド：下層"],
  idyllshire: ["Idyllshire", "Frohehalde", "Idyllée", "イディルシャイア"],
  kugane:  ["Kugane", true, true, "クガネ"],
  limsaLowerDecks: ['Limsa Lominsa Lower Decks', 'Untere Decks', 'Limsa Lominsa - L\'Entrepont', 'リムサ・ロミンサ：下甲板層'],
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  lotusStand: ['Lotus Stand', 'Wasserrosentisch', 'Chaire Du Lotus', '不語仙の座卓'],
  lowerLaNoscea: ['Lower La Noscea', 'Unteres La Noscea', 'Basse-Noscea', '低地ラノシア'],
  matoyasCave: ["Matoya's Cave", "Matoyas Höhle", "Caverne De Matoya", "マトーヤの洞窟"],
  morDhona: ['Mor Dhona', true, true, 'モードゥナ'],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  northShroud: ['North Shroud', 'Nordwald', 'Forêt Du Nord', '黒衣森：北部森林'],
  northernThanalan: ['Northern Thanalan', 'Nördliches Thanalan', 'Thanalan Septentrional', '北ザナラーン'],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  outerLaNoscea: ['Outer La Noscea', 'Äußeres La Noscea', 'Noscea Extérieure', '地ラノシア'],
  rhalgrsReach: ["Rhalgr's Reach", "Rhalgrs Wacht", "Temple Du Poing (entrée)", "ラールガーズリーチ"],
  southShroud: ['South Shroud', 'Südwald', 'Forêt Du Sud', '黒衣森：南部森林'],
  southernThanalan: ['Southern Thanalan', 'Südliches Thanalan', 'Thanalan Méridional', '南ザナラーン'],
  theChurningMists: ["The Churning Mists", "Wallende Nebel", "L'Écume Des Cieux De Dravania", "ドラヴァニア雲海"],
  theDiadem: ['The Diadem', 'Das Diadem', 'Le Diadème', 'ディアデム諸島'],
  theDravanianForelands: ["The Dravanian Forelands", "Dravanisches Vorland", "Avant-pays Dravanien", "高地ドラヴァニア"],
  theForgottenKnight: ["The Forgotten Knight", "Der Vergessene Ritter", "Le Chevalier Oublié", "忘れられた騎士亭"],
  theFringes: ["The Fringes", "Abanisches Grenzland", "Les Marges", "ギラバニア辺境地帯"],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  thePillars: ["The Pillars", "Strebewerk", "Ishgard - Les Contreforts", "イシュガルド：上層"],
  theRisingStones: ["The Rising Stones", "Sonnenstein", "Refuge Des Roches", "石の家"],
  theRubySea: ["The Ruby Sea", "Rubinsee", "Mer De Rubis", "紅玉海"],
  theSeaOfClouds: ["The Sea Of Clouds", "Abalathisches Wolkenmeer", "L'Écume Des Cieux D'Abalathia", "アバラシア雲海"],
  theWolvesDen: ['The Wolves\' Den', 'Wolfshöhle', 'L\'Antre des loups', 'ウルヴズジェイル'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  uldahStepsOfThal: ['Ul\'dah - Steps of Thal', 'Thal-Kreuzgang', 'Ul\'dah - Faubourg De Thal', 'ウルダハ：ザル回廊'],
  upperLaNoscea: ['Upper La Noscea', 'Oberes La Noscea', 'Haute-Noscea', '高地ラノシア'],
  westernLaNoscea: ['Western La Noscea', 'Westilches La Noscea', 'Noscea Occidentale', '西ラノシア'],
  duty: {
    alexanderBurdenOfTheSonSavage: ["Alexander - The Burden Of The Son (Savage)", "Alexander - Last Des Sohnes (episch)", "Alexander - Le Fardeau Du Fils (sadique)", "機工城アレキサンダー零式：律動編4"],
    alexanderSoulOfTheCreator: ["Alexander - The Soul Of The Creator", "Alexander - Seele Des Schöpfers", "Alexander - L'Âme Du Créateur", "機工城アレキサンダー：天動編4"],
    alexanderTheSoulOfTheCreatorSavage: ["Alexander - The Soul Of The Creator (Savage)", "Alexander - Seele Des Schöpfers (episch)", "Alexander - L'Âme Du Créateur (sadique)", "機工城アレキサンダー零式：天動編4"],
    amdaporKeep: ['Amdapor Keep', 'Die Ruinen Von Amdapor', 'Le Château D\'Amdapor', '邪教排撃 古城アムダプール'],
    baelsarsWall: ["Baelsar's Wall", "Baelsar-Wall", "La Muraille De Baelsar", "巨大防壁 バエサルの長城"],
    bardamsMettle: ["Bardam's Mettle", "Bardams Probe", "La Force De Bardam", "伝統試練 バルダム覇道"],
    battleInTheBigKeep: ["Battle In The Big Keep", "Revanche In Den Ruinen", "Revanche Au Vieux Château", "真ギルガメッシュ討滅戦"],
    brayfloxsLongstopHard: ['Brayflox\'s Longstop (Hard)', 'Brüllvolx\' Langrast (schwer)', 'Le Bivouac De Brayflox (brutal)', '盟友支援 ブレイフロクスの野営地 (Hard)'],
    castrumAbania: ["Castrum Abania", "Castrum Abania", "Castrum Abania", "巨砲要塞 カストルム・アバニア"],
    copperbellMinesHard: ['Copperbell Mines (Hard)', 'Kupferglocken-Mine (schwer)', 'Les Mines De Clochecuivre (brutal)', '騒乱坑道 カッパーベル銅山 (Hard)'],
    deltascapev40: ["Deltascape V4.0", "Deltametrie 4.0", "Deltastice V4.0", "次元の狭間オメガ：デルタ編4"],
    deltascapev40Savage: ["Deltascape V4.0 (Savage)", "Deltametrie 4.0 (episch)", "Deltastice V4.0 (sadique)", "次元の狭間オメガ零式：デルタ編4"],
    domaCastle: ["Doma Castle", "Burg Doma", "Le Château De Doma", "解放決戦 ドマ城"],
    dunScaith: ["Dun Scaith", true, true, "影の国ダン・スカー"],
    heavenOnHigh: ["Heaven-on-High", "Himmelssäule", "Le Pilier Des Cieux", "アメノミハシラ"],
    hellsLid: ["Hells' Lid", "Höllenspund", "Le Couvercle Des Enfers", "紅玉火山 獄之蓋"],
    hullbreakerIsle: ['Hullbreaker Isle', 'Schiffbrecher-Insel', 'L\'Île De Crèvecarène', '財宝伝説 ハルブレーカー・アイル'],
    hullbreakerIsleHard: ["Hullbreaker Isle (Hard)", "Schiffbrecher-Insel (schwer)", "L'Île De Crèvecarène (brutal)", "黒渦伝説 ハルブレーカー・アイル (Hard)"],
    kuganeCastle: ["Kugane Castle", "Schloss Kugane", "Le Château De Kugane", "悪党成敗 クガネ城"],
    neverreap: ["Neverreap", "Nimmerreich", "Nalloncques", "神域浮島 ネバーリープ"],
    sastashaHard: ['Sastasha (Hard)', 'Sastasha (schwer)', 'Sastasha (brutal)', '逆襲要害 サスタシャ浸食洞 (Hard)'],
    sohmAl: ["Sohm Al", "Sohm Al", "Sohm Al", "霊峰踏破 ソーム・アル"],
    saintMociannesArboretum: ["Saint Mocianne's Arboretum", "Sankt Mocianne-Arboretum", "L'Arboretum Sainte-Mocianne", "草木庭園 聖モシャーヌ植物園"],
    shisuiOfTheVioletTides: ["Shisui Of The Violet Tides", "Shisui", "Le Palais Aux Marées Violettes", "海底宮殿 紫水宮"],
    sigmascapev40: ["Sigmascape V4.0", "Sigmametrie 4.0", "Sigmastice V4.0", "次元の狭間オメガ：シグマ編4"],
    sigmascapev40Savage: ["Sigmascape V4.0 (Savage)", "Sigmametrie 4.0 (episch)", "Sigmastice V4.0 (sadique)", "次元の狭間オメガ零式：シグマ編4"],
    syrcusTower: ['Syrcus Tower', 'Kristallturm - Der Syrcus-Turm', 'La Tour De Cristal - Tour De Syrcus', 'クリスタルタワー：シルクスの塔'],
    theAery: ["The Aery", "Nest Des Drachen", "L'Aire", "邪竜血戦 ドラゴンズエアリー"],
    theAurumVale: ['The Aurum Vale', 'Goldklamm', 'Le Val D\'Aurum', '霧中行軍 オーラムヴェイル'],
    theAquapolis: ['The Aquapolis', 'Aquapolis', 'L\'Aquapole', '宝物庫 アクアポリス'],
    theAntitower: ["The Antitower", "Antiturm", "L'Antitour", "星海観測 逆さの塔"],
    theDragonsNeck: ["The Dragon's Neck", "Das Drachenhals-Kolosseum", "Le Col Du Dragon", "アマジナ杯闘技会決勝戦"],
    theDrownedCityOfSkalla: ["The Drowned City Of Skalla", "Die Versunkene Stadt Skalla", "La Cité Engloutie De Skalla", "水没遺構 スカラ"],
    theFeast: ["The Feast", true, true, "ザ・フィースト"],
    theFractalContinuum: ["The Fractal Continuum", "Die Fraktal-Kontinuum", "Le Continuum Fractal", "博物戦艦 フラクタル・コンティニアム"],
    theGreatGubalLibrary: ["The Great Gubal Library", "Große Gubal-Bibliothek", "La Grande Bibliothèque De Gubal", "禁書回収 グブラ幻想図書館"],
    theGreatHuntExtreme: ["The Great Hunt (Extreme)", "Jagd auf Rathalos (schwer)", "Chasse au Rathalos (extrême)", "極リオレウス狩猟戦"],
    theHiddenCanalsOfUznair: ["The Hidden Canals Of Uznair", "Vergessene Kanäle Von Uznair", "Les Canaux Cachés D'Uznair", "宝物庫 ウズネアカナル深層"],
    theLostCityOfAmdaporHard: ["The Lost City Of Amdapor (Hard)", "Historisches Amdapor (schwer)", "Les Vestiges De La Cité D'Amdapor (brutal)", "神聖遺跡 古アムダプール市街 (Hard)"],
    thePalaceOfTheDead: ['The Palace of the Dead', 'Palast Der Toten', 'Palais Des Morts', '死者の宮殿'],
    theRidoranaLighthouse: ["The Ridorana Lighthouse", "Richtfeuer Von Ridorana", "Le Phare De Ridorana", "封じられた聖塔 リドルアナ"],
    theSirensongSea: ["The Sirensong Sea", "Sirenen-See", "La Mer Du Chant Des Sirènes", "漂流海域 セイレーン海"],
    theSunkenTempleOfQarnHard: ['The Sunken Temple of Qarn (Hard)', 'Versunkener Tempel Von Qarn (schwer)', 'Le Temple Enseveli De Qarn (brutal)', '遺跡救援 カルン埋没寺院 (Hard)'],
    theSwallowsCompass: ["The Swallow's Compass", "Kompass Der Schwalbe", "Le Compas De L'Hirondelle", "風水霊殿 ガンエン廟"],
    theTempleOfTheFist: ["The Temple Of The Fist", "Tempel Der Faust", "Le Temple Du Poing", "壊神修行 星導山寺院"],
    theVault: ["The Vault", "Erzbasilika", "La Voûte", "強硬突入 イシュガルド教皇庁"],
    theVoidArk: ["The Void Ark", "Die Nichts-Arche", "L'Arche Du Néant", "魔航船ヴォイドアーク"],
    theWanderersPalace: ['The Wanderer\'s Palace', 'Palast Des Wanderers', 'Le Palais Du Vagabond', '旅神聖域 ワンダラーパレス'],
    theWeepingCityOfMhach: ["The Weeping City Of Mhach", "Die Stadt Der Tränen", "La Cité Défendue De Mhach", "禁忌都市マハ"],
    theWorldOfDarkness: ['The World Of Darkness', 'Die Welt Der Dunkelheit', 'La Tour De Cristal - Monde Des Ténèbres', 'クリスタルタワー：闇の世界'],
    xelphatol: ["Xelphatol", "Xelphatol", "Xelphatol", "峻厳渓谷 ゼルファトル"]
  },
  fishing: {
    northIsleOfEndlessSummer: ["North Isle Of Endless Summer", "Insel Des Ewigen Sommers (Nord)", "Île De L'Éternel été (nord)", "常夏の島北"],
    southBanepool: ["South Banepool", "Südlicher Bannpfuhl", "Malétang (berge Sud)", "ベーンプール南"],
    theBurningWall: ['The Burning Wall', 'Der Feuerwall', 'Mur Incandescent', 'バーニングウォール'],
    theKobayashiMaru: ["The Kobayashi Maru", "Die Kobayashi-maru", "Le Kobayashi Maru", "小林丸"],
    theSaltStrand: ['The Salt Strand', 'Der Salzstrand', 'Atolls De Sel', 'ソルトストランド'],
    theTangle: ["The Tangle", "Der Schlingwald", "L'Enchevêtrement", "タングル湿林"]
  }
}

const _npc = {
  minionTrader: ['Minion Trader', 'Trabantenhändlerin', 'Marchande De Mascottes', 'ミニオントレーダー'],
  lunaVanu: ["Luna Vanu", true, true, "商人のルナバヌ"],
  vathStickpeddler: ["Vath Stickpeddler", "Krämer", "Camelot", "アキンド"],
  mogmulMogbelly: ["Mogmul Mogbelly", "Mogmul Mogbauch", "Mogmul", "大食いのモグムリ"],
  stormSegeant: ["Storm Sergeant", "Sturmmaat", "Sergent Des Tempêtes", "黒渦団甲軍曹"],
  spoilsCollector: ["Spoils Collector", "Andenkenhändlerin", "Négociante D'espoilles", "スポイル取引窓口"]
}

const timewornMap = {
  unhidden: [
    50,
    false,
    ['Unhidden Leather Map', 'Unversteckte Lederkarte', 'Carte secrète en cuir', '隠された地図G1'],
    expansions.ARR
  ],
  toadskin: [
    50,
    false,
    ['Timeworn Toadskin Map', 'Vergilbte Krötenleder-Karte', 'Vieille carte en peau de crapaud', '古ぼけた地図G3'],
    expansions.ARR
  ],
  boarskin: [
    50,
    false,
    ['Timeworn Boarskin Map', 'Vergilbte Keilerleder-Karte', 'Vieille carte en peau de sanglier', '古ぼけた地図G4'],
    expansions.ARR
  ],
  peisteskin: [
    50,
    true,
    ['Timeworn Peisteskin Map', 'Vergilbte Basiliskenleder-Karte', 'Vieille carte en peau de peiste', '古ぼけた地図G5'],
    expansions.ARR
  ],
  dragonskin: [
    60,
    true,
    ['Timeworn Dragonskin Map', 'Vergilbte Drachenleder-Karte', 'Vieille carte en peau de dragon', '古ぼけた地図G8'],
    expansions.HW
  ],
  gazelleskin: [
    70,
    true,
    ["Timeworn Gazelleskin Map", "Vergilbte Gazellenleder-Karte", "Vieille carte en peau de gazelle", "古ぼけた地図G10"],
    expansions.SB
  ]
}

const gil = ['Gil', true, true, 'ギル'];
const poetics = ['Allagan Tomestone of Poetics', 'Allagischer Stein der Poesie', 'Mémoquartz allagois poétique', 'アラガントームストーン:詩学'];
const mgp = ['MGP', true, 'Point du Gold Saucer', 'マンダヴィル・ゴールドソーサーポイント'];
const alliedSeals = ['Allied Seal', 'Jagdabzeichen', 'Insigne allié', '同盟記章'];
const centurioSeals = ["Centurio Seal", "Centurio-Abzeichen", "Insigne Centurio", "セントリオ記章"];
const wolfMarks = ["Wolf Marks", "Wolfsmarken", "Marques De Loup", "対人戦績の取引"];
const brassSkyPirateSpoils = ["Brass Sky Pirate Spoil", "Messing-Piratenandenken", "Espoille de pirate des cieux en laiton", "スカイパイレーツスポイル:真鍮"];
const gelmorranPotsherd = ["Gelmorran Potsherd", "Gelmorra-Scherbe", "Tesson de poterie gelmorraine", "ゲルモラ土器片"];
const empyreanPotsherd = ["Empyrean Potsherd", "Empyreum-Scherbe", "Tesson de poterie empyréenne", "天之土器片"];
const sasshoSekiFragment = ["Sassho-seki Fragment", "Sassho-seki-Fragment", "Fragment de la Roche meurtrière", "殺生石の欠片"];
const kojinSango = ["Kojin Sango", "Kojin-Koralle", "Sango kojin", "コウジン珊瑚貨"];
const ixionHorn = ["Ixion Horn", "Ixion-Hornfragment", "Corne d'Ixion", "イクシオンの角片"];
const anantaDreamstaff = ["Ananta Dreamstaff", "Ananta-Traumstab", "Barrette béatifique ananta", "アナンタ魔金錫貨"];
const namazuKoban = ["Namazu Koban", "Namazuo-Koban", "Koban namazu", "ナマズオ小判"];
const rathalosScalePlus = ["Rathalos Scale+", "Rathalos-Schuppe+", "Écaille Rathalos +", "火竜の上鱗"];

const helper = {
  achievementCertificate: (quantity) => {
    return o(
      'achievementCertificate',
      [
        quantity + 'x',
        ['Achievement Certificate', 'Errungenschaftszertifikat', 'Jeton de hauts faits', 'アチーブメントスクリップ'],
        achievementCertificate,
        ['Jonathas', true, true, 'ジョナサス'],
        location.apkalluFalls,
        locationImage,
        location.oldGridania,
        10.6, 6.3
      ],
      expansions.ARR,
      true,
      false
    )
  },
  achievementReward: (achievementId, expansion, available, promo) => {
    return o(
      'achievement',
      [
        ['Jonathas', true, true, 'ジョナサス'],
        ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
        locationImage,
        location.oldGridania,
        10.6, 6.3
      ],
      expansion,
      available,
      promo,
      {
        achievement: getAchievement(achievements, achievementId)
      }
    )
  },
  aquapolis: () => {
    return o(
      'aquapolis',
      [
        dutyImage,
        location.duty.theAquapolis,
        location.chamber5
      ],
      expansions.ARR,
      true,
      false
    )
  },
  collectorsEdition: (expansionText, expansion, available) => {
    return o(
      'collectorsEdition',
      [
        ['Collector\'s Edition', true, true, 'コレクターズエディション'],
        expansionText,
        locale('Mog Station')
      ],
      expansion,
      available,
      true
    );
  },
  companySeals: (cost, company) => {
    const companySeals = ['Company Seals', 'Staatstaler', 'Sceaux de compagnie', '軍票'];

    let companyName = locale(company);
    companyName = [company, companyName.de, companyName.fr, companyName.jp];

    let npc;
    let loc;
    let x;
    let y;

    const quartermasters = ['Quartiermeisterin', 'Officier de la logistique', '補給担当官'];

    switch (company) {
      case 'Maelstrom':
        npc = ['Storm Quartermaster', ...quartermasters];
        loc = location.limsaUpperDecks;
        x = 13.1;
        y = 12.7;
        break;
      case 'Order of the Twin Adder':
        npc = ['Serpent Quartermaster', ...quartermasters];
        loc = location.newGridania;
        x = 9.8;
        y = 11.0;
        break;
      case 'Immortal Flames':
        npc = ['Flame Quartermaster', ...quartermasters];
        loc = location.uldahStepsOfNald;
        x = 8.3;
        y = 9.0;
        break;
    }

    return o(
      'purchase',
      [cost, companySeals, companySealsImage, npc, companyName, locationImage, loc, x, y],
      expansions.ARR,
      true,
      false
    )
  },
  craft: (level, job, stars, items, expansion) => {
    const itemArr = ['', '', '', ''];
    items.forEach((item, index) => {
      for (var i = 0; i < 4; i++)
        itemArr[i] += (index === 0 ? '' : (index === items.length - 1 ? ' and ' : ', '))
                    + item.quantity + 'x '
                    + item.name[i]
                    + ' <img src="https://api.apkallufalls.com/icons/item/' + item.icon + '.png" alt="' + item.name[i] + '" />';
    });
    return o(
      'craft',
      [
        level,
        job,
        stars ? ' (' + (new Array(stars).fill()).map(s => '★').join('') + ')' : '',
        itemArr
      ],
      expansion,
      true,
      false,
      {
        job: job[0]
      }
    )
  },
  diademFate: (level, fate, expansion) => {
    return o(
      'diademFate',
      [level, dutyImage, location.theDiadem, fateImage, fate],
      expansion,
      true,
      false
    )
  },
  eurekaAnemosFate: (level, fate) => {
    return o(
      'diademFate',
      [level, dutyImage, location.eurekaAnemos, eurekaAnemosFateImage, fate],
      expansions.SB,
      true,
      false
    )
  },
  dungeon: (name, level, x, y, expansion, available, promo) => {
    return o(
      x && y ? 'duty' : 'dutyFinalChest',
      x && y ? [level, dutyImage, name, x, y] : [level, dutyImage, name],
      expansion,
      available,
      promo
    )
  },
  eventQuest: (level, quest, image, expansion) => {
    return o(
      'eventQuest',
      [level, locale('Seasonal Events'), quest, image],
      expansion,
      false,
      false
    )
  },
  eventQuestPurchase: (shop, event, expansion) => {
    return o(
      'eventQuestPurchase',
      [shop, event],
      expansion,
      false,
      false
    )
  },
  fanFestival: (year, location) => {
    return o(
      'fanFestival',
      [year, location],
      expansions.ARR,
      false,
      true
    )
  },
  fanFestivalStream: (year, location) => {
    return o(
      'fanFestivalStream',
      [year, location],
      expansions.ARR,
      false,
      true
    )
  },
  fate: (level, fate, loc, x, y, expansion) => {
    return o(
      x && y ? 'fate' : 'fateUnknown',
      [level, fateImage, fate, locationImage, loc, x, y],
      expansion,
      true,
      false
    )
  },
  freeCompanySubaquaticVoyage: (voyage) => {
    return o(
      'freeCompanySubaquaticVoyage',
      [voyage],
      expansions.SB,
      true,
      false
    )
  },
  fishing: (waters, loc, x, y, bait, level, expansion) => {
    return o(
      'fishing',
      [locale('Fisher'), waters, locationImage, loc, x, y, bait, level],
      expansion,
      true,
      false
    )
  },
  fishingDesynthesis: (item, waters, loc, x, y, bait, level, expansion) => {
    return o(
      'fishingDesynth',
      [item, locale('Culinarian'), locale('Fisher'), waters, locationImage, loc, x, y, bait, level],
      expansion,
      true,
      false
    )
  },
  fishingDoubleMooch: (waters, loc, x, y, bait, level, expansion, fish1, fish2) => {
    return o(
      'fishingDoubleMooch',
      [locale('Fisher'), waters, locationImage, loc, x, y, bait, level, fish1, fish2],
      expansion,
      true,
      false
    )
  },
  fishingSpearfishing: (gig1, waters, loc, x, y, level, expansion, fishQuantity, fish, gig2) => {
    return o(
      'fishingSpearfishing',
      [locale('swimming shadows'), locale('Fisher'), gig1, waters, locationImage, loc, x, y, fishQuantity, fish, level, gig2],
      expansion,
      true,
      false
    )
  },
  gardening: (seeds) => {
    return o(
      'gardening', [seedImage, seeds], expansions.ARR, true, false
    )
  },
  gather: (level, job, stars, loc, x, y, time, slot, expansion) => {
    return o(
      'gather',
      [
        level,
        locale(job),
        stars ? ' (' + (new Array(stars).fill()).map(s => '★').join('') + ')' : '',
        locationImage,
        loc,
        x, y,
        time,
        slot
      ],
      expansion,
      true,
      false
    )
  },
  gilAfterFate: (cost, npc, loc, x1, y1, fate, level, x2, y2, expansion) => {
    return o(
      'gilAfterFate',
      [cost, gil, gilImage, npc, locationImage, loc, x1, y1, level, fateImage, fate, x2, y2],
      expansion,
      true,
      false
    )
  },
  goldSaucerMinionsMGP: (cost) => {
    return o(
      'purchase',
      [
        cost, mgp, mgpImage,
        _npc.minionTrader,
        ['(Purchase Minions (MGP))', '(Begleiter (MGP))', '(Mascottes (PGS))', '（ミニオンの取引（MGP消費））'],
        locationImage,
        location.theGoldSaucer,
        7.8, 7
      ],
      expansions.ARR,
      true,
      false
    )
  },
  goldSaucerPrizeExchange: (cost) => {
    return o(
      'purchase',
      [
        cost, mgp, mgpImage,
        ['Gold Saucer Attendant', 'Sonderartikel-Händlerin', 'Préposée Aux Lots', '景品交換窓口'],
        ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
        locationImage,
        location.theGoldSaucer,
        5.4, 6.7
      ],
      expansions.ARR,
      true,
      false
    )
  },
  itemAccursedHoard: (sack, locationIn, expansion) => {
    return o(
      'itemAccursedHoard',
      [
        sack,
        item.pieceOfAccursedHoard,
        dutyImage,
        locationIn || location.duty.thePalaceOfTheDead
      ],
      expansion || expansions.ARR,
      true,
      false
    )
  },
  itemAnemosLockbox: (stage) => {
    let lockbox;
    let eurekaMap;

    switch (stage) {
      case 'pagos':
      lockbox = item.pagosLockbox;
        eurekaMap = location.eurekaPagos;
        break;
      
      default:
      lockbox = item.anemosLockbox;
        eurekaMap = location.eurekaAnemos;
        break;
    }

    return o(
      'itemAnemosLockbox',
      [
        lockbox,
        dutyImage,
        eurekaMap
      ],
      expansions.SB,
      true,
      false
    )
  },
  hiddenCanalsOfUznair: () => {
    return o(
      'hiddenCanalsOfUznair',
      [
        dutyImage,
        location.duty.theHiddenCanalsOfUznair
      ],
      expansions.SB,
      true,
      false
    )
  },
  mogStation: () => {
    return o(
      'mogStation',
      [locale('Mog Station')],
      expansions.ARR,
      true,
      true
    )
  },
  msq: (level, type, quest, npc, loc, x, y, expansion, available, promo) => {
    return o(
      'msq',
      [level, type, msqImage, quest, npc, locationImage, loc, x, y],
      expansion,
      available,
      promo
    )
  },
  pvp: (name, level, expansion, available, promo) => {
    return o(
      'pvp',
      [level, pvpImage, name],
      expansion,
      available,
      promo
    )
  },
  quest: (level, type, quest, npc, loc, x, y, expansion, available, promo) => {
    return o(
      'quest',
      [level, type, questImage, quest, npc, locationImage, loc, x, y],
      expansion,
      available,
      promo
    )
  },
  raid: (name, level, expansion, available, promo) => {
    return o(
      'raid',
      [level, raidImage, name],
      expansion,
      available,
      promo
    )
  },
  retainerVenture: (level, jobType, type, number) => {
    let expansion;

    if (level <= 50)
      expansion = expansions.ARR;
    else if (level <= 60)
      expansion = expansions.HW;
    else if (level <= 70)
      expansion = expansions.SB;

    if (jobType === 'quick')
      return o(
        'retainerVentureQuick',
        [ventureImage, locale('Quick Exploration')],
        expansion,
        true,
        false
      );

    return o(
      'retainerVenture',
      [level, locale(jobType), ventureImage, locale(type), locale(number)],
      expansion,
      true,
      false
    )
  },
  squareEnixStore: (item, expiration) => {
    return o(
      'squareEnixStore',
      [item, locale('Square Enix Store'), expiration],
      expansions.ARR,
      false,
      true
    )
  },
  squareEnixStoreNoExpiration: (item, expiration) => {
    return o(
      'squareEnixStore',
      [item, locale('Square Enix Store')],
      expansions.ARR,
      true,
      true
    )
  },
  timewornMap: (level, fullParty, map, expansion) => {
    let type = 'timewornMap';
    if (fullParty)
      type = 'timewornMapFullParty';

    return o(
      type,
      [level, timewornImage, map],
      expansion,
      true,
      false
    )
  },
  trial: (name, level, expansion, available, promo) => {
    return o(
      'trial',
      [level, trialImage, name],
      expansion,
      available,
      promo
    )
  },
  veteranReward: (days) => {
    return o(
      'veteranReward',
      [locale('Veteran Reward'), days],
      expansions.ARR,
      false,
      false
    )
  },
  wondrousTails: (lines) => {
    return o(
      'wondrousTails',
      [lines, wondrousTailsImage, locale('Wondrous Tails')],
      expansions.HW,
      true,
      false
    )
  }
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (minion, achievementsIn) => {
  achievements = achievementsIn;
  switch (+minion.id) {
    case 1:
    case 2:
    case 3: {
      const cost = 2400;
      const purchaseTools = ['(Purchase Tools)', '(Werkzeuge)', '(Outils)', '(道具の取引)'];
      return [
        o(
          'purchase',
          [
            cost, gil, gilImage,
            ['Maisenta', true, true, '黒兎堂 マイセンタ'],
            purchaseTools,
            locationImage,
            location.newGridania,
            11.5, 11.3
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            cost, gil, gilImage,
            ['Bango Zango', true, true, 'ブルゲール商会 バンゴ・ザンゴ'],
            purchaseTools,
            locationImage,
            location.limsaLowerDecks,
            10, 11.4
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            cost, gil, gilImage,
            ['Roarich', true, true, 'アシュガナ貿易 ロリッヒ'],
            purchaseTools,
            locationImage,
            location.uldahStepsOfNald,
            10.6, 9.6
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            cost, gil, gilImage,
            _npc.minionTrader,
            ['(Purchase Minions (Gil))', '(Begleiter (Gil))', '(Mascottes (gils))', '（ミニオンの取引（ギル消費））'],
            locationImage,
            location.theGoldSaucer,
            7.8, 7
          ],
          expansions.ARR,
          true,
          false
        )
      ];
    }
    
    case 4:
      return [
        o(
          'preOrder',
          [
            locale('Pre-order'),
            locale('A Realm Reborn'),
            ['Tuesday, December 31, 2013', 'Dienstag, den 31.12.2013', 'le mardi 31 décembre 2013', '2013年12月31日（火）']
          ],
          expansions.ARR,
          false,
          true
        )
      ];
    
    case 5:
      return [
        helper.collectorsEdition(locale('Legacy (1.0)'), expansions.Legacy, false),
        helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true)
      ];
    
    case 6:
      return helper.achievementReward(736, expansions.ARR, true, false);
      
    case 7:
      return helper.achievementReward(737, expansions.ARR, true, false);
      
    case 8:
      return helper.achievementReward(738, expansions.ARR, true, false);
    
    case 9:
      return helper.companySeals(20000, 'Maelstrom');
    
    case 10:
      return helper.companySeals(20000, 'Order of the Twin Adder');
    
    case 11:
      return helper.companySeals(20000, 'Immortal Flames');
    
    case 12:
      return helper.dungeon(
        location.duty.theAurumVale,
        47, 10, 8, expansions.ARR, true, false
      );
    
    case 13:
      return helper.gilAfterFate(
        2400,
        ['Chachamun', true, true, '武具屋 チャチャムン'],
        location.easternThanalan,
        22, 21,
        ['Attack on Highbridge: Act III', 'Schlacht Um Hohenbrück: Duell Mit Nayokk Roh','Assaut Sur Le Viaduc: Acte III', 'ハイブリッジの死闘：ナヨク・ロー排撃'],
        26, 23, 23,
        expansions.ARR
      );

    case 14:
      return helper.fate(
        20,
        ['Lazy for You', 'Undank Des Faulen', 'Défi: Laurence Pas Ravie', '非情な収穫者「レジー・ローレンス」'],
        location.eastShroud,
        23, 29,
        expansions.ARR
      );
    
    case 15:
      return helper.quest(
        22,
        locale('Gridanian Sidequests'),
        ['Occupational Hazards', 'Ruinöse Plagegeister', 'Rassurer Yoenne', '遺跡調査の落とし穴'],
        ['Yoenne', true, true, 'ヨエヌ'],
        location.southShroud,
        18, 20,
        expansions.ARR,
        true,
        false
      );

    case 16:
      return [
        helper.timewornMap(...timewornMap.peisteskin),
        helper.timewornMap(...timewornMap.dragonskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 17:
    case 28:
    case 37:
      return o(
        'purchase',
        [
          7, poetics, poeticsImage,
          ['Auriana', true, true, 'オーリアナ'],
          ['(Allagan Tomestones Of Poetics (Other))', '(Allagische Steine Der Poesie (Anderes))', '(Mémoquartz Allagois Poétiques (divers))', '（アラガントームストーン:詩学の取引（その他））'],
          locationImage,
          location.morDhona,
          22.8, 6.7
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 18:
      return helper.fate(
        49,
        ['Go, Go, Gorgimera', 'Etwas Von Allem', 'Défi: Gorgimère Indigne', '荒れ狂う巨獣「ゴーキマイラ」'],
        location.northernThanalan,
        17, 14,
        expansions.ARR
      );
    
    case 19:
      return helper.quest(
        22,
        locale('Lominsan Sidequests'),
        ['Curiosity Killed The Coeurl', 'Die Unschuld Der Jugend', 'Le Félin Orphelin', '魔獣が守ったもの'],
        ['Skribyld', true, true, 'スクリビルド'],
        location.westernLaNoscea,
        26.4, 26.4,
        expansions.ARR,
        true,
        false
      );
    
    case 20:
    case 106:
      return [
        helper.goldSaucerPrizeExchange(20000),
        helper.goldSaucerMinionsMGP(20000)
      ];

    case 21:
      return helper.quest(
        50,
        locale('Hildibrand Quests'),
        ['Her Last Vow', 'Ruinöse Revanche', 'Boucler La Boucle', '事件は砂塵に消ゆ'],
        ['Julyan', true, true, 'ジュリアン'],
        location.uldahStepsOfThal,
        12.1, 11.8,
        expansions.ARR,
        true,
        false
      );
    
    case 22:
      return helper.craft(
        50,
        locale('Goldsmith'),
        0,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 3, ...craftItem.astralRock }
        ]
      );
    
    case 23:
      return [
        helper.timewornMap(...timewornMap.boarskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 24:
      return helper.fishing(
        location.fishing.theSaltStrand,
        location.lowerLaNoscea,
        17, 35,
        item.bait.northernKrill,
        50,
        expansions.ARR
      );

    case 25:
      return helper.gilAfterFate(
        2400,
        ['Boughbury Trader', 'Astlfinger Händler', 'Marchand De Ramebourg', 'バウバリー村の商人'],
        location.southShroud,
        21, 16,
        ['Clearing the Hive', 'Das Nest Säubern', 'Nid De Guêpes: Colonisation', 'レッドベリー砦の戦い：占領戦'],
        32, 22, 17,
        expansions.ARR
      );
    
    case 26:
      return helper.gilAfterFate(
        2400,
        ['Junkmonger Nonoroon', 'Nonoroon', 'Nonoroon Renifle-nid', 'メメルン交易商会 ノノルン'],
        location.upperLaNoscea,
        11, 24,
        ['Poor Maid\'s Misfortune', 'Vorsicht Bissig', 'Pauvre Hameau: Des Coeurls Qui Battent', 'プアメイドミル復興：クァール討伐'],
        20, 12, 24,
        expansions.ARR
      );

    case 27:
      return [
        helper.timewornMap(...timewornMap.toadskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 29:
      return helper.craft(
        50,
        locale('Armorer'),
        0,
        [
          { quantity: 99, ...craftItem.iceShard },
          { quantity: 3, ...craftItem.darksteelNugget }
        ]
      );
    
    case 30:
      return helper.fishing(
        location.fishing.theBurningWall,
        location.easternThanalan,
        29, 24,
        item.bait.topwaterFrog,
        44,
        expansions.ARR
      );
    
    case 31:
      return helper.fate(
        39,
        ['The Eyes Have It', 'Mehr Augen, Mehr Ärger', 'Défi: L\'œil De La Tête', '帰ってきた男「ステロペス」'],
        location.coerthasCentralHighlands,
        15, 19,
        expansions.ARR
      );
    
    case 32:
      return helper.msq(
        50,
        locale('Seventh Astral Era'),
        ['You\'re Gonna Carry That', 'Tatarus sieben Sachen', 'Un petit coup de main', '砂の家でのお片付け'],
        ['Stafborn', true, true, 'スラフボーン'],
        location.morDhona,
        21.9, 7.8,
        expansions.ARR,
        true,
        false
      );

    case 33:
      return helper.quest(
        47,
        locale('Ul\'dahn Sidequests'),
        ['Zombies Are People Too', 'Love me Sabotender', 'De piquants compagnons', '悲しみのゾンビー'],
        ['Hab', true, true, 'ハブ'],
        location.uldahStepsOfThal,
        24.8, 40.9,
        expansions.ARR,
        true,
        false
      );
      
    case 34:
      return helper.fate(
        32,
        ['It\'s Not Lupus', 'Krabbe XXL', 'Défi: Cancer, Le Casque De Mort', '死顔の簒奪者「キャンサー」'],
        location.easternLaNoscea,
        31, 34,
        expansions.ARR
      );

    case 35:
      return helper.quest(
        15,
        locale('Lominsan Sidequests'),
        ['Man\'s Best Fiend', 'Wolfshundbändiger', 'Le chacal amical', '幼い狼犬を救え'],
        ['Skribyld', true, true, 'スクリビルド'],
        location.westernLaNoscea,
        26.4, 26.4,
        expansions.ARR,
        true,
        false
      );

    case 36:
      return [
        helper.veteranReward(90),
        helper.achievementCertificate(2)
      ];
    
    case 38:
      return helper.gather(
        50, 'Miner', 1,
        location.easternThanalan,
        28, 22,
        '9:00AM',
        7
      );
    
    case 39:
      return [
        helper.craft(
          50,
          locale('Weaver'),
          0,
          [
            { quantity: 99, ...craftItem.lightningShard },
            { quantity: 1, ...craftItem.vanyaSilk },
            { quantity: 1, ...craftItem.twinthread },
            { quantity: 1, ...craftItem.chocoboFeather }
          ]
        ),
        helper.diademFate(
          60,
          ['Where\'s The Beef', 'Aufgebrachte Herde', 'Défi: Le Bovin Mythique', '古の巨獣「フォゴットン・ウィセント」'],
          expansions.HW
        )
      ];
    
    case 40:
      return helper.achievementReward(929, expansions.ARR, true, false);

    case 41:
      return helper.msq(
        33,
        locale('Seventh Umbral Era'),
        ['It Was A Very Good Year', 'Wandelndes Biotop', 'Un pied de vigne ambulant', '人の命運、ワインの運命'],
        ['Shamani Lohmani', true, true, 'シャマニ・ローマニ'],
        location.easternLaNoscea,
        21.7, 21.2,
        expansions.ARR,
        true,
        false
      );
    
    case 42:
      return helper.dungeon(
        location.duty.theWanderersPalace,
        50, 12, 5, expansions.ARR, true, false
      );
    
    case 43:
      return helper.craft(
        50,
        locale('Goldsmith'),
        0,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 1, ...craftItem.garleanSteelPlate },
          { quantity: 1, ...craftItem.garleanSteelJoint }
        ]
      );
    
    case 44:
      return helper.dungeon(
        location.duty.amdaporKeep,
        50, 9, 10, expansions.ARR, true, false
      );
    
    case 45:
      return helper.quest(
        50,
        locale('Delivery Moogle Quests'),
        ['Thwack-a-Mole', 'Hau Den Mull!', 'Taupologie', 'モールのひみつ'],
        ['Deputy Postmoogle', 'Mogry-Postdirektor', 'Maître Mog postier', '先輩レターモーグリ'],
        location.limsaLowerDecks,
        10.5, 11.4,
        expansions.ARR,
        true,
        false
      );
    
    case 46:
      return [
        helper.eventQuest(
          15,
          ['All\'s Wool That Ends Wool', 'Des Schäfchens Generäle', 'L\'année Du Mouton', '羊と私の降神祭'],
          'eq2',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 47:
      return helper.dungeon(
        location.duty.copperbellMinesHard,
        50, 11, 12, expansions.ARR, true, false
      );
    
    case 48:
      return helper.gather(
        50, 'Botanist', 1,
        location.eastShroud,
        13, 23,
        '9:00PM',
        7
      );

    case 49:
      return [
        helper.veteranReward(450),
        helper.achievementCertificate(2)
      ];
    
    case 50:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sylph,
          25000, gil, gilImage,
          ['Sylphic Vendor', 'Sylphen-Händlerin', 'Vendeur Sylphe', 'シルフ族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.eastShroud,
          22.4, 26.4
        ],
        expansions.ARR,
        true,
        false
      );

    case 51:
      return [
        helper.veteranReward(30),
        helper.achievementCertificate(2)
      ];
    
    case 52:
      return [
        helper.msq(
          14,
          locale('Seventh Umbral Era'),
          ['The Gridanian Envoy', 'Die Stimme Des Waldes', 'L\'émissaire De Gridania', '海都と砂都と'],
          ['Kan-E-Senna', true, true, 'カヌ・エ・センナ'],
          location.lotusStand,
          0, 0,
          expansions.ARR,
          true,
          false
        ),
        helper.msq(
          14,
          locale('Seventh Umbral Era'),
          ['The Lominsan Envoy', 'Die Stimme Des Meeres', 'L\'émissaire De Limsa Lominsa', '森都と砂都と'],
          ['Merlwyb', true, true, 'メルウィブ'],
          location.commandRoom,
          0, 0,
          expansions.ARR,
          true,
          false
        ),
        helper.msq(
          14,
          locale('Seventh Umbral Era'),
          ['The Ul\'dahn Envoy', 'Die Stimme Der Wüste', 'L\'émissaire D\'Ul\'dah', '海都と森都と'],
          ['Raubahn', true, true, 'ラウバーン'],
          location.uldahStepsOfNald,
          8.5, 9,
          expansions.ARR,
          true,
          false
        )
      ];
    
    case 53:
      return helper.craft(
        50,
        locale('Weaver'),
        0,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.vanyaSilk },
          { quantity: 1, ...craftItem.twinthread },
          { quantity: 1, ...craftItem.chocoboFeather }
        ]
      );

    case 54:
      return [
        helper.veteranReward(60),
        helper.achievementCertificate(2)
      ];
    
    case 55:
      return helper.squareEnixStore(
        ['Before Meteor：FINAL FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true],
        ['Wednesday, December 31, 2014', 'Mittwoch, 31. Dezember 2014', 'Mercredi 31 décembre 2014', '2014年12月31日']
      );
    
    case 56:
      return [
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XIII'),
        helper.retainerVenture(50, 'Miner', 'Highland Exploration', 'XIII'),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];

    case 57:
      return [
        helper.dungeon(location.duty.sastashaHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis()
      ];
    
    case 58:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.amaljaa,
          25000, gil, gilImage,
          ['Amalj\'aa Vendor', 'Amalj\'aa-Händler', 'Vendeur Amalj\'aa', 'アマルジャ族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.southernThanalan,
          23.3, 14.2
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 59:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.ixal,
          25000, gil, gilImage,
          ['Ixali Vendor', 'Ixal-Händler', 'Vendeur Ixal', 'イクサル族のよろず屋'],
          ['(Purchase Items (Sworn))', '(Waren (Solidarisch))', '(Objets (rang Assermenté))', '(アイテムの取引(友好関係：誓約))'],
          locationImage,
          location.northShroud,
          25, 22.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 60:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.kobold,
          25000, gil, gilImage,
          ['Kobold Vendor', 'Kobold-Händler', 'Vendeur Kobold', 'コボルド族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.outerLaNoscea,
          21.6, 17.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 61:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sahagin,
          25000, gil, gilImage,
          ['Sahagin Vendor', 'Sahagin-Händler', 'Vendeur Sahuagin', 'サハギン族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.westernLaNoscea,
          17, 22.4
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 62:
      return helper.eventQuest(
        7,
        ['Breaking Brick Mountains', 'Harte Steine Und Weiche Birnen', 'Les Créatures De Granit', 'あらくれ男と未知なるゴーレム'],
        'eq3',
        expansions.ARR
      );
    
    case 63:
      return [
        helper.eventQuest(
          10,
          ['Burgeoning Dread', 'Der Schwarze Dämon', 'Abomination Aberrante', '黒い悪魔'],
          'eq4',
          expansions.ARR
        ),
        helper.mogStation()
      ]
    
    case 64:
      return [
        helper.eventQuest(
          15,
          ['A Real Peach', 'Marionette Mit Herz', 'Une Issue Inattendue', 'プリンセスデーは時を越えて'],
          'eq5',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 65:
      return o(
        'purchase',
        [
          1, item.elixir, elixirImage,
          ['Magic Pot', 'Zauberpott', 'Pot Magique', 'マジックポット'],
          ['(Gimme An Elixir)', '(Gib Mir Ein Elixier!)', '(Je Veux Un élixir !)', '(エリクサーちょうだい)'],
          locationImage,
          location.westernLaNoscea,
          12.1, 36.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 66:
      return helper.craft(
        50,
        locale('Weaver'),
        3,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 1, ...craftItem.juteYarn },
          { quantity: 1, ...craftItem.undyedCottonCloth },
          { quantity: 1, ...craftItem.cottonBoll }
        ]
      );

    case 67:
      return [
        helper.veteranReward(180),
        helper.achievementCertificate(2)
      ];

    case 71:
      return [
        helper.veteranReward(270),
        helper.achievementCertificate(2)
      ];
    
    case 75:
      return helper.achievementReward(859, expansions.ARR, true, false);

    case 76:
      return [
        helper.veteranReward(360),
        helper.achievementCertificate(2)
      ];

    case 77:
      return [
        helper.veteranReward(360),
        helper.achievementCertificate(2)
      ];
    
    case 78:
      return helper.squareEnixStore(
        ['A REALM REBORN: FINAL FANTASY XIV Original Soundtrack【映像付サントラ／Blu-ray Disc Music】', true, true, true],
        ['Wednesday, December 31, 2014', 'Mittwoch, 31. Dezember 2014', 'Mercredi 31 décembre 2014', '2014年12月31日']        
      );
    
    case 79:
      return helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true);

    case 80:
      return [
        helper.dungeon(location.duty.brayfloxsLongstopHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 81:
      return helper.craft(
        50,
        locale('Carpenter'),
        3,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 1, ...craftItem.broombush },
          { quantity: 1, ...craftItem.rosewoodBranch },
          { quantity: 1, ...craftItem.ancientLumber }
        ]
      );
    
    case 82:
    case 93:
      return [
        o(
          'purchase',
          [
            500, alliedSeals, alliedSealsImage,
            ['Hunt Billmaster', 'Jagdmeister', 'Responsable De La Chasse', 'モブハント担当官'],
            ['(Allied Seals (Other))', '(Jagdabzeichen (Anderes))', '(Insignes Alliés (divers))', '（同盟記章の取引（その他））'],
            locationImage,
            location.limsaUpperDecks,
            13.2, 12.5
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            500, alliedSeals, alliedSealsImage,
            ['Hunt Billmaster', 'Jagdmeister', 'Responsable De La Chasse', 'モブハント担当官'],
            ['(Allied Seals (Other))', '(Jagdabzeichen (Anderes))', '(Insignes Alliés (divers))', '（同盟記章の取引（その他））'],
            locationImage,
            location.newGridania,
            9.8, 11.3
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            500, alliedSeals, alliedSealsImage,
            ['Hunt Billmaster', 'Jagdmeister', 'Responsable De La Chasse', 'モブハント担当官'],
            ['(Allied Seals (Other))', '(Jagdabzeichen (Anderes))', '(Insignes Alliés (divers))', '（同盟記章の取引（その他））'],
            locationImage,
            location.uldahStepsOfNald,
            8.1, 9.3
          ],
          expansions.ARR,
          true,
          false
        )
      ];

    case 83:
    case 117:
      return [
        helper.goldSaucerPrizeExchange(10000),
        helper.goldSaucerMinionsMGP(10000)
      ];

    case 84:
      return [
        helper.veteranReward(630),
        helper.achievementCertificate(2)
      ];

    case 85:
      return [
        helper.veteranReward(540),
        helper.achievementCertificate(2)
      ];

    case 86:
      return helper.gardening(item.seeds.onionPrince);

    case 87:
      return helper.gardening(item.seeds.eggplantKnight);

    case 88:
      return helper.gardening(item.seeds.garlicJester);

    case 89:
      return helper.gardening(item.seeds.tomatoKing);

    case 90:
      return helper.gardening(item.seeds.mandragoraQueen);
    
    case 91:
    case 98:
    case 99:
    case 103:
    case 107:
    case 108:
    case 109:
    case 121:
    case 131:
    case 132:
      return helper.mogStation();
    
    case 92:
      return helper.raid(location.duty.syrcusTower, 50, expansions.ARR, true, false);

    case 94:
      return [
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XIV'),
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XV'),
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XIX')
      ];
    
    case 95:
      return helper.craft(
        50,
        locale('Weaver'),
        4,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.arachneWeb },
          { quantity: 1, ...craftItem.cashmereCloth },
          { quantity: 1, ...craftItem.apkalluDown },
          { quantity: 1, ...craftItem.twinthread }
        ]
      );

    case 96:
      return [
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Highland Exploration', 'XIV'),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 97:
      return [
        helper.timewornMap(...timewornMap.unhidden),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];

    case 100:
      return helper.craft(
        50,
        locale('Blacksmith'),
        4,
        [
          { quantity: 99, ...craftItem.fireShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 1, ...craftItem.wootzIngot },
          { quantity: 1, ...craftItem.garleanSteelJoint },
          { quantity: 1, ...craftItem.garleanSteelPlate },
          { quantity: 1, ...craftItem.garleanFiber },
          { quantity: 1, ...craftItem.garleanRubber }
        ]
      );

    case 101:
      return helper.raid(location.duty.theWorldOfDarkness, 50, expansions.ARR, true, false);
    
    case 102:
      return helper.dungeon(
        location.duty.hullbreakerIsle,
        50, 5, 10, expansions.ARR, true, false
      );
    
    case 104:
      return helper.trial(location.duty.theDragonsNeck, 50, expansions.ARR, true, false);
    
    case 105:
      return [
        helper.eventQuestPurchase(
          ['Fallen Star Exchange', 'Sternschnuppen', 'Objets Festifs', 'スターライトストーンの取引'],
          ['Starlight Celebration 2014', true, true, '星芒祭'],
          expansions.ARR
        ),
        helper.mogStation()
      ];

    case 110:
      return [
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XIV'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XV'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XVI'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XVII'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XVIII')
      ];

    case 111:
      return [
        helper.retainerVenture(50, 'Botanist', 'Woodland Exploration', 'XIV'),
        helper.retainerVenture(50, 'Botanist', 'Woodland Exploration', 'XV'),
        helper.retainerVenture(50, 'Botanist', 'Woodland Exploration', 'XVI'),
        helper.retainerVenture(50, 'Botanist', 'Woodland Exploration', 'XVII'),
        helper.retainerVenture(50, 'Botanist', 'Woodland Exploration', 'XVIII')
      ];

    case 112: 
      return [
        helper.dungeon(location.duty.theSunkenTempleOfQarnHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 113:
      return helper.squareEnixStore(
        ['FINAL FANTASY XIV: A Realm Reborn The Art of Eorzea - ​​Another Dawn', true, true, true],
        ['Saturday, December 31, 2016', 'Samstag, 31. Dezember 2016', 'Samedi 31 décembre 2016', '2016年12月31日']
      );
    
    case 114:
      return helper.squareEnixStore(
        ['FINAL FANTASY® XIV: A REALM REBORN™ DELIVERY MOOGLE PLUSH', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );

    case 115:
      return helper.fishingDesynthesis(
        item.fish.ninjaBetta,
        location.fishing.theTangle,
        location.fogfens,
        14, 13,
        item.fish.assassinBetta,
        50,
        expansions.ARR
      );

    case 116:
      return helper.quest(
        1,
        locale('Special Quests'),
        ["The Ties That Bind", "Ein Bund Fürs Leben", "Jusqu'à Ce Que Le Destin Vous Sépare", "時がふたりを分かつまで"],
        ["Claribel", true, true, "介添人 クラリベル"],
        location.eastShroud,
        17.6, 18.3,
        expansions.ARR,
        true,
        false
      );

    case 118:
      return helper.achievementReward(1040, expansions.ARR, true, false);

    case 119:
      return helper.msq(
        50,
        locale('Seventh Astral Era'),
        ["The Rising Chorus", "Der Hüter Erwacht", "Le Gardien Du Lac", "黙約の塔へ"],
        ["Tataru", true, true, "タタル"],
        location.theRisingStones,
        6, 5,
        expansions.ARR,
        true,
        false
      );
    
    case 122:
      return helper.dungeon(location.duty.battleInTheBigKeep, 50, null, null, expansions.ARR, true, false);

    case 123:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sylph,
          25000, gil, gilImage,
          ['Sylphic Vendor', 'Sylphen-Händlerin', 'Vendeur Sylphe', 'シルフ族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.eastShroud,
          22.4, 26.4
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 124:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.amaljaa,
          25000, gil, gilImage,
          ['Amalj\'aa Vendor', 'Amalj\'aa-Händler', 'Vendeur Amalj\'aa', 'アマルジャ族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.southernThanalan,
          23.3, 14.2
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 125:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.ixal,
          25000, gil, gilImage,
          ['Ixali Vendor', 'Ixal-Händler', 'Vendeur Ixal', 'イクサル族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.northShroud,
          25, 22.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 126:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.kobold,
          25000, gil, gilImage,
          ['Kobold Vendor', 'Kobold-Händler', 'Vendeur Kobold', 'コボルド族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.outerLaNoscea,
          21.6, 17.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 127:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sahagin,
          25000, gil, gilImage,
          ['Sahagin Vendor', 'Sahagin-Händler', 'Vendeur Sahuagin', 'サハギン族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.westernLaNoscea,
          17, 22.4
        ],
        expansions.ARR,
        true,
        false
      );

    case 128:
      return [
        o(
          'preOrder',
          [
            locale('Pre-order'),
            locale('Heavensward'),
            ['Saturday, December 31, 2016', 'Samstag, 31. Dezember 2016', 'Samedi 31 décembre 2016', '2016年12月31日']
          ],
          expansions.HW,
          false,
          true
        )
      ];

    case 129:
      return helper.collectorsEdition(locale('Heavensward'), expansions.HW, true);
    
    case 130:
      return helper.msq(
        51,
        locale('Heavensward'),
        ["In Search Of Iceheart", "Die Suche Beginnt", "À La Recherche De Cœur-de-glace", "イゼルを探して"],
        ["Alphinaud", true, true, "アルフィノ"],
        location.foundation,
        13.4, 11.1,
        expansions.HW,
        true,
        false
      );
    
    case 133:
      return helper.msq(
        57,
        locale('Heavensward'),
        ["A Difference Of Opinion", "Mit Eigenen Waffen", "Une Impérieuse Présence", "北方より来たりし者"],
        ["Alphinaud", true, true, "アルフィノ"],
        location.theSeaOfClouds,
        19.4, 11.7,
        expansions.HW,
        true,
        false
      );
    
    case 134:
      return [
        helper.dungeon(location.duty.theVault, 57, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 135:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vanuVanu,
          35000, gil, gilImage,
          _npc.lunaVanu,
          ["(Purchase Items (Trusted-Honored))", "(Waren (Vertraut))", "(Objets (rangs Estimé à émérite))", "(アイテムの取引(友好関係：信頼～名誉))"],
          locationImage,
          location.theSeaOfClouds,
          7, 14.3
        ],
        expansions.HW,
        true,
        false
      );
    
    case 136:
      return helper.craft(
        60,
        locale('Alchemist'),
        1,
        [
          { quantity: 99, ...craftItem.waterShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 3, ...craftItem.birchLumber },
          { quantity: 1, ...craftItem.steelMainspring },
          { quantity: 1, ...craftItem.steelWheelBearing },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 137:
      return [
        helper.dungeon(location.duty.theFractalContinuum, 60, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 138:
      return [
        helper.dungeon(location.duty.neverreap, 60, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 139:
      return [
        helper.dungeon(location.duty.sohmAl, 60, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 140:
      return helper.craft(
        60,
        locale('Carpenter'),
        1,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 2, ...craftItem.birchLumber },
          { quantity: 3, ...craftItem.dragonBlood },
          { quantity: 3, ...craftItem.gelatoFlesh },
          { quantity: 3, ...craftItem.atomosCorpulence },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 141:
      return [
        helper.dungeon(location.duty.theAery, 55, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 142:
      return [
        helper.dungeon(location.duty.theGreatGubalLibrary, 59, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 143:
      return helper.craft(
        60,
        locale('Armorer'),
        1,
        [
          { quantity: 99, ...craftItem.iceShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 2, ...craftItem.garleanSteelJoint },
          { quantity: 5, ...craftItem.ironGiantScrap },
          { quantity: 3, ...craftItem.ironGiantCore },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 144:
      return o(
        'purchase',
        [
          400, centurioSeals, centurioSealsImage,
          ["Ardolain", true, true, "アルドラン"],
          ['(Centurio Seals I)', '(Centurio-Abzeichen I)', '(Insigne Centurio I)', '（セントリオ記章（その他））'],
          locationImage,
          location.theForgottenKnight,
          13, 11
        ],
        expansions.HW,
        true,
        false
      );
    
    case 145:
    case 150:
      return [
        helper.eventQuest(
          15,
          ["A World Away", "Welten Entfernt", "Si Loin, Si Proche", "新生祭と鎮魂の夜空"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 146:
      return [
        helper.retainerVenture(55, 'Fisher', 'Waterside Exploration', 'XVIII'),
        helper.retainerVenture(60, 'Fisher', 'Waterside Exploration', 'XIX'),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 147:
      return helper.craft(
        60,
        locale('Armorer'),
        1,
        [
          { quantity: 99, ...craftItem.iceShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 2, ...craftItem.garleanSteelPlate },
          { quantity: 1, ...craftItem.stuffedGoblin },
          { quantity: 3, ...craftItem.gobwalkerShielding },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 148:
      return o(
        'purchase',
        [
          400, centurioSeals, centurioSealsImage,
          ["Ardolain", true, true, "アルドラン"],
          ['(Centurio Seals I)', '(Centurio-Abzeichen I)', '(Insigne Centurio I)', '（セントリオ記章（その他））'],
          locationImage,
          location.theForgottenKnight,
          13, 11
        ],
        expansions.HW,
        true,
        false
      );
    
    case 149:
      return helper.msq(
        60,
        locale('Heavensward'),
        ["Do It For Gilly", "Zurück Auf Den Rechten Weg", "Le Musée Des Machines", "博物戦艦 フラクタル・コンティニアム"],
        ["Notrelchamps", true, true, "ノトレルシャン"],
        location.thePillars,
        26, 23.6,
        expansions.HW,
        true,
        false
      );
    
    case 151:
      return helper.squareEnixStore(
        ['Emerald Carbuncle Plush', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 152:
      return helper.squareEnixStore(
        ['Topaz Carbuncle Plush', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 154:
      return helper.fate(
        57,
        ["On Dangerous Ground", "Wider Die Eigene Natur", "Défi: Mangeur De Terre Gardée", "暴食の岩人形「グランズイーター」"],
        location.theSeaOfClouds,
        21, 12,
        expansions.HW
      );
    
    case 155:
      return helper.squareEnixStore(
        ['Before The Fall：FINAL FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true],
        ['Saturday, December 31, 2016', 'Samstag, 31. Dezember 2016', 'Samedi 31 décembre 2016', '2016年12月31日']
      );
    
    case 156:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vath,
          35000, gil, gilImage,
          _npc.vathStickpeddler,
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.theDravanianForelands,
          23.7, 19.1
        ],
        expansions.HW,
        true,
        false
      );
    
    case 157:
      return [
        helper.timewornMap(...timewornMap.dragonskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 158:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.titaniumIngot },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );

    case 159:
      return [
        helper.eventQuest(
          20,
          ["Joining The Circus", "Großer Verwandlungszirkus", "Des Biscuits Porte-bonheur", "おかしなオカシと守護天節"],
          'eq1',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 160:
      return helper.raid(location.duty.theVoidArk, 60, expansions.HW, true, false);
    
    case 161:
      return helper.squareEnixStore(
        ['Heavensward Art Book (The Art of Ishgard - Stone and Steel)', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 162:
      return [
          helper.fate(
          60,
          ["On The Inside", "Die Schlitzer Vom Diadem", "Défi: L'éventreur De L'azur", "美食の凶鳥「ガルピュデス」"],
          location.theDiadem,
          null, null,
          expansions.HW
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 163:
      return helper.achievementReward(1382, expansions.ARR, true, false);

    case 164:
      return helper.achievementReward(1385, expansions.ARR, true, false);

    case 165:
      return helper.achievementReward(1380, expansions.ARR, true, false);
    
    case 166:
      return [
        helper.dungeon(location.duty.saintMociannesArboretum, 60, null, null, expansions.HW, true, false),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 167: 
      return [
        helper.veteranReward(960),
        helper.achievementCertificate(2)
      ];
    
    case 168:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.ifritsHorn },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 169:
      return [
        helper.craft(
          60,
          locale('Weaver'),
          1,
          [
            { quantity: 99, ...craftItem.lightningShard },
            { quantity: 1, ...craftItem.garudasFeather },
            { quantity: 1, ...craftItem.chimericalFelt },
            { quantity: 1, ...craftItem.crawlerSilk },
            { quantity: 1, ...craftItem.bloodPepper }
          ]
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 170:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.titansHeart },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 171:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.leviathansBarb },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 172:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.vanuVanu,
          30000, gil, gilImage,
          _npc.lunaVanu,
          ["(Purchase Items (Sworn-Bloodsworn))", "(Waren (Solidarisch/Solidarisch★))", "(Objets (rangs Assermenté à Assermenté★))", "(アイテムの取引(友好関係：誓約～誓約★))"],
          locationImage,
          location.theSeaOfClouds,
          7, 14.3
        ],
        expansions.HW,
        true,
        false
      );
    
    case 173:
      return helper.msq(
        60,
        locale('Heavensward'),
        ["As Goes Light, So Goes Darkness", "Licht Und Dunkel", "Entre Lumière Et Ténèbres", "光と闇の境界"],
        ["Lucia", true, true, "ルキア"],
        location.foundation,
        13.8, 11.1,
        expansions.HW,
        true,
        false
      );
    
    case 174:
    case 187:
      return [
        helper.goldSaucerPrizeExchange(30000),
        helper.goldSaucerMinionsMGP(30000)
      ];

    case 175:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vath,
          30000, gil, gilImage,
          _npc.vathStickpeddler,
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.theDravanianForelands,
          23.7, 19.1
        ],
        expansions.HW,
        true,
        false
      );
    
    case 176:
      return helper.raid(location.duty.alexanderBurdenOfTheSonSavage, 60, expansions.HW, true, false);

    case 177:
      return [
        helper.eventQuest(
          15,
          ["After The Curtain Falls", "Ein Wahrer Held", "À La Gloire De La Lumière", "新生祭の英雄賛歌"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 178:
    case 179:
      return helper.dungeon(location.duty.theAntitower, 60, null, null, expansions.HW, true, false);

    case 180:
      return [
        helper.dungeon(location.duty.theLostCityOfAmdaporHard, 60, null, null, expansions.HW, true, false),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 181:
      return helper.msq(
        60,
        locale('Heavensward'),
        ["The Word Of The Mother", "Zwiesprache Mit Dem Planeten", "La Voix De La Planète", "星の呼び声"],
        ["Alphinaud", true, true, "アルフィノ"],
        location.matoyasCave,
        6.5, 6.3,
        expansions.HW,
        true,
        false
      );
    
    case 182:
      return helper.squareEnixStore(
        ['Heavensward：FINAL FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 183:
      return [
        helper.pvp(location.duty.theFeast, 60, expansions.HW, false, false),
        helper.pvp(location.duty.theFeast, 30, expansions.ARR, true, false)
      ];
    
    case 184:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.moogle,
          30000, gil, gilImage,
          _npc.mogmulMogbelly,
          ['(Purchase Items (Sworn))', '(Waren (Solidarisch))', '(Objets (rang Assermenté))', '(アイテムの取引(友好関係：誓約))'],
          locationImage,
          location.theChurningMists,
          16, 28.5
        ],
        expansions.HW,
        true,
        false
      );
    
    case 185:
      return [
        helper.craft(
          60,
          locale('Weaver'),
          1,
          [
            { quantity: 99, ...craftItem.lightningShard },
            { quantity: 1, ...craftItem.levinOrb },
            { quantity: 1, ...craftItem.chimericalFelt },
            { quantity: 1, ...craftItem.crawlerSilk },
            { quantity: 1, ...craftItem.bloodPepper }
          ]
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 186:
      return [
        helper.craft(
          60,
          locale('Weaver'),
          1,
          [
            { quantity: 99, ...craftItem.lightningShard },
            { quantity: 1, ...craftItem.iceTear },
            { quantity: 1, ...craftItem.chimericalFelt },
            { quantity: 1, ...craftItem.crawlerSilk },
            { quantity: 1, ...craftItem.bloodPepper }
          ]
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 188:
      return helper.fishing(
        location.fishing.southBanepool,
        location.coerthasWesternHighlands,
        21, 11,
        item.bait.bruteLeech,
        53,
        expansions.HW
      );

    case 189:
      return helper.dungeon(location.duty.hullbreakerIsleHard, 60, null, null, expansions.HW, true, false);

    case 190:
      return [
        helper.diademFate(
          60,
          ["Secret Of The Lost Legend", "Geheimnis Der Verschollenen Legende", "Défi: Brachiosaures En Famille", "星呼の古代獣「ブラキオレイドス」"],
          expansions.HW
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 191:
      return o(
        'purchase',
        [
          15000, wolfMarks, wolfMarksImage,
          _npc.stormSegeant,
          wolfMarks.map(w => '(' + w + ')'),
          locationImage,
          location.theWolvesDen,
          4.4, 6.1
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 192:
      return [
        helper.eventQuest(
          15,
          ["After The Curtain Falls", "Ein Wahrer Held", "À La Gloire De La Lumière", "新生祭の英雄賛歌"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 193:
      return helper.msq(
        60,
        locale('Dragonsong War'),
        ["Litany Of Peace", "Das Ende Eines Langen Weges", "Un Chant Pour L'avenir", "最期の咆哮"],
        ["Aymeric", true, true, "アイメリク"],
        location.foundation,
        13.7, 11.3,
        expansions.HW,
        true,
        false
      );

    case 194:
      return [
        o(
          'purchase',
          [
            50, brassSkyPirateSpoils, brassSkyPirateSpoilsImage,
            _npc.spoilsCollector,
            ["(Spoils Exchange (Other))", "(Messing-/Stahl-Piratenandenken (Anderes))", "(Espoilles En Acier/laiton (autres))", "(スポイル：真鍮・鋼鉄の取引（その他）)"],
            locationImage,
            location.thePillars,
            26.1, 22.3
          ],
          expansions.HW,
          true,
          false
        ),
        helper.diademFate(
          60,
          ["Blood Wings", "Sanfte Gewalt", "À Tire D'aile", "翼をさずける"],
          expansions.HW
        )
      ];
    
    case 195:
      return helper.raid(location.duty.theWeepingCityOfMhach, 60, expansions.HW, true, false);
    
    case 196:
    case 198:
      return o(
        'purchase',
        [
          3, gelmorranPotsherd, gelmorranPotsherdImage,
          ["E-Una-Kotor", "E-Una-Kotor", "E-Una-Kotor", "エ・ウナ・コトロ"],
          ["(Gelmorran Potsherd Exchange)", "(Gelmorra-Scherben)", "(Tessons De Poterie Gelmorraine)", "(ゲルモラ土器片の取引)"],
          locationImage,
          location.southShroud,
          21.5, 21.5
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 197:
      return [
        helper.aquapolis(),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
    case 209:
    case 210:
    case 211:
    case 212:
      return helper.eventQuestPurchase(
        ["Wandering Executive", "Fahrend[a] Geschäftsmann", "Patron Errant", "異邦の社長"],
        ["Yo-kai Watch", true, true, "妖怪ウォッチ"],
        expansions.ARR
      );
    
    case 214:
      return helper.squareEnixStore(
        ['ENCYCLOPAEDIA EORZEA - THE WORLD OF FINAL FANTASY XIV - [BOOK]', true, true, true],
        ['Monday, December 31, 2018', 'Montag, 31. Dezember 2018', 'Lundi 31 décembre 2018', '2018年12月31日']
      );
    
    case 215:
      return [
        helper.raid(location.duty.alexanderSoulOfTheCreator, 60, expansions.HW, true, false),
        helper.raid(location.duty.alexanderTheSoulOfTheCreatorSavage, 60, expansions.HW, true, false)
      ]

    case 216:
      return [
        helper.dungeon(location.duty.xelphatol, 60, null, null, expansions.HW, true, false),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 217:
    case 218:
    case 228:
    case 260:
    case 264:
    case 298:
      return helper.wondrousTails(2);
    
    case 219:
      return helper.itemAccursedHoard(item.ironTrimmedSack);

    case 220:
      return [
        helper.fanFestival(2016, ['Frankfurt', true, 'Francfort', 'フランクフルト']),
        helper.fanFestivalStream(2016, ['Frankfurt', true, 'Francfort', 'フランクフルト'])
      ];

    case 221:
      return [
        helper.fanFestival(2016, ['Las Vegas', true, true, 'ラスベガス']),
        helper.fanFestivalStream(2016, ['Las Vegas', true, true, 'ラスベガス'])
      ];

    case 222:
      return [
        helper.fanFestival(2016, ['Tokyo', 'Tokio', true, '東京']),
        helper.fanFestivalStream(2016, ['Tokyo', 'Tokio', true, '東京'])
      ];
    
    case 224:
      return helper.msq(
        60,
        locale('Post-Dragonsong War'),
        ["An Ending To Mark A New Beginning", "Wege In Die Zukunft", "Les Gardiens Des âmes", "魂を継ぐ者"],
        ["Alphinaud", "Alphinaud", "Alphinaud", "アルフィノ"],
        location.southernThanalan,
        21.5, 21.4,
        expansions.HW,
        true,
        false
      );

    case 225:
      return [
        helper.eventQuestPurchase(
          ["Seasonal Event Prizes", "Saisonale Gegenstände", "Récompenses D'événements Saisonniers", "シーズナルイベント報酬の交換"],
          ["All Saints' Wake (2016)", true, true, "守護天節 (2016)"],
          expansions.ARR
        ),
        helper.mogStation()
      ];

    case 226:
      return helper.dungeon(location.duty.baelsarsWall, 60, null, null, expansions.HW, true, false);

    case 227:
      return [
        helper.eventQuestPurchase(
          ["House Valentione Maid", "Dienstmädchen[p] Des Hauses Valention", "Soubrette Des Valention", "ヴァレンティオン家のメイド"],
          ["Valentione's Day (2017)", "Valention (2017)", "La Valention (2017)", "ヴァレンティオン (2017)"],
          expansions.ARR
        ),
        helper.mogStation()
      ]
    
    case 229:
      return helper.squareEnixStore(
        ['FINAL FANTASY® XIV HEAVENSWARD™ – THE SCARS OF WAR', true, true, true],
        ['Monday, December 31, 2018', 'Montag, 31. Dezember 2018', 'Lundi 31 décembre 2018', '2018年12月31日']
      );
    
    case 230:
      return helper.quest(
        60,
        locale('Hildibrand Quests'),
        ["If I Could Turn Back Time", "Nobody Is Perfect - Außer Hildi", "Chacun Son Meilleur Jour", "理想の毎日"],
        ["Hildibrand", true, true, "ヒルディブランド"],
        location.idyllshire,
        6.4, 7.7,
        expansions.HW,
        true,
        false
      );
    
    case 231:
      return helper.quest(
        60,
        locale('Anima Weapons'),
        ["Body And Soul", "Es Lebe Der Kommerz", "Un Esprit Qui Fait Corps", "研究の終わりに"],
        ["Automaton", "Marionette", "Pantin", "からくり人形"],
        location.azysLla,
        7.5, 11.6,
        expansions.HW,
        true,
        false
      );
    
    case 232:
      return helper.raid(location.duty.dunScaith, 60, expansions.HW, true, false);
    
    case 233:
      return helper.squareEnixStore(
        ['THE FAR EDGE OF FATE: FINAL FANTASY XIV ORIGINAL SOUNDTRACK', true, true, true],
        ['Monday, December 31, 2018', 'Montag, 31. Dezember 2018', 'Lundi 31 décembre 2018', '2018年12月31日']
      );
    
    case 234:
      return helper.achievementReward(1749, expansions.HW, true, false);
    
    case 235:
      return o(
        'beastTribe',
        [
          rank.allied,
          beastTribe.moogle,
          25000, gil, gilImage,
          _npc.mogmulMogbelly,
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.theChurningMists,
          16, 28.5
        ],
        expansions.HW,
        true,
        false
      );
    
    case 236:
      return o(
        'purchase',
        [
          1, item.hiElixir, hiElixirImage,
          ['Magic Pot', 'Zauberpott', 'Pot Magique', 'マジックポット'],
          ['(Gimme An Elixir)', '(Gib Mir Ein Elixier!)', '(Je Veux Un élixir !)', '(エリクサーちょうだい)'],
          locationImage,
          location.westernLaNoscea,
          12.1, 36.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 237:
      return [
        helper.fishingDoubleMooch(
          location.fishing.northIsleOfEndlessSummer,
          location.easternLaNoscea,
          36, 26,
          item.bait.lugworm,
          63,
          expansions.SB,
          item.fish.merlthorGoby,
          item.fish.wahoo
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];
    
    case 238:
      return helper.collectorsEdition(locale('Stormblood'), expansions.SB, true);

    case 239:
      return [
        o(
          'preOrder',
          [
            locale('Pre-order'),
            locale('Stormblood'),
            ['Tuesday, June 20, 2017', 'Seinstag, 20. Juni 2017', 'Mardi 20 juin 2017', '2017年6月20日']
          ],
          expansions.SB,
          false,
          true
        )
      ];
    
    case 240:
      return helper.achievementReward(1754, expansions.ARR, true, false);

    case 241:
      return [
        helper.retainerVenture(60, 'Fisher', 'Waterside Exploration', 'XIX'),
        helper.retainerVenture(61, 'Fisher', 'Waterside Exploration', 'XX'),
        helper.retainerVenture(65, 'Fisher', 'Waterside Exploration', 'XXI'),
        helper.retainerVenture(60, 'Miner', 'Highland Exploration', 'XIX'),
        helper.retainerVenture(61, 'Miner', 'Highland Exploration', 'XX'),
        helper.retainerVenture(65, 'Miner', 'Highland Exploration', 'XXI'),
        helper.retainerVenture(70, 'Miner', 'Highland Exploration', 'XXII'),
        helper.retainerVenture(60, 'Botanist', 'Woodland Exploration', 'XIX'),
        helper.retainerVenture(61, 'Botanist', 'Woodland Exploration', 'XX'),
        helper.retainerVenture(65, 'Botanist', 'Woodland Exploration', 'XXI'),
        helper.retainerVenture(70, 'Botanist', 'Woodland Exploration', 'XXII'),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 242:
      return o(
        'purchase',
        [
          3, sasshoSekiFragment, sasshoSekiFragmentImage,
          ["Eschina", true, true, "エシナ"],
          ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
          locationImage,
          location.rhalgrsReach,
          13.9, 11.8
        ],
        expansions.SB,
        true,
        false
      );
    
    case 243:
    case 256:
      return [
        o(
          'purchase',
          [
            800, centurioSeals, centurioSealsImage,
            ["Estrild", true, true, "エストリルド"],
            ['(Centurio Seal Exchange I)', '(Centurio-Abzeichen I)', '(Insignes Centurio)', '（セントリオ記章の取引）'],
            locationImage,
            location.kugane,
            10.4, 10.3
          ],
          expansions.SB,
          true,
          false
        ),
        o(
          'purchase',
          [
            800, centurioSeals, centurioSealsImage,
            ["Leuekin", true, true, "リューキン"],
            ['(Centurio Seal Exchange I)', '(Centurio-Abzeichen I)', '(Insignes Centurio)', '（セントリオ記章の取引）'],
            locationImage,
            location.rhalgrsReach,
            13.1, 11.8
          ],
          expansions.SB,
          true,
          false
        )
      ];
    
    case 244:
      return [
        helper.fishingSpearfishing(
          locale('Large Gig'),
          location.fishing.theKobayashiMaru,
          location.theRubySea,
          38.8, 6.3,
          70,
          expansions.SB,
          10,
          item.fish.bashfulBatfish,
          locale('Small Gig')
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ]

    case 245:
      return [
        helper.dungeon(location.duty.shisuiOfTheVioletTides, 63, null, null, expansions.SB, true, false),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 246:
      return [
        helper.retainerVenture(61, 'Disciples of War and Magic', 'Field Exploration', 'XX'),
        helper.retainerVenture(70, 'Disciples of War and Magic', 'Field Exploration', 'XXII'),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 247:
      return [
        helper.dungeon(location.duty.bardamsMettle, 65, null, null, expansions.SB, true, false),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 248:
    case 250:
      return helper.eventQuest(
        15,
        ["A Reoccurring Bug", "Wiedergeburt Der Bugs", "Le Chevalier Du Labyrinthe", "新生祭と監獄の魔洞"],
        'eq6',
        expansions.ARR
      );

    case 249:
      return helper.dungeon(location.duty.kuganeCastle, 70, null, null, expansions.SB, true, false);
    
    case 251:
      return helper.squareEnixStoreNoExpiration(
        ['FINAL FANTASY® XIV: STORMBLOOD™ ART OF THE REVOLUTION - WESTERN MEMORIES [ARTBOOK]', true, true, true]
      );

    case 252:
      return helper.dungeon(location.duty.domaCastle, 67, null, null, expansions.SB, true, false);

    case 253:
      return [
        helper.timewornMap(...timewornMap.gazelleskin),
        helper.hiddenCanalsOfUznair()
      ]

    case 254:
      return helper.dungeon(location.duty.theTempleOfTheFist, 70, null, null, expansions.SB, true, false);

    case 255:
      return helper.craft(
        70,
        locale('Weaver'),
        1,
        [
          { quantity: 6, ...craftItem.windCrystal },
          { quantity: 6, ...craftItem.lightningCrystal },
          { quantity: 1, ...craftItem.allaganCatalyst },
          { quantity: 2, ...craftItem.chimericalFelt },
          { quantity: 2, ...craftItem.sewingThread },
          { quantity: 2, ...craftItem.steppeSerge },
          { quantity: 2, ...craftItem.twinsilk }
        ]
      );

    case 257:
      return helper.dungeon(location.duty.castrumAbania, 69, null, null, expansions.SB, true, false);

    case 258:
      return [
        helper.dungeon(location.duty.theSirensongSea, 61, null, null, expansions.SB, true, false),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 259:
      return [
        helper.raid(location.duty.deltascapev40, 70, expansions.SB, true, false),
        helper.raid(location.duty.deltascapev40Savage, 70, expansions.SB, true, false)
      ];

    case 261:
      return [
        helper.craft(
          70,
          locale('Weaver'),
          1,
          [
            { quantity: 50, ...craftItem.lightningShard },
            { quantity: 50, ...craftItem.waterShard },
            { quantity: 1, ...craftItem.bloodPepper },
            { quantity: 1, ...craftItem.bladeOfRevelry },
            { quantity: 1, ...craftItem.kyanite },
            { quantity: 2, ...craftItem.steppeSerge },
            { quantity: 1, ...craftItem.worstedYarn }
          ]
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 262:
      return [
        helper.craft(
          70,
          locale('Weaver'),
          1,
          [
            { quantity: 50, ...craftItem.windShard },
            { quantity: 50, ...craftItem.earthShard },
            { quantity: 1, ...craftItem.bloodPepper },
            { quantity: 1, ...craftItem.blissfulShroud },
            { quantity: 1, ...craftItem.palladiumNugget },
            { quantity: 2, ...craftItem.steppeSerge },
            { quantity: 1, ...craftItem.worstedYarn }
          ]
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 263:
      return [
        helper.craft(
          60,
          locale('Weaver'),
          1,
          [
            { quantity: 50, ...craftItem.windShard },
            { quantity: 50, ...craftItem.waterShard },
            { quantity: 1, ...craftItem.bloodPepper },
            { quantity: 1, ...craftItem.chimericalFelt },
            { quantity: 1, ...craftItem.crawlerSilk },
            { quantity: 1, ...craftItem.expanseBaleen }
          ]
        ),
        helper.itemAccursedHoard(item.silverHaloedSack, location.duty.heavenOnHigh, expansions.SB),
        helper.itemAccursedHoard(item.goldHaloedSack, location.duty.heavenOnHigh, expansions.SB)
      ];

    case 265:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 50, ...craftItem.fireShard },
          { quantity: 50, ...craftItem.earthShard },
          { quantity: 1, ...craftItem.bloodPepper },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.hiveForewing }
        ]
      );
    
    case 266:
      return o(
        'beastTribe',
        [
          rank.respected,
          beastTribe.kojin,
          5, kojinSango, kojinSangoImage,
          ["Shikitahe", "Shikitahe", "Shikitahe", "シキタヘ"],
          ["(Kojin Sango Exchange)", "(Kojin-Korallen)", "(Échange De Sango Kojin)", "(コウジン珊瑚貨の取引)"],
          locationImage,
          location.theRubySea,
          29.4, 16.9
        ],
        expansions.SB,
        true,
        false
      );
    
    case 267:
      return helper.retainerVenture(70, 'Miner', 'Highland Exploration', 'XXII');
    
    case 268:
      return helper.retainerVenture(70, 'Disciples of War and Magic', 'Field Exploration', 'XXII');

    case 269:
    case 289:
      return helper.hiddenCanalsOfUznair();
    
    case 271:
      return [
        helper.retainerVenture(70, 'Botanist', 'Woodland Exploration', 'XXII'),
        helper.retainerVenture(70, 'quick')
      ];

    case 272:
      return helper.dungeon(location.duty.theDrownedCityOfSkalla, 70, null, null, expansions.SB, true, false);

    case 273:
      return helper.retainerVenture(70, 'Fisher', 'Waterside Exploration', 'XXII');

    case 274:
      return o(
        'purchase',
        [
          5, ixionHorn, ixionHornImage,
          ["Eschina", true, true, "エシナ"],
          ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
          locationImage,
          location.rhalgrsReach,
          13.9, 11.8
        ],
        expansions.SB,
        true,
        false
      );

    case 275:
      return helper.craft(
        70,
        locale('Weaver'),
        2,
        [
          { quantity: 50, ...craftItem.windShard },
          { quantity: 50, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.shinryusScales },
          { quantity: 1, ...craftItem.royalFern },
          { quantity: 1, ...craftItem.twinsilk },
          { quantity: 1, ...craftItem.worstedYarn }
        ]
      );
    
    case 276:
      return helper.quest(
        70,
        locale('Post-Ala Mhigan Liberation'),
        ["Return Of The Bull", "Die Versammlung", "Retour Au Bercail", "英雄の帰還"],
        ["Raubahn", true, true, "ラウバーン"],
        location.rhalgrsReach,
        14.7, 9.4,
        expansions.SB,
        true,
        false
      );
    
    case 277:
      return o(
        'beastTribe',
        [
          rank.respected,
          beastTribe.ananta,
          5, anantaDreamstaff, anantaDreamstaffImage,
          ["Madhura", true, true, "マドゥラ"],
          ["(Ananta Dreamstaff Exchange)", "(Ananta-Traumstäbe)", "(Échange De Barrettes Béatifiques Anantas)", "(アナンタ魔金錫貨の取引)"],
          locationImage,
          location.theFringes,
          20.9, 26.1
        ],
        expansions.SB,
        true,
        false
      );

    case 278:
      return helper.craft(
        70,
        locale('Blacksmith'),
        2,
        [
          { quantity: 7, ...craftItem.fireCrystal },
          { quantity: 7, ...craftItem.earthCrystal },
          { quantity: 2, ...craftItem.colossusSlab },
          { quantity: 1, ...craftItem.royalFern },
          { quantity: 2, ...craftItem.chromiteIngot }
        ]
      );

    case 279:
      return helper.dungeon(location.duty.hellsLid, 70, null, null, expansions.SB, true, false);

    case 280:
      return helper.eventQuest(
        15,
        ["Uneggseptable Losses", "Wundersame Eierdiebe", "Pas De Fête Sans Cacher Des Prœufs", "エッグハントの大事件"],
        'eq7',
        expansions.ARR
      );

    case 281:
      return [
        helper.raid(location.duty.sigmascapev40, 70, expansions.SB, true, false),
        helper.raid(location.duty.sigmascapev40Savage, 70, expansions.SB, true, false)
      ];

    case 282:
      return helper.craft(
        70,
        locale('Weaver'),
        2,
        [
          { quantity: 9, ...craftItem.windShard },
          { quantity: 10, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.worstedYarn },
          { quantity: 1, ...craftItem.twinsilk },
          { quantity: 1, ...craftItem.royalFern },
          { quantity: 1, ...craftItem.oroniriCloth }
        ]
      );
    
    case 283:
      return helper.freeCompanySubaquaticVoyage(
        ['Deep-sea Site 3', 'Tiefsee 3', 'Mer Des Noyades 3', '?Deep-sea Site 3?']
      );

    case 284:
      return helper.craft(
        70,
        locale('Weaver'),
        2,
        [
          { quantity: 7, ...craftItem.windCrystal },
          { quantity: 7, ...craftItem.lightningCrystal },
          { quantity: 1, ...craftItem.byakkosMane },
          { quantity: 1, ...craftItem.royalFern },
          { quantity: 1, ...craftItem.twinsilk },
          { quantity: 1, ...craftItem.worstedYarn }
        ]
      );
    
    case 285:
      return [
        helper.eurekaAnemosFate(
          17,
          ["Wine And Honey", "Schlafende Drachen Soll Man Nicht Wecken", "Défi: Le Dragon Démentiel", "狂乱の暗竜「ファヴニル」"]
        ),
        helper.itemAnemosLockbox()
      ];
    
    case 286:
      return [
        helper.eurekaAnemosFate(
          11,
          ["Short Serket 2", "Wütend Wie Ein Hurrikan", "Défi: Le Scorpion Mythique", "幻の魔蠍「セルケト」"]
        ),
        helper.itemAnemosLockbox()
      ];
    
    case 287:
      return [
        helper.eurekaAnemosFate(
          2,
          ["The Shadow Over Anemos", "Küssen Verboten", "Défi: Le Seigneur De La Terre Interdite", "大蛸の王者「ロード・オブ・アネモス」"]
        ),
        helper.itemAnemosLockbox()
      ];

    case 288:
      return helper.achievementCertificate(2);

    case 290:
      return helper.dungeon(location.duty.theSwallowsCompass, 70, null, null, expansions.SB, true, false);
    
    case 291:
      return o(
        'purchase',
        [
          15000, wolfMarks, wolfMarksImage,
          _npc.stormSegeant,
          wolfMarks.map(w => '(' + w + ')'),
          locationImage,
          location.theWolvesDen,
          4.4, 6.1
        ],
        expansions.ARR,
        true,
        false
      );

    case 292:
      return o(
        'purchase',
        [
          10, empyreanPotsherd, empyreanPotsherdImage,
          ["Confederate Custodian", "Materialhüterin", "Fournisseuse De La Confédération", "海賊衆の資材係"],
          ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
          locationImage,
          location.theRubySea,
          21.2, 9.2
        ],
        expansions.SB,
        true,
        false
      );
    
    case 293:
      return helper.eventQuest(
        15,
        ["In Adventurers We Trust", "Den Abenteurern Sei Dank", "Une Commémoration Bien Trempée", "新生祭と冒険者たちの戦い"],
        'eq6',
        expansions.ARR
      );

    case 294:
      return helper.craft(
        70,
        locale('Weaver'),
        2,
        [
          { quantity: 9, ...craftItem.windShard },
          { quantity: 10, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.worstedYarn },
          { quantity: 1, ...craftItem.twinsilk },
          { quantity: 1, ...craftItem.royalFern },
          { quantity: 1, ...craftItem.dotharliCloth }
        ]
      );
    
    case 295:
    case 296:
      return helper.itemAnemosLockbox('pagos');
    
    case 297:
      return helper.squareEnixStoreNoExpiration(
        ['Stormblood FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true]
      );

    case 299:
      return helper.raid(location.duty.theRidoranaLighthouse, 70, expansions.SB, true, false);

    case 300:
      return helper.quest(
        70,
        locale('Special Quests'),
        ["The New King on the Block", "Jagd auf den König der Lüfte", "Le roi des cieux", "王は頂にて眠る"],
        ["Hearty Hunter", "Monsterjäger", "Chasseur de monstres", "ライバルモブハンター"],
        location.kugane,
        9.7, 8.9,
        expansions.SB,
        true,
        false
      );

    case 301:
      return [
        helper.trial(location.duty.theGreatHuntExtreme, 70, expansions.SB, true, false),
        o(
          'purchase',
          [
            5, rathalosScalePlus, rathalosScalePlusImage,
            ["Smithy", "Schmied", "Forgeron Itinérant", "加工屋の男"],
            ["(Prize Exchange I)", "(Gewinne I", "Lots (1))", "(景品の交換（その1）)"],
            locationImage,
            location.kugane,
            9.7, 8.8
          ],
          expansions.SB,
          true,
          false
        )
      ]

    case 302:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.namazu,
          7, namazuKoban, namazuKobanImage,
          ["Gyosho", true, true, "ギョショウ"],
          ["(Namazu Koban Exchange)", "(Namazuo-Koban)", "(Échange de koban namazu)", "(ナマズオ小判の取引)"],
          locationImage,
          location.dhoroIloh,
          5.8, 23.5
        ],
        expansions.SB,
        true,
        false
      );

    default:
      console.log("Unknown method for minion " + minion.id);
      return null;
  }
}