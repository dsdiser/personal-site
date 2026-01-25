import "./App.css";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, RoundedBox, Text, MeshTransmissionMaterial, Billboard } from "@react-three/drei";
import * as THREE from "three";

function Button({ children, color = 'white', ...props }) {
	const ref = useRef<THREE.Mesh>(null);
	return (
		<Text
			ref={ref}
			color={color}
			onPointerOver={() => ref.current?.material.color.set('orange')}
			onPointerOut={() => ref.current?.material.color.set(color)}
			font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff"
			anchorY="middle"
			anchorX="center"
			fontSize={0.09}
			{...props}>
			{children}
		</Text>
	);
}

function BouncingBox() {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (meshRef.current) {
			const time = state.clock.elapsedTime;
			meshRef.current.position.y = Math.sin(time) * 0.1;
			meshRef.current.rotation.x = Math.cos(time) * 0.1;
			meshRef.current.rotation.y = Math.cos(time) * 0.1;
			meshRef.current.rotation.z = Math.sin(time) * 0.05;
		}
	});

	return (
		<RoundedBox ref={meshRef} radius={0.075} smoothness={3}>
			<MeshTransmissionMaterial
				backside
				thickness={0.1}
				anisotropy={0.5}
				iridescence={1}
				iridescenceIOR={1}
				iridescenceThicknessRange={[0, 1400]}
			/>
			<Button position={[0, 0.35, 0.45]}>Game Play</Button>
			<Button rotation={[0, 0, -Math.PI / 2]} position={[0.35, 0, 0.45]}>
				Calendar
			</Button>
			<Button position={[0, -0.35, 0.45]}>Memory Card</Button>
			<Button rotation={[0, 0, Math.PI / 2]} position={[-0.35, 0, 0.45]}>
				Options
			</Button>
		</RoundedBox>
	);
}

function App() {
	return (
		<div className="App">
			<Canvas 
				camera={{ position: [0, 0.5, 4], fov: 25 }}
				dpr={window.devicePixelRatio}
				gl={{ antialias: true }}
			>
				<color attach="background" args={["#151520"]} />
				<ambientLight intensity={0.5} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
				<pointLight position={[-10, -10, -10]} />
				<BouncingBox />
				<OrbitControls />
				<Environment preset="city" />
			</Canvas>
		</div>
	);
}

export default App;
