import { useRef, useEffect } from "react";
import * as THREE from "three";

interface UseRotationSnapProps {
	targetFaceIndex: number;
	onSnapComplete?: () => void;
	animationDuration?: number; // in milliseconds
}

export function useRotationSnap({
	targetFaceIndex,
	onSnapComplete,
	animationDuration = 500,
}: UseRotationSnapProps) {
	const meshRef = useRef<THREE.Mesh>(null);
	const isAnimatingRef = useRef(false);
	const startRotationRef = useRef<[number, number, number]>([0, 0, 0]);
	const targetRotationRef = useRef<[number, number, number]>([0, 0, 0]);
	const animationStartTimeRef = useRef(0);
	const currentTargetFaceRef = useRef(targetFaceIndex);

	// Calculate target rotation based on face index
	// Cube faces: 0=front, 1=right, 2=back, 3=left, 4=top, 5=bottom
	const getFaceRotation = (faceIndex: number): [number, number, number] => {
		const rotations: Record<number, [number, number, number]> = {
			0: [0, 0, 0],                        // Front
			1: [0, Math.PI / 2, 0],              // Right
			2: [0, Math.PI, 0],                  // Back
			3: [0, -Math.PI / 2, 0],             // Left
			4: [Math.PI / 2, 0, 0],              // Top
			5: [-Math.PI / 2, 0, 0],             // Bottom
		};
		return rotations[faceIndex] || [0, 0, 0];
	};

	// Update target face when prop changes
	useEffect(() => {
		currentTargetFaceRef.current = targetFaceIndex;
	}, [targetFaceIndex]);

	// Snap to a specific face
	const snapToFace = (faceIndex: number) => {
		if (isAnimatingRef.current || !meshRef.current) return;

		isAnimatingRef.current = true;
		startRotationRef.current = [
			meshRef.current.rotation.x,
			meshRef.current.rotation.y,
			meshRef.current.rotation.z,
		];
		targetRotationRef.current = getFaceRotation(faceIndex);
		animationStartTimeRef.current = performance.now();
	};

	// Animation loop integration
	const updateRotation = (currentTime: number) => {
		if (!isAnimatingRef.current || !meshRef.current) return;

		const elapsed = currentTime - animationStartTimeRef.current;
		const progress = Math.min(elapsed / animationDuration, 1);

		// Easing function (easeInOutCubic)
		const easeProgress = progress < 0.5
			? 4 * progress * progress * progress
			: 1 - Math.pow(-2 * progress + 2, 3) / 2;

		// Interpolate rotation
		const start = startRotationRef.current;
		const target = targetRotationRef.current;

		meshRef.current.rotation.x = start[0] + (target[0] - start[0]) * easeProgress;
		meshRef.current.rotation.y = start[1] + (target[1] - start[1]) * easeProgress;
		meshRef.current.rotation.z = start[2] + (target[2] - start[2]) * easeProgress;

		if (progress === 1) {
			isAnimatingRef.current = false;
			onSnapComplete?.();
		}
	};

	return {
		meshRef,
		snapToFace,
		updateRotation,
		isAnimating: () => isAnimatingRef.current,
	};
}
