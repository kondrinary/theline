// main.js — управление UI и взаимодействие с Data/Player/Visual
(function(){
  const birthInput   = document.getElementById('birthInput');
  const startBtn     = document.getElementById('startBtn');
  const addBtn       = document.getElementById('addBtn');
  const statusEl     = document.getElementById('status');
  const rightPane    = document.getElementById('right');
  const debugInfo    = document.getElementById('debugInfo');
  const seedBtn      = document.getElementById('seedBtn');

  // ===== ERROR/OK плашки =====
  const errorBar = document.getElementById('errorBar');
  const okBar    = document.getElementById('okBar');

  // --- мини-переводчик по ключу из TEXTS ---
  function tr(key, fallback){
    const lang = (typeof CURRENT_LANG === 'string' ? CURRENT_LANG : 'ru');
    const pack = (typeof TEXTS === 'object' && TEXTS[lang]) || {};
    return (key in pack) ? pack[key] : (fallback ?? key);
  }

  window.tr = tr;                       // чтобы другие модули могли переводить
  function setDebug(msg){               // единый вывод в панель дебага
    if (!debugInfo) return;
    debugInfo.textContent = (msg ?? '');
  }
  window.setDebug = setDebug;

  document.documentElement.classList.remove('app-started');

  function showError(msg){
    if (!errorBar) return;
    errorBar.textContent = msg;
    errorBar.hidden = false;
  }
  function clearError(){
    if (!errorBar) return;
    errorBar.textContent = '';
    errorBar.hidden = true;
  }
  function showOk(msg){
    if (!okBar) return;
    okBar.textContent = msg;
    okBar.hidden = false;
    setTimeout(()=>{ if (okBar){ okBar.hidden = true; } }, 1200);
  }
  function clearOk(){
    if (!okBar) return;
    okBar.textContent = '';
    okBar.hidden = true;
  }

  // ====== ТЕКСТЫ/КОНТАКТЫ ======
  function applyTexts(){
    const L = (TEXTS && TEXTS[CURRENT_LANG]) ? TEXTS[CURRENT_LANG] : (TEXTS && TEXTS.ru) || {};

    const projectTitle = document.getElementById('projectTitle');
    const introDesc    = document.getElementById('introDesc');

    if (projectTitle && L.projectTitle) projectTitle.textContent = L.projectTitle;
    if (introDesc && L.introDesc) introDesc.textContent = L.introDesc;

    if (startBtn && L.startBtn) startBtn.textContent = L.startBtn;
    if (addBtn   && L.addBtn)   addBtn.textContent   = L.addBtn;

    // placeholders
    if (document.getElementById("birthInput") && L.birthInput){
      document.getElementById("birthInput").placeholder = L.birthInput;
    }

    // контакты сверху
    if (typeof AppContacts === 'function'){
      const top = document.getElementById('contactsTop');
      if (top) top.innerHTML = AppContacts(CURRENT_LANG);
    }
  }

  applyTexts();

  // ====== форматирование ввода даты: ДД.ММ.ГГГГ ======
  function formatDateInput(input){
    if (!input) return;
    let v = input.value.replace(/\D/g,'').slice(0,8);
    if (v.length > 4) v = v.slice(0,2) + '.' + v.slice(2,4) + '.' + v.slice(4);
    else if (v.length > 2) v = v.slice(0,2) + '.' + v.slice(2);
    input.value = v;
  }

  birthInput?.addEventListener('input', ()=>formatDateInput(birthInput));

  function parseValidDate(str){
    // строго DD.MM.YYYY
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(str);
    if (!m) return null;
    const dd = +m[1], mm = +m[2], yy = +m[3];

    // базовые пределы
    if (yy < 1000 || yy > 2100) return null;
    if (mm < 1 || mm > 12) return null;

    const d = new Date(yy, mm-1, dd);
    if (d.getFullYear() !== yy || (d.getMonth()+1) !== mm || d.getDate() !== dd) return null;

    return d;
  }

  // ====== старт/подписка на базу ======
  async function startApp(){
    clearError(); clearOk();
    setDebug('');

    // инициализация синта
    try{
      if (!window.Synth || typeof Synth.init !== 'function'){
        showError(tr('errToneMissing'));
        return;
      }
      await Synth.init();
    }catch(e){
      console.error(e);
      showError(tr('errSynthInit'));
      return;
    }

    // инициализация Firebase
    const okInit = Data.init();
    if (!okInit){
      showError(tr('errFirebaseInit'));
      return;
    }

    document.documentElement.classList.add('app-started');

    // включаем форму
    const form = document.getElementById('formSection');
    if (form) form.style.display = 'flex';

    // подписка
    setDebug(tr('subscribing', 'подключение к базе...'));
    Data.subscribe((list)=>{
      setDebug('');
      Visual.build(list);
      Player.setTimeline(Visual.timeline);
      Player.ensurePlaying();
    }, (err)=>{
      console.error(err);
      showError(tr('dbReadError', 'Database read error'));
    });

    // кнопка seed (если выключено — спрячем)
    if (seedBtn){
      seedBtn.style.display = (typeof ENABLE_SEED === 'boolean' && ENABLE_SEED) ? 'inline-flex' : 'none';
    }

    // фокус на ввод
    setTimeout(()=>birthInput?.focus(), 100);
  }

  startBtn?.addEventListener('click', startApp);

  // ====== добавить дату (только рождение) ======
  addBtn.addEventListener('click', async ()=>{
    const bStr = birthInput.value.trim();

    clearError(); clearOk();

    const bDate = parseValidDate(bStr);
    if (!bDate){
      showError(tr('errBadFormat'));
      return;
    }

    const bDigits = bStr.replace(/\D/g,'');

    const ok = await Data.pushDate(bDigits);
    if (ok){
      birthInput.value = '';
      showOk(tr('okBar'));

      // показать низ, где появляется новая запись
      setTimeout(()=> {
        const pane = document.getElementById('right');
        if (pane) pane.scrollTop = pane.scrollHeight;
      }, 60);
    } else {
      showError(tr('errWriteFailed'));
    }
  });

  // ====== КНОПКА «Тестовая запись» ======
  const SEED_PRESETS = [
    { b:'01011990' },
    { b:'15071985' },
    { b:'31121970' },
    { b:'03031999' }
  ];
  let seedIndex = 0;

  if (seedBtn){
    seedBtn.addEventListener('click', async ()=>{
      if (debugInfo) debugInfo.textContent = tr('seedAdding');

      const okInit = Data.init();
      if (!okInit){
        if (debugInfo) debugInfo.textContent = tr('seedInitFailed');
        return;
      }

      const preset = SEED_PRESETS[seedIndex % SEED_PRESETS.length];
      seedIndex++;

      const okPush = await Data.pushDate(preset.b);
      if (okPush){
        if (debugInfo) debugInfo.textContent = `${tr('seedAdded')} ${preset.b}`;
      } else {
        if (debugInfo) debugInfo.textContent = tr('seedWriteFailed');
      }
    });
  }

})();
