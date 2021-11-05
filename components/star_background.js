import { Canvas } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import CameraControl from "../components/camera_control.js";
import styles from "../styles/star_background.module.css";

export default function StarBackground() {
	return (
		<>
			<Canvas
				camera={{ position: [0, 0, 11], fov: 50 }}
				style={{ position: "fixed", left: 0, top: 0, height: "100%" }}
				className={styles.canvas}
			>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Stars />
				<CameraControl />
			</Canvas>
		</>
	);
}
