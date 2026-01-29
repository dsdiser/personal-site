import { MenuScreen } from "./navigationConfig";
import { Button } from "./Button";

interface MenuButtonsProps {
	screen: MenuScreen;
	onNavigate: (nextScreenId: string) => void;
}

export function MenuButtons({ screen, onNavigate }: MenuButtonsProps) {
	// Button positions for 4-button layout (top, right, bottom, left)
	const allButtonPositions = [
		[0, 0.35, 0.45],      // Top
		[0.35, 0, 0.45],      // Right
		[0, -0.35, 0.45],     // Bottom
		[-0.35, 0, 0.45],     // Left
	];

	const allButtonRotations = [
		[0, 0, 0],                    // Top - no rotation
		[0, 0, -Math.PI / 2],         // Right
		[0, 0, Math.PI],              // Bottom
		[0, 0, Math.PI / 2],          // Left
	];

	// For single-button screens (like "Back" buttons), center them
	const singleButtonPosition: [number, number, number] = [0, 0, 0.45];
	const singleButtonRotation: [number, number, number] = [0, 0, 0];

	const numButtons = screen.buttons.length;
	const isSingleButton = numButtons === 1;

	return (
		<>
			{screen.buttons.map((button, index) => {
				if (index >= 4) return null; // Only support up to 4 buttons per screen

				const position = isSingleButton ? singleButtonPosition : (allButtonPositions[index] as [number, number, number]);
				const rotation = isSingleButton ? singleButtonRotation : (allButtonRotations[index] as [number, number, number]);

				return (
					<Button
						key={button.nextScreenId}
						position={position}
						rotation={rotation}
						onClick={() => onNavigate(button.nextScreenId)}
					>
						{button.label}
					</Button>
				);
			})}
		</>
	);
}
