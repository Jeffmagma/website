import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Stars} from "@react-three/drei";
import styles from "../styles/star_background.module.css";
import {Vector3} from "three";
import {RefObject} from "react";

function StarCamera() {
	const { camera, pointer } = useThree();
	const vec = new Vector3();
	return useFrame(() => camera.position.lerp(vec.set(pointer.x * 2, pointer.y, 11), 0.1));
}

interface StarProps {
	parent: RefObject<HTMLDivElement>
}

export default function StarBackground({parent}: StarProps) {
	return (
		<>
			<Canvas camera={{fov: 50}} style={{position: "fixed"}} className={styles.canvas} eventSource={parent} eventPrefix="client">
				<Stars/>
				<StarCamera/>
			</Canvas>
		</>
	);
}
