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
introDesc: "Это веб-инсталляция, которая работает постоянно и в реальном времени. Ты можешь оставить здесь свою дату рождения — она сохранится в общей базе и станет частью общей музыкальной партитуры. Мы используем микротональный строй: каждой цифре соответствует своя частота, поэтому даты разных людей складываются в единое звуковое поле. Звук - существует в физическом мире и звчание коллективного присутствия - дает возможность услышать невидимые связи между нами - живущими одновременно в этом моменте собственной жизни, в метапространстве цифровой базы данных и в бесконечной музыке проекта THE LINE.",
playDesc: "Как взаимодействовать с проектом: нажмите «подключиться», разрешите звук в браузере, введи дату рождения и нажмите «запомнить». Дата добавится в общую базу и будет звучать вместе с другими. Обратите внимание, что после добавления даты есть небольшая задержка перед тем, как она появится на экране внизу списка.",
   
   
 contacts: "студия цифрового искусства " +
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
  errBadFormat: "попробуйте ввести дату еще раз в верном формате",
  errDeathBeforeBirth: "попробуйте ввести даты еще раз в верном формате",
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
  okBar: "ваша запись добавлена, теперь вы звучите вместе со всеми."

  },
  en: {
addBtn: "remember",
startBtn: "connect",
birthInput: "date of birth (dd.mm.yyyy)",
deathInput: "date of death (dd.mm.yyyy)",
projectTitle: "THE LINE",
introDesc: "THE LINE is a real-time web installation. You can leave your date of birth here — it is saved to a shared database and becomes part of a collective musical score. We use a microtonal tuning: each digit has its own frequency, so dates from different people merge into one sound field. It’s a way to sense invisible connections and be present at once in your life, in the database, and in the sound of THE LINE.\\n",
playDesc: "How to take part: press “connect”, allow audio, enter your date of birth, then press “remember”. Your date will be added to the shared database and will immediately join the sound together with the others.\\n",
   
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
  okBar: "your entry has been added, now you sound together with everyone"

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
  apiKey: "AIzaSyAHqP0yPVlbV52o9ByL3kWEmHpncWMl9Js",
  authDomain: "theline-eac2d.firebaseapp.com",
  projectId: "theline-eac2d",
  storageBucket: "theline-eac2d.firebasestorage.app",
  messagingSenderId: "282983558459",
  appId: "1:282983558459:web:bf2ad14100a28a47ba5b1e",
  measurementId: "G-JC8NP0DWDS"
}
};







