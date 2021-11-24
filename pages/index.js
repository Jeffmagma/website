import StarBackground from "../components/star_background";
import Header from "../components/header";
import { Canvas } from "@react-three/fiber";
import styles from "../styles/index.module.css";
import Link from "next/link";
import CameraControl from "../components/camera_control";

export default function Home() {
	return (
		<>
			<StarBackground />
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
					<Link href="/page2">
						<a style={{ backgroundColor: "white" }}>click here</a>
					</Link>
				</div>
			</div>
		</>
	);
}
