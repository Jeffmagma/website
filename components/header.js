import {Canvas, useFrame, useThree} from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {MathUtils, Vector3} from "three";
import {createRef} from "react";

function HeaderCamera({children}) {
	const { camera, pointer } = useThree();
	const vec = new Vector3();
	const ref = createRef();
	useFrame(() => {
		camera.position.lerp(vec.set(pointer.x * 2, pointer.y * 1, 11), 0.1);
		ref.current.position.lerp(vec.set(pointer.x * 1, pointer.y * 0.1, 0), 0.1);
		ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, (-pointer.x * Math.PI) / 20, 0.1);
	});
	return <group ref={ref}>{children}</group>;
}

export default function Header() {
	return (
		<Canvas camera={{ position: [0, 0, 1] }} style={{ height: "200px" }}>
			<HeaderCamera>
				<Text color="#00ffff" anchorX="center" anchorY="middle" fontSize={10} position={[0, 0, 2]}>
					&lt;yan /&gt;
				</Text>
			</HeaderCamera>
		</Canvas>
	);
}
