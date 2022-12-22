import "../styles/globals.css";
import styles from "../styles/app.module.css"
import {Layout} from "../components/layout";
import {AppProps} from "next/app";
import React from "react";

interface CustomAppProps extends AppProps {
	Component: AppProps["Component"] & {xc: string}
}

const MyApp = ({ Component, pageProps }: CustomAppProps): JSX.Element  => {
	const ref = React.createRef<HTMLDivElement>()
	return (
		<div className={styles.mouse} ref={ref}>
		<Layout y_coord={Component.xc} parent_ref={ref}>
			<Component {...pageProps}/>
		</Layout></div>
	);
}

export default MyApp;
