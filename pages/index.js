import CameraControl from "../components/camera_control";
import StarBackground from "../components/star_background";
import { Text } from "@react-three/drei";

export default function Home() {
	return (
		<StarBackground>
			<CameraControl>
				<Text color="white" anchorX="center" anchorY="middle" fontSize={2} position={[0, 3, 0]}>
					hello world!
				</Text>
			</CameraControl>
		</StarBackground>
	);
}
