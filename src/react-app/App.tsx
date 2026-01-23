import "./App.css";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		renderer?: THREE.WebGLRenderer;
		scene?: THREE.Scene;
		camera?: THREE.PerspectiveCamera;
		controls?: OrbitControls;
		animationFrameId?: number;
	}>({});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Get dimensions
		const width = window.innerWidth;
		const height = window.innerHeight;

		// Camera
		const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10);
		camera.position.z = 2.5;

		// Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x111111);

		// Geometry and Material
		const geometry = new RoundedBoxGeometry(1, 1, 1, 20, 0.1);
		const material = new THREE.MeshStandardMaterial({ 
			roughness: .2,
			transparent: true,
			opacity: 0.3,
			wireframe: true,
			color: 0x00ff00
		});
		const mesh = new THREE.Mesh(geometry, material);
		const meshId = mesh.id;
		scene.add(mesh);

		// Renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		container.appendChild(renderer.domElement);

		// Environment
		const environment = new RoomEnvironment();
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		scene.environment = pmremGenerator.fromScene(environment).texture;

		// Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		// controls.autoRotate = true;
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		// Store references
		sceneRef.current = { renderer, scene, camera, controls };

		// Animation loop
		const animate = () => {
			sceneRef.current.animationFrameId = requestAnimationFrame(animate);
			const cubeMesh = sceneRef.current.scene?.getObjectById(meshId)
			if (cubeMesh) {
				// make the cube look like its bouncing on its corners
				const time = sceneRef.current.animationFrameId * 0.002;
				cubeMesh.position.y = Math.abs(Math.sin(time)) * 0.2 - 0.1;
				cubeMesh.rotation.x = Math.abs(Math.sin(time)) * 0.3 - 0.15;
				cubeMesh.rotation.y = Math.abs(Math.sin(time)) * 0.3 - 0.15;
				// cubeMesh.rotation.y += 0.01;
			}
			if (controls) {
				controls.update();
			}
			renderer.render(scene, camera);
		};
		animate();

		// Handle window resize
		const handleResize = () => {
			const newWidth = window.innerWidth;
			const newHeight = window.innerHeight;
			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(newWidth, newHeight);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
			if (sceneRef.current.animationFrameId) {
				cancelAnimationFrame(sceneRef.current.animationFrameId);
			}
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div className="App">
			<div ref={containerRef} />
		</div>
	);
}

export default App;
