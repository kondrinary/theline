// data.js — работа с Firebase RTDB (compat)
const Data = (function(){
  let db = null;
  let datesRef = null;
  let changesRef = null;
  let ready = false;

  Data.init = function(){
    if (ready) return true;
    try {
      const cfg =
        (window.AppConfig && window.AppConfig.firebaseConfig) ||
        window.firebaseConfig ||
        (typeof firebaseConfig !== 'undefined' ? firebaseConfig : null);
      if (!cfg) { console.error('[Data.init] firebaseConfig not found'); return false; }

      if (!firebase.apps || firebase.apps.length === 0) {
        firebase.initializeApp(cfg);
      }
      db = firebase.database();

      const path = (window.AppConfig && AppConfig.DB_PATH) ? AppConfig.DB_PATH : 'dates';
      datesRef   = db.ref(path);
      changesRef = db.ref('control/changes'); // журнал смен (ключ — окно k)

      ready = true;
      return true;
    } catch (e){
      console.error('[Data.init] Firebase init error:', e);
      return false;
    }
  };

  // ----- push date (ТОЛЬКО BIRTH) -----
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

  // ----- subscribe: realtime list -----
  Data.subscribe = function(onList, onError){
    if (!ready && !Data.init()) return;

    datesRef.on('value', snap=>{
      const val = snap.val() || {};
      const list = Object.keys(val).map(id=>{
        const obj = val[id] || {};
        return {
          id,
          birth: obj.birth,
          digits: Array.isArray(obj.digits) ? obj.digits : [],
          ts: obj.ts || 0
        };
      });

      // сортировка по времени
      list.sort((a,b)=>(a.ts||0)-(b.ts||0));

      onList && onList(list);
    }, err=>{
      onError && onError(err);
    });
  };

  return Data;
})();
