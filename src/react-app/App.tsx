import "./App.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import { MenuButtons } from "./components/MenuButtons";
import { getScreenConfig } from "./util/navigationConfig";
import { useRotationSnap } from "./hooks/useRotationSnap";
import type { Vector3 } from "./util/types";

const bounceAmount = 0.05;
const wobbleAmount = 0.05;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Get the target rotation for the current face
const targetRotations: Record<number, Vector3> = {
	0: [0, 0, 0],                      // Front
	1: [0, Math.PI / 2, 0],            // Right
	2: [0, Math.PI, 0],                // Back
	3: [0, -Math.PI / 2, 0],           // Left
	4: [Math.PI / 2, 0, 0],            // Top
	5: [-Math.PI / 2, 0, 0],           // Bottom
};

interface BouncingBoxProps {
	currentScreenId: string;
	onNavigate: (screenId: string) => void;
}

function BouncingBox({ currentScreenId, onNavigate }: BouncingBoxProps) {
	const currentScreen = getScreenConfig(currentScreenId);
	const { meshRef, snapToFace, updateRotation, isAnimating: isRotationAnimating } = useRotationSnap({
		targetFaceIndex: currentScreen?.faceIndex || 0,
		animationDuration: 400,
	});

	useFrame((state) => {
		if (meshRef.current) {
			// Update rotation animation
			updateRotation(performance.now());

			// Add subtle animation when not snapping, relative to current face
			if (!isRotationAnimating() && currentScreen) {
				const time = state.clock.elapsedTime;
				const targetRot = targetRotations[currentScreen.faceIndex];

				// Calculate target positions and rotations
				const targetBounce = Math.sin(time) * bounceAmount;
				const targetRotX = targetRot[0] + Math.cos(time) * wobbleAmount;
				const targetRotY = targetRot[1] + Math.cos(time) * wobbleAmount;
				const targetRotZ = targetRot[2] + Math.sin(time) * (wobbleAmount * 0.5);

				// Lerp all factors for smooth interpolation
				const lerpFactor = 0.1;
				meshRef.current.position.y = lerp(meshRef.current.position.y, targetBounce, lerpFactor);
				meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, targetRotX, lerpFactor);
				meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, targetRotY, lerpFactor);
				meshRef.current.rotation.z = lerp(meshRef.current.rotation.z, targetRotZ, lerpFactor);
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
		setTimeout(() => setIsAnimating(false), 40);
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
				<Environment preset="city" />
			</Canvas>
		</div>
	);
}

export default App;
