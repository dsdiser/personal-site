export enum MenuButtonSide {
	Top,
	Right,
	Bottom,
	Left,
}

export interface MenuButton {
	label: string;
	nextScreenId: string;
	position: MenuButtonSide;
}

export interface MenuScreen {
	id: string;
	title: string;
	description?: string;
	buttons: MenuButton[];
	faceIndex: number; // 0-5 for cube faces
}

export const navigationConfig: Record<string, MenuScreen> = {
	"home": {
		id: "home",
		title: "Welcome",
		description: "Max's Portfolio",
		buttons: [
			{ label: "Projects", nextScreenId: "projects", position: MenuButtonSide.Right },   
			{ label: "Contact", nextScreenId: "contact", position: MenuButtonSide.Bottom },  
			{ label: "About", nextScreenId: "about", position: MenuButtonSide.Left },       
		],
		faceIndex: 0, // Front
	},
	"projects": {
		id: "projects",
		title: "My Projects",
		buttons: [
			{ label: "Web Apps", nextScreenId: "web-apps", position: MenuButtonSide.Top },     
			{ label: "Back", nextScreenId: "home", position: MenuButtonSide.Left },          
		],
		faceIndex: 3, // Right
	},
	"web-apps": {
		id: "web-apps",
		title: "Web Applications",
		buttons: [
			{ label: "Back", nextScreenId: "projects", position: MenuButtonSide.Bottom },    
		],
		faceIndex: 1, // Right
	},
	about: {
		id: "about",
		title: "About Me",
		description: "Full-stack web developer passionate about creating engaging UIs",
		buttons: [
			{ label: "Back", nextScreenId: "home", position: MenuButtonSide.Right },
		],
		faceIndex: 1, // Left
	},
	contact: {
		id: "contact",
		title: "Get In Touch",
		description: "Email: hello@maxca.dev | GitHub | LinkedIn",
		buttons: [
			{ label: "Back", nextScreenId: "home", position: MenuButtonSide.Top },
		],
		faceIndex: 5, // Bottom
	},
};

export const getScreenConfig = (screenId: string): MenuScreen | null => {
	return navigationConfig[screenId] || null;
};
