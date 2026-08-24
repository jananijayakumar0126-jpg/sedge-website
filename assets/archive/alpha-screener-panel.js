/* ============================================================
   ARCHIVED — Alpha Signals hero: animated screener panel
   ------------------------------------------------------------
   Replaced on 2026-08-24 by the "winnowing field" canvas
   animation, because the panel named individual securities.

   To restore, put back all three blocks below:
     1. CSS  -> into the page's <style>
     2. HTML -> inside <div class="hero-globe"> in the hero
     3. JS   -> into the page's main <script>

   (An even earlier 3D armillary-sphere hero is archived
    alongside this in alpha-armillary-globe.js)
   ============================================================ */

/* ---------- 1. CSS ---------- */
/*
/* ─── HERO SCREENER ─── */
.scr{border:1px solid var(--border);background:#fff;box-shadow:0 24px 64px -32px rgba(40,30,10,.28);
  font-variant-numeric:tabular-nums lining-nums;overflow:hidden;}
.scr-head{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--border);background:var(--bg-2);}
.scr-tab{font-size:9px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--muted-2);
  padding:5px 10px;border:1px solid transparent;}
.scr-tab.is-on{color:var(--ink);background:#fff;border-color:var(--border);}
.scr-live{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:8.5px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--muted-2);font-weight:600;}
.scr-live i{width:6px;height:6px;border-radius:50%;background:#4dbb77;animation:scrPulse 2s infinite;}
@keyframes scrPulse{0%,100%{opacity:1}50%{opacity:.25}}
.scr-controls{display:flex;align-items:center;gap:14px;padding:13px 14px;border-bottom:1px solid var(--border);}
.scr-thresholds{display:flex;gap:16px;}
.scr-th{display:flex;flex-direction:column;gap:3px;}
.scr-th-l{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-2);font-weight:600;}
.scr-th-v{font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1;color:var(--ink);}
.scr-run{margin-left:auto;font-size:9px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:#fff;
  background:var(--ink);padding:9px 16px;transition:background .3s;}
.scr-run.is-busy{background:var(--gold);}
.scr-progress{height:2px;background:rgba(0,0,0,.05);}
.scr-progress span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--gold),var(--gold-l));}
.scr-meta{display:flex;gap:16px;padding:10px 14px;border-bottom:1px solid var(--border);
  font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted-2);font-weight:500;}
.scr-meta b{color:var(--ink);font-weight:600;}
.scr-cols,.scr-row{display:grid;grid-template-columns:1.25fr .95fr 1.15fr .95fr;align-items:center;gap:8px;padding:0 14px;}
.scr-cols{padding-top:9px;padding-bottom:9px;border-bottom:1px solid var(--border);
  font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-2);font-weight:600;}
.scr-rows{min-height:222px;}
.scr-row{padding-top:11px;padding-bottom:11px;border-bottom:1px solid rgba(0,0,0,.04);
  opacity:0;transform:translateY(6px);animation:scrIn .42s cubic-bezier(.2,.7,.2,1) forwards;}
