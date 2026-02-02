export enum MenuButtonSide {
	Top,
	Right,
	Bottom,
	Left,
}

export enum CubeFace {
	Front,
	Left,
	Back,
	Right,
	Top,
	Bottom
}

export interface MenuButton {
	label: string;
	nextScreenId: string;
	position: MenuButtonSide;
}

export interface MenuScreen {
	id: string;
	buttons: MenuButton[];
	faceIndex: CubeFace;
}

export const navigationConfig: Record<string, MenuScreen> = {
	"home": {
		id: "home",
		buttons: [
			{ label: "Projects", nextScreenId: "projects", position: MenuButtonSide.Right },   
			{ label: "Contact", nextScreenId: "contact", position: MenuButtonSide.Bottom },  
			{ label: "About", nextScreenId: "about", position: MenuButtonSide.Left },       
		],
		faceIndex: CubeFace.Front,
	},
	"projects": {
		id: "projects",
		buttons: [
			{ label: "Web Apps", nextScreenId: "web-apps", position: MenuButtonSide.Top },     
			{ label: "Back", nextScreenId: "home", position: MenuButtonSide.Left },          
		],
		faceIndex: CubeFace.Right,
	},
	"web-apps": {
		id: "web-apps",
		buttons: [
			{ label: "Back", nextScreenId: "projects", position: MenuButtonSide.Bottom },    
		],
		faceIndex: CubeFace.Top,
	},
	about: {
		id: "about",
		buttons: [
			{ label: "Back", nextScreenId: "home", position: MenuButtonSide.Right },
		],
		faceIndex: CubeFace.Left,
	},
	contact: {
		id: "contact",
		buttons: [
			{ label: "Back", nextScreenId: "home", position: MenuButtonSide.Top },
		],
		faceIndex: CubeFace.Bottom,
	},
};

export const getScreenConfig = (screenId: string): MenuScreen | null => {
	return navigationConfig[screenId] || null;
};
