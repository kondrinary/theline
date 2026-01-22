// visual.js — поток дат, синхронизированный с Player (без автопрокрутки)
(function(){
  const Visual = {};
  Visual.timeline = [];
  Visual.knownIds = new Set();

  let stream = null; // контейнер для текста справа (#stream)

  // === перевод цифры 0..9 -> частота ===
  function digitToFreq(d){
    const { FREQ_MIN, FREQ_MAX, PITCH_MODE } = AppConfig;
    if (PITCH_MODE === 'linear'){
      return FREQ_MIN + (FREQ_MAX - FREQ_MIN) * (d/9);
    }
    // лог/exp (чуть музыкальнее)
    const a = Math.log(FREQ_MIN);
    const b = Math.log(FREQ_MAX);
    return Math.exp(a + (b-a)*(d/9));
  }

  // рендер строки (одна дата) в fragment + массив spans для подсветки
  function renderPairToFragment(item){
    const bStr = item.birth.slice(0,2)+'.'+item.birth.slice(2,4)+'.'+item.birth.slice(4);
    const text = `${bStr}`;

    const frag  = document.createDocumentFragment();
    const spans = [];
    let i = 0;
    for (const ch of text){
      const s = document.createElement('span');
      s.textContent = ch;
      if (/\d/.test(ch)){
        s.dataset.digitIndex = String(i);
        spans.push(s);
        i++;
      }
      frag.appendChild(s);
    }

    if (AppConfig.NEWLINE_AFTER_PAIR) {
      frag.appendChild(document.createElement('br'));
    }

    const digitsOnly = (item.birth).split('').map(Number);
    return { frag, spans, text, digitsOnly };
  }

  // Полная отстройка (первый снимок базы)
  Visual.build = function(list){
    if (!stream) stream = document.getElementById('stream');
    if (!stream) return;

    // очищаем
    stream.textContent = '';
    Visual.timeline.length = 0;
    Visual.knownIds.clear();

    // строим
    for (const item of list){
      if (!item.birth) continue;
      Visual.knownIds.add(item.id);

      const { frag, spans, digitsOnly } = renderPairToFragment(item);
      const wrap = document.createElement('div');
      wrap.className = 'line';
      wrap.appendChild(frag);
      stream.appendChild(wrap);

      // таймлайн для Player: каждая цифра -> событие
      // (Player играет по Visual.timeline)
      const events = [];
      let t = 0;
      for (let idx=0; idx<digitsOnly.length; idx++){
        const d = digitsOnly[idx];
        const freq = digitToFreq(d);

        events.push({
          id: item.id,
          digitIndex: idx,
          freq,
          spans,
          at: t
        });

        // задержки — как раньше
        t += AppConfig.DIGIT_GAP_MIN +
             (AppConfig.DIGIT_GAP_MAX - AppConfig.DIGIT_GAP_MIN) * Math.random();
      }

      // пауза между датами
      t += AppConfig.PAIR_GAP;

      Visual.timeline.push(...events);
    }
  };

  // подсветка текущей цифры (Player дергает это)
  Visual.highlight = function(ev){
    if (!ev || !ev.spans) return;
    const { spans, digitIndex } = ev;
    for (const s of spans) s.classList.remove('active');
    const cur = spans[digitIndex];
    if (cur) cur.classList.add('active');
  };

  window.Visual = Visual;
})();
