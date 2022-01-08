import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// the camera and children move
export default function CameraControl({ children }) {
	let mouse_x, mouse_y;

	document.addEventListener("mousemove", onMouseUpdate, false);
	document.addEventListener("mouseenter", onMouseUpdate, false);

	function onMouseUpdate(e) {
		const half_width = window.innerWidth / 2;
		const half_height = window.innerHeight / 2;
		mouse_x = e.pageX;
		mouse_y = e.pageY;
		//console.log("%d %d", mouse_x, mouse_y);
		mouse_x -= half_width;
		mouse_x /= parseFloat(half_width);
		mouse_y -= half_height;
		mouse_y /= parseFloat(half_height);
		//console.log("%d %d", mouse_x, mouse_y);
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
		camera.position.lerp(vec.set(mouse_x * 3, 0, 11), 0.05);
		if (isNaN(camera.position.x)) {
			console.log("camera x NaN");
			camera.position.x = 0;
		}
		// move children based on mouse position
		ref.current.position.lerp(vec.set(mouse_x * 1, mouse_y * 0.1, 0), 0.1);
		if (isNaN(ref.current.position.x)) {
			console.log("ref x NaN");
			ref.current.position.x = 0;
		}
		if (isNaN(ref.current.position.y)) {
			console.log("ref y NaN");
			ref.current.position.y = 0;
		}
		// rotate children based on mouse position
		ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse_x * Math.PI) / 20, 0.1);
		if (isNaN(ref.current.rotation.y)) {
			console.log("ref y rotation NaN");
			ref.current.rotation.y = 0;
		}
		//console.log(ref.current.rotation.y);
	});
	// return the children wrapped around a group parent
	return <group ref={ref}>{children}</group>;
}
