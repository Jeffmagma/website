import styles from "../styles/content.module.css";

export default class Home extends JSX.Element {
	y_coord: string = "40vh";
	render() {
		return  (<div className={styles.content}>hi, my name is jeffrey</div>);
	}
}

Home.y_coord = "40vh"
