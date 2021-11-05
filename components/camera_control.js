import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// the camera and children move
export default function CameraControl({ children }) {
	let x, y;

	document.addEventListener("mousemove", onMouseUpdate, false);
	document.addEventListener("mouseenter", onMouseUpdate, false);

	function onMouseUpdate(e) {
		const half_width = window.innerWidth / 2;
		const half_height = window.innerHeight / 2;
		x = e.pageX;
		x -= half_width;
		x /= half_width;
		y = e.pageY;
		y -= half_height;
		y /= half_height;
	}
	// get a reference to a group with the children
	const ref = useRef();
	// create a temporary vector
	const vec = new THREE.Vector3();
	// get camera and mouse information
	const { camera, mouse } = useThree();
	// every frame
	useFrame(() => {
		// move the camera based on mouse position
		camera.position.lerp(vec.set(mouse.x * 2, 0, 11), 0.05);
		// move children based on mouse position
		ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
		// rotate children based on mouse position
		ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1);
	});
	// return the children wrapped around a group parent
	return <group ref={ref}>{children}</group>;
}
