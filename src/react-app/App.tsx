import "./App.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import { MenuButtons } from "./MenuButtons";
import { getScreenConfig } from "./navigationConfig";
import { useRotationSnap } from "./useRotationSnap";


interface BouncingBoxProps {
	currentScreenId: string;
	onNavigate: (screenId: string) => void;
}

function BouncingBox({ currentScreenId, onNavigate }: BouncingBoxProps) {
	const currentScreen = getScreenConfig(currentScreenId);
	const { meshRef, snapToFace, updateRotation, isAnimating: isRotationAnimating } = useRotationSnap({
		targetFaceIndex: currentScreen?.faceIndex || 0,
		animationDuration: 500,
	});

	useFrame((state) => {
		if (meshRef.current) {
			// Update rotation animation
			updateRotation(performance.now());

			// Add subtle animation when not snapping
			if (!isRotationAnimating()) {
				const time = state.clock.elapsedTime;
				meshRef.current.position.y = Math.sin(time) * 0.05;
			}
		}
	});

	// Trigger snap when screen changes
	const previousScreenRef = useRef(currentScreenId);
	React.useEffect(() => {
		if (previousScreenRef.current !== currentScreenId && currentScreen) {
			snapToFace(currentScreen.faceIndex);
			previousScreenRef.current = currentScreenId;
		}
	}, [currentScreenId, currentScreen, snapToFace]);

	if (!currentScreen) {
		return null;
	}

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
			<MenuButtons screen={currentScreen} onNavigate={onNavigate} />
		</RoundedBox>
	);
}

function App() {
	const [currentScreenId, setCurrentScreenId] = useState("home");
	const [isAnimating, setIsAnimating] = useState(false);

	const handleNavigate = (nextScreenId: string) => {
		if (isAnimating) return; // Prevent navigation during animation

		setIsAnimating(true);
		setCurrentScreenId(nextScreenId);

		// Reset animation flag after snap completes
		setTimeout(() => setIsAnimating(false), 550);
	};

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
				<BouncingBox 
					currentScreenId={currentScreenId} 
					onNavigate={handleNavigate}
				/>
				<OrbitControls />
				<Environment preset="city" />
			</Canvas>
		</div>
	);
}

export default App;
