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
      const cfg = (window.AppConfig && window.AppConfig.firebaseConfig);
      if (!cfg) { console.error('[Data.init] firebaseConfig not found'); return false; }

      if (!firebase.apps || firebase.apps.length === 0){
        firebase.initializeApp(cfg);
      }
      db = firebase.database();
      datesRef = db.ref(AppConfig.DB_PATH || 'dates');
      changesRef = db.ref((AppConfig.DB_CHANGES_PATH) || 'control/changes');

      ready = true;
      return true;
    } catch (e){
      console.error('[Data.init]', e);
      return false;
    }
  };

  // ----- «серверные» часы -----
  let serverOffset = 0;
  Data.serverNow = function(){ return Date.now() + (serverOffset || 0); };

  Data.initClock = function(){
    if (!ready && !Data.init()) return;
    try{
      db.ref('.info/serverTimeOffset').on('value', (snap)=>{
        serverOffset = snap.val() || 0;
      });
    }catch(e){
      console.warn('[Data.initClock] fallback to local time', e);
      serverOffset = 0;
    }
  };

  // ----- запись (ТОЛЬКО birth) -----
  Data.pushDate = async function(bDigits){
    if (!ready && !Data.init()) return false;
    try {
      const digits = (bDigits).split('').map(n => +n);
      await datesRef.push({
        birth: bDigits,
        digits,
        ts: firebase.database.ServerValue.TIMESTAMP  // важно для окна
      });
      return true;
    } catch (e){
      console.error('[Data.pushDate]', e);
      return false;
    }
  };

  // ----- subscribe with 1s activation window -----
  let _rawList = [];
  let _lastEmitIds = '';
  let _lastWindowId = null;
  let _lastFilteredList = [];
  Data.getActiveList = function(){ return _lastFilteredList.slice(); };

  Data.subscribe = function(handler, onError){
    if (!ready && !Data.init()) return;

    datesRef.on('value', (snap)=>{
      const val = snap.val();
      if (!val) { _rawList = []; _emitIfChanged(handler); return; }

      _rawList = Object.entries(val)
        .sort(([ka],[kb]) => ka.localeCompare(kb))
        .map(([id, obj]) => ({
          id,
          birth: obj.birth,
          digits: obj.digits,
          ts: typeof obj.ts === 'number' ? obj.ts : 0
        }));

      _emitIfChanged(handler);
    }, (err)=>{
      console.error('[Data.subscribe]', err);
      if (onError) onError(err);
    });

    _setupWindowTicker(handler);
  };

  function _windowInfo(nowMs){
    const { SYNC_EPOCH_MS } = AppConfig;
    const { MS:WIN_MS, DELAY_MS } = AppConfig.WINDOW || { MS:1000, DELAY_MS:200 };
    const t = nowMs - (DELAY_MS || 0);
    const k = Math.floor((t - SYNC_EPOCH_MS) / WIN_MS);
    const windowStart = SYNC_EPOCH_MS + k * WIN_MS;
    return { k, windowStart, WIN_MS };
  }
  Data.currentWindowInfo = function(){ return _windowInfo(Data.serverNow()); };

  function _filteredByWindow(raw){
    const { windowStart } = _windowInfo(Data.serverNow());
    return raw.filter(x => (x.ts || 0) <= windowStart);
  }

  function _emitIfChanged(handler){
    const { k } = _windowInfo(Data.serverNow());
    const filtered = _filteredByWindow(_rawList);
    const ids = filtered.map(x=>x.id).join(',');
    if (ids === _lastEmitIds && k === _lastWindowId) return;

    _lastEmitIds = ids;
    _lastWindowId = k;
    _lastFilteredList = filtered.slice();
    handler(filtered);
  }

  // тикер окна (как было)
  let _ticker = null;
  function _setupWindowTicker(handler){
    if (_ticker) return;
    _ticker = setInterval(()=>{
      _emitIfChanged(handler);
    }, 200);
  }

  // ----- журнал смен TL (как было) -----
  Data.getChangeLogOnce = async function(){
    if (!ready && !Data.init()) return [];
    const snap = await changesRef.once('value');
    const val = snap.val();
    if (!val) return [];
    const arr = Object.values(val);
    arr.sort((a,b)=> (a.k|0) - (b.k|0));
    return arr;
  };

  Data.announceChange = async function(k, beat, n){
    if (!ready && !Data.init()) return false;
    const key = String(k);
    try{
      await changesRef.child(key).set({ k, beat, n });
      return true;
    }catch(e){
      return false;
    }
  };

  window.Data = Data;
})();
