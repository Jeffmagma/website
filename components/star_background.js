import { Canvas } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import CameraControl from "../components/camera_control.js";

export default function StarBackground({ children }) {
	return (
		<>
			<Canvas camera={{ position: [0, 0, 11], fov: 50 }} style={{ position: "fixed", left: 0, top: 0 }}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Stars />
				{children}
			</Canvas>
		</>
	);
}
