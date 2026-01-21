// data.js — RTDB + «серверные» часы + окно 1с + журнал смен TL
(function(){
  const Data = {};
  let ready = false;
  let db = null;
  let datesRef = null;
  let changesRef = null;

  // ----- init -----
  Data.init = function(){
    if (ready) return true;
    try {
      const cfg =
        (window.AppConfig && window.AppConfig.firebaseConfig) ||
        window.firebaseConfig ||
        (typeof firebaseConfig !== 'undefined' ? firebaseConfig : null);

      if (!cfg) throw new Error('No firebase config found');

      if (!firebase.apps.length) {
        firebase.initializeApp(cfg);
      }
      db = firebase.database();

      const path = (window.AppConfig && AppConfig.DB_PATH) ? AppConfig.DB_PATH : 'dates';
      datesRef = db.ref(path);
      changesRef = db.ref('control/changes');

      ready = true;
      return true;
    } catch(e){
      console.error('[Data.init]', e);
      return false;
    }
  };

  // ----- push one birth date (8 digits) -----
  Data.pushDate = async function(bDigits){
    try {
      if (!ready) throw new Error('Data not initialized');
      const birth = String(bDigits || '').replace(/[^\d]/g,'').slice(0,8);
      if (birth.length !== 8) throw new Error('birth must be 8 digits');

      const digits = birth.split('').map(Number);

      const obj = {
        birth,
        digits,
        ts: firebase.database.ServerValue.TIMESTAMP
      };

      const newRef = datesRef.push();
      await newRef.set(obj);

      // триггерим "смену таймлайна" (одноразовая запись по ключу)
      try {
        const k = String(Date.now()) + '_' + Math.random().toString(16).slice(2);
        await changesRef.child(k).set({ ts: firebase.database.ServerValue.TIMESTAMP });
      } catch(e) {
        // не критично
      }

      return true;
    } catch(e){
      console.error('[Data.pushDate]', e);
      return false;
    }
  };

  // ----- subscribe -----
  Data.subscribe = function(handler, onError){
    if (!ready) throw new Error('Data not initialized');

    datesRef.on('value', (snap)=>{
      const v = snap.val() || {};
      const arr = Object.keys(v).map(id=>{
        const obj = v[id] || {};
        return {
          id,
          birth: String(obj.birth || '').replace(/[^\d]/g,'').slice(0,8),
          digits: Array.isArray(obj.digits) ? obj.digits.slice() : [],
          ts: typeof obj.ts === 'number' ? obj.ts : 0
        };
      });

      // сортировка по ts
      arr.sort((a,b)=> (a.ts||0) - (b.ts||0));
      handler(arr);
    }, (err)=>{
      console.error('[Data.subscribe]', err);
      if (onError) onError(err);
    });

    _setupWindowTicker(handler);
  };

  function _windowInfo(nowMs){
    const { SYNC_EPOCH_MS } = AppConfig;
    const { MS:WIN_MS, DELAY_MS } = AppConfig.WINDOW || { MS:1000, DELAY_MS:200 };
    const t = nowMs - (SYNC_EPOCH_MS || 0) - (DELAY_MS || 0);
    const i = Math.floor(t / WIN_MS);
    const start = (SYNC_EPOCH_MS || 0) + i * WIN_MS;
    const end = start + WIN_MS;
    return { start, end };
  }

  let _timer = null;
  function _setupWindowTicker(handler){
    if (_timer) return;
    _timer = setInterval(()=>{
      if (typeof window.Player?.onWindowTick === 'function') {
        window.Player.onWindowTick(_windowInfo(Date.now()));
      }
    }, 250);
  }

  window.Data = Data;
})();
