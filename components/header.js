import { Canvas } from "@react-three/fiber";
import CameraControl from "./camera_control";
import { Text } from "@react-three/drei";

export default function Header() {
	return (
		<Canvas
			camera={{ position: [0, 0, 0] }}
			style={{
				height: "150px",
			}}
		>
			<CameraControl>
				<Text color="#00ffff" anchorX="center" anchorY="middle" fontSize={5} position={[0, 2, 0]}>
					&lt;yan /&gt;
				</Text>
			</CameraControl>
		</Canvas>
	);
}
