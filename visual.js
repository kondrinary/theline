// visual.js — поток дат + таймлайн цифр
(function(){
  const Visual = {};
  Visual.timeline = [];
  Visual.knownIds = new Set();

  function hash32(str){
    let h = 2166136261;
    for (let i=0;i<str.length;i++){
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function rand01(seed){
    let x = seed || 1;
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17; x >>>= 0;
    x ^= x << 5;  x >>>= 0;
    return (x >>> 0) / 4294967296;
  }

  function applyDigitSpacing(span, itemId, charIndex){
    const S = (window.AppConfig && AppConfig.STREAM_SETTINGS) ? AppConfig.STREAM_SETTINGS : null;
    if (!S) return;
    const min = Number(S.MIN_CH ?? 0), max = Number(S.MAX_CH ?? 0);
    if (!(max > min)) return;

    const seed = hash32(itemId + ':' + charIndex);
    const rnd = rand01(seed);
    const gap = min + (max - min) * rnd;
    span.style.marginRight = gap.toFixed(3) + 'ch';
  }

  // перевод цифры 0..9 -> частота (без изменений)
  function digitToFreq(d){
    const { FREQ_MIN, FREQ_MAX, PITCH_MODE } = AppConfig;
    if (PITCH_MODE === 'geometric') {
      const ratio = FREQ_MAX / FREQ_MIN;
      return FREQ_MIN * Math.pow(ratio, d / 9);
    }
    return FREQ_MIN + (FREQ_MAX - FREQ_MIN) * (d / 9);
  }

  function renderBirthToFragment(item){
    const birth = (item.birth || '').slice(0,8);
    const bStr = birth.slice(0,2)+'.'+birth.slice(2,4)+'.'+birth.slice(4);

    const text = bStr;

    const frag = document.createDocumentFragment();
    const line = document.createElement('div');
    line.className = 'stream-line';
    line.dataset.id = item.id;

    const spans = [];
    for (let i=0;i<text.length;i++){
      const ch = text[i];
      const sp = document.createElement('span');
      sp.className = 'digit';
      sp.textContent = ch;
      applyDigitSpacing(sp, item.id, i);
      spans.push(sp);
      line.appendChild(sp);
    }

    frag.appendChild(line);

    // только цифры даты рождения
    const digitsOnly = birth.split('').map(Number);
    return { frag, spans, text, digitsOnly };
  }

  Visual.build = function(list){
    const stream = document.getElementById('stream');
    if (!stream) return;

    stream.innerHTML = '';
    Visual.timeline = [];
    Visual.knownIds = new Set();

    // прямой порядок: старые → новые
    list.forEach(item=>{
      Visual.knownIds.add(item.id);

      const { frag, spans, text, digitsOnly } = renderBirthToFragment(item);
      stream.appendChild(frag);

      // таймлайн по цифрам в тексте
      let di = 0;
      for (let i=0;i<text.length;i++){
        const ch = text[i];
        if (/\d/.test(ch)){
          const d = digitsOnly[di];
          const isLast = (di === digitsOnly.length - 1);

          Visual.timeline.push({
            id: item.id,
            digitIndex: di,
            digit: d,
            freq: digitToFreq(d),
            spanEl: spans[i],
            isLast
          });

          di++;
        }
      }
    });
  };

  Visual.update = function(list){
    const stream = document.getElementById('stream');
    if (!stream) return;

    // добавляем только новые записи в конец
    list.forEach(item=>{
      if (Visual.knownIds.has(item.id)) return;
      Visual.knownIds.add(item.id);

      const { frag, spans, text, digitsOnly } = renderBirthToFragment(item);
      stream.appendChild(frag);

      let di = 0;
      for (let i=0;i<text.length;i++){
        const ch = text[i];
        if (/\d/.test(ch)){
          const d = digitsOnly[di];
          const isLast = (di === digitsOnly.length - 1);

          Visual.timeline.push({
            id: item.id,
            digitIndex: di,
            digit: d,
            freq: digitToFreq(d),
            spanEl: spans[i],
            isLast
          });

          di++;
        }
      }
    });
  };

  Visual.getTimelineSnapshot = function(){
    return Visual.timeline.map(x=>({ ...x }));
  };

  window.Visual = Visual;
})();
