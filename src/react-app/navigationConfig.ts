export interface MenuButton {
	label: string;
	nextScreenId: string;
}

export interface MenuScreen {
	id: string;
	title: string;
	description?: string;
	buttons: MenuButton[];
	faceIndex: number; // 0-5 for cube faces
}

export const navigationConfig: Record<string, MenuScreen> = {
	home: {
		id: "home",
		title: "Welcome",
		description: "Max's Portfolio",
		buttons: [
			{ label: "Skills", nextScreenId: "skills" },           // Top (face 4)
			{ label: "Projects", nextScreenId: "projects" },       // Right (face 1)
			{ label: "Contact", nextScreenId: "contact" },         // Bottom (face 5)
			{ label: "About", nextScreenId: "about" },             // Left (face 3)
		],
		faceIndex: 0, // Front
	},
	projects: {
		id: "projects",
		title: "My Projects",
		buttons: [
			{ label: "Web Apps", nextScreenId: "web-apps" },       // Top (face 4)
			{ label: "Design Work", nextScreenId: "design" },      // Right (face 2)
			{ label: "Back", nextScreenId: "home" },               // Bottom (face 5)
		],
		faceIndex: 1, // Right
	},
	"web-apps": {
		id: "web-apps",
		title: "Web Applications",
		buttons: [
			{ label: "E-Commerce Platform", nextScreenId: "ecommerce" },  // Top (face 4)
			{ label: "Task Manager", nextScreenId: "task-manager" },      // Right (face 2)
			{ label: "Back", nextScreenId: "projects" },                  // Bottom (face 5)
		],
		faceIndex: 1, // Right
	},
	ecommerce: {
		id: "ecommerce",
		title: "E-Commerce Platform",
		description: "React + Node.js + MongoDB",
		buttons: [
			{ label: "Back", nextScreenId: "web-apps" },
		],
		faceIndex: 4, // Top
	},
	"task-manager": {
		id: "task-manager",
		title: "Task Manager App",
		description: "React + Firebase",
		buttons: [
			{ label: "Back", nextScreenId: "web-apps" },
		],
		faceIndex: 4, // Top
	},
	design: {
		id: "design",
		title: "Design Work",
		buttons: [
			{ label: "Back", nextScreenId: "projects" },
		],
		faceIndex: 2, // Back
	},
	about: {
		id: "about",
		title: "About Me",
		description: "Full-stack web developer passionate about creating engaging UIs",
		buttons: [
			{ label: "Back", nextScreenId: "home" },
		],
		faceIndex: 3, // Left
	},
	skills: {
		id: "skills",
		title: "My Skills",
		buttons: [
			{ label: "Frontend", nextScreenId: "frontend-skills" },  // Right (face 1)
			{ label: "Backend", nextScreenId: "backend-skills" },    // Left (face 3)
			{ label: "Back", nextScreenId: "home" },                 // Bottom (face 5)
		],
		faceIndex: 4, // Top
	},
	"frontend-skills": {
		id: "frontend-skills",
		title: "Frontend",
		description: "React, TypeScript, Three.js, CSS",
		buttons: [
			{ label: "Back", nextScreenId: "skills" },
		],
		faceIndex: 1, // Right
	},
	"backend-skills": {
		id: "backend-skills",
		title: "Backend",
		description: "Node.js, Express, MongoDB, PostgreSQL",
		buttons: [
			{ label: "Back", nextScreenId: "skills" },
		],
		faceIndex: 3, // Left
	},
	contact: {
		id: "contact",
		title: "Get In Touch",
		description: "Email: hello@maxca.dev | GitHub | LinkedIn",
		buttons: [
			{ label: "Back", nextScreenId: "home" },
		],
		faceIndex: 5, // Bottom
	},
};

export const getScreenConfig = (screenId: string): MenuScreen | null => {
	return navigationConfig[screenId] || null;
};
