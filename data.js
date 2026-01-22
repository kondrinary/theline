// data.js — работа с Firebase RTDB (compat)
(function(){
  const Data = {};
  let db = null;

  Data.init = function(){
    try{
      if (!firebase.apps.length){
        firebase.initializeApp(AppConfig.firebaseConfig);
      }
      db = firebase.database();
      return true;
    }catch(e){
      console.error('[Data.init]', e);
      return false;
    }
  };

  // Возвращает { birth:"DDMMYYYY", digits:[...], ts:number, id:string }
  Data.pushDate = async function(bDigits){
    try{
      if (!db) return false;
      const refDates = db.ref(AppConfig.DB_PATH);
      const refNew = refDates.push();
      const payload = {
        birth: String(bDigits),
        digits: String(bDigits).split('').map(x=>+x),
        ts: firebase.database.ServerValue.TIMESTAMP
      };
      await refNew.set(payload);
      return true;
    }catch(e){
      console.error('[Data.pushDate]', e);
      return false;
    }
  };

  // подписка на весь список
  let _rawList = [];
  let _lastHash = '';

  function stableHash(list){
    // простой хеш по ids+birth+ts
    return list.map(x=>`${x.id}|${x.birth}|${x.ts}`).join('~');
  }

  function _emitIfChanged(handler){
    const h = stableHash(_rawList);
    if (h === _lastHash) return;
    _lastHash = h;
    handler(_rawList);
  }

  Data.subscribe = function(handler, onError){
    if (!db) return;

    const datesRef = db.ref(AppConfig.DB_PATH);

    datesRef.on('value', (snap)=>{
      const val = snap.val();
      if (!val) { _rawList = []; _emitIfChanged(handler); return; }

      _rawList = Object.entries(val)
        .sort(([ka],[kb]) => ka.localeCompare(kb))
        .map(([id, obj]) => ({
          id,
          birth: obj.birth,
          digits: obj.digits || String(obj.birth || '').split('').map(Number),
          ts: typeof obj.ts === 'number' ? obj.ts : 0
        }));

      _emitIfChanged(handler);
    }, (err)=>{
      console.error('[Data.subscribe]', err);
      if (onError) onError(err);
    });
  };

  // снять подписку
  Data.off = function(){
    if (!db) return;
    db.ref(AppConfig.DB_PATH).off();
  };

  // Показатель: количество записей (для дебага)
  Data.getCount = async function(){
    if (!db) return null;
    try{
      const snap = await db.ref(AppConfig.DB_PATH).get();
      const val = snap.val();
      return val ? Object.keys(val).length : 0;
    }catch(e){
      console.warn('[Data.getCount]', e);
      return null;
    }
  };

  window.Data = Data;
})();
