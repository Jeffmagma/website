import styles from "../styles/content.module.css";
import React from "react";

export default class Home extends React.Component<{}, {}> {
	static y_coord: string = "40vh";
	render() {
		return  (<div className={styles.content}>hi, my name is jeffrey</div>);
	}
}
