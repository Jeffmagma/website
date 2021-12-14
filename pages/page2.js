import StarBackground from "../components/star_background";
import Header from "../components/header";
import { Canvas } from "@react-three/fiber";
import styles from "../styles/page2.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<motion.div layoutId="header" transition={{ duration: 1 }} initial={{ y: 0 }} animate={{ y: 0 }}>
			<div className={styles.container}>
				<Canvas
					style={{
						height: "150px",
					}}
				>
					<ambientLight />
					<Header />
				</Canvas>

				<div style={{ opacity: "50%" }}>
					<Link href="/">
						<a style={{ backgroundColor: "white" }}>click here</a>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
