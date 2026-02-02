import { MenuScreen } from "../util/navigationConfig";
import { Button } from "./Button";
import type { Vector3 } from "../util/types";

interface MenuButtonsProps {
	screen: MenuScreen;
	onNavigate: (nextScreenId: string) => void;
}

const HALF_PI = Math.PI / 2;
const PI = Math.PI;

const surfaceOffset = 0.45;
const buttonOffset = 0.35;
const BUTTON_LOCATIONS: [Vector3[], Vector3[]][] = [
	// 0: Front (Z+)
	[
		[
			[0, buttonOffset, surfaceOffset],
			[buttonOffset, 0, surfaceOffset], 
			[0, -buttonOffset, surfaceOffset],
			[-buttonOffset, 0, surfaceOffset],
		],
		[
			[0, 0, 0],
			[0, 0, -HALF_PI],
			[0, 0, 0],
			[0, 0, HALF_PI],
		],
	],
	// 1: Right (X+)
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
	],
	// 2: Back (Z-)
	[
		[
			[0, buttonOffset, -surfaceOffset],
			[-buttonOffset, 0, -surfaceOffset],
			[0, -buttonOffset, -surfaceOffset],
			[buttonOffset, 0, -surfaceOffset],
		],
		[
			[0, PI, 0],
			[0, PI, -HALF_PI],
			[0, PI, 0],
			[0, PI, HALF_PI],
		],
	],
	// 3: Left (X-)
	[
		[
			[surfaceOffset, buttonOffset, 0],
			[surfaceOffset, 0, -buttonOffset],
			[surfaceOffset, -buttonOffset, 0],
			[surfaceOffset, 0, buttonOffset],
		],
		[
			[0, HALF_PI, 0],
			[0, HALF_PI, -HALF_PI],
			[0, HALF_PI, PI],
			[0, HALF_PI, HALF_PI],
		],
	],
	// 4: Top (Y+)
	[
		[
			[0, surfaceOffset, -buttonOffset],
			[buttonOffset, surfaceOffset, 0],
			[0, surfaceOffset, buttonOffset],
			[-buttonOffset, surfaceOffset, 0],
		],
		[
			[-HALF_PI, 0, 0],
			[-HALF_PI, 0, -HALF_PI],
			[-HALF_PI, 0, 0],
			[-HALF_PI, 0, HALF_PI],
		],
	],
	// 5: Bottom (Y-)
	[
		[
			[0, -surfaceOffset, buttonOffset],
			[buttonOffset, -surfaceOffset, 0],
			[0, -surfaceOffset, -buttonOffset],
			[-buttonOffset, -surfaceOffset, 0],
		],
		[
			[HALF_PI, 0, 0],
			[HALF_PI, 0, -HALF_PI],
			[HALF_PI, 0, PI],
			[HALF_PI, 0, HALF_PI],
		],
	],
];

export function MenuButtons({ screen, onNavigate }: MenuButtonsProps) {
	// Use BUTTON_LOCATIONS for all faces, fallback to face 0 if out of range
	const [buttonPositions, buttonRotations] =
		BUTTON_LOCATIONS[screen.faceIndex] || BUTTON_LOCATIONS[0];

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
