import CameraControl from "../components/camera_control";
import StarBackground from "../components/star_background";
import { Text } from "@react-three/drei";
import Header from "../components/header";
import { Canvas } from "@react-three/fiber";

export default function Home() {
	return (
		<>
			<StarBackground />
			<Canvas
				style={{
					right: "50%",
					bottom: "50%",
					transform: "translate(50%, 50%)",
					position: "absolute",
					width: "150px",
					height: "150px",
				}}
			>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Header />
			</Canvas>
		</>
	);
}
