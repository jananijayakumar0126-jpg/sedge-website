/* ARCHIVED — Pharma hero: three.js DNA double helix.
   Replaced 2026-08-24 with a pure SVG/CSS version (no WebGL dependency).
   Needs <script src="assets/vendor/three.min.js"></script> and
   <div class="ph-helix"><div id="ph-helix"></div></div> to restore. */

<!-- ── THREE.JS DNA DOUBLE HELIX ────────────────────────────── -->
<script>
(function(){
  var container=document.getElementById('ph-helix');
  if(!container||typeof THREE==='undefined') return;

  var W=container.clientWidth||460, H=container.clientHeight||440;
  var GOLD=0xc9a462, GOLD_L=0xe2bc79, GOLD_D=0xa07d3a;

  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(42,W/H,0.1,100);
  camera.position.set(0,0,15);
  camera.lookAt(0,0,0);

  var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(W,H);
  renderer.setClearColor(0x000000,0);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff,0.95));
  var key=new THREE.DirectionalLight(0xd4af6e,0.6);  key.position.set(4,6,6);  scene.add(key);
  var fill=new THREE.DirectionalLight(0xfff4e0,0.35); fill.position.set(-5,-3,-4); scene.add(fill);

  var helix=new THREE.Group();
  scene.add(helix);

  // ── geometry parameters ──
  var TURNS=2.7, PAIRS=34, RADIUS=2.15, HEIGHT=9.6;
  var nodeGeo=new THREE.SphereGeometry(0.125,14,14);
  var matA=new THREE.MeshPhongMaterial({color:GOLD,shininess:18,transparent:true,opacity:0.9});
  var matB=new THREE.MeshPhongMaterial({color:GOLD_D,shininess:18,transparent:true,opacity:0.72});
  var rungMat=new THREE.MeshBasicMaterial({color:GOLD,transparent:true,opacity:0.22});

  var pairs=[];
  for(var i=0;i<PAIRS;i++){
    var t=i/(PAIRS-1);
    var ang=t*Math.PI*2*TURNS;
    var y=(t-0.5)*HEIGHT;

    var g=new THREE.Group();
    g.userData.baseAng=ang;
    g.userData.y=y;
    g.userData.t=t;

    var a=new THREE.Mesh(nodeGeo,matA);
    var b=new THREE.Mesh(nodeGeo,matB);
    a.position.set( RADIUS,0,0);
    b.position.set(-RADIUS,0,0);
    g.add(a); g.add(b);

    // rung between the two bases
    var rung=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,RADIUS*2,6),rungMat);
    rung.rotation.z=Math.PI/2;
    g.add(rung);

    g.position.y=y;
    g.rotation.y=ang;
    helix.add(g);
    pairs.push({g:g,a:a,b:b,rung:rung,t:t});
  }

  // ── the two backbone ribbons ──
  function backbone(offset,color,opacity){
    var pts=[];
    var N=260;
    for(var i=0;i<=N;i++){
      var t=i/N;
      var ang=t*Math.PI*2*TURNS + offset;
      pts.push(new THREE.Vector3(
        Math.cos(ang)*RADIUS,
        (t-0.5)*HEIGHT,
        Math.sin(ang)*RADIUS
      ));
    }
    var curve=new THREE.CatmullRomCurve3(pts);
    var tube=new THREE.Mesh(
      new THREE.TubeGeometry(curve,300,0.045,8,false),
      new THREE.MeshPhongMaterial({color:color,shininess:20,transparent:true,opacity:opacity})
    );
    helix.add(tube);
    return tube;
  }
  backbone(0, GOLD, 0.8);
  backbone(Math.PI, GOLD_D, 0.6);

  // ── faint dust so it sits in space rather than floating flat ──
  var N=140, pos=new Float32Array(N*3);
  for(var d=0;d<N;d++){
    pos[d*3]   = (Math.random()-0.5)*10;
    pos[d*3+1] = (Math.random()-0.5)*11;
    pos[d*3+2] = (Math.random()-0.5)*10;
  }
  var dg=new THREE.BufferGeometry();
  dg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var dust=new THREE.Points(dg,new THREE.PointsMaterial({color:GOLD_L,size:0.04,transparent:true,opacity:0.22}));
  scene.add(dust);

  helix.rotation.z=0.13;

  var frame=0, raf=null, running=false;
  function draw(){
    frame++;
    helix.rotation.y += 0.0042;

    // gentle travelling shimmer up the strand
    for(var i=0;i<pairs.length;i++){
      var p=pairs[i];
      var wave=Math.sin(frame*0.02 - p.t*7.5);
      var lift=0.5+0.5*wave;
      p.rung.material.opacity = 0.12 + lift*0.18;
      var sc = 1 + lift*0.20;
      p.a.scale.setScalar(sc);
      p.b.scale.setScalar(sc);
    }

    dust.rotation.y -= 0.0007;
    renderer.render(scene,camera);
    raf=requestAnimationFrame(draw);
  }
  function start(){ if(running) return; running=true; raf=requestAnimationFrame(draw); }
  function stop(){ running=false; if(raf) cancelAnimationFrame(raf); raf=null; }

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ e.isIntersecting ? start() : stop(); });
  },{threshold:.02});
  io.observe(container);

  window.addEventListener('resize',function(){
    var w=container.clientWidth,h=container.clientHeight;
    if(!w||!h) return;
    camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
  });
})();
</script>
