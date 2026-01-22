// config.js — настройки проекта, тексты, Firebase config

window.AppConfig = {
  // Путь в RTDB
  DB_PATH: 'dates',

  // === звук ===
  FREQ_MIN: 32.703,     // C1
  FREQ_MAX: 65.406,     // C2
  PITCH_MODE: 'exp',    // 'linear' | 'exp'

  DIGIT_GAP_MIN: 1.2,
  DIGIT_GAP_MAX: 3.0,
  PAIR_GAP: 4.2,

  NEWLINE_AFTER_PAIR: true,

  // Firebase Console Config
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

// показывать ли кнопку seed
ENABLE_SEED = false;   // true = показывать кнопку тестовой записи

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
    projectTitle: "MEMORIAL",
    introDesc:
      "Это цифровой мемориал - сайт с базой данных, в которой хранятся даты рождения разных людей. На сайте любой пользователь может ввести дату и она станет частью общей \"партитуры\", в которой каждая цифра превращается в звук. И музыка памяти звучит циклично-бесконечно.\n\nОбычно, ритуалы привязаны к месту: в храме мы ставим свечку за упокой, а к памятнику возлагаем цветы. Но цифровой мир сегодня - стал полноправным пространством жизни человека. Мы привыкли к облачному хранению артефактов своей жизни: собираем в метавселенных данные о прошлом, воспоминания и мысли. Но так же, метапространство может стать местом для \"вечной памяти\" потому, что само по себе уже обладает характеристикой вечного. Вечное место для вечной памяти.",
    playDesc:
      "Вы можете ввести дату рождения любого человека, память которого хотите почтить и сохранить. Дата добавится в базу данных, соединится с другими датами и станет частью общей музыкальной партитуры вечной памяти.\n\nКаждая из 8\u00A0цифр превращается в звук, и общая мелодия звучит непрерывно.",
    okBar: "добавлено",

    errToneMissing: "Tone.js не загрузился. Проверьте интернет/скрипты.",
    errAudioBlocked: "ваш браузер заблокировал аудио. кликните ещё раз или разрешите звук",
    errSynthInit: "Ошибка инициализации синтезатора.",
    errFirebaseInit: "Ошибка инициализации Firebase (config.js).",
    errBadFormat: "попробуйте еще раз ввести дату в верном формате",
    errDeathBeforeBirth: "дпопробуйте еще раз ввести даты в верном формате",
    errWriteFailed: "Ошибка записи. Проверьте соединение/Rules.",

    subscribing: "подключение к базе...",

    dbReadError: "Database read error",

    seedAdding: "добавляю тестовую запись...",
    seedInitFailed: "не удалось инициализировать Firebase",
    seedAdded: "добавлено:",
    seedWriteFailed: "Write error (Rules/network)."
  },

  en: {
    addBtn: "remember",
    startBtn: "connect",
    birthInput: "birth date (DD.MM.YYYY)",
    projectTitle: "MEMORIAL",
    introDesc:
      "This is a digital memorial — a website with a database that stores people's birth dates. Any user can add a date and it becomes part of a shared “score” where each digit turns into sound. The music of memory loops endlessly.\n\nRituals are usually tied to a place: in a temple we light a candle, at a monument we bring flowers. But the digital world has become a full-fledged space of human life. We store artifacts of our lives in the cloud: data about the past, memories, thoughts. Likewise, meta-space can become a place for “eternal memory” — because it already has an attribute of permanence.",
    playDesc:
      "You can enter the birth date of any person you want to remember. The date will be added to the database and will become part of the shared musical score.\n\nEach of 8 digits becomes a sound, and the overall melody plays continuously.",
    okBar: "added",

    errToneMissing: "Tone.js did not load. Check internet/scripts.",
    errAudioBlocked: "Audio was blocked by the browser. Click again or allow sound.",
    errSynthInit: "Synth initialization error.",
    errFirebaseInit: "Firebase initialization error (config.js).",
    errBadFormat: "error: format must be DD.MM.YYYY",
    errDeathBeforeBirth: "error: death date is earlier than birth date.",
    errWriteFailed: "Write error. Check connection/Rules.",

    subscribing: "connecting to database...",

    dbReadError: "Database read error",

    seedAdding: "adding seed record...",
    seedInitFailed: "Firebase init failed",
    seedAdded: "added:",
    seedWriteFailed: "Write error (Rules/network)."
  }
};

// HTML контактов
window.AppContacts = function(lang){
  const isEn = (lang === 'en');
  const sName = isEn ? studioNameEn : studioName;
  const a1Name = isEn ? artist1NameEn : artist1Name;
  const a2Name = isEn ? artist2NameEn : artist2Name;

  return `
    <div class="contacts">
      <div>
        <a href="${studioUrl}" target="_blank" rel="noopener noreferrer">${sName}</a>
      </div>
      <div style="display:flex; gap:10px;">
        <a href="${artist1Url}" target="_blank" rel="noopener noreferrer">${a1Name}</a>
        <a href="${artist2Url}" target="_blank" rel="noopener noreferrer">${a2Name}</a>
      </div>
    </div>
  `;
};

window.TEXTS = TEXTS;
window.CURRENT_LANG = CURRENT_LANG;
