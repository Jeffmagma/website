import styles from "../styles/page2.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../components/header";
import Navbar from "../components/navbar";

export default function Home() {
	return (
		<div className={styles.container}>
			<motion.div layoutId="header">
				<Header />
				<Navbar />
			</motion.div>
			<div style={{ color: "white" }}>some content here</div>
		</div>
	);
}
