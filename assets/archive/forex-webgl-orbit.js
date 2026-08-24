/* ARCHIVED — Forex hero: three.js orbiting currency symbols.
   Replaced 2026-08-24 with a pure CSS version (no WebGL dependency).
   Needs <script src="assets/vendor/three.min.js"></script> and
   <div class="hero-globe"><div id="fx-globe"></div></div> to restore. */

<!-- ── THREE.JS ORBITING CURRENCY SYMBOLS ──────────────────── -->
<script>
(function(){
  var container=document.getElementById('fx-globe');
  if(!container||typeof THREE==='undefined') return;

  var W=container.clientWidth||500, H=container.clientHeight||480;
  var GOLD='#C9A462', GOLD_L='#E2BC79', GOLD_HEX=0xc9a462;

  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(42,W/H,0.1,100);
  camera.position.set(0,1.1,10.6);
  camera.lookAt(0,0,0);

  var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(W,H);
  renderer.setClearColor(0x000000,0);
  container.appendChild(renderer.domElement);

  var decoRings=[];
  var root=new THREE.Group();
  root.rotation.x=-0.46;
  scene.add(root);

  // ── build a crisp glyph texture on a canvas ──
  function glyphTexture(ch,color,px){
    var S=256, cv=document.createElement('canvas');
    cv.width=S; cv.height=S;
    var g=cv.getContext('2d');
    g.clearRect(0,0,S,S);
    g.font='300 '+px+'px "Cormorant Garamond", Georgia, serif';
    g.fillStyle=color;
    g.textAlign='center';
    g.textBaseline='middle';
    g.fillText(ch,S/2,S/2+4);
    var t=new THREE.CanvasTexture(cv);
    t.minFilter=THREE.LinearFilter;
    t.needsUpdate=true;
    return t;
  }

  function glyphSprite(ch,color,px,scale,opacity){
    var m=new THREE.SpriteMaterial({
      map:glyphTexture(ch,color,px),
      transparent:true,
      opacity:opacity,
      depthWrite:false
    });
    var sp=new THREE.Sprite(m);
    sp.scale.set(scale,scale,1);
    return sp;
  }

  // ── centre: the dollar, the hub every pair is read against ──
  var hub=glyphSprite('$',GOLD,190,1.5,0.95);
  root.add(hub);

  // soft halo behind the hub
  var halo=new THREE.Mesh(
    new THREE.CircleGeometry(1.05,48),
    new THREE.MeshBasicMaterial({color:GOLD_HEX,transparent:true,opacity:0.05})
  );
  root.add(halo);

  // ── orbiting currencies ──
  // all six ride one tilted orbit at a fixed 60 degrees apart, so they can never collide
  var MAIN_R=3.05;
  var SYMBOLS=[
    {ch:'€', px:150, scale:1.05},  // EUR
    {ch:'£', px:150, scale:1.05},  // GBP
    {ch:'¥', px:150, scale:1.05},  // JPY
    {ch:'₣', px:150, scale:1.05},  // CHF
    {ch:'C$',     px:118, scale:1.30},  // CAD
    {ch:'A$',     px:118, scale:1.30}   // AUD
  ];

  var mainOrbit=new THREE.Group();
  root.add(mainOrbit);
  mainOrbit.add(new THREE.Mesh(
    new THREE.TorusGeometry(MAIN_R,0.006,8,160),
    new THREE.MeshBasicMaterial({color:GOLD_HEX,transparent:true,opacity:0.20})
  ).rotateX(Math.PI/2));

  var movers=SYMBOLS.map(function(c,i){
    var sp=glyphSprite(c.ch,GOLD,c.px,c.scale,0.94);
    mainOrbit.add(sp);
    return {sprite:sp,r:MAIN_R,a:(i/SYMBOLS.length)*Math.PI*2,speed:0.0034,def:c,base:c.scale};
  });

  // two empty rings at other tilts, purely for depth
  [{r:2.05,tx:0.95,ty:0.5,o:0.13,spin:-0.0026},
   {r:3.85,tx:0.42,ty:-0.8,o:0.09,spin:0.0018}].forEach(function(d){
    var h=new THREE.Group();
    h.rotation.x=d.tx; h.rotation.y=d.ty;
    var ring=new THREE.Mesh(
      new THREE.TorusGeometry(d.r,0.005,8,140),
      new THREE.MeshBasicMaterial({color:GOLD_HEX,transparent:true,opacity:d.o})
    );
    ring.rotation.x=Math.PI/2;
    h.add(ring);
    h.userData.spin=d.spin;
    root.add(h);
    decoRings.push(h);
  });

  // ── ambient dust ──
  var N=300, pos=new Float32Array(N*3);
  for(var i=0;i<N;i++){
    var phi=Math.acos(2*Math.random()-1), th=Math.random()*Math.PI*2, rr=4.0+Math.random()*0.9;
    pos[i*3]=rr*Math.sin(phi)*Math.cos(th);
    pos[i*3+1]=rr*Math.cos(phi)*0.55;
    pos[i*3+2]=rr*Math.sin(phi)*Math.sin(th);
  }
  var dg=new THREE.BufferGeometry();
  dg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var dust=new THREE.Points(dg,new THREE.PointsMaterial({color:0xE2BC79,size:0.024,transparent:true,opacity:0.40}));
  root.add(dust);

  var frame=0;
  (function tick(){
    requestAnimationFrame(tick);
    frame++;
    root.rotation.y+=0.0011;
    movers.forEach(function(m){
      m.a+=m.speed;
      m.sprite.position.set(Math.cos(m.a)*m.r,0,Math.sin(m.a)*m.r);
      // fade and shrink slightly when the symbol swings behind the hub
      var depth=(Math.sin(m.a)+1)/2;               // 0 = far, 1 = near
      m.sprite.material.opacity=0.42+depth*0.56;
      m.sprite.scale.setScalar(m.base*(0.82+depth*0.26));
    });
    decoRings.forEach(function(r){ r.children[0].rotation.z+=r.userData.spin; });
    hub.scale.setScalar(1.5*(1+Math.sin(frame*0.018)*0.035));
    halo.scale.setScalar(1+Math.sin(frame*0.018)*0.06);
    halo.quaternion.copy(camera.quaternion);
    dust.rotation.y-=0.0005;
    renderer.render(scene,camera);
  })();

  // redraw glyphs once the webfont has actually loaded
  if(document.fonts&&document.fonts.ready){
    document.fonts.ready.then(function(){
      hub.material.map=glyphTexture('$',GOLD,190); hub.material.needsUpdate=true;
      movers.forEach(function(m){
        m.sprite.material.map=glyphTexture(m.def.ch,GOLD,m.def.px);
        m.sprite.material.needsUpdate=true;
      });
    });
  }

  window.addEventListener('resize',function(){
    var w=container.clientWidth,h=container.clientHeight;
    if(!w||!h) return;
    camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
  });
})();
</script>
