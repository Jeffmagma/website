import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
	return (
        <div className="navbar">
			<Link href="/" className={styles.a}>
				home
			</Link>
			<Link href="/page2" className={styles.a}>
				page2
			</Link>
		</div>
    );
}
