import { Canvas } from "@react-three/fiber";
import CameraControl from "./camera_control";
import { Text } from "@react-three/drei";

export default function Header() {
	return (
		<Canvas camera={{ position: [0, 0, 1] }} style={{ height: "200px" }}>
			<CameraControl>
				<Text color="#00ffff" anchorX="center" anchorY="middle" fontSize={10} position={[0, 0, 2]}>
					&lt;yan /&gt;
				</Text>
			</CameraControl>
		</Canvas>
	);
}
