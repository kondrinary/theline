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
const artist1Name = "Artist";
const artist1Url  = "https://instagram.com/";
const artist2Name = "Artist";
const artist2Url  = "https://instagram.com/";

// переводные тексты
const TEXTS = {
  ru: {
    addBtn: "запомнить",
    startBtn: "подключиться",
    birthInput: "дата рождения (дд.мм.гггг)",
    deathInput: "дата смерти (дд.мм.гггг)",
    projectTitle: "MEMORIAL",
    introDesc: "Это цифровой мемориал - сайт с базой данных, в которой хранятся даты рождения разных людей. На сайте любой пользователь может ввести дату и она станет частью общей \"партитуры\", в которой каждая цифра превращается в звук. И музыка памяти звучит циклично-бесконечно.\n\nОбычно, ритуалы привязаны к месту: в храме мы ставим свечку за упокой, а к памятнику возлагаем цветы. Но цифровая среда развязывает узел места — и делает память распределённой. Мы не знаем друг друга, но слышим друг друга. \n\nЭто не архив и не статистика. Это форма присутствия: всё, что ты вводишь, становится частью общего звука.\n\nКаждая из 8\\u00A0цифр превращается в ноту — и начинает звучать наравне со всеми, продолжая общую музыкальную партитуру вечной памяти.",
    playDesc: "Каждая цифра даты превращается в ноту в диапазоне от до первой октавы до следующей до, разделённую на 10 равных частей.\n\nВсе 8 цифр звучат одна за другой с задержками от 1.2 до 3 секунд. После даты — пауза 4.2 секунды.\n\nПоток бесконечный: когда заканчивается последняя цифра, цикл начинается заново.",
    nowPlayInline: "как это звучит?",
    okBar: "добавлено в мемориал",
    errBadFormat: "введи дату в формате ДД.ММ.ГГГГ",
    errDeathBeforeBirth: "дата смерти должна быть позже даты рождения",
    errYearRange: "слишком большой диапазон лет",
    errWriteFailed: "не удалось записать. попробуй ещё раз.",
    errFirebase: "ошибка подключения к базе",
    seedBtn: "тестовая запись",
    seedAdded: "добавлено:"
  },
  en: {
    addBtn: "remember",
    startBtn: "connect",
    birthInput: "date of birth (dd.mm.yyyy)",
    deathInput: "date of death (dd.mm.yyyy)",
    projectTitle: "MEMORIAL",
    introDesc: "This is a digital memorial — a website with a database that stores dates of birth of different people. Any user can enter a date, and it becomes part of a shared \"score\" where each digit turns into sound. The music of memory plays in an endless loop.\n\nUsually, rituals are tied to a place: in a temple we light a candle, at a grave we bring flowers. But the digital environment loosens the knot of place — and makes memory distributed. We don’t know each other, but we can hear each other.\n\nThis is not an archive and not statistics. It’s a form of presence: everything you enter becomes part of the shared sound.\n\nEach of the 8\\u00A0digits becomes a note — and begins to sound on an equal footing with all others, continuing the shared musical score of eternal memory.",
    playDesc: "Each digit becomes a note within the range from C1 to the next C, divided into 10 equal steps.\n\nAll 8 digits sound one after another with delays from 1.2 to 3 seconds. After the date — a 4.2 second pause.\n\nThe stream is endless: when the last digit ends, the cycle starts again.",
    nowPlayInline: "how does it sound?",
    okBar: "added to memorial",
    errBadFormat: "enter date as DD.MM.YYYY",
    errDeathBeforeBirth: "death must be later than birth",
    errYearRange: "year range is too big",
    errWriteFailed: "couldn’t write. try again.",
    errFirebase: "database connection error",
    seedBtn: "seed",
    seedAdded: "added:"
  }
};

// глобальные настройки приложения
window.AppConfig = Object.assign(window.AppConfig || {}, {
  LANG: 'ru',

  // путь в RTDB
  DB_PATH: 'dates',

  // звук
  FREQ_MIN: 32.7,
  FREQ_MAX: 65.4,
  PITCH_MODE: 'linear',

  // задержки
  NOTE_DELAY_MIN: 1.2,
  NOTE_DELAY_MAX: 3.0,
  PAIR_PAUSE: 4.2,

  // отступы в потоке
  STREAM_SPACING: {
    ENABLED: false,
    APPLY_TO: 'all',
    MIN_CH: 0.0,
    MAX_CH: 0.0,
    NEWLINE_AFTER_PAIR: true
  },

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
});

// Экспортируем вспомогалки (нужно main.js)
window.AppTexts = TEXTS;
window.ENABLE_SEED = ENABLE_SEED;
window.AppContacts = { studioName, studioUrl, artist1Name, artist1Url, artist2Name, artist2Url };
