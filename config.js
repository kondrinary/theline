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
    deathInput: "",
    projectTitle: "THE LINE",
    introDesc: "Это «Линия» — цифровое пространство памяти и жизни.
Здесь хранится общая база дат рождения. Вы вводите дату — и она становится частью общего звучания: каждая цифра превращается в звук, а вместе они собираются в бесконечную партитуру.

Мы привыкли хранить в «облаке» фотографии, переписки и заметки — следы своей жизни. Эта работа предлагает ещё один формат: сохранить дату как звук, который продолжает звучать в общем потоке."партитуры\", в которой каждая цифра превращается в звук. И музыка памяти звучит циклично-бесконечно.\n\nОбычно, ритуалы привязаны к месту: в храме мы ставим свечку за упокой, а к памятнику возлагаем цветы. Но цифровой мир сегодня - стал полноправным пространством жизни человека. Мы привыкли к облачному хранению артефактов своей жизни: собираем в метавселенных данные о прошлом, воспоминания и мысли. Но так же, метапространство может стать местом для \"вечной памяти\" потому, что само по себе уже обладает характеристикой вечного. Вечное место для вечной памяти.",
    playDesc: "Введите дату рождения человека, которого хотите вспомнить. Дата попадёт в базу данных и станет частью общего звучания.

В записи 8 цифр. Каждая цифра превращается в ноту — и начинает звучать наравне со всеми.
Здесь используется микротональный строй: вместо привычной октавы с 12–13 ступенями — 10 ступеней, по одной на цифру 0–9. Так дата получает длительность и «телесность» в звуке: это способ тихо и честно побыть рядом с памятью."побыть внутри памяти\", обнаруживая тело памяти через звук и вступая с памятью в близкий честный контакт.",
   
   
 contacts: "проект создан студией цифрового искусства " +
    "<a class=\"u-link\" href=\"" + studioUrl + "\" target=\"_blank\" rel=\"noopener\">" + studioName + "</a>" +
  ". художники: " +
    "<a class=\"u-link\" href=\"" + artist1Url + "\" target=\"_blank\" rel=\"noopener\">" + artist1Name + "</a>" +
  ", " +
    "<a class=\"u-link\" href=\"" + artist2Url + "\" target=\"_blank\" rel=\"noopener\">" + artist2Name + "</a>" +
  ".",

// статусные подписи (нейтральные)
waitingStart: "ожидание. нажмите «подключиться», чтобы включить звук",
  statusPreparingSound: "готовлю звук…",
  statusSoundReady: "звук готов",
  statusSubscribing: "подключаюсь к базе дат…",
  statusNoData: "в базе пока нет дат. добавьте дату рождения ниже",
  errToneMissing: "tone.js не загрузился. проверьте интернет или блокировщики",
  errAudioBlocked: "браузер заблокировал звук. нажмите ещё раз или разрешите аудио",
  errSynthInit: "Ошибка инициализации синтезатора.",
  errFirebaseInit: "Ошибка инициализации Firebase (config.js).",

// ошибки валидации формы
  errBadFormat: "неверный формат. введите дату как дд.мм.гггг",
  errDeathBeforeBirth: "некорректная дата. проверьте день, месяц и год",
  errWriteFailed: "Ошибка записи. Проверьте соединение/Rules.",
// чтение из базы
  dbReadError: "ошибка чтения из базы",
// тестовая запись
  seedAdding: "пробую добавить тестовую запись…",
  seedInitFailed: "firebase не инициализируется. проверьте config.js",
  seedAdded: "Тестовая запись добавлена:",
  seedWriteFailed: "Ошибка записи (Rules/сеть).",
// воспроизведение
  nowPlaying: "сейчас звучит ",
  hz: "Гц",
  idxLabel: "индекс ",
  dbCount: "дат в базе: {n}",
  nowPlayingBtn: "кто сейчас звучит?",

