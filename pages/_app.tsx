import "../styles/globals.css";
import styles from "../styles/app.module.css"
import {Layout} from "../components/layout";
import {AppProps} from "next/app";
import React from "react";

interface CustomAppProps extends AppProps {
	Component: AppProps["Component"] & {y_coord: string}
}

function MyApp({Component, pageProps, ...appProps}: CustomAppProps): JSX.Element {
	const ref = React.createRef<HTMLDivElement>()
	if (appProps.router.pathname == "/card") {
		return <Component {...pageProps}/>
	}
	return (
		<>
			<div className={styles.mouse} ref={ref}>
				<Layout y_coord={Component.y_coord} parent_ref={ref}>
					<Component {...pageProps}/>
				</Layout>
			</div>
		</>
	);
}

export default MyApp;
