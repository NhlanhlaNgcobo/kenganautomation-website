import React, { useEffect, useRef } from 'react';

// Ambient 3D "automation network" behind the hero: nodes connected by edges,
// slowly rotating and parallaxing to the pointer. Three.js loads lazily (its own
// chunk) only when motion is allowed and WebGL exists, so it never blocks first
// paint and degrades to nothing on low-end/reduced-motion.
export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    try {
      const probe = document.createElement('canvas');
      if (!(probe.getContext('webgl') || probe.getContext('experimental-webgl'))) return;
    } catch { return; }

    let disposed = false;
    let cleanup = null;

    import('three')
      .then((THREE) => {
        if (disposed) return;

        const w = () => mount.clientWidth || 1;
        const h = () => mount.clientHeight || 1;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(58, w() / h(), 0.1, 100);
        camera.position.z = 16;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setSize(w(), h());
        mount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const N = 44;
        const nodes = [];
        for (let i = 0; i < N; i++) {
          const r = 7 + Math.random() * 4.5;
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          nodes.push(new THREE.Vector3(
            r * Math.sin(ph) * Math.cos(th),
            r * Math.sin(ph) * Math.sin(th),
            r * Math.cos(ph)
          ));
        }
        const green = new THREE.Color('#17B877');

        const pGeo = new THREE.BufferGeometry().setFromPoints(nodes);
        const pMat = new THREE.PointsMaterial({ color: green, size: 0.26, transparent: true, opacity: 0.95 });
        group.add(new THREE.Points(pGeo, pMat));

        const seg = [];
        for (let i = 0; i < N; i++)
          for (let j = i + 1; j < N; j++)
            if (nodes[i].distanceTo(nodes[j]) < 4.6)
              seg.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        const lGeo = new THREE.BufferGeometry();
        lGeo.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
        const lMat = new THREE.LineBasicMaterial({ color: green, transparent: true, opacity: 0.16 });
        group.add(new THREE.LineSegments(lGeo, lMat));

        const pointer = { x: 0, y: 0 };
        const onMove = (e) => {
          pointer.x = e.clientX / window.innerWidth - 0.5;
          pointer.y = e.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener('pointermove', onMove, { passive: true });

        const onResize = () => {
          camera.aspect = w() / h();
          camera.updateProjectionMatrix();
          renderer.setSize(w(), h());
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(mount);

        const clock = new THREE.Clock();
        let frame = 0;
        let running = true;
        const render = () => {
          if (!running) return;
          frame = requestAnimationFrame(render);
          const t = clock.getElapsedTime();
          group.rotation.y = t * 0.07 + pointer.x * 0.5;
          group.rotation.x = Math.sin(t * 0.1) * 0.12 + pointer.y * 0.35;
          renderer.render(scene, camera);
        };
        const onVis = () => {
          running = !document.hidden;
          if (running) render();
          else cancelAnimationFrame(frame);
        };
        document.addEventListener('visibilitychange', onVis);
        render();

        cleanup = () => {
          running = false;
          cancelAnimationFrame(frame);
          window.removeEventListener('pointermove', onMove);
          document.removeEventListener('visibilitychange', onVis);
          ro.disconnect();
          pGeo.dispose(); pMat.dispose(); lGeo.dispose(); lMat.dispose();
          renderer.dispose();
          if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={mountRef} className="hero3d" aria-hidden="true" />;
}
