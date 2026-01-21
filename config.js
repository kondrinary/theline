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
const MIN_UI_SCALE = 0.4;
const MAX_UI_SCALE = 1.2;

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

const ENABLE_SEED = false;   // true = показывать кнопку тестовой записи


// === тексты (тут как было) ===
window.TEXTS = {
  ru: {
    addBtn: "запомнить",
    startBtn: "подключиться",
    birthInput: "дата рождения (дд.мм.гггг)",
    deathInput: "дата смерти (дд.мм.гггг)",
    projectTitle: "MEMORIAL",
    introDesc: "Это звуковой архив дат: вводишь даты — они превращаются в цифры, звук и свет и добавляются в общий поток.",
    playDesc: "Введи даты (дд.мм.гггг), нажми «запомнить». Даты станут частью общей музыкальной партитуры.",
    okBar: "добавлено",
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
    nowPlaying: "сейчас играет",
    hz: "Гц",
    idxLabel: "индекс"
  },

  en: {
    addBtn: "remember",
    startBtn: "connect",
    birthInput: "date of birth (dd.mm.yyyy)",
    deathInput: "date of death (dd.mm.yyyy)",
    projectTitle: "MEMORIAL",
    introDesc: "A sound archive of dates: enter dates and they become digits, sound and light inside the shared stream.",
    playDesc: "Enter dates (dd.mm.yyyy) and press “remember”. Dates become part of the shared musical score.",
    okBar: "saved",
    errAudioBlocked: "your browser blocked audio. click again or allow sound",
    errSynthInit: "Synth init error.",
    errFirebaseInit: "Firebase init error (config.js).",

    errBadFormat: "please enter dates in correct format",
    errDeathBeforeBirth: "please enter dates in correct format",
    errWriteFailed: "Write error. Check connection/Rules.",
    dbReadError: "Database read error",
    seedAdding: "Trying to add seed…",
    seedInitFailed: "Firebase init failed. Check config.js.",
    seedAdded: "Seed added:",
    seedWriteFailed: "Write error (Rules/network).",
    nowPlaying: "now playing",
    hz: "Hz",
    idxLabel: "idx"
  }
};


// === конфиг приложения (как было) ===
window.AppConfig = Object.assign(window.AppConfig || {}, {
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

  // Firebase Console Config (Line)
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
});
