import styles from "../styles/index.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../components/header";

export default function Home() {
	return (
		<div className={styles.container}>
			<motion.div layoutId="header">
				<Header />
				<div style={{ opacity: "50%" }}>
					<Link href="/page2">
						<a style={{ backgroundColor: "white" }}>click here</a>
					</Link>
				</div>
			</motion.div>
		</div>
	);
}
