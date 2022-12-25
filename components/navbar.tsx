import Link from "next/link";
import styles from "../styles/navbar.module.css"

export default function Navbar() {
	return (
        <div className={styles.navbar}>
			<Link href="/">home</Link>
			<Link href="/content">content</Link>
			<Link href="/thoughts">thoughts</Link>
		</div>
    );
}
