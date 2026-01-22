// main.js — glue: UI + Data + Visual + Player + Synth
(function(){
  const $ = (id)=>document.getElementById(id);

  const startBtn = $('startBtn');
  const addBtn   = $('addBtn');
  const birthInput = $('birthInput');

  const formSection = $('formSection');
  const okBar    = $('okBar');
  const errorBar = $('errorBar');
  const introDesc = $('introDesc');
  const projectTitle = $('projectTitle');
  const nowPlayInline = $('nowPlayInline');

  const debugInfo = $('debugCenter');
  const dbLeft = $('dbLeft');
  const dbRight = $('dbRight');

  // ===== i18n =====
  function tr(key){
    const lang = (window.AppConfig && AppConfig.LANG) || 'ru';
    const dict = (window.AppTexts && AppTexts[lang]) || AppTexts.ru;
    return (dict && dict[key]) || key;
  }

  function applyTexts(){
    const lang = (window.AppConfig && AppConfig.LANG) || 'ru';
    const dict = (window.AppTexts && AppTexts[lang]) || AppTexts.ru;
    if (!dict) return;

    if (addBtn) addBtn.textContent = dict.addBtn;
    if (startBtn) startBtn.textContent = dict.startBtn;
    if (nowPlayInline) nowPlayInline.textContent = dict.nowPlayInline;

    const bi = $('birthInput');
    if (bi) bi.placeholder = dict.birthInput;

    const _deathEl = document.getElementById("deathInput");
    if (_deathEl) _deathEl.placeholder = dict.deathInput;

    if (projectTitle) projectTitle.textContent = dict.projectTitle;
    if (introDesc) introDesc.textContent = dict.introDesc;

    // Контакты (верхняя строка) — собираем тут
    const C = window.AppContacts || {};
    const contactsBar = $('contactsBar');
    if (contactsBar){
      const make = (name,url)=> url ? `<a class="u-link" href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>` : name;
      const s = make(C.studioName, C.studioUrl);
      const a1= make(C.artist1Name, C.artist1Url);
      const a2= make(C.artist2Name, C.artist2Url);
      contactsBar.innerHTML = `${s} · ${a1} · ${a2}`;
    }
  }

  applyTexts();

  // ===== UI helpers =====
  function showOk(text){
    if (!okBar) return;
    okBar.textContent = text || tr('okBar');
    okBar.hidden = false;
  }
  function clearOk(){
    if (!okBar) return;
    okBar.hidden = true;
    okBar.textContent = '';
  }
  function showError(text){
    if (!errorBar) return;
    errorBar.textContent = text || tr('errWriteFailed');
    errorBar.hidden = false;
  }
  function clearError(){
    if (!errorBar) return;
    errorBar.hidden = true;
    errorBar.textContent = '';
  }

  // Подогнать ширину/отступы ok/error под кнопку справа (как было)
  function updateBarsGeometry(){
    const leftInner = document.querySelector('.left-inner');
    const card = document.querySelector('.card');
    const btn  = document.getElementById('startBtn');
    if (!leftInner || !card || !btn) return;

    const innerRect = leftInner.getBoundingClientRect();
    const cardRect  = card.getBoundingClientRect();
    const btnRect   = btn.getBoundingClientRect();

    const left = cardRect.left - innerRect.left;
    const width = (btnRect.left - cardRect.left); // до кнопки
    document.documentElement.style.setProperty('--bars-left', left + 'px');
    document.documentElement.style.setProperty('--bars-width', Math.max(0, width) + 'px');
  }

  window.addEventListener('resize', ()=>updateBarsGeometry());
  window.addEventListener('load', ()=>updateBarsGeometry());

  // ===== Форматирование ввода ДД.ММ.ГГГГ =====
  function formatDateInput(el){
    if (!el) return;
    let v = el.value.replace(/\D/g,'').slice(0,8);
    let out = '';
    if (v.length > 0) out += v.slice(0,2);
    if (v.length >= 3) out += '.' + v.slice(2,4);
    if (v.length >= 5) out += '.' + v.slice(4,8);
    el.value = out;
  }
  birthInput?.addEventListener('input', ()=>formatDateInput(birthInput));

  // ===== Валидация "ДД.ММ.ГГГГ" =====
  function parseValidDate(str){
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(str);
    if (!m) return null;
    const [_, dd, mm, yyyy] = m;
    const d = Number(dd), mo = Number(mm), y = Number(yyyy);
    if (y < 1800 || y > 2100) return null;
    if (mo < 1 || mo > 12) return null;
    if (d < 1 || d > 31) return null;

    // проверка календаря
    const dt = new Date(y, mo-1, d);
    if (dt.getFullYear() !== y || (dt.getMonth()+1) !== mo || dt.getDate() !== d) return null;
    return dt;
  }

  // ===== Старт (подключение) =====
  let started = false;

  async function startApp(){
    if (started) return;
    started = true;

    clearOk(); clearError();

    // 1) Tone / Synth
    try{
      await Tone.start();
      Synth.init();
    }catch(e){
      console.warn('[Tone/Synth]', e);
    }

    // 2) Firebase init
    const okInit = Data.init();
    if (!okInit){
      showError(tr('errFirebase'));
      return;
    }

    // 3) UI: показать форму, скрыть кнопку
    if (formSection) formSection.style.display = 'flex';
    if (startBtn) startBtn.style.display = 'none';
    document.documentElement.classList.add('app-started');

    updateBarsGeometry();

    // 4) подписка на данные
    Data.subscribe((list)=>{
      // Visual.build делает полный rebuild (чтобы совпадало с тем, что было)
      Visual.build(list);
      if (debugInfo){
        debugInfo.textContent = `${list.length} записей`;
      }
    }, (err)=>{
      showError(tr('errFirebase'));
      if (debugInfo) debugInfo.textContent = 'ошибка';
      console.error(err);
    });

    // 5) Player
    if (window.Player){
      Player.init({
        onDigit: (digit, freq, span)=>{
          // звучим
          const len = 0.12; // длина атаки в сек (корпус сам живёт через env)
          Synth.trigger(freq, len, 0.7, null, digit);
        },
        onIndex: (idx)=> Visual.setActiveIndex(idx)
      });
      Player.play();
    }

    // 6) debug “ушки”
    if (dbLeft) dbLeft.textContent = tr('playDesc');
    if (dbRight){
      dbRight.textContent = ENABLE_SEED ? tr('seedBtn') : '';
      dbRight.style.display = ENABLE_SEED ? 'block' : 'none';
    }
  }

  startBtn?.addEventListener('click', startApp);

  // ===== Добавление записи =====
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

  // ====== КНОПКА «Тестовая запись» (если включено) ======
  const SEED_PRESETS = [
    { b:'01011990' },
    { b:'15071985' },
    { b:'31121970' },
    { b:'03031999' }
  ];
  let _seedIndex = 0;

  async function doSeed(){
    if (!ENABLE_SEED) return;
    const preset = SEED_PRESETS[_seedIndex % SEED_PRESETS.length];
    _seedIndex++;

    try{
      const okPush = await Data.pushDate(preset.b);
      if (okPush){
        if (debugInfo) debugInfo.textContent = `${tr('seedAdded')} ${preset.b}`;
      }else{
        showError(tr('errWriteFailed'));
      }
    }catch(e){
      console.error(e);
      showError(tr('errWriteFailed'));
    }
  }

  dbRight?.addEventListener('click', doSeed);

  // ===== кнопка «как это звучит?» =====
  nowPlayInline?.addEventListener('click', ()=>{
    // проигрываем короткий пример: 0123456789 (как раньше было — просто демо)
    try{
      if (!window.Synth || !window.Synth.fx) Synth.init();
      const seq = [0,1,2,3,4,5,6,7,8,9];
      let t = Tone.now() + 0.05;
      seq.forEach(d=>{
        const freq = (()=>{
          const { FREQ_MIN, FREQ_MAX, PITCH_MODE } = AppConfig;
          if (PITCH_MODE === 'geometric') {
            const ratio = FREQ_MAX / FREQ_MIN;
            return FREQ_MIN * Math.pow(ratio, d / 9);
          }
          const step = (FREQ_MAX - FREQ_MIN) / 9;
          return FREQ_MIN + d * step;
        })();
        Synth.trigger(freq, 0.12, 0.6, t, d);
        const dt = AppConfig.NOTE_DELAY_MIN + (AppConfig.NOTE_DELAY_MAX - AppConfig.NOTE_DELAY_MIN) * (d/9);
        t += dt;
      });
    }catch(e){
      console.warn(e);
    }
  });

  // ===== Периодическое обновление количества записей =====
  let _countTimer = null;
  async function refreshCount(){
    if (!Data || !Data.getCount) return;
    const n = await Data.getCount();
    if (n == null) return;
    if (debugInfo) debugInfo.textContent = `${n} записей`;
  }
  window.addEventListener('load', ()=>{
    if (AppConfig?.UI?.DB_COUNT_REFRESH_MS){
      _countTimer = setInterval(refreshCount, AppConfig.UI.DB_COUNT_REFRESH_MS);
    }
  });

})();
