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
			cs:go cheat
			<br />
			- used C++
			<br /><br />
		</div>
	);
}

Content.xc = "20vh"