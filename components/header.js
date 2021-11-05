import { Canvas } from "@react-three/fiber";
import CameraControl from "./camera_control";
import { Text } from "@react-three/drei";

export default function Header() {
	return (
		<CameraControl>
			<Text color="white" anchorX="center" anchorY="middle" fontSize={5} position={[0, 3, 0]}>
				hello world!
			</Text>
		</CameraControl>
	);
}
