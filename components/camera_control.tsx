import {useEffect, useRef} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {Vector3,MathUtils} from "three";
import {Group} from "three";

// the camera and children move
export default function CameraControl({ children }) {
	// get a reference to a group with the children
	const ref = useRef<Group>();
	// create a temporary vector
	const vec = new Vector3();
	// get camera and mouse information
	const { camera, mouse } = useThree();
	// every frame
	useFrame(() => {
		//console.log(mouse);
		// move the camera based on mouse position
		camera.position.lerp(vec.set(mouse.x * 3, 0, 11), 0.05);
		if (isNaN(camera.position.x)) {
			//console.log("camera x NaN");
			camera.position.x = 0;
		}
		// move children based on mouse position
		ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
		if (isNaN(ref.current.position.x)) {
			//console.log("ref x NaN");
			ref.current.position.x = 0;
		}
		if (isNaN(ref.current.position.y)) {
			//console.log("ref y NaN");
			ref.current.position.y = 0;
		}
		// rotate children based on mouse position
		ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1);
		if (isNaN(ref.current.rotation.y)) {
			//console.log("ref y rotation NaN");
			ref.current.rotation.y = 0;
		}
		//console.log(ref.current.rotation.y);
	});
	// return the children wrapped around a group parent
	return <group ref={ref}>{children}</group>;
}
