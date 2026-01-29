import { MenuScreen } from "./navigationConfig";
import { Button } from "./Button";

interface MenuButtonsProps {
	screen: MenuScreen;
	onNavigate: (nextScreenId: string) => void;
}

export function MenuButtons({ screen, onNavigate }: MenuButtonsProps) {
	// Calculate button positions based on which face is currently active
	// Positions are in the cube's local coordinate system
	const surfaceOffset = 0.45;
	const buttonOffset = 0.35;

	let buttonPositions: [number, number, number][];
	let buttonRotations: [number, number, number][];

	// For each face, define where the 4 buttons should be positioned
	switch (screen.faceIndex) {
		case 0: // Front (Z+)
			buttonPositions = [
				[0, buttonOffset, surfaceOffset],        // Top
				[buttonOffset, 0, surfaceOffset],        // Right
				[0, -buttonOffset, surfaceOffset],       // Bottom
				[-buttonOffset, 0, surfaceOffset],       // Left
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
			break;
		case 1: // Right (X+)
			buttonPositions = [
				[surfaceOffset, buttonOffset, 0],        // Top
				[surfaceOffset, 0, -buttonOffset],       // Right (toward back)
				[surfaceOffset, -buttonOffset, 0],       // Bottom
				[surfaceOffset, 0, buttonOffset],        // Left (toward front)
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
			break;
		case 2: // Back (Z-)
			buttonPositions = [
				[0, buttonOffset, -surfaceOffset],       // Top
				[-buttonOffset, 0, -surfaceOffset],      // Right
				[0, -buttonOffset, -surfaceOffset],      // Bottom
				[buttonOffset, 0, -surfaceOffset],       // Left
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
			break;
		case 3: // Left (X-)
			buttonPositions = [
				[-surfaceOffset, buttonOffset, 0],       // Top
				[-surfaceOffset, 0, buttonOffset],       // Right (toward front)
				[-surfaceOffset, -buttonOffset, 0],      // Bottom
				[-surfaceOffset, 0, -buttonOffset],      // Left (toward back)
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
			break;
		case 4: // Top (Y+)
			buttonPositions = [
				[0, surfaceOffset, -buttonOffset],       // Top (back)
				[buttonOffset, surfaceOffset, 0],        // Right
				[0, surfaceOffset, buttonOffset],        // Bottom (front)
				[-buttonOffset, surfaceOffset, 0],       // Left
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
			break;
		case 5: // Bottom (Y-)
			buttonPositions = [
				[0, -surfaceOffset, buttonOffset],       // Top (front)
				[buttonOffset, -surfaceOffset, 0],       // Right
				[0, -surfaceOffset, -buttonOffset],      // Bottom (back)
				[-buttonOffset, -surfaceOffset, 0],      // Left
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
			break;
		default:
			buttonPositions = [
				[0, buttonOffset, surfaceOffset],
				[buttonOffset, 0, surfaceOffset],
				[0, -buttonOffset, surfaceOffset],
				[-buttonOffset, 0, surfaceOffset],
			];
			buttonRotations = [
				[0, 0, 0],
				[0, 0, -Math.PI / 2],
				[0, 0, Math.PI],
				[0, 0, Math.PI / 2],
			];
	}

	// For single-button screens, center on the face
	const numButtons = screen.buttons.length;
	const isSingleButton = numButtons === 1;

	const centerPositions: [number, number, number][] = [
		[0, 0, surfaceOffset],
		[surfaceOffset, 0, 0],
		[0, 0, -surfaceOffset],
		[-surfaceOffset, 0, 0],
		[0, surfaceOffset, 0],
		[0, -surfaceOffset, 0],
	];

	const centerRotations: [number, number, number][] = [
		[0, 0, 0],                  // Face 0: Front
		[0, Math.PI / 2, 0],        // Face 1: Right
		[0, Math.PI, 0],            // Face 2: Back
		[0, -Math.PI / 2, 0],       // Face 3: Left
		[Math.PI / 2, 0, 0],        // Face 4: Top
		[-Math.PI / 2, 0, 0],       // Face 5: Bottom
	];

	return (
		<>
			{screen.buttons.map((button, index) => {
				if (index >= 4) return null;

				const position = isSingleButton 
					? centerPositions[screen.faceIndex] 
					: buttonPositions[index];
				const rotation = isSingleButton 
					? centerRotations[screen.faceIndex] 
					: buttonRotations[index];

				return (
					<Button
						key={button.nextScreenId}
						position={position as [number, number, number]}
						rotation={rotation as [number, number, number]}
						onClick={() => onNavigate(button.nextScreenId)}
					>
						{button.label}
					</Button>
				);
			})}
		</>
	);
}
