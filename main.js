// main.js — UI, форматирование дат, валидация, запись, старт
(function(){
  // === DOM
  const startBtn     = document.getElementById('startBtn');
  const formSection  = document.getElementById('formSection');
  const birthInput   = document.getElementById('birthInput');
  const addBtn       = document.getElementById('addBtn');
  const statusEl     = document.getElementById('status');
  const rightPane    = document.getElementById('right');
  const debugInfo    = document.getElementById('debugInfo');
  const seedBtn      = document.getElementById('seedBtn');

  const errorBar = document.getElementById('errorBar');
  const okBar    = document.getElementById('okBar');

  // === i18n
  let lang = 'ru';
  function tr(key){
    const L = (window.TEXTS && window.TEXTS[lang]) || (window.TEXTS && window.TEXTS.ru) || {};
    return (key in L) ? L[key] : key;
  }

  // === UI helpers
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
    setTimeout(()=>{ clearOk(); }, 1200);
  }
  function clearOk(){
    if (!okBar) return;
    okBar.hidden = true;
    okBar.textContent = '';
  }

  // === date utils
  function parseValidDate(str){
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(str);
    if (!m) return null;
    const [_, dd, mm, yyyy] = m;
    const d = new Date(+yyyy, +mm - 1, +dd);
    if (d.getFullYear() !== +yyyy || d.getMonth() !== (+mm - 1) || d.getDate() !== +dd) return null;
    return d;
  }

  function formatDateInput(input){
    if (!input) return;
    const digits = input.value.replace(/\D/g,'').slice(0,8);
    let out = '';
    for (let i=0;i<digits.length;i++){
      out += digits[i];
      if (i===1 || i===3) out += '.';
    }
    input.value = out;
  }

  function applyTexts(){
    const L = (window.TEXTS && window.TEXTS[lang]) || (window.TEXTS && window.TEXTS.ru) || {};

    if (addBtn)      addBtn.textContent = L.addBtn || 'Добавить';
    if (startBtn)    startBtn.textContent = L.startBtn || 'Старт';

    if (birthInput)  birthInput.placeholder = L.birthInput || '';
  }

  // === старт приложения (как было)
  async function startApp(){
    try{ await Tone.start(); } catch(e){}

    if (window.Synth && typeof Synth.init === 'function') Synth.init();
    if (window.Player && typeof Player.init === 'function') Player.init();

    const okInit = (window.Data && typeof Data.init === 'function') ? Data.init() : false;
    if (!okInit){
      showError(tr('errFirebaseInit'));
      return;
    }

    // показать форму
    if (formSection) formSection.style.display = 'flex';
    if (startBtn) startBtn.style.display = 'none';

    // подписка
    let first = true;
    Data.subscribe((list)=>{
      if (first){
        Visual.build(list);
        if (window.Player && typeof Player.start === 'function') Player.start();
        first = false;
      } else {
        Visual.append(list);
      }
    }, (err)=>{
      showError(tr('dbReadError'));
      console.error(err);
    });
  }

  // === input masks
  birthInput?.addEventListener('input', ()=>formatDateInput(birthInput));

  // === add
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

      // автопрокрутка вниз (как было)
      setTimeout(()=> {
        const pane = document.getElementById('right');
        if (pane) pane.scrollTop = pane.scrollHeight;
      }, 60);
    } else {
      showError(tr('errWriteFailed'));
    }
  });

  // === seed (как было, но только birth)
  const SEED_PRESETS = [
    { b:'01011990' },
    { b:'15071985' },
    { b:'31121970' },
    { b:'03031999' }
  ];

  if (seedBtn){
    seedBtn.addEventListener('click', async ()=>{
      clearError(); clearOk();
      if (debugInfo) debugInfo.textContent = tr('seedAdding');

      const preset = SEED_PRESETS[Math.floor(Math.random()*SEED_PRESETS.length)];
      const ok = await Data.pushDate(preset.b);
      if (ok){
        if (debugInfo) debugInfo.textContent = `${tr('seedAdded')} ${preset.b}`;
        showOk(tr('okBar'));
        setTimeout(()=>{ if (debugInfo) debugInfo.textContent = ''; }, 1600);

        setTimeout(()=> {
          const pane = document.getElementById('right');
          if (pane) pane.scrollTop = pane.scrollHeight;
        }, 60);
      } else {
        if (debugInfo) debugInfo.textContent = tr('seedWriteFailed');
      }
    });
  }

  // === локализация на старте
  window.addEventListener('load', applyTexts);

  // === expose startApp (если в index.html дергается)
  window.startApp = startApp;
})();
