/* 
«ёлочки»: «…» или &laquo;…&raquo;
вложенные: „…“ или &bdquo;…&ldquo;
длинное тире: — или &mdash;
среднее тире (интервалы/диапазоны): – или &ndash;
неразрывный пробел: (&nbsp;)
узкий неразрывный пробел: &#8239; (подходит для «—» в русском: &#8239;—&#8239;)
*/

// === UI для дебаг-полосы ===
window.AppConfig = window.AppConfig || {};
AppConfig.UI = Object.assign(AppConfig.UI || {}, {
  DB_COUNT_REFRESH_MS: 4000 // забираем колво дат в базе раз в 4 секунды 
});

// Макс и мин значения коэффициента увеличения элементов интерфейса
AppConfig.UI.MOBILE_SCALE_MAX = 1.8;
AppConfig.UI.MOBILE_SCALE_MIN = 1.0;

// ПРАВИЛА
const ENABLE_SEED = false;   // true = показывать кнопку тестовой записи


// контакты
const studioName  = "MEDIUM";
const studioUrl   = "https://mediumstudio.ru";
const artist1Name = "настасья кондрина";
const artist1Url  = "https://mediumstudio.ru/nastasyakondrina";
const artist2Name = "андрей обыденников";
const artist2Url  = "https://mediumstudio.ru/andrey_obidennikov"; 
// EN display 
const studioNameEn  = "MEDIUM";         
const artist1NameEn = "Nastasya Kondrina";    
const artist2NameEn = "Andrey Obydennikov"; 


// язык по умолчанию
let CURRENT_LANG = "ru";

