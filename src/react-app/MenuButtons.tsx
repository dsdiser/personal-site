import { MenuScreen } from "./navigationConfig";
import { Button } from "./Button";
import type { Vector3 } from "./types";

interface MenuButtonsProps {
	screen: MenuScreen;
	onNavigate: (nextScreenId: string) => void;
}

const HALF_PI = Math.PI / 2;
const PI = Math.PI;

const surfaceOffset = 0.45;
const buttonOffset = 0.35;
const BUTTON_LOCATIONS: [Vector3[], Vector3[]][] = [
	[
		[
			[0, buttonOffset, surfaceOffset],        // Top
			[buttonOffset, 0, surfaceOffset],        // Right
			[0, -buttonOffset, surfaceOffset],       // Bottom
			[-buttonOffset, 0, surfaceOffset],       // Left
		],
		[
			[0, 0, 0],
			[0, 0, -HALF_PI],
			[0, 0, 0],
			[0, 0, HALF_PI],
		],
	],
	[
		[
			[-surfaceOffset, buttonOffset, 0],
			[-surfaceOffset, 0, buttonOffset],
			[-surfaceOffset, -buttonOffset, 0],
			[-surfaceOffset, 0, -buttonOffset],
		],
		[
			[0, -HALF_PI, 0],
			[0, -HALF_PI, -HALF_PI],
			[0, -HALF_PI, 0],
			[0, -HALF_PI, HALF_PI],
		],
	]
];

export function MenuButtons({ screen, onNavigate }: MenuButtonsProps) {
	// Calculate button positions based on which face is currently active
	// Positions are in the cube's local coordinate system
	

	let buttonPositions: Vector3[];
	let buttonRotations: Vector3[];

	// For each face, define where the 4 buttons should be positioned
	switch (screen.faceIndex) {
		case 0: // Front (Z+)
			break;
		case 1: // Right (X+)
			
			break;
		case 2: // Back (Z-)
			buttonPositions = [
				[0, buttonOffset, -surfaceOffset],
				[-buttonOffset, 0, -surfaceOffset], 
				[0, -buttonOffset, -surfaceOffset], 
				[buttonOffset, 0, -surfaceOffset],  
			];
			buttonRotations = [
				[0, PI, 0],
				[0, PI, -HALF_PI],
				[0, PI, 0],
				[0, PI, HALF_PI],
			];
			break;
		case 3: // Left (X-)
			buttonPositions = [
				[surfaceOffset, buttonOffset, 0], 
				[surfaceOffset, 0, -buttonOffset], 
				[surfaceOffset, -buttonOffset, 0], 
				[surfaceOffset, 0, buttonOffset]
			];
			buttonRotations = [
				[0, HALF_PI, 0],
				[0, HALF_PI, -HALF_PI],
				[0, HALF_PI, PI],
				[0, HALF_PI, HALF_PI],
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
				[-HALF_PI, 0, 0],
				[-HALF_PI, 0, -HALF_PI],
				[-HALF_PI, 0, 0],
				[-HALF_PI, 0, HALF_PI],
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
				[HALF_PI, 0, 0],
				[HALF_PI, 0, -HALF_PI],
				[HALF_PI, 0, PI],
				[HALF_PI, 0, HALF_PI],
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
				[0, 0, -HALF_PI],
				[0, 0, PI],
				[0, 0, HALF_PI],
			];
	}

	// For single-button screens, center on the face
	console.log(screen.faceIndex)

	return (
		<>
			{screen.buttons.map((button) => {
				const position = buttonPositions[button.position];
				const rotation = buttonRotations[button.position];

				return (
					<Button
						key={button.nextScreenId}
						position={position as Vector3}
						rotation={rotation as Vector3}
						onClick={() => onNavigate(button.nextScreenId)}
					>
						{button.label}
					</Button>
				);
			})}
		</>
	);
}
