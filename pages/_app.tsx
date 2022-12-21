import "../styles/globals.css";
import {Layout} from "../components/layout";
import {AppProps} from "next/app";

interface CustomAppProps extends AppProps {
	Component: AppProps["Component"] & {xc: string}
}

export default function MyApp({ Component, pageProps }: CustomAppProps) {
	return (
		<Layout xc={Component.xc}>
			<Component {...pageProps}/>
		</Layout>
	);
}
