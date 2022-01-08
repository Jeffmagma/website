import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import CameraControl from "../components/camera_control.js";
import styles from "../styles/star_background.module.css";

export default function StarBackground() {
	return (
		<>
			<Canvas
				camera={{ position: [0, 0, 11], fov: 50 }}
				style={{ position: "fixed", left: 0, top: 0, height: "100%", zIndex: -1 }}
				className={styles.canvas}
			>
				<Stars />
				<CameraControl />
			</Canvas>
		</>
	);
}