@keyframes scrIn{to{opacity:1;transform:none}}
.scr-row.is-opp{background:rgba(201,164,98,.06);box-shadow:inset 2px 0 0 var(--gold);}
.scr-tk{font-size:11.5px;font-weight:600;color:var(--ink);letter-spacing:.04em;}
.scr-tk small{display:block;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted-2);font-weight:500;margin-top:2px;}
.scr-dp{font-size:11.5px;font-weight:600;color:#c0402a;}
.scr-sc{display:flex;align-items:center;gap:7px;}
.scr-sc-bar{flex:1;height:3px;background:rgba(0,0,0,.07);position:relative;}
.scr-sc-bar i{position:absolute;inset:0 auto 0 0;width:0;background:var(--gold);transition:width .7s cubic-bezier(.2,.7,.2,1);}
.scr-sc-n{font-size:10.5px;font-weight:600;color:var(--ink);}
.scr-cl{font-size:9px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--muted-2);}
.scr-cl.buy{color:#2f8f5b;}
@media(max-width:1100px){.scr-th:nth-child(3){display:none}}
*/

/* ---------- 2. HTML ---------- */
/*
<div class="scr" id="scr">
        <div class="scr-head">
          <span class="scr-tab is-on">Daily Drops</span>
          <span class="scr-tab">3-Month Drops</span>
          <span class="scr-live"><i></i>Live</span>
        </div>

        <div class="scr-controls">
          <div class="scr-thresholds">
            <div class="scr-th"><span class="scr-th-l">Large cap</span><span class="scr-th-v">−4%</span></div>
            <div class="scr-th"><span class="scr-th-l">Mid cap</span><span class="scr-th-v">−6%</span></div>
            <div class="scr-th"><span class="scr-th-l">Small cap</span><span class="scr-th-v">−7%</span></div>
          </div>
          <div class="scr-run" id="scrRun">Run scan</div>
        </div>

        <div class="scr-progress"><span id="scrBar"></span></div>

        <div class="scr-meta">
          <span>Scanned <b id="scrScanned">0</b></span>
          <span>Drops <b id="scrDrops">0</b></span>
          <span>Opportunities <b class="gold-text" id="scrOpps">0</b></span>
        </div>

        <div class="scr-cols">
          <span>Ticker</span><span>Drop</span><span>Score</span><span>Call</span>
        </div>
        <div class="scr-rows" id="scrRows"></div>
      </div>

*/

/* ---------- 3. JS ---------- */
// ── HERO SCREENER ANIMATION ────────────────────────────────────
// (previous 3D armillary-sphere visual archived at assets/archive/alpha-armillary-globe.js)
(function(){
  var host=document.getElementById('scr');
  if(!host) return;

  var rowsEl   = document.getElementById('scrRows');
  var barEl    = document.getElementById('scrBar');
  var runEl    = document.getElementById('scrRun');
  var scannedEl= document.getElementById('scrScanned');
  var dropsEl  = document.getElementById('scrDrops');
  var oppsEl   = document.getElementById('scrOpps');

  var UNIVERSE=12163;
  var BATCHES=[
    [
      {t:'SA',   n:'Seabridge Gold',   d:'−9.35%', s:51, c:'Strong Buy', opp:true},
      {t:'BKV',  n:'BKV Corporation',  d:'−7.28%', s:50, c:'Strong Buy', opp:true},
      {t:'HLN',  n:'Haleon plc',       d:'−6.412%',s:38, c:'Hold',       opp:false},
      {t:'CNX',  n:'CNX Resources',    d:'−6.10%', s:34, c:'Hold',       opp:false}
    ],
    [
      {t:'PRIM', n:'Primoris Services',d:'−8.42%', s:82, c:'Strong Buy', opp:true},
      {t:'AUPH', n:'Aurinia Pharma',   d:'−7.91%', s:74, c:'Strong Buy', opp:true},
      {t:'MU',   n:'Micron Technology',d:'−6.55%', s:41, c:'Hold',       opp:false},
      {t:'OVV',  n:'Ovintiv Inc.',     d:'−6.03%', s:29, c:'Hold',       opp:false}
    ],
    [
      {t:'CVS',  n:'CVS Health',       d:'−7.64%', s:68, c:'Strong Buy', opp:true},
      {t:'ARCH', n:'Arch Resources',   d:'−6.88%', s:45, c:'Hold',       opp:false},
      {t:'BTU',  n:'Peabody Energy',   d:'−6.21%', s:33, c:'Hold',       opp:false},
      {t:'AMR',  n:'Alpha Metallurg.', d:'−6.02%', s:27, c:'Hold',       opp:false}
    ]
  ];

  var batch=0, timers=[];
  function later(fn,ms){ timers.push(setTimeout(fn,ms)); }
  function clearAll(){ timers.forEach(clearTimeout); timers=[]; }

  function fmt(n){ return n.toLocaleString('en-US'); }

  function countTo(el,to,ms,done){
    var from=0, t0=performance.now();
    (function step(now){
      var p=Math.min((now-t0)/ms,1);
      var eased=1-Math.pow(1-p,3);
      el.textContent=fmt(Math.round(from+(to-from)*eased));
      if(p<1) requestAnimationFrame(step); else if(done) done();
    })(t0);
  }

  function runScan(){
    clearAll();
    var set=BATCHES[batch % BATCHES.length];
    batch++;

    // reset
    rowsEl.innerHTML='';
    barEl.style.transition='none';
    barEl.style.width='0%';
    scannedEl.textContent='0';
    dropsEl.textContent='0';
    oppsEl.textContent='0';
    runEl.classList.add('is-busy');
    runEl.textContent='Scanning';

    // sweep the progress bar across the universe
    later(function(){
      barEl.style.transition='width 2.5s cubic-bezier(.25,.7,.25,1)';
      barEl.style.width='100%';
    },60);

    countTo(scannedEl,UNIVERSE,2500);
    later(function(){ countTo(dropsEl,384,900); },1500);

    // stream matched rows in
    var oppCount=0;
    set.forEach(function(r,i){
      later(function(){
        var row=document.createElement('div');
        row.className='scr-row'+(r.opp?' is-opp':'');
        row.innerHTML=
          '<div class="scr-tk">'+r.t+'<small>'+r.n+'</small></div>'+
          '<div class="scr-dp">'+r.d+'</div>'+
          '<div class="scr-sc"><span class="scr-sc-bar"><i></i></span><span class="scr-sc-n">'+r.s+'</span></div>'+
          '<div class="scr-cl'+(r.c==='Strong Buy'?' buy':'')+'">'+r.c+'</div>';
        rowsEl.appendChild(row);
        // fill the score bar just after the row lands
        later(function(){ row.querySelector('.scr-sc-bar i').style.width=r.s+'%'; },90);
        if(r.opp){ oppCount++; oppsEl.textContent=oppCount; }
      }, 2600+i*260);
    });

    later(function(){
      runEl.classList.remove('is-busy');
      runEl.textContent='Run scan';
    },2600+set.length*260);

    // loop
    later(runScan, 9200);
  }

  // only run while the hero is actually on screen
  var started=false;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !started){ started=true; runScan(); }
      else if(!e.isIntersecting && started){ started=false; clearAll(); }
    });
  },{threshold:.15});
  io.observe(host);

  runEl.addEventListener('click',runScan);
})();