const TEXTS = {
  ru: {
    addBtn: "запомнить",
    startBtn: "подключиться",
    birthInput: "дата рождения (дд.мм.гггг)",
    deathInput: "дата смерти (дд.мм.гггг)",
    projectTitle: "THE LINE",
    introDesc: "Это web-инсталляция, которая работает постоянно в реальном времени. Каждый человек может оставить свою дату рождения на сайте, она попадет в базу данных и станет частью большой общей музыкальной партитуры. Мы разработали специальный микротональный строй, в котором каждая цифра даты рождения получает свое уникальное звучание. Так даты рождения разных людей из разных мест начинают звучать как единое звуковое поле. то мета-соприсутствие. Звук - существует в физичестком поле плотно заполняя пространство и обозначая невидимые связи между видимыми объектами. Звуковое поле созданное датами рождения мноетсва ледй формирует новое общее физическое пространство в метаполе. Мы одновременно начинаем присутствовать и в настоящем моменте своей жизни, и в базе данных дат, и в звуковом микротональном поле проекта THE LINE. \n",
    playDesc: "Как взаимодействовать с проектом: вы можете ввести свою дату рождения на сайте. Дата добавляется в общую базу данных, соединятся с другими датами и становится частью общей музыкальной партитуры, звучание которой вы в реальном времени можете слышать на сайте.\n",
   
   
 contacts: "проект создан студией цифрового искусства " +
    "<a class=\"u-link\" href=\"" + studioUrl + "\" target=\"_blank\" rel=\"noopener\">" + studioName + "</a>" +
  ". художники: " +
    "<a class=\"u-link\" href=\"" + artist1Url + "\" target=\"_blank\" rel=\"noopener\">" + artist1Name + "</a>" +
  ", " +
    "<a class=\"u-link\" href=\"" + artist2Url + "\" target=\"_blank\" rel=\"noopener\">" + artist2Name + "</a>" +
  ".",

// статусные подписи (нейтральные)
waitingStart: "ожидание запуска. нажмите кнопку подключиться",
  statusPreparingSound: "готовлю звук",
  statusSoundReady: "звук готов",
  statusSubscribing: "подписываюсь на базу данных с датами",
  statusNoData: "Нет данных для проигрывания. Добавьте дату ниже.",
  errToneMissing: "Tone.js не загрузился. Проверьте интернет/скрипты.",
  errAudioBlocked: "ваш браузер заблокировал аудио. кликните ещё раз или разрешите звук",
  errSynthInit: "Ошибка инициализации синтезатора.",
  errFirebaseInit: "Ошибка инициализации Firebase (config.js).",

// ошибки валидации формы
  errBadFormat: "попробуйте еще раз ввести даты в верном формате",
  errDeathBeforeBirth: "дпопробуйте еще раз ввести даты в верном формате",
  errWriteFailed: "Ошибка записи. Проверьте соединение/Rules.",
// чтение из базы
  dbReadError: "Ошибка чтения из базы",
// тестовая запись
  seedAdding: "Пробую добавить тестовую запись…",
  seedInitFailed: "Firebase не инициализируется. Проверь config.js.",
  seedAdded: "Тестовая запись добавлена:",
  seedWriteFailed: "Ошибка записи (Rules/сеть).",
// воспроизведение
  nowPlaying: "сейчас звучит ",
  hz: "Гц",
  idxLabel: "индекс ",
  dbCount: "количество дат: {n}",
  nowPlayingBtn: "кто сейчас звучит?",

// «успех-бар» (белый текст)
  okBar: "ваша запись добавлена в память цифрового мемориала"

  },
  en: {
addBtn: "remember",
startBtn: "connect",
birthInput: "date of birth (dd.mm.yyyy)",
deathInput: "date of death (dd.mm.yyyy)",
projectTitle: "MEMORIAL",
introDesc: "This is a digital memorial — a website with a database that stores dates of birth and death of different people. On the site, any user can enter dates and they will become part of a common \"score\" in which each digit turns into a sound. And the music of memory plays cyclically, endlessly.\n\nUsually, rituals are tied to a place: in a church we light a candle for the repose, and at a monument we lay flowers. But today the digital world has become a full-fledged space of human life. We are used to storing the artefacts of our lives in the cloud: we collect data about the past, memories and thoughts in metaverses. Likewise, metaspace can become a place for \"eternal memory\" because it already possesses the characteristic of the eternal. A permanent place for permanent memory.",
playDesc: "You can enter the birth–death dates of any person whose memory you want to honor and preserve. The dates will be added to the database, joined with other dates, and become part of the shared musical score of eternal memory.\n\nEach of the 16\u00A0digits becomes a note — and begins to sound on an equal footing with the rest, continuing the flow. The digital memorial has its own microtonal musical system that does not resemble earthly music. A new octave was created for the memorial, consisting not of 13\u00A0notes like the classical octave, but of 10\u00A0notes. Each digit [ from\u00A00 to\u00A09 ] corresponds to its own pitch — its own frequency. The memorial translates the digits of the dates of birth and death of people into a sonic field, giving them duration and physical density. It is a monument that allows us to \"be inside memory\", discovering the body of memory through sound and entering into a close, honest contact with memory. Not an impulsive contact, but a prolonged contact-presence.",
   
contacts: "the project was created by " +
    "<a class=\"u-link\" href=\"" + studioUrl + "\" target=\"_blank\" rel=\"noopener\">" + studioNameEn + "</a>" +
  " studio. artists: " +
    "<a class=\"u-link\" href=\"" + artist1Url + "\" target=\"_blank\" rel=\"noopener\">" + artist1NameEn + "</a>" +
  ", " +
    "<a class=\"u-link\" href=\"" + artist2Url + "\" target=\"_blank\" rel=\"noopener\">" + artist2NameEn + "</a>" +
  ".",

    // статусные подписи (нейтральные)
  waitingStart: "waiting to start. press connect-button",
  statusPreparingSound: "Preparing sound…",
  statusSoundReady: "Sound is ready.",
  statusSubscribing: "subscribing to database",
  statusNoData: "No data to play. Please add a date below.",
  errToneMissing: "Tone.js did not load. Check internet/scripts.",
  errAudioBlocked: "Audio was blocked by the browser. Click again or allow sound.",
  errSynthInit: "Synth initialization error.",
  errFirebaseInit: "Firebase initialization error (config.js).",

// ошибки валидации формы
  errBadFormat: "error: format must be DD.MM.YYYY",
  errDeathBeforeBirth: "error: death date is earlier than birth date.",
  errWriteFailed: "Write error. Check connection/Rules.",
// чтение из базы 
  dbReadError: "Database read error",
// тестовая запись
  seedAdding: "Trying to add a test record…",
  seedInitFailed: "Firebase fails to initialize. Check config.js.",
  seedAdded: "Test record added:",
  seedWriteFailed: "Write error (Rules/network).",
// воспроизведение

  nowPlaying: "now playing",
  hz: "Hz",
  idxLabel: "idx",
  dbCount: "dates in database: {n}",
nowPlayingBtn: "whо is sounding now?",


// «успех-бар» (белый текст)
  okBar: "your entry has been added to the Digital Memorial's memory"

  }
};



