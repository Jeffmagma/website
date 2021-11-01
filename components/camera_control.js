import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// the camera and children move
export default function CameraControl({ children }) {
	// get a reference to a group with the children
	const ref = useRef();
	// create a temporary vector
	const vec = new THREE.Vector3();
	// get camera and mouse information
	const { camera, mouse } = useThree();
	// every frame
	useFrame(() => {
		// move the camera based on mosue position
		camera.position.lerp(vec.set(mouse.x * 2, 0, 11), 0.05);
		// move children based on mouse position
		ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
		// rotate children based on mouse position
		ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1);
	});
	// return the children wrapped around a group parent
	return (
		<group ref={ref} scale={camera.aspect / 2.5}>
			{children}
		</group>
	);
}