// «успех-бар» (белый текст)
  okBar: "теперь ты звучишь вместе со всеми"

  },
  en: {
addBtn: "remember",
startBtn: "connect",
birthInput: "date of birth (dd.mm.yyyy)",
deathInput: "",
projectTitle: "THE LINE",
introDesc: "This is The Line — a digital space for memory and life.
It holds a shared database of birth dates. You enter a date, and it becomes part of the collective sound: each digit turns into a tone, and together they form an endless score.

We already keep photos, messages, and notes in the cloud — traces of our lives. This work suggests one more form: to save a date as sound that continues inside a shared flow."score\" in which each digit turns into a sound. And the music of memory plays cyclically, endlessly.\n\nUsually, rituals are tied to a place: in a church we light a candle for the repose, and at a monument we lay flowers. But today the digital world has become a full-fledged space of human life. We are used to storing the artefacts of our lives in the cloud: we collect data about the past, memories and thoughts in metaverses. Likewise, metaspace can become a place for \"eternal memory\" because it already possesses the characteristic of the eternal. A permanent place for permanent memory.",
playDesc: "Enter the birth date of someone you want to remember. The date will be added to the database and become part of the collective sound.

A single entry has 8 digits. Each digit becomes a note and plays alongside all the others.
The system uses a microtonal tuning: instead of a familiar octave with 12–13 steps, it has 10 steps — one for each digit 0–9. This gives the date duration and a physical sense in sound — a quiet, honest way to stay close to memory."be inside memory\", discovering the body of memory through sound and entering into a close, honest contact with memory. Not an impulsive contact, but a prolonged contact-presence.",
   
contacts: "the project was created by " +
    "<a class=\"u-link\" href=\"" + studioUrl + "\" target=\"_blank\" rel=\"noopener\">" + studioNameEn + "</a>" +
  " studio. artists: " +
    "<a class=\"u-link\" href=\"" + artist1Url + "\" target=\"_blank\" rel=\"noopener\">" + artist1NameEn + "</a>" +
  ", " +
    "<a class=\"u-link\" href=\"" + artist2Url + "\" target=\"_blank\" rel=\"noopener\">" + artist2NameEn + "</a>" +
  ".",

    // статусные подписи (нейтральные)
  waitingStart: "Waiting. Press “connect” to start sound.",
  statusPreparingSound: "Preparing sound…",
  statusSoundReady: "Sound is ready.",
  statusSubscribing: "Connecting to the dates database…",
  statusNoData: "No dates yet. Add a birth date below.",
  errToneMissing: "Tone.js didn’t load. Check your connection or blockers.",
  errAudioBlocked: "Your browser blocked audio. Click again or allow sound.",
  errSynthInit: "Synth initialization error.",
  errFirebaseInit: "Firebase initialization error (config.js).",

// ошибки валидации формы
  errBadFormat: "Wrong format. Use DD.MM.YYYY.",
  errDeathBeforeBirth: "Invalid date. Check day, month, and year.",
  errWriteFailed: "Write error. Check connection/Rules.",
// чтение из базы 
  dbReadError: "Database read error.",
// тестовая запись
  seedAdding: "Trying to add a test entry…",
  seedInitFailed: "Firebase is not initialized. Check config.js.",
  seedAdded: "Test record added:",
  seedWriteFailed: "Write error (Rules/network).",
// воспроизведение

  nowPlaying: "now playing ",
  hz: "Hz",
  idxLabel: "idx",
  dbCount: "dates in database: {n}",
nowPlayingBtn: "who is playing now?",


// «успех-бар» (белый текст)
  okBar: "Now you sound together with everyone."

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
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://memorial-bea3c.europe-west1.firebasedatabase.app/",
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_PROJECT_ID.appspot.com",
    messagingSenderId: "ВАШ_MESSAGING_SENDER_ID",
    appId: "ВАШ_APP_ID"
  }
};