window.AppConfig = {



  // Визуальные отступы в правой ленте
  STREAM_SPACING: {
    ENABLED: false,      // включить случайный отступ после цифр и точек
    MIN_CH: 10,        // минимум в ch
    MAX_CH: 10,        // максимум в ch
    APPLY_TO: 'digits_and_dots', // 'digits_and_dots' | 'all'
    NEWLINE_AFTER_PAIR: true      // перенос строки после каждой пары дат
  },

  CLOCK: {
    USE_FIREBASE_OFFSET: true,         // .info/serverTimeOffset
    USE_HTTP_TIME: true,               // HTTP-UTC (worldtimeapi) как второй источник
    HTTP_URL: 'https://worldtimeapi.org/api/timezone/Etc/UTC',
    RESYNC_SEC: 60,                    // переоценка HTTP-UTC раз в минуту
    SLEW_MS: 1500,                     // плавная подстройка offset без скачка
    JITTER_MS: 8                       // игнорировать шум до ±8 мс
  },

  // РОВНАЯ СЕТКА (индекс только из времени)
  SYNC: {
    GRID_MS: 1000                       // длина шага сетки 
  },

  // ОКНО АКТИВАЦИИ НОВЫХ ЗАПИСЕЙ (чтобы append был синхронный)
  WINDOW: {
    MS: 1000,      // окно 1 секунда
    DELAY_MS: 200  // защитная задержка на сеть
  },

  // Скорость (влияет на длительность ноты/FX, НЕ на сетку)
  SPEED: 1,

  // Кнопка тестовой записи
  ENABLE_SEED: true,

  // Синхронизация
  SYNC_ENABLED: true,
  SYNC_EPOCH_MS: Date.UTC(2025,0,1,0,0,0), // опорное UTC-время
  SYNC_SEED: 123456789,
  RANDOM_MODE: 'seeded',

  // Длительности/FX
  DUR: {
    noteLen: 0.50, // сек
    pairGap: 1000
  },

  // Маппинг 0..9 → частоты
  FREQ_MIN: 90,
  FREQ_MAX: 500,
  PITCH_MODE: 'linear',

  // Ветка RTDB
  DB_PATH: 'dates',

  // Firebase Console Config (замени на свой)
firebaseConfig: {
  apiKey: "AIzaSyDkQzsSnNP420SyI4KMSxK1xhc9ZoOYK8E",
  authDomain: "thelifeline-ac849.firebaseapp.com",
  databaseURL: "https://thelifeline-ac849-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "thelifeline-ac849",
  storageBucket: "thelifeline-ac849.firebasestorage.app",
  messagingSenderId: "233108668587",
  appId: "1:233108668587:web:80492ef1cf7ff0473af7ee",
  measurementId: "G-LV68Z2VZCH"
}
};







