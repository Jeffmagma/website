import styles from "../styles/content.module.css"

export default function Content() {
	return (
		<div className={styles.content}>
			projects:
			<br /><br />
			this website
			<br />
			- used React, Next.js, Framer Motion, three.js, react-three-fiber
			<br />
			- hosted on vercel, code on <a href="https://github.com/Jeffmagma/website">github</a>
			<br /><br />
			avalon website
			<br />
			- used React with Firebase to manage state for all players
			<br />
			- hosted on <a href="https://cyan-pink.web.app">firebase</a>, code on <a href="https://github.com/Jeffmagma/avalon-fire">github</a>
			<br /><br />
			cs:go neural network cheat
			<br />
			- used C# with yolov3, trained on images of cs go models in source model viewer
			<br />
			- could detect enemies and teammates, and automatically highlight and aim at them
			<br />
			- very fast, over 100fps, detecting on 200x200 area around the middle of the screen (crosshair)
			<br /><br />
			cs:go external cheat
			<br />
			- used Kotlin with Jire&apos;s old <a href="https://github.com/Jire/Arrowhead">Arrowhead</a> library to read game data
			<br />
			- smooth, humanized aimbot run through mouse movement calculations instead of writing to game memory, avoiding detection
			<br /><br />
			cs:go internal cheat
			<br />
			- used C++ to hook onto in-game methods to introduce custom behavior
			<br />
			- many features including model recoloring (chameleon/chams), skin and knife changer, aimbot, wallhack, etc
			<br /><br />
		</div>
	);
}

Content.y_coord = "20vh"
