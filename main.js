// main.js
(function(){
  const birthInput   = document.getElementById('birthInput');
  const addBtn       = document.getElementById('addBtn');
  const startBtn     = document.getElementById('startBtn');
  const seedBtn      = document.getElementById('seedBtn');

  const errorBar   = document.getElementById('errorBar');
  const okBar      = document.getElementById('okBar');
  const statusEl   = document.getElementById('status');
  const debugInfo  = document.getElementById('debugInfo');

  const ENABLE_SEED = (window.AppConfig && AppConfig.ENABLE_SEED) ? true : false;
  const TEXTS = window.TEXTS || { ru:{}, en:{} };
  let CURRENT_LANG = 'ru';

  function tr(key){
    return (TEXTS[CURRENT_LANG] && TEXTS[CURRENT_LANG][key]) ? TEXTS[CURRENT_LANG][key] : key;
  }

  function setDebug(s){
    if (debugInfo) debugInfo.textContent = s || '';
  }

  function showError(msg){
    if (!errorBar) return;
    errorBar.hidden = false;
    errorBar.textContent = msg || '';
  }
  function clearError(){
    if (!errorBar) return;
    errorBar.hidden = true;
    errorBar.textContent = '';
  }
  function showOk(msg){
    if (!okBar) return;
    okBar.hidden = false;
    okBar.textContent = msg || '';
    setTimeout(()=>clearOk(), 1200);
  }
  function clearOk(){
    if (!okBar) return;
    okBar.hidden = true;
    okBar.textContent = '';
  }

  // seed visibility
  if (!ENABLE_SEED) {
    if (seedBtn) seedBtn.style.display = "none";
  }

  function applyTexts() {
    const L = TEXTS[CURRENT_LANG] || TEXTS.ru;

    const projectTitle = document.getElementById('projectTitle');
    const introDesc    = document.getElementById('introDesc');
    const playDesc     = document.getElementById('playDesc');
    const contactsText = document.getElementById('contactsCardText');

    if (projectTitle) projectTitle.textContent = L.projectTitle || '';
    if (introDesc) introDesc.textContent = L.introDesc || '';
    if (playDesc) playDesc.textContent = L.playDesc || '';
    if (contactsText) contactsText.innerHTML = L.contacts || '';

    if (addBtn) addBtn.textContent = L.addBtn || addBtn.textContent;
    if (startBtn) startBtn.textContent = L.startBtn || startBtn.textContent;

    if (birthInput) birthInput.placeholder = L.birthInput || '';
  }

  // ===== форматирование ввода "ДД.ММ.ГГГГ" =====
  function formatDateInput(input){
    let v = (input.value || '').replace(/[^\d]/g,'').slice(0,8);
    if (v.length >= 5) v = v.slice(0,2)+'.'+v.slice(2,4)+'.'+v.slice(4);
    else if (v.length >= 3) v = v.slice(0,2)+'.'+v.slice(2);
    input.value = v;
  }

  birthInput?.addEventListener('input', ()=>formatDateInput(birthInput));

  // ===== Валидация "ДД.ММ.ГГГГ" =====
  function parseValidDate(str){
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(str);
    if (!m) return null;
    const [_, dd, mm, yyyy] = m;
    const d = new Date(+yyyy, +mm - 1, +dd);
    if (d.getFullYear() !== +yyyy || d.getMonth() !== (+mm - 1) || d.getDate() !== +dd) return null;
    return d;
  }

  clearError(); clearOk(); applyTexts(); setDebug(tr('waitingStart'));

  // ====== КНОПКА «Старт» ======
  let started = false;
  let startedPlayback = false;

  startBtn?.addEventListener('click', async ()=>{
    if (started) return;
    started = true;

    clearError(); clearOk();
    if (statusEl) statusEl.textContent = tr('statusPreparingSound');

    if (!window.Tone){
      showError(tr('errToneMissing'));
      started = false;
      return;
    }

    try {
      await Tone.start();
    } catch(e){
      showError(tr('errAudioBlocked'));
      started = false;
      return;
    }

    try {
      if (window.Synth && typeof Synth.init === 'function') {
        await Synth.init();
      }
    } catch(e){
      showError(tr('errSynthInit'));
      started = false;
      return;
    }

    if (statusEl) statusEl.textContent = tr('statusSoundReady');

    // init database
    const okInit = (window.Data && typeof Data.init === 'function') ? Data.init() : false;
    if (!okInit){
      showError(tr('errFirebaseInit'));
      started = false;
      return;
    }

    if (statusEl) statusEl.textContent = tr('statusSubscribing');
    setDebug(tr('statusSubscribing'));

    // subscribe
    Data.subscribe((list)=>{
      // если ещё не начали проигрывание — запускаем визуал+плеер один раз, когда есть данные
      if (!startedPlayback){
        if (!list || list.length === 0){
          if (statusEl) statusEl.textContent = tr('statusNoData');
          setDebug(tr('statusNoData'));
          return;
        }

        if (statusEl) statusEl.textContent = '';
        setDebug('');

        if (window.Visual && typeof Visual.build === 'function') {
          Visual.build(list);
        }

        if (window.OverlayFX && typeof OverlayFX.init === 'function') {
          OverlayFX.init({
            rootEl: document.getElementById('stream'),
            blendMode: 'screen',
            blurPx: 6,
            trailAlpha: 0.10
          });
        }

        if (window.Player && typeof Player.start === 'function') {
          Player.start();
        }
        startedPlayback = true;
        return;
      }

      // если уже играем — обновляем визуал и таймлайн
      if (window.Visual && typeof Visual.update === 'function'){
        Visual.update(list);
      }
      if (window.Player && typeof Player.onTimelineChanged === 'function') {
        Player.onTimelineChanged();
      }
    }, (err)=>{
      console.error('[RTDB on(value) error]', err);
      if (debugInfo) debugInfo.textContent =
        `${tr('dbReadError')}: ${err?.code || err?.name || 'unknown'} — ${err?.message || ''}`;
    });
  });

  // ====== КНОПКА «Добавить» ======
  addBtn?.addEventListener('click', async ()=>{
    const bStr = (birthInput?.value || '').trim();

    clearError(); clearOk();

    const bDate = parseValidDate(bStr);
    if (!bDate){
      showError(tr('errBadFormat'));
      return;
    }

    const okInit = Data.init();
    if (!okInit){
      showError(tr('errFirebaseInit'));
      return;
    }

    // ДДММГГГГ
    const bDigits = bStr.replace(/\./g,'');
    const ok = await Data.pushDate(bDigits);

    if (ok){
      if (birthInput) birthInput.value = '';
      showOk(tr('okBar'));

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

  seedBtn?.addEventListener('click', async ()=>{
    if (debugInfo) debugInfo.textContent = tr('seedAdding');

    const okInit = Data.init();
    if (!okInit){
      if (debugInfo) debugInfo.textContent = tr('seedInitFailed');
      return;
    }

    const preset = SEED_PRESETS[seedIndex % SEED_PRESETS.length];
    seedIndex++;

    const ok = await Data.pushDate(preset.b);
    if (!ok){
      if (debugInfo) debugInfo.textContent = tr('seedWriteFailed');
    } else {
      if (debugInfo) debugInfo.textContent = '';
    }
  });

})();
