<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let spheres: THREE.Mesh[] = [];
  let animationFrameId: number;

  const createSphere = () => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhysicalMaterial({
      color: `hsl(${Math.random() * 360}, 50%, 75%)`,
      transparent: true,
      opacity: 0.6,
      metalness: 0.2,
      roughness: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    sphere.scale.setScalar(Math.random() * 0.5);
    return sphere;
  };

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    spheres.forEach((sphere, i) => {
      sphere.rotation.x += 0.01 * (i % 2 ? 1 : -1);
      sphere.rotation.y += 0.01 * (i % 3 ? 1 : -1);
    });

    renderer.render(scene, camera);
  };

  onMount(() => {
    const container = document.querySelector('#three-container');
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create spheres
    for (let i = 0; i < 50; i++) {
      const sphere = createSphere();
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    camera.position.z = 15;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  });
</script>

<div id="three-container" class="fixed inset-0 -z-10"></div>
