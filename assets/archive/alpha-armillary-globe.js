/* ============================================================
   ARCHIVED — Alpha Signals hero: 3D armillary sphere (three.js)
   ------------------------------------------------------------
   This was the original hero visual on value-picks.html, replaced
   on 2026-08-24 by the animated screener panel.

   To restore:
     1. Re-add in <head>:
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
     2. Put back the hero markup:
        <div class="hero-globe"><div id="globe-container"></div></div>
     3. Restore the CSS:
        .hero-globe{position:relative;}
        #globe-container{width:100%;height:480px;}
     4. Paste the IIFE below back into the page's main <script>.
   ============================================================ */

// ── THREE.JS ARMILLARY SPHERE ──────────────────────────────────
(function(){
  const container=document.getElementById('globe-container');
  if(!container||typeof THREE==='undefined') return;
  const W=container.clientWidth||500, H=container.clientHeight||480;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(40,W/H,0.1,100);
  camera.position.set(0,0.4,9.6);
  camera.lookAt(0,0,0);
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(W,H);
  renderer.setClearColor(0x000000,0);
  container.appendChild(renderer.domElement);
  scene.add(new THREE.AmbientLight(0xffffff,0.9));
  const sun=new THREE.DirectionalLight(0xd4af6e,0.85);
  sun.position.set(4,6,3);
  scene.add(sun);
  const fill=new THREE.DirectionalLight(0xfff4e0,0.3);
  fill.position.set(-4,-2,-3);
  scene.add(fill);
  const outer=new THREE.Group();
  scene.add(outer);

  // ── core: faceted value nucleus ──
  const core=new THREE.Group();
  core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.62,1),new THREE.MeshPhongMaterial({color:0xc9a462,transparent:true,opacity:0.16,shininess:60})));
  core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.62,1),new THREE.MeshBasicMaterial({color:0xe2bc79,wireframe:true,transparent:true,opacity:0.5})));
  core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.3,0),new THREE.MeshBasicMaterial({color:0xf4e6c8,transparent:true,opacity:0.85})));
  outer.add(core);

  // ── three orbital rings at classic armillary tilts, each spinning independently ──
  const ringDefs=[
    {r:2.15,tube:0.018,tiltX:1.4,tiltZ:0.08,opacity:0.5, spin:0.006},
    {r:2.75,tube:0.014,tiltX:0.35,tiltZ:1.15,opacity:0.32,spin:-0.0038},
    {r:3.3, tube:0.011,tiltX:0.95,tiltZ:-0.9,opacity:0.2, spin:0.0022},
  ];
  const rings=ringDefs.map(def=>{
    const holder=new THREE.Group();
    holder.rotation.x=def.tiltX; holder.rotation.z=def.tiltZ;
    const mesh=new THREE.Mesh(new THREE.TorusGeometry(def.r,def.tube,10,120),new THREE.MeshBasicMaterial({color:0xc9a462,transparent:true,opacity:def.opacity}));
    holder.add(mesh);
    holder.userData.spin=def.spin;
    outer.add(holder);
    return holder;
  });

  // ── decorative nodes riding the inner ring ──
  const nodeHolder=rings[0];
  const nodeMeshes=[];
  const NODE_COUNT=6;
  for(let i=0;i<NODE_COUNT;i++){
    const angle=(i/NODE_COUNT)*Math.PI*2;
    const r=ringDefs[0].r;
    const size=0.09;
    const node=new THREE.Mesh(new THREE.SphereGeometry(size,16,16),new THREE.MeshPhongMaterial({color:0xc9a462,transparent:true,opacity:0.9,shininess:70}));
    node.position.set(Math.cos(angle)*r,0,Math.sin(angle)*r);
    nodeHolder.add(node);
    nodeMeshes.push(node);
    const halo=new THREE.Mesh(new THREE.RingGeometry(size*1.5,size*1.9,20),new THREE.MeshBasicMaterial({color:0xc9a462,transparent:true,opacity:0.28,side:THREE.DoubleSide}));
    halo.position.copy(node.position);
    nodeHolder.add(halo);
  }

  // ── ambient stardust shell ──
  const N=420, dust=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const phi=Math.acos(2*Math.random()-1), th=Math.random()*Math.PI*2, r=4.1+Math.random()*0.7;
    dust[i*3]=r*Math.sin(phi)*Math.cos(th);
    dust[i*3+1]=r*Math.cos(phi);
    dust[i*3+2]=r*Math.sin(phi)*Math.sin(th);
  }
  const dustGeo=new THREE.BufferGeometry();
  dustGeo.setAttribute('position',new THREE.BufferAttribute(dust,3));
  const dustMesh=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xe2bc79,size:0.028,transparent:true,opacity:0.45}));
  outer.add(dustMesh);

  let rotY=0.15, rotX=-0.08;
  let frame=0;
  (function tick(){
    requestAnimationFrame(tick);
    frame++;
    rotY+=0.0016;
    outer.rotation.y=rotY;
    outer.rotation.x=rotX;
    rings.forEach(r=>{ r.children[0].rotation.z+=r.userData.spin; });
    core.rotation.y+=0.004;
    core.children[1].rotation.x-=0.0025;
    nodeMeshes.forEach((node,i)=>{
      const pulse=1+Math.sin(frame*0.03+i*1.3)*0.12;
      node.scale.setScalar(pulse);
    });
    dustMesh.rotation.y-=0.0006;
    renderer.render(scene,camera);
  })();
  window.addEventListener('resize',()=>{
    const w=container.clientWidth,h=container.clientHeight;
    camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);
  });
})();
