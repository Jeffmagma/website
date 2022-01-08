import styles from "../styles/page2.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../components/header";

export default function Home() {
	return (
		<div className={styles.container}>
			<motion.div layoutId="header">
				<Header />
				<div style={{ opacity: "50%" }}>
					<Link href="/">
						<a style={{ backgroundColor: "white" }}>click here</a>
					</Link>
				</div>
			</motion.div>
		</div>
	);
}
