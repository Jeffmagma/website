import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
	return (
		<div className="navbar">
			<Link href="/">
				<a className={styles.a}>home</a>
			</Link>
			<Link href="/page2">
				<a className={styles.a}>page2</a>
			</Link>
		</div>
	);
}
