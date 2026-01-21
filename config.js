// config.js — глобальная конфигурация проекта LINE (birth-only)
(function(){
  const studioName = "Medium is the Message";
  const studioUrl  = "https://mediumis.message";
  const artist1Name = "artist 1";
  const artist1Url  = "#";
  const artist2Name = "artist 2";
  const artist2Url  = "#";

  const artist1NameEn = "artist 1";
  const artist2NameEn = "artist 2";

  const TEXTS = {
    ru: {
      addBtn: "запомнить",
      startBtn: "подключиться",
      birthInput: "дата рождения (дд.мм.гггг)",
      projectTitle: "LINE",
      introDesc: "Короткое описание проекта в пару строк. Здесь можно объяснить идею и инструкцию.",
      playDesc: "Введите дату рождения. Каждая цифра становится звуком и частью общего потока.",

      contacts:
        "проект создан студией цифрового искусства " +
        "<a class=\"u-link\" href=\"" + studioUrl + "\" target=\"_blank\" rel=\"noopener\">" + studioName + "</a>" +
        ". художники: " +
        "<a class=\"u-link\" href=\"" + artist1Url + "\" target=\"_blank\" rel=\"noopener\">" + artist1Name + "</a>" +
        ", " +
        "<a class=\"u-link\" href=\"" + artist2Url + "\" target=\"_blank\" rel=\"noopener\">" + artist2Name + "</a>" +
        ".",

      waitingStart: "ожидание старта. нажмите кнопку подключения",
      statusPreparingSound: "Подготавливаю звук…",
      statusSoundReady: "Звук готов.",
      statusSubscribing: "Подписываюсь на базу данных…",
      statusNoData: "Пока нет данных. Добавьте дату рождения ниже.",
      errToneMissing: "Tone.js не загрузился. Проверь интернет/скрипты.",
      errAudioBlocked: "Браузер заблокировал звук. Нажмите ещё раз или разрешите звук.",
      errSynthInit: "Ошибка инициализации синтезатора.",
      errFirebaseInit: "Ошибка инициализации Firebase (config.js).",
      errBadFormat: "Формат должен быть ДД.ММ.ГГГГ",
      errWriteFailed: "Не удалось записать в базу.",
      okBar: "Записано.",
      seedAdding: "Добавляю тестовую запись…",
      seedInitFailed: "Не удалось инициализировать базу.",
      seedWriteFailed: "Не удалось записать тестовую запись.",
      dbReadError: "Ошибка чтения базы"
    },

    en: {
      addBtn: "remember",
      startBtn: "connect",
      birthInput: "date of birth (dd.mm.yyyy)",
      projectTitle: "LINE",
      introDesc: "Short project description in a couple of lines.",
      playDesc: "Enter a date of birth. Each digit becomes sound in the shared stream.",

      contacts:
        "project by " +
        "<a class=\"u-link\" href=\"" + studioUrl + "\" target=\"_blank\" rel=\"noopener\">" + studioName + "</a>" +
        ". artists: " +
        "<a class=\"u-link\" href=\"" + artist1Url + "\" target=\"_blank\" rel=\"noopener\">" + artist1NameEn + "</a>" +
        ", " +
        "<a class=\"u-link\" href=\"" + artist2Url + "\" target=\"_blank\" rel=\"noopener\">" + artist2NameEn + "</a>" +
        ".",

      waitingStart: "waiting to start. press connect-button",
      statusPreparingSound: "Preparing sound…",
      statusSoundReady: "Sound is ready.",
      statusSubscribing: "subscribing to database…",
      statusNoData: "No data to play. Please add a date below.",
      errToneMissing: "Tone.js did not load. Check internet/scripts.",
      errAudioBlocked: "Audio was blocked by the browser. Click again or allow sound.",
      errSynthInit: "Synth initialization error.",
      errFirebaseInit: "Firebase initialization error (config.js).",
      errBadFormat: "Format must be DD.MM.YYYY",
      errWriteFailed: "Write failed.",
      okBar: "Saved.",
      seedAdding: "Adding a test record…",
      seedInitFailed: "Database init failed.",
      seedWriteFailed: "Test write failed.",
      dbReadError: "Database read error"
    }
  };

  // === Глобальный конфиг приложения ===
  window.AppConfig = {
    // ✅ Firebase Realtime Database (проект "Линия")
    firebaseConfig: {
      apiKey: "AIzaSyDkQzsSnNP420SyI4KMSxK1xhc9ZoOYK8E",
      authDomain: "thelifeline-ac849.firebaseapp.com",
      databaseURL: "https://thelifeline-ac849-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "thelifeline-ac849",
      storageBucket: "thelifeline-ac849.firebasestorage.app",
      messagingSenderId: "233108668587",
      appId: "1:233108668587:web:80492ef1cf7ff0473af7ee",
      measurementId: "G-LV68Z2VZCH"
    },

    // показывать кнопку тестовой записи
    ENABLE_SEED: true,

    // путь в RTDB
    DB_PATH: "dates",

    // окно/синхронизация (НЕ меняем механику)
    SYNC_EPOCH_MS: 0,
    WINDOW: { MS: 1000, DELAY_MS: 200 },

    // звук (НЕ меняем механику)
    FREQ_MIN: 32.703,
    FREQ_MAX: 65.406,
    PITCH_MODE: "linear",

    // визуал — параметры пробелов (НЕ меняем механику)
    STREAM_SETTINGS: {
      MIN_CH: 0.55,
      MAX_CH: 2.60
    }
  };

  window.TEXTS = TEXTS;
})();
